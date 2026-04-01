import supabase from "@/lib/supabase";
import type {
  SignUpFormWithPassword,
  LocalSession,
} from "@/lib/types/auth";

interface AuthResult {
  session: LocalSession | null;
  error:   string | null;
}

function toSession(data: {
  id:         string;
  email:      string;
  first_name: string;
  last_name:  string;
  role:       string;
}): LocalSession {
  return {
    id:        data.id,
    email:     data.email,
    firstName: data.first_name,
    lastName:  data.last_name,
    role:      data.role as LocalSession["role"],
  };
}

export async function signUpWithEmail(
  formData: SignUpFormWithPassword
): Promise<AuthResult> {
  const { data, error } = await supabase
    .from("users")
    .insert({
      first_name:       formData.firstName,
      last_name:        formData.lastName,
      email:            formData.email,
      gender:           formData.gender,
      education_level:  formData.educationLevel,
      field_of_study:   formData.fieldOfStudy,
      interest:         formData.interest,
      scholarship_type: formData.scholarshipType,
      countries:        formData.countries,
      role:             "user",
    })
    .select("id, role, email, first_name, last_name")
    .single();

  if (error) {
    return { session: null, error: error.message };
  }

  return { session: toSession(data), error: null };
}

export async function signInWithEmail(
  email:     string,
  _password: string,
): Promise<AuthResult> {
  const { data, error } = await supabase
    .from("users")
    .select("id, role, email, first_name, last_name")
    .eq("email", email)
    .single();

  if (error || !data) {
    return { session: null, error: "No account found with that email address." };
  }

  return { session: toSession(data), error: null };
}