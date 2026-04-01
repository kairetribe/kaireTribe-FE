import { useState } from "react";
import type { StepThreeProps } from "@/lib/types/auth";

function EyeIcon({ visible }: { visible: boolean }) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-400"
        >
            {visible ? (
                <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                </>
            ) : (
                <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                </>
            )}
        </svg>
    );
}

export default function StepThree({ form, onSubmit }: StepThreeProps) {
    const [passwords, setPasswords] = useState({ password: "", confirm: "" });
    const [show, setShow] = useState<Record<string, boolean>>({ password: false, confirm: false });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [focused, setFocused] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!passwords.password) e.password = "Password is required";
        else if (passwords.password.length < 8) e.password = "Minimum 8 characters";
        if (!passwords.confirm) e.confirm = "Please confirm your password";
        else if (passwords.password !== passwords.confirm) e.confirm = "Passwords do not match";
        return e;
    };

    const handleSubmit = async () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        setLoading(true);
        await onSubmit({ ...form, password: passwords.password });
        setLoading(false);
    };

    const inputClass = (name: string) =>
        `w-full pl-3.5 pr-11 py-3 border rounded-lg text-sm text-gray-700 bg-white outline-none transition-colors duration-200 ${errors[name]
            ? "border-red-400"
            : focused === name
                ? "border-[#1C2FBB]"
                : "border-gray-200"
        }`;

    const pwField = (name: keyof typeof passwords, label: string, placeholder: string) => (
        <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                {label}
            </label>
            <div className="relative">
                <input
                    type={show[name] ? "text" : "password"}
                    placeholder={placeholder}
                    value={passwords[name]}
                    onChange={(e) => {
                        setPasswords((p) => ({ ...p, [name]: e.target.value }));
                        setErrors((er) => ({ ...er, [name]: "" }));
                    }}
                    onFocus={() => setFocused(name)}
                    onBlur={() => setFocused(null)}
                    className={inputClass(name)}
                />
                <button
                    type="button"
                    onClick={() => setShow((s) => ({ ...s, [name]: !s[name] }))}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <EyeIcon visible={show[name]} />
                </button>
            </div>
            {errors[name] && (
                <p className="text-xs text-red-400 mt-1">{errors[name]}</p>
            )}
        </div>
    );

    return (
        <>
            {pwField("password", "Password", "Enter Password")}
            {pwField("confirm", "Confirm Password", "Confirm Password")}
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3.5 mt-1 bg-[#1C2FBB] text-white font-semibold text-sm rounded-lg hover:opacity-90 transition-opacity duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? "Creating account..." : "Create account"}
            </button>
        </>
    );
}