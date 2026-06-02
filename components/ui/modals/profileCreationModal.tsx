"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X, ChevronDown } from "lucide-react";
import { createStaffProfile } from "@/service/admin/createStaffProfile";
import type { Role } from "@/lib/types/auth";

interface ProfileCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

const STAFF_ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "verifier", label: "Verifier" },
];

export const ProfileCreationModal = ({
  isOpen,
  onClose,
  onCreated,
}: ProfileCreationModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("admin");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setRole("admin");
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(false);
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    const result = await createStaffProfile({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setSuccessMessage(
      result.needsEmailVerification
        ? "Account created. The user must verify their email before signing in."
        : "Account created successfully."
    );

    onCreated?.();

    setTimeout(() => {
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-[800px] flex flex-col pt-8 pb-12 px-10 animate-scale-in max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center mb-10">
          <h2 id="modal-title" className="text-xl font-normal text-gray-900 tracking-tight">
            Profile Creation
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#1a237e] hover:text-indigo-900 transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 stroke-[2.5px]" />
          </button>
        </div>

        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <Field label="First name" required>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                required
                className={inputClass}
              />
            </Field>
            <Field label="Last name" required>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                required
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            <Field label="Email address" required>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                required
                className={inputClass}
              />
            </Field>
            <Field label="Password" required>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                required
                minLength={8}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="w-full sm:max-w-md">
            <Field label="Select role" required>
              <div className="relative">
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as Role)}
                  className={`${inputClass} appearance-none bg-white`}
                >
                  {STAFF_ROLE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <ChevronDown className="h-5 w-5 stroke-[1.5px] text-[#1a237e]" />
                </div>
              </div>
            </Field>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {successMessage && (
            <p className="text-sm text-green-700">{successMessage}</p>
          )}

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center px-24 py-3.5 text-sm font-medium rounded-lg text-white bg-[#1a237e] hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Creating…" : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

const inputClass =
  "block w-full px-4 py-3 rounded-md border border-gray-200 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none shadow-sm";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm text-gray-500 font-light">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
