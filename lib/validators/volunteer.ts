import { z } from "zod";

export const VolunteerRegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Mobile number must be a valid 10-digit number starting with 6-9"),
  skills: z.array(z.string()).min(1, "Please add at least one skill"),
  areaOfInterest: z.string().min(2, "Please specify your area of interest"),
  availability: z.string().min(2, "Please specify your availability"),
  experience: z.string().min(5, "Please describe your experience in at least 5 characters"),
});

export type VolunteerRegistrationInput = z.infer<typeof VolunteerRegistrationSchema>;
