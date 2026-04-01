import { useState } from "react";
import GoogleButton from "./ui/googleButton";
import Divider from "./ui/divider";
import SelectField from "./ui/selectField";
import { GENDER_OPTIONS } from "@/lib/constants/allCountries";
import type { StepOneProps, FullForm } from "@/lib/types/auth";

export default function StepOne({ form, setForm, onNext }: StepOneProps) {
    const [errors, setErrors] = useState<Partial<Record<keyof FullForm, string>>>({});
    const [focused, setFocused] = useState<keyof FullForm | null>(null);
    const [googleLoading, setGoogleLoading] = useState<boolean>(false);

    const validate = () => {
        const e: Partial<Record<keyof FullForm, string>> = {};
        if (!form.firstName.trim()) e.firstName = "First name is required";
        if (!form.lastName.trim()) e.lastName = "Last name is required";
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address";
        return e;
    };

    const handleContinue = () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        onNext("manual");
    };

    const handleGoogle = async () => {
        setGoogleLoading(true);
        sessionStorage.setItem("signup_profile", JSON.stringify({ ...form, authMethod: "google" }));
        // Uncomment when wiring up Supabase:
        // const { error } = await supabase.auth.signInWithOAuth({
        //   provider: "google",
        //   options: { redirectTo: `${window.location.origin}/auth/callback?next=onboarding` },
        // });
        // if (error) { console.error(error); setGoogleLoading(false); return; }
        onNext("google"); // ← remove this line when Supabase redirect is live
    };

    const inputClass = (name: keyof FullForm) =>
        `w-full px-3.5 py-3 border rounded-lg text-sm text-gray-700 bg-white outline-none transition-colors duration-200 ${errors[name]
            ? "border-red-400"
            : focused === name
                ? "border-[#1C2FBB]"
                : "border-gray-200"
        }`;

    const field = (name: keyof FullForm, label: string, type = "text", placeholder = "") => (
        <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-900 mb-0.5">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={form[name]}
                onChange={(e) => {
                    setForm((f) => ({ ...f, [name]: e.target.value }));
                    setErrors((er) => ({ ...er, [name]: "" }));
                }}
                onFocus={() => setFocused(name)}
                onBlur={() => setFocused(null)}
                className={inputClass(name)}
            />
            {errors[name] && (
                <p className="text-xs text-red-400 mt-1">{errors[name]}</p>
            )}
        </div>
    );

    return (
        <>
            <GoogleButton onClick={handleGoogle} loading={googleLoading} />
            <Divider />
            {field("firstName", "First Name", "text", "Enter your First Name")}
            {field("lastName", "Last Name", "text", "Enter your Last Name")}
            {field("email", "Email Address", "email", "Enter your Email address")}
            <SelectField
                label="Select Gender"
                value={form.gender}
                onChange={(v: string) => setForm((f) => ({ ...f, gender: v }))}
                options={GENDER_OPTIONS}
            />
            <button
                onClick={handleContinue}
                className="w-full py-3.5 mt-1 bg-[#1C2FBB] text-white font-semibold text-sm rounded-lg hover:opacity-90 transition-opacity duration-200"
            >
                Continue
            </button>
        </>
    );
}