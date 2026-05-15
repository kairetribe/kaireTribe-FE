import supabase from "@/lib/supabase";
import {
  SCHOLARSHIP_IMAGE_FOLDER,
  SCHOLARSHIP_STORAGE_BUCKET,
} from "@/lib/constants/scholarships";
import type { CreateScholarshipInput, CreateScholarshipResult } from "@/lib/types/scholarship";
import {
  normalizeScholarshipLink,
  scholarshipImageExtension,
  scholarshipStatusFromClosingDate,
  slugifyScholarshipName,
  validateScholarshipInput,
} from "@/utils/admin/scholarshipForm";

async function uploadScholarshipImage(
  file: File,
  userId: string
): Promise<{ imagePath: string; imageUrl: string; error: string | null }> {
  const extension = scholarshipImageExtension(file);
  const imagePath = `${SCHOLARSHIP_IMAGE_FOLDER}/${userId}/${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from(SCHOLARSHIP_STORAGE_BUCKET)
    .upload(imagePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || undefined,
    });

  if (uploadError) {
    return { imagePath: "", imageUrl: "", error: uploadError.message };
  }

  const { data } = supabase.storage.from(SCHOLARSHIP_STORAGE_BUCKET).getPublicUrl(imagePath);
  return { imagePath, imageUrl: data.publicUrl, error: null };
}

async function insertScholarship(
  payload: Record<string, unknown>
): Promise<{ id: string; slug: string } | { error: string }> {
  const { data, error } = await supabase.from("scholarships").insert(payload).select("id, slug").single();

  if (error || !data) return { error: error?.message ?? "Failed to save scholarship." };
  return { id: data.id, slug: data.slug };
}

export async function createScholarship(
  input: CreateScholarshipInput
): Promise<CreateScholarshipResult> {
  const validationError = validateScholarshipInput(input);
  if (validationError) return { id: null, slug: null, error: validationError };

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  const userId = sessionData.session?.user.id;
  if (sessionError || !userId) {
    return { id: null, slug: null, error: "You must be signed in as an admin to upload scholarships." };
  }

  const { imagePath, imageUrl, error: uploadError } = await uploadScholarshipImage(input.image, userId);
  if (uploadError) return { id: null, slug: null, error: uploadError };

  const name = input.name.trim();
  const baseSlug = slugifyScholarshipName(name);
  const status = scholarshipStatusFromClosingDate(input.closingDate);

  const basePayload = {
    name,
    sponsor_name: input.sponsor.trim(),
    opening_date: input.openingDate,
    closing_date: input.closingDate,
    scholarship_type: input.scholarshipType,
    open_to: input.openTo,
    link: normalizeScholarshipLink(input.link),
    details: input.details.trim(),
    image_path: imagePath,
    image_url: imageUrl,
    status,
    created_by: userId,
  };

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const slug = attempt === 0 ? baseSlug : `${baseSlug}-${attempt + 1}`;
    const result = await insertScholarship({ ...basePayload, slug });

    if (!("error" in result)) {
      return { id: result.id, slug: result.slug, error: null };
    }

    const isDuplicateSlug =
      result.error.toLowerCase().includes("slug") &&
      (result.error.toLowerCase().includes("duplicate") || result.error.includes("23505"));

    if (!isDuplicateSlug) {
      await supabase.storage.from(SCHOLARSHIP_STORAGE_BUCKET).remove([imagePath]);
      return { id: null, slug: null, error: result.error };
    }
  }

  await supabase.storage.from(SCHOLARSHIP_STORAGE_BUCKET).remove([imagePath]);
  return { id: null, slug: null, error: "Could not generate a unique scholarship URL. Try a different name." };
}
