"use client";

import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import { updateUserPassword } from "@/service/user/userProfile";

interface SecurityProps {
  email: string;
  isLoading: boolean;
  loadError: string | null;
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm text-gray-900 pr-11"
          required
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-gray-600"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <Eye className="w-4 h-4 text-blue-600" /> : <EyeOff className="w-4 h-4 text-blue-600" />}
        </button>
      </div>
    </div>
  );
}

export const Security = ({ email, isLoading, loadError }: SecurityProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setFormError("New passwords do not match.");
      return;
    }

    setIsSaving(true);
    const { error } = await updateUserPassword({
      email,
      currentPassword,
      newPassword,
    });
    setIsSaving(false);

    if (error) {
      setFormError(error);
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSuccess("Password updated successfully.");
  };

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading…</p>;
  }

  if (loadError) {
    return <p className="text-sm text-red-500">{loadError}</p>;
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-medium text-gray-900 mb-6">Security</h2>

      {formError && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-500">
          {formError}
        </div>
      )}
      {success && (
        <div className="mb-4 px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
          {success}
        </div>
      )}

      <form className="space-y-6" onSubmit={(event) => void handleSubmit(event)}>
        <PasswordField
          id="currentPassword"
          label="Current Password"
          value={currentPassword}
          onChange={setCurrentPassword}
          placeholder="Enter current password"
        />
        <PasswordField
          id="newPassword"
          label="New Password"
          value={newPassword}
          onChange={setNewPassword}
          placeholder="Enter new password"
        />
        <PasswordField
          id="confirmPassword"
          label="Confirm Password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirm new password"
        />

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="w-full bg-[#1a237e] text-white py-3 rounded-md font-medium hover:bg-indigo-900 transition-colors shadow-sm disabled:opacity-60"
          >
            {isSaving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};
