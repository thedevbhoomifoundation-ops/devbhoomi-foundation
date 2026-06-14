"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  GraduationCap,
  Wrench,
  Heart,
  FileText,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Upload,
  Loader2,
  Trash2
} from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

const domains = ["Web Development", "Mobile Development", "UI/UX", "Data Science", "AI/ML", "Digital Marketing", "Other"];

export default function InternshipApplicationForm() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { t } = useTranslation();

  // Multi-step state
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    // Step 1: Personal
    fullName: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    mobile: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    // Step 2: Educational
    collegeName: "",
    university: "",
    degree: "",
    branch: "",
    currentYearSem: "",
    graduationYear: new Date().getFullYear(),
    cgpa: "",
    // Step 3: Technical Skills
    skills: [] as string[],
    programmingLanguages: [] as string[],
    projects: "",
    portfolioUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    // Step 4: Preferences
    domain: "",
    availableHours: 20,
    whyJoin: "",
    // Step 5: Documents
    resumeUrl: "",
    photoUrl: "",
    collegeIdUrl: "",
    // Step 6: Declaration
    termsAccepted: false,
  });

  // Local state helper for list inputs
  const [skillInput, setSkillInput] = useState("");
  const [langInput, setLangInput] = useState("");

  // Step names & icons
  const steps = [
    { num: 1, name: "Personal", icon: User },
    { num: 2, name: "Education", icon: GraduationCap },
    { num: 3, name: "Skills", icon: Wrench },
    { num: 4, name: "Preferences", icon: Heart },
    { num: 5, name: "Documents", icon: FileText },
    { num: 6, name: "Declaration", icon: CheckCircle2 },
  ];

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Upload handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size cannot exceed 10MB");
      return;
    }

    setUploadingField(fieldName);
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      const data = await res.json();
      setFormData((prev) => ({ ...prev, [fieldName]: data.url }));
      toast.success(`${file.name} uploaded successfully!`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to upload file");
    } finally {
      setUploadingField(null);
    }
  };

  const removeFile = (fieldName: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: "" }));
  };

  // List helpers
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

  const addLang = () => {
    if (langInput.trim() && !formData.programmingLanguages.includes(langInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        programmingLanguages: [...prev.programmingLanguages, langInput.trim()],
      }));
      setLangInput("");
    }
  };

  const removeLang = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      programmingLanguages: prev.programmingLanguages.filter((_, i) => i !== index),
    }));
  };

  // Step validations
  const validateStep = (): boolean => {
    if (currentStep === 1) {
      if (!formData.fullName) return toast.error("Full name is required"), false;
      if (!formData.email) return toast.error("Email is required"), false;
      if (!formData.mobile.match(/^[6-9]\d{9}$/)) {
        return toast.error("Enter a valid 10-digit mobile number"), false;
      }
      if (!formData.gender) return toast.error("Gender is required"), false;
      if (!formData.dateOfBirth) return toast.error("Date of birth is required"), false;
      if (!formData.address) return toast.error("Address is required"), false;
      if (!formData.city) return toast.error("City is required"), false;
      if (!formData.state) return toast.error("State is required"), false;
      if (!formData.pincode.match(/^\d{6}$/)) {
        return toast.error("Enter a valid 6-digit pincode"), false;
      }
    }

    if (currentStep === 2) {
      if (!formData.collegeName) return toast.error("College name is required"), false;
      if (!formData.university) return toast.error("University is required"), false;
      if (!formData.degree) return toast.error("Degree is required"), false;
      if (!formData.branch) return toast.error("Branch/Specialization is required"), false;
      if (!formData.currentYearSem) return toast.error("Current year/semester is required"), false;
      if (!formData.graduationYear) return toast.error("Graduation year is required"), false;
      if (!formData.cgpa) return toast.error("CGPA/Percentage is required"), false;
    }

    if (currentStep === 3) {
      if (formData.skills.length === 0) return toast.error("Add at least one technical skill"), false;
      if (formData.programmingLanguages.length === 0) return toast.error("Add at least one programming language"), false;
      if (formData.projects.length < 10) return toast.error("Please describe your projects in at least 10 characters"), false;
    }

    if (currentStep === 4) {
      if (!formData.domain) return toast.error("Please select a domain track"), false;
      if (!formData.availableHours || formData.availableHours < 10) {
        return toast.error("Minimum weekly hours commitment is 10 hours"), false;
      }
      if (formData.whyJoin.length < 20) {
        return toast.error("Please explain why you want to join in at least 20 characters"), false;
      }
    }

    if (currentStep === 5) {
      if (!formData.resumeUrl) return toast.error("Resume PDF is required"), false;
      if (!formData.photoUrl) return toast.error("Profile photo is required"), false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Final submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      toast.error("You must accept the terms and conditions to proceed");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/internship/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to submit application");
      }

      const data = await res.json();
      toast.success("Application submitted successfully!");
      // Redirect to dashboard application list
      router.push(`/dashboard?success=true&appId=${data.applicationId}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "An unexpected error occurred during submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071826] text-slate-100 pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Apply for Internship</h1>
          <p className="text-xs text-slate-400 mt-1">Complete all 6 steps to submit your application details.</p>
        </div>

        {/* Stepper Progress Indicator */}
        <div className="grid grid-cols-6 gap-2 mb-8 select-none">
          {steps.map((s) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.num;
            const isActive = currentStep === s.num;

            return (
              <div key={s.num} className="text-center flex flex-col items-center">
                <div
                  className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 border
                    ${isCompleted
                      ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                      : isActive
                        ? "bg-[#F97316]/20 border-[#F97316] text-[#F97316] ring-2 ring-[#F97316]/30"
                        : "bg-[#0F2233] border-slate-800 text-slate-400"}`}
                >
                  <Icon className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <span
                  className={`text-[9px] md:text-[10px] mt-1.5 font-medium hidden sm:inline-block
                    ${isActive ? "text-[#F97316]" : isCompleted ? "text-emerald-400" : "text-slate-400"}`}
                >
                  {s.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form Box */}
        <div className="bg-[#0F2233] border border-[#1E3A4C] rounded-2xl p-6 md:p-8 shadow-2xl relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
            >
              {/* STEP 1: PERSONAL INFORMATION */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Step 1: Personal Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label id="lbl-fullname" className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                      <input
                        id="input-fullname"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none"
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
                        className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none"
                        placeholder="johndoe@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label id="lbl-mobile" className="block text-xs font-semibold text-slate-300 mb-1.5">Mobile Number</label>
                      <input
                        id="input-mobile"
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none"
                        placeholder="e.g. 9876543210"
                        required
                      />
                    </div>
                    <div>
                      <label id="lbl-gender" className="block text-xs font-semibold text-slate-300 mb-1.5">Gender</label>
                      <select
                        id="input-gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full h-10 px-3 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label id="lbl-dob" className="block text-xs font-semibold text-slate-300 mb-1.5">Date of Birth</label>
                      <input
                        id="input-dob"
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label id="lbl-pincode" className="block text-xs font-semibold text-slate-300 mb-1.5">Pincode</label>
                      <input
                        id="input-pincode"
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none"
                        placeholder="e.g. 248001"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label id="lbl-address" className="block text-xs font-semibold text-slate-300 mb-1.5">Full Address</label>
                    <textarea
                      id="input-address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-3 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none resize-none"
                      placeholder="Street name, landmark..."
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label id="lbl-city" className="block text-xs font-semibold text-slate-300 mb-1.5">City</label>
                      <input
                        id="input-city"
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none"
                        placeholder="Dehradun"
                        required
                      />
                    </div>
                    <div>
                      <label id="lbl-state" className="block text-xs font-semibold text-slate-300 mb-1.5">State</label>
                      <input
                        id="input-state"
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none"
                        placeholder="Uttarakhand"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: EDUCATIONAL INFORMATION */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Step 2: Educational Information</h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label id="lbl-college" className="block text-xs font-semibold text-slate-300 mb-1.5">College Name</label>
                      <input
                        id="input-college"
                        type="text"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleChange}
                        className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none"
                        placeholder="College/Institute Name"
                        required
                      />
                    </div>
                    <div>
                      <label id="lbl-university" className="block text-xs font-semibold text-slate-300 mb-1.5">University</label>
                      <input
                        id="input-university"
                        type="text"
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                        className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none"
                        placeholder="Affiliated University"
                        required
                      />
                    </div>
                    <div>
                      <label id="lbl-degree" className="block text-xs font-semibold text-slate-300 mb-1.5">Degree</label>
                      <input
                        id="input-degree"
                        type="text"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none"
                        placeholder="e.g. B.Tech, BCA, MCA"
                        required
                      />
                    </div>
                    <div>
                      <label id="lbl-branch" className="block text-xs font-semibold text-slate-300 mb-1.5">Branch/Specialization</label>
                      <input
                        id="input-branch"
                        type="text"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none"
                        placeholder="e.g. Computer Science"
                        required
                      />
                    </div>
                    <div>
                      <label id="lbl-yearsem" className="block text-xs font-semibold text-slate-300 mb-1.5">Current Year / Semester</label>
                      <input
                        id="input-yearsem"
                        type="text"
                        name="currentYearSem"
                        value={formData.currentYearSem}
                        onChange={handleChange}
                        className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none"
                        placeholder="e.g. 3rd Year / 6th Sem"
                        required
                      />
                    </div>
                    <div>
                      <label id="lbl-gradyear" className="block text-xs font-semibold text-slate-300 mb-1.5">Graduation Year</label>
                      <input
                        id="input-gradyear"
                        type="number"
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleChange}
                        className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label id="lbl-cgpa" className="block text-xs font-semibold text-slate-300 mb-1.5">CGPA / Percentage</label>
                      <input
                        id="input-cgpa"
                        type="text"
                        name="cgpa"
                        value={formData.cgpa}
                        onChange={handleChange}
                        className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] outline-none"
                        placeholder="e.g. 8.5 CGPA or 85%"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: TECHNICAL SKILLS */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Step 3: Technical Skills & Profiles</h2>

                  {/* Skills input list */}
                  <div>
                    <label id="lbl-skills" className="block text-xs font-semibold text-slate-300 mb-1.5">Skills / Technologies</label>
                    <div className="flex gap-2">
                      <input
                        id="input-skill-add"
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                        className="flex-1 h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] outline-none"
                        placeholder="e.g. React, Docker, UI Design (Press Enter or Add)"
                      />
                      <button
                        type="button"
                        onClick={addSkill}
                        className="px-4 bg-[#F97316] hover:bg-[#EA6B0C] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                    {/* Tags display */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.skills.map((s, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 rounded-full text-xs text-white border border-slate-700">
                          {s}
                          <button type="button" onClick={() => removeSkill(i)} className="text-red-400 hover:text-red-500 focus:outline-none">&times;</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Languages input list */}
                  <div>
                    <label id="lbl-proglang" className="block text-xs font-semibold text-slate-300 mb-1.5">Programming Languages</label>
                    <div className="flex gap-2">
                      <input
                        id="input-lang-add"
                        type="text"
                        value={langInput}
                        onChange={(e) => setLangInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLang())}
                        className="flex-1 h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] outline-none"
                        placeholder="e.g. JavaScript, Python, C++ (Press Enter or Add)"
                      />
                      <button
                        type="button"
                        onClick={addLang}
                        className="px-4 bg-[#F97316] hover:bg-[#EA6B0C] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.programmingLanguages.map((l, i) => (
                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 rounded-full text-xs text-white border border-slate-700">
                          {l}
                          <button type="button" onClick={() => removeLang(i)} className="text-red-400 hover:text-red-500 focus:outline-none">&times;</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Projects Description */}
                  <div>
                    <label id="lbl-projects" className="block text-xs font-semibold text-slate-300 mb-1.5">Key Projects</label>
                    <textarea
                      id="input-projects"
                      name="projects"
                      value={formData.projects}
                      onChange={handleChange}
                      rows={4}
                      className="w-full p-3 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] outline-none resize-none"
                      placeholder="Briefly describe 1-2 major projects you have worked on. Mention tech stack used."
                      required
                    />
                  </div>

                  {/* Profile URLs */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label id="lbl-portfolio" className="block text-xs font-semibold text-slate-300 mb-1.5">Portfolio URL (Optional)</label>
                      <input
                        id="input-portfolio"
                        type="url"
                        name="portfolioUrl"
                        value={formData.portfolioUrl}
                        onChange={handleChange}
                        className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] outline-none"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label id="lbl-github" className="block text-xs font-semibold text-slate-300 mb-1.5">GitHub URL (Optional)</label>
                      <input
                        id="input-github"
                        type="url"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] outline-none"
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div>
                      <label id="lbl-linkedin" className="block text-xs font-semibold text-slate-300 mb-1.5">LinkedIn URL (Optional)</label>
                      <input
                        id="input-linkedin"
                        type="url"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] outline-none"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: INTERNSHIP PREFERENCES */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Step 4: Internship Preferences</h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label id="lbl-prefdomain" className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Domain</label>
                      <select
                        id="input-prefdomain"
                        name="domain"
                        value={formData.domain}
                        onChange={handleChange}
                        className="w-full h-10 px-3 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] outline-none"
                        required
                      >
                        <option value="">Select Domain Track</option>
                        {domains.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label id="lbl-hours" className="block text-xs font-semibold text-slate-300 mb-1.5">Available Hours / Week</label>
                      <input
                        id="input-hours"
                        type="number"
                        name="availableHours"
                        value={formData.availableHours}
                        onChange={handleChange}
                        min={10}
                        max={60}
                        className="w-full h-10 px-3.5 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label id="lbl-whyjoin" className="block text-xs font-semibold text-slate-300 mb-1.5">Why do you want to join NextGen Devbhoomi Foundation?</label>
                    <textarea
                      id="input-whyjoin"
                      name="whyJoin"
                      value={formData.whyJoin}
                      onChange={handleChange}
                      rows={5}
                      className="w-full p-3 bg-slate-950 border border-[#1E3A4C] rounded-lg text-sm text-white focus:border-[#F97316] outline-none resize-none"
                      placeholder="Describe your motivations, aspirations, and what you hope to achieve during the internship program."
                      required
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: DOCUMENT UPLOADS */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Step 5: Document Uploads</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Resume Upload */}
                    <div className="p-5 border border-dashed border-[#1E3A4C] rounded-xl bg-slate-950/40 text-center flex flex-col items-center justify-between">
                      <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 mb-3">
                        <Upload className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm font-semibold text-white">Resume (PDF)</h3>
                      <p className="text-[10px] text-slate-400 mt-1 max-w-[200px]">Upload your professional resume in PDF format (Max 10MB).</p>
                      
                      {formData.resumeUrl ? (
                        <div className="mt-4 w-full flex items-center justify-between px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs">
                          <span className="text-emerald-400 font-semibold truncate max-w-[150px]">ResumeUploaded.pdf</span>
                          <button type="button" onClick={() => removeFile("resumeUrl")} className="text-red-400 hover:text-red-500 cursor-pointer">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="mt-4 px-4 py-2 bg-[#1E3A4C] hover:bg-[#254960] text-xs font-bold text-white rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5">
                          {uploadingField === "resumeUrl" ? (
                            <>
                              <Loader2 className="h-3 w-3 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            "Choose PDF"
                          )}
                          <input
                            id="input-resume"
                            type="file"
                            accept="application/pdf"
                            className="hidden"
                            disabled={uploadingField !== null}
                            onChange={(e) => handleFileUpload(e, "resumeUrl")}
                          />
                        </label>
                      )}
                    </div>

                    {/* Profile Photo Upload */}
                    <div className="p-5 border border-dashed border-[#1E3A4C] rounded-xl bg-slate-950/40 text-center flex flex-col items-center justify-between">
                      <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 mb-3">
                        <Upload className="h-5 w-5" />
                      </div>
                      <h3 className="text-sm font-semibold text-white">Profile Photo</h3>
                      <p className="text-[10px] text-slate-400 mt-1 max-w-[200px]">Upload a professional passport size photo (JPG/PNG, Max 10MB).</p>
                      
                      {formData.photoUrl ? (
                        <div className="mt-4 w-full flex items-center justify-between px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs">
                          <span className="text-emerald-400 font-semibold truncate max-w-[150px]">PhotoUploaded.jpg</span>
                          <button type="button" onClick={() => removeFile("photoUrl")} className="text-red-400 hover:text-red-500 cursor-pointer">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="mt-4 px-4 py-2 bg-[#1E3A4C] hover:bg-[#254960] text-xs font-bold text-white rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5">
                          {uploadingField === "photoUrl" ? (
                            <>
                              <Loader2 className="h-3 w-3 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            "Choose Photo"
                          )}
                          <input
                            id="input-photo"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={uploadingField !== null}
                            onChange={(e) => handleFileUpload(e, "photoUrl")}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* College ID Upload */}
                  <div className="p-5 border border-dashed border-[#1E3A4C] rounded-xl bg-slate-950/40 max-w-md mx-auto text-center flex flex-col items-center justify-between">
                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 mb-3">
                      <Upload className="h-5 w-5" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">College ID (Optional)</h3>
                    <p className="text-[10px] text-slate-400 mt-1 max-w-[250px]">Upload front/back view photo of your college identity card.</p>
                    
                    {formData.collegeIdUrl ? (
                      <div className="mt-4 w-full flex items-center justify-between px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs">
                        <span className="text-emerald-400 font-semibold truncate max-w-[200px]">CollegeID.jpg</span>
                        <button type="button" onClick={() => removeFile("collegeIdUrl")} className="text-red-400 hover:text-red-500 cursor-pointer">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="mt-4 px-4 py-2 bg-[#1E3A4C] hover:bg-[#254960] text-xs font-bold text-white rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5">
                        {uploadingField === "collegeIdUrl" ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          "Choose ID Card Image"
                        )}
                        <input
                          id="input-collegeid"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploadingField !== null}
                          onChange={(e) => handleFileUpload(e, "collegeIdUrl")}
                        />
                      </label>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 6: DECLARATION & SUBMISSION */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">Step 6: Declaration</h2>

                  <div className="p-5 bg-slate-950/50 rounded-xl border border-[#1E3A4C] space-y-4">
                    <h3 className="text-sm font-bold text-white">Terms & Conditions</h3>
                    <div className="text-[11px] text-slate-400 leading-relaxed space-y-2 max-h-40 overflow-y-auto pr-2">
                      <p>1. I hereby declare that all the information provided in this application is true, complete and correct to the best of my knowledge.</p>
                      <p>2. I understand that misrepresentation or omission of facts may lead to rejection of my application or termination of my internship.</p>
                      <p>3. If selected, I agree to comply with the rules, timelines, guidelines and standards set by the NextGen Devbhoomi Foundation.</p>
                      <p>4. I will complete all project assignments and technical tasks with dedication, integrity, and active communication.</p>
                      <p>5. I consent to receiving email notifications regarding application progress, status updates, generated credentials, and newsletters.</p>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 mt-4 cursor-pointer select-none">
                    <input
                      id="input-terms"
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 accent-[#F97316] rounded border-[#1E3A4C]"
                      required
                    />
                    <span className="text-xs text-slate-300 leading-normal">
                      I have read, understood and accept all the terms and conditions listed in the declaration form above.
                    </span>
                  </label>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Stepper Buttons */}
          <div className="flex justify-between items-center mt-10 border-t border-slate-800 pt-6">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1 px-4 py-2 border border-[#1E3A4C] rounded-lg text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
            ) : (
              <div />
            )}

            {currentStep < 6 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1 px-5 py-2.5 bg-[#F97316] hover:bg-[#EA6B0C] rounded-lg text-xs font-bold text-white transition-colors cursor-pointer"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.termsAccepted}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-800 disabled:text-slate-500 rounded-lg text-xs font-bold text-white transition-all duration-200 cursor-pointer shadow-lg shadow-emerald-950/20"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Submit Application
                    <CheckCircle2 className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
