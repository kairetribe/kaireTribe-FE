import type { WaitlistEntry } from "@/lib/types/waitlist";

export function formatWaitlistName(entry: Pick<WaitlistEntry, "firstName" | "lastName">): string {
  return `${entry.firstName} ${entry.lastName}`.trim();
}

export function formatWaitlistDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function filterWaitlistEntries(entries: WaitlistEntry[], search: string): WaitlistEntry[] {
  const term = search.trim().toLowerCase();
  if (!term) return entries;

  return entries.filter((entry) => {
    const haystack = [entry.firstName, entry.lastName, entry.email, entry.phone].join(" ").toLowerCase();
    return haystack.includes(term);
  });
}

export function paginateWaitlistEntries(
  entries: WaitlistEntry[],
  page: number,
  pageSize: number
): { page: number; totalCount: number; totalPages: number; data: WaitlistEntry[] } {
  const totalCount = entries.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    page: safePage,
    totalCount,
    totalPages,
    data: entries.slice(start, start + pageSize),
  };
}

export function exportWaitlistToCSV(entries: WaitlistEntry[]): void {
  const headers = ["First Name", "Last Name", "Email", "Phone", "Joined"];
  const rows = entries.map((entry) => [
    entry.firstName,
    entry.lastName,
    entry.email,
    entry.phone,
    formatWaitlistDate(entry.createdAt),
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `kairetribe-waitlist-${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
