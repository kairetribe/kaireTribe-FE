import type { UserRow } from "../hooks/useUsers";

export function exportUsersToCSV(users: UserRow[]): void {
  const headers = ["Name", "Email", "Gender", "Education Level", "Role", "Joined"];

  const rows = users.map((u) => [
    `${u.first_name} ${u.last_name}`,
    u.email,
    u.gender ?? "—",
    u.education_level ?? "—",
    u.role,
    new Date(u.created_at).toLocaleDateString(),
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href     = url;
  link.download = `kairetribe-users-${new Date().toISOString().split("T")[0]}.csv`;
  link.click();

  URL.revokeObjectURL(url);
}