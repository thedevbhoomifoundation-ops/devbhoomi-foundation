export type Language = "en" | "hi";

export interface TranslationDict {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: TranslationDict = {
  // Navigation
  "nav.home": { en: "Home", hi: "मुख्य पृष्ठ" },
  "nav.about": { en: "About Us", hi: "हमारे बारे में" },
  "nav.programs": { en: "Programs", hi: "कार्यक्रम" },
  "nav.allPrograms": { en: "All Programs", hi: "सभी कार्यक्रम" },
  "nav.education": { en: "Education", hi: "शिक्षा" },
  "nav.communityDev": { en: "Community Development", hi: "सामुदायिक विकास" },
  "nav.techTraining": { en: "Technology Training", hi: "तकनीकी प्रशिक्षण" },
  "nav.getInvolved": { en: "Get Involved", hi: "जुड़ें" },
  "nav.volunteer": { en: "Volunteer", hi: "स्वयंसेवक बनें" },
  "nav.donate": { en: "Donate", hi: "दान करें" },
  "nav.becomeVolunteer": { en: "Become a Volunteer", hi: "स्वयंसेवक बनें" },
  "nav.partnerWithUs": { en: "Partner With Us", hi: "हमारे साथ भागीदार बनें" },
  "nav.fundraise": { en: "Fundraise", hi: "धन जुटाएं" },
  "nav.events": { en: "Events", hi: "कार्यक्रम" },
  "nav.courses": { en: "Courses", hi: "कोर्स" },
  "nav.allCourses": { en: "All Courses", hi: "सभी कोर्स" },
  "nav.digitalLibrary": { en: "Digital Library", hi: "डिजिटल लाइब्रेरी" },
  "nav.interviewPrep": { en: "Interview Prep", hi: "साक्षात्कार की तैयारी" },
  "nav.dsaSolver": { en: "DSA Problem Solver", hi: "डीएसए प्रॉब्लम सॉल्वर" },
  "nav.blogs": { en: "Blogs", hi: "ब्लॉग" },
  "nav.contact": { en: "Contact Us", hi: "संपर्क करें" },
  "nav.loginRegister": { en: "Login / Register", hi: "लॉगिन / पंजीकरण" },
  "nav.dashboard": { en: "Dashboard", hi: "डैशबोर्ड" },
  "nav.more": { en: "More", hi: "अधिक" },
  "nav.close": { en: "Close", hi: "बंद करें" },
  "nav.moreOptions": { en: "More Options", hi: "अन्य विकल्प" },
  "nav.back": { en: "Go back", hi: "पीछे जाएं" },

  // Branding & Headers
  "brand.title": { en: "Nextgen Devbhoomi Foundation", hi: "नेक्स्टजेन देवभूमि फाउंडेशन" },
  "brand.tagline": { en: "Building a Resilient Future", hi: "एक लचीला भविष्य बनाना" },
  "brand.description": {
    en: "Building a resilient future through education, empowerment and community development.",
    hi: "शिक्षा, सशक्तिकरण और सामुदायिक विकास के माध्यम से एक लचीला भविष्य बनाना।"
  },
  "brand.mobileSubtitle": {
    en: "Industry-Oriented IT Internship Program | 2026 – 2027",
    hi: "उद्योग-उन्मुख आईटी इंटर्नशिप कार्यक्रम | 2026 – 2027"
  },
  "brand.goldenBar": {
    en: "★ TRANSFORMING STUDENTS INTO INDUSTRY-READY PROFESSIONALS ★",
    hi: "★ छात्रों को उद्योग के लिए तैयार पेशेवरों में बदलना ★"
  },

  // Tickers
  "ticker.admissions": {
    en: "★ Admissions open for 2026-27 IT Internship Program - Apply Today! ★",
    hi: "★ 2026-27 आईटी इंटर्नशिप कार्यक्रम के लिए प्रवेश खुले हैं - आज ही आवेदन करें! ★"
  },
  "ticker.library": {
    en: "★ Free textbooks, notes, and reference guides available in our Digital Library! ★",
    hi: "★ हमारी डिजिटल लाइब्रेरी में मुफ्त पाठ्यपुस्तकें, नोट्स और संदर्भ मार्गदर्शिकाएँ उपलब्ध हैं! ★"
  },
  "ticker.volunteers": {
    en: "★ Join our community of 2000+ passionate volunteers and make an impact! ★",
    hi: "★ हमारे 2000+ उत्साही स्वयंसेवकों के समुदाय में शामिल हों और प्रभाव डालें! ★"
  },
  "ticker.taxBenefit": {
    en: "★ Support our mission: verified 80G NGO donations are tax-deductible! ★",
    hi: "★ हमारे मिशन का समर्थन करें: सत्यापित 80G एनजीओ दान कर-मुक्त हैं! ★"
  },

  // Footer Columns & Text
  "footer.quickLinks": { en: "Quick Links", hi: "त्वरित लिंक" },
  "footer.getInvolved": { en: "Get Involved", hi: "जुड़ें" },
  "footer.support": { en: "Support", hi: "सहायता" },
  "footer.contactUs": { en: "Contact Us", hi: "संपर्क करें" },
  "footer.rights": {
    en: "© 2026 Nextgen Devbhoomi Foundation. All Rights Reserved.",
    hi: "© 2026 नेक्स्टजेन देवभूमि फाउंडेशन। सर्वाधिकार सुरक्षित।"
  },
  "footer.designedWith": {
    en: "Designed with ❤️ for a better tomorrow",
    hi: "बेहतर कल के लिए ❤️ के साथ डिज़ाइन किया गया"
  },

  // Contact Details
  "contact.address": {
    en: "123, Dev Bhoomi Marg, Rishikesh, Uttarakhand, India",
    hi: "123, देव भूमि मार्ग, ऋषिकेश, उत्तराखंड, भारत"
  },
  "contact.hours": {
    en: "Mon - Sat: 9:00 AM - 6:00 PM",
    hi: "सोम - शनि: सुबह 9:00 बजे - शाम 6:00 बजे"
  },

  // Coming Soon Components
  "comingSoon.subtitle": { en: "Coming Soon", hi: "जल्द आ रहा है" },
  "comingSoon.notifyPlaceholder": { en: "Get notified: enter your email", hi: "सूचना प्राप्त करें: अपना ईमेल दर्ज करें" },
  "comingSoon.notifyButton": { en: "Notify Me", hi: "मुझे सूचित करें" },
  "comingSoon.submitting": { en: "Submitting...", hi: "जमा किया जा रहा है..." },
  "comingSoon.toastSuccess": {
    en: "Thank you! We'll notify you when this page launches.",
    hi: "धन्यवाद! इस पृष्ठ के लॉन्च होने पर हम आपको सूचित करेंगे।"
  },
  "comingSoon.backToHome": { en: "Back to Home", hi: "मुख्य पृष्ठ पर वापस" },
  "comingSoon.joinVolunteer": { en: "Join as a Volunteer", hi: "स्वयंसेवक के रूप में शामिल हों" }
};
