"use client";
import { useState } from "react";
import Logo from "@/components/ui/logo";
import ProgressBar from "@/components/auth/ui/progressBar";
import StepOne from "@/components/auth/stepOne";
import StepTwo from "@/components/auth/stepTwo";
import StepThree from "@/components/auth/stepThree";
import type { SignUpForm, SignUpFormWithPassword } from "@/lib/types/auth";
import { signUpWithEmail } from "@/service/auth";
// import { supabase } from "../lib/supabaseClient"; // uncomment when wiring up

const initialForm: SignUpForm = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "Male",
    educationLevel: "",
    fieldOfStudy: "",
    interest: "Local and International",
    countries: [],
    scholarshipType: "Full Scholarship",
};

export default function SignUpPage() {
    const [step, setStep] = useState(1);
    const [authMethod, setAuthMethod] = useState<string | null>(null); // "google" | "manual"
    const [form, setForm] = useState(initialForm);

    // Google = 2 steps | Manual = 3 steps
    const totalSteps = authMethod === "google" ? 2 : 3;

    const handleStep1Next = (method: string) => {
        setAuthMethod(method);
        setStep(2);
    };

    const handleStep2Next = () => {
        if (authMethod === "google") {
            handleFinalSubmit(form);
        } else {
            setStep(3);
        }
    };

    const handleFinalSubmit = async (data: SignUpForm) => {
        console.log("Submitting →", data);

        const { error } = await signUpWithEmail(data as SignUpFormWithPassword);

        if (error) {
            console.log(error);
            return;
        }

        window.location.href = "/user";
    };

    return (
        <div className="flex h-screen w-screen md:overflow-hidden bg-white p-6">

            {/* ── Left image panel ── */}
            <div className="w-1/2 flex-shrink-0 hidden md:block overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&fit=crop&q=80"
                    alt="KaireTribe student"
                    className="w-full h-full object-cover rounded-2xl"
                />
            </div>

            {/* ── Right form panel ── */}
            <div className="w-full md:w-1/2 flex items-center justify-center md:px-16 px-6 py-10">
                <div className="w-full max-w-sm">
                    <Logo />
                    <p className="text-sm text-gray-500 text-center mb-3">
                        Welcome to KaireTribe, let's get you started.
                    </p>

                    <ProgressBar
                        step={step}
                        totalSteps={authMethod === null ? 3 : totalSteps}
                    />

                    {step === 1 && (
                        <StepOne form={form} setForm={setForm} onNext={handleStep1Next} />
                    )}
                    {step === 2 && (
                        <StepTwo
                            form={form}
                            setForm={setForm}
                            onNext={handleStep2Next}
                            isLastStep={authMethod === "google"}
                        />
                    )}
                    {step === 3 && authMethod === "manual" && (
                        <StepThree form={form} onSubmit={handleFinalSubmit} />
                    )}

                    <p className="text-center text-xs text-gray-400 mt-2">
                        Already have an account?{" "}
                        <a href="/sign-in" className="text-[#1C2FBB] font-semibold hover:underline">
                            Log in
                        </a>
                    </p>

                </div>
            </div>
        </div>
    );
}