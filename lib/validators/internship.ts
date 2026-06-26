import { z } from "zod";

export const Step1PersonalSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Mobile number must be a valid 10-digit number starting with 6-9"),
  gender: z.enum(["Male", "Female", "Other"], { message: "Please select gender" }),
  dateOfBirth: z.string().or(z.date()).refine((val) => {
    const date = new Date(val);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    return age >= 16;
  }, "You must be at least 16 years old to apply"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
});

export const Step2EducationalSchema = z.object({
  collegeName: z.string().min(3, "College name must be at least 3 characters"),
  university: z.string().min(3, "University name must be at least 3 characters"),
  degree: z.string().min(2, "Degree must be at least 2 characters"),
  branch: z.string().min(2, "Branch must be at least 2 characters"),
  currentYearSem: z.string().min(1, "Please enter your current year/semester"),
  graduationYear: z.coerce.number().int().min(new Date().getFullYear() - 5).max(new Date().getFullYear() + 6, "Invalid graduation year"),
  cgpa: z.string().min(1, "Enter your CGPA or percentage"),
});

export const Step3SkillsSchema = z.object({
  skills: z.array(z.string()).min(1, "Please add at least one skill"),
  programmingLanguages: z.array(z.string()).min(1, "Please add at least one language"),
  projects: z.string().min(10, "Describe your projects in at least 10 characters"),
  portfolioUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const Step4PreferencesSchema = z.object({
  domain: z.enum(["Web Development", "Mobile Development", "UI/UX", "Data Science", "AI/ML", "Digital Marketing", "Other"], {
    message: "Please select preferred domain",
  }),
  availableHours: z.coerce.number().int().min(10, "Available hours must be at least 10 per week").max(60, "Maximum hours is 60"),
  whyJoin: z.string().min(20, "Please provide a description of at least 20 characters"),
});

export const Step5DocumentsSchema = z.object({
  resumeUrl: z.string().url("Resume upload is required"),
  photoUrl: z.string().url("Profile photo upload is required"),
  collegeIdUrl: z.string().url("College ID must be a valid URL").optional().or(z.literal("")),
});

export const Step6DeclarationSchema = z.object({
  termsAccepted: z.boolean().refine((val) => val === true, "You must accept the terms & conditions to submit"),
});

// Full consolidated application validator
export const InternshipApplicationSchema = z.object({
  ...Step1PersonalSchema.shape,
  ...Step2EducationalSchema.shape,
  ...Step3SkillsSchema.shape,
  ...Step4PreferencesSchema.shape,
  ...Step5DocumentsSchema.shape,
  ...Step6DeclarationSchema.shape,
});

export type InternshipApplicationInput = z.infer<typeof InternshipApplicationSchema>;
