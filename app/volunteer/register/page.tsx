"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Heart, Loader2, CheckCircle, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const interestAreas = [
  "Technical Mentor & Instructor",
  "Event Coordinator",
  "Content Writer / Social Media",
  "Operations & Outreach Support",
  "Tech Support & Troubleshooting"
];

export default function VolunteerRegistrationForm() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    mobile: "",
    skills: [] as string[],
    areaOfInterest: "",
    availability: "",
    experience: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      setSkillInput("");
    }
  };

  const removeSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName) return toast.error("Full name is required");
    if (!formData.email) return toast.error("Email is required");
    if (!formData.mobile.match(/^[6-9]\d{9}$/)) {
      return toast.error("Enter a valid 10-digit mobile number");
    }
    if (formData.skills.length === 0) return toast.error("Add at least one technical skill or strength");
    if (!formData.areaOfInterest) return toast.error("Please select an area of interest");
    if (!formData.availability) return toast.error("Please specify your availability");
    if (formData.experience.length < 5) {
      return toast.error("Please describe your experience in at least 5 characters");
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/volunteer/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Registration failed");
      }

      toast.success("Welcome aboard! You are now registered as a Volunteer.");
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to submit volunteer registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071826] text-slate-100 pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/volunteer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Volunteer Info
        </Link>

        <div className="text-center mb-8">
          <Heart className="h-10 w-10 text-[#F97316] mx-auto mb-3" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Register as Volunteer</h1>
          <p className="text-xs text-slate-400 mt-1">Help empower regional communities through your valuable support.</p>
        </div>

        <div className="bg-[#0F2233] border border-[#1E3A4C] rounded-2xl p-6 md:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label id="lbl-fullname" className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                <input
                  id="input-fullname"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label id="lbl-email" className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                <input
                  id="input-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] outline-none"
                  placeholder="johndoe@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label id="lbl-mobile" className="block text-xs font-semibold text-slate-300 mb-1.5">Mobile Number</label>
                <input
                  id="input-mobile"
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] outline-none"
                  placeholder="e.g. 9876543210"
                  required
                />
              </div>

              <div>
                <label id="lbl-area" className="block text-xs font-semibold text-slate-300 mb-1.5">Area of Interest</label>
                <select
                  id="input-area"
                  name="areaOfInterest"
                  value={formData.areaOfInterest}
                  onChange={handleChange}
                  className="w-full h-10 px-3 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] outline-none"
                  required
                >
                  <option value="">Select Area</option>
                  {interestAreas.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label id="lbl-skills" className="block text-xs font-semibold text-slate-300 mb-1.5">Skills / Strength Areas</label>
              <div className="flex gap-2">
                <input
                  id="input-skill-add"
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  className="flex-1 h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] outline-none"
                  placeholder="e.g. Java, Content Writing, Public Speaking (Press Enter)"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 bg-[#F97316] hover:bg-[#EA6B0C] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.skills.map((s, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 rounded-full text-xs text-white border border-slate-700">
                    {s}
                    <button type="button" onClick={() => removeSkill(i)} className="text-red-400 hover:text-red-500 focus:outline-none">&times;</button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label id="lbl-availability" className="block text-xs font-semibold text-slate-300 mb-1.5">Weekly Availability Description</label>
              <input
                id="input-availability"
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] outline-none"
                placeholder="e.g. 5 hours per week, mostly weekends"
                required
              />
            </div>

            <div>
              <label id="lbl-experience" className="block text-xs font-semibold text-slate-300 mb-1.5">Prior Volunteer / Technical Experience</label>
              <textarea
                id="input-experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] outline-none resize-none"
                placeholder="Describe any previous mentoring, social volunteering, or software engineering experience."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-1.5 h-11 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-800 disabled:text-slate-500 rounded-lg text-xs font-bold text-white transition-all cursor-pointer shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting Registration...
                </>
              ) : (
                <>
                  Complete Volunteer Registration
                  <CheckCircle className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
