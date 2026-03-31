import type React from "react";

/* The full combined form state shared across all sign-up steps */
export interface FullForm {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    educationLevel: string;
    fieldOfStudy: string;
    interest: string;
    countries: string[];
    scholarshipType: string;
    password?: string;
}

export interface StepOneProps {
    form: FullForm;
    setForm: React.Dispatch<React.SetStateAction<FullForm>>;
    onNext: (method: string) => void;
}

export interface StepTwoForm {
    educationLevel: string;
    fieldOfStudy: string;
    interest: string;
    countries: string[];
    scholarshipType: string;
}

export interface StepTwoProps {
    form: FullForm;
    setForm: React.Dispatch<React.SetStateAction<FullForm>>;
    onNext: () => void;
    isLastStep: boolean;
}

export interface StepThreeProps {
    form: FullForm;
    onSubmit: (data: FullForm) => Promise<void>;
}

export interface SelectFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder?: string;
}


export type AuthMethod = "google" | "manual";

export type Role = "user" | "admin";

export interface SignUpForm {
  firstName:       string;
  lastName:        string;
  email:           string;
  gender:          string;
  educationLevel:  string;
  fieldOfStudy:    string;
  interest:        string;
  countries:       string[];
  scholarshipType: string;
}

export interface SignUpFormWithPassword extends SignUpForm {
  password: string;
}

export interface UserProfile {
  id:               string;
  first_name:       string;
  last_name:        string;
  email:            string;
  gender:           string | null;
  education_level:  string | null;
  field_of_study:   string | null;
  interest:         string | null;
  scholarship_type: string | null;
  countries:        string[];
  role:             Role;
  created_at:       string;
  updated_at:       string;
}

export interface LocalSession {
  id:        string;
  email:     string;
  firstName: string;
  lastName:  string;
  role:      Role;
}

export interface AuthServiceResponse {
  error: string | null;
}