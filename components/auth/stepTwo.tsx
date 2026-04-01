import SelectField from "./ui/selectField";
import CountriesSelect from "./ui/countriesSelect";
import {
    EDUCATION_LEVELS,
    FIELDS_OF_STUDY,
    INTEREST_OPTIONS,
    SCHOLARSHIP_TYPES,
} from "@/lib/constants/allCountries";
import type { StepTwoProps } from "@/lib/types/auth";

export default function StepTwo({ form, setForm, onNext, isLastStep }: StepTwoProps) {
    return (
        <>
            <SelectField
                label="Education Level"
                value={form.educationLevel}
                onChange={(v: string) => setForm((f) => ({ ...f, educationLevel: v }))}
                options={EDUCATION_LEVELS}
                placeholder="Enter your education Level"
            />
            <SelectField
                label="Field of Study"
                value={form.fieldOfStudy}
                onChange={(v: string) => setForm((f) => ({ ...f, fieldOfStudy: v }))}
                options={FIELDS_OF_STUDY}
                placeholder="Enter your Field of Study"
            />
            <SelectField
                label="Interest"
                value={form.interest}
                onChange={(v: string) => setForm((f) => ({ ...f, interest: v }))}
                options={INTEREST_OPTIONS}
            />
            <CountriesSelect
                selected={form.countries}
                onChange={(v: string[]) => setForm((f) => ({ ...f, countries: v }))}
            />
            <SelectField
                label="Scholarship Type"
                value={form.scholarshipType}
                onChange={(v: string) => setForm((f) => ({ ...f, scholarshipType: v }))}
                options={SCHOLARSHIP_TYPES}
            />
            <button
                onClick={onNext}
                className="w-full py-3.5 mt-1 bg-[#1C2FBB] text-white font-semibold text-sm rounded-lg hover:opacity-90 transition-opacity duration-200"
            >
                {isLastStep ? "Create account" : "Continue"}
            </button>
        </>
    );
}