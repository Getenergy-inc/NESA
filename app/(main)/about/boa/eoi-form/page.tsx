
"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useState } from "react";

type FormValues = {
  fullName: string;
  title: string;
  email: string;      
  phone: string;
  organization: string;
  country: string;
  category: string;
  bio: string;
  cv: FileList;
  image: FileList;
  references: string;
  coi: string;
  consent: boolean;
};

export default function AdvisorEOIForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onSubmit = (data: FormValues) => {
    
    alert("✅ Expression of Interest submitted!");
  };

  return (
    
    
    <section
      className="relative bg-[#ffffff] text-white py-20 px-6"
      style={{
        backgroundImage: "url('/images/advisors-bg.jpg')", // replace with your image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm"></div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#ea580c] to-[#f59e0b] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            Advisor Expression of Interest (EOI) Form
          </h2>
          <p className="text-gray-800 mt-3">
            Submit your details to join the{" "}
            <span className="text-[#f59e0b]">NESA-Africa 2025–2027 Advisory Board</span>.
          </p>
        </motion.div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 bg-white border border-[#f59e0b]/30 rounded-2xl shadow-[0_0_25px_rgba(245,158,11,0.3)] p-8 backdrop-blur-md"
        >
          {/* Full Name */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">Full Name</label>
            <input
              {...register("fullName", { required: true })}
              className="w-full p-3 rounded-lg bg-[#ffffff]/70 text-gray-800 border border-[#f59e0b]/40 focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent outline-none transition"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <span className="text-red-400 text-sm">Full name is required</span>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">Title / Position</label>
            <input
              {...register("title", { required: true })}
              className="w-full p-3 rounded-lg bg-[#ffffff]/70 text-gray-800 border border-[#f59e0b]/40 focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent outline-none transition"
              placeholder="e.g., Professor, Director, CEO"
            />
          </div>

                    {/* Email */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">Email Address</label>
            <input
              type="email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              className="w-full p-3 rounded-lg bg-[#ffffff]/70 text-gray-800 border border-[#f59e0b]/40 
              focus:ring-2 focus:ring-[#f59e0b] outline-none transition"
              placeholder="yourname@example.com"
            />
            {errors.email && <span className="text-red-400 text-sm">Valid email is required</span>}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">Phone Number (WhatsApp)</label>
            <input
              type="tel"
              {...register("phone", { required: true })}
              className="w-full p-3 rounded-lg bg-[#ffffff]/70 text-gray-800 border border-[#f59e0b]/40 
              focus:ring-2 focus:ring-[#f59e0b] outline-none transition"
              placeholder="+234 801 234 5678"
            />
            {errors.phone && <span className="text-red-400 text-sm">Phone number is required</span>}
          </div>

          {/* Organization */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">Organization</label>
            <input
              {...register("organization", { required: true })}
              className="w-full p-3 rounded-lg bg-[#ffffff]/70 text-gray-800 border border-[#f59e0b]/40 focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent outline-none transition"
              placeholder="Your institution or company"
            />
          </div>

          {/* Country/Region */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">Country / Region</label>
            <input
              {...register("country", { required: true })}
              className="w-full p-3 rounded-lg bg-[#ffffff]/70 text-gray-800 border border-[#f59e0b]/40 focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent outline-none transition"
              placeholder="Nigeria, East Africa, Diaspora - UK/Europe, etc."
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">Category Applying For</label>
            <select
              {...register("category", { required: true })}
              className="w-full p-3 rounded-lg bg-[#ffffff]/70 text-gray-800 border border-[#f59e0b]/40 focus:ring-2 focus:ring-[#f59e0b] outline-none"
            >
              <option value="">Select a category</option>
              <option value="Governance">Honorary Advisory & Governance Council</option>
              <option value="Methodology">Technical & Methodology Panel</option>
              <option value="Knowledge">Knowledge & Development Partners</option>
              <option value="EdTech">EdTech & Digital Learning</option>
              <option value="STEM">STEM for Girls & Youth Skills</option>
              <option value="Libraries">Libraries & Open Knowledge</option>
              <option value="Inclusion">Inclusive/Special Needs Education</option>
              <option value="Climate">Sustainability & Climate-Smart Schools</option>
              <option value="Media">Media in Education & Literacy</option>
              <option value="TVET">TVET, Employability & Entrepreneurship</option>
              <option value="Regional">Regional Hubs</option>
              <option value="Diaspora">Diaspora Council</option>
              <option value="Youth">Youth & Teacher Advisory Forum</option>
              <option value="CivilSociety">Civil Society & Philanthropy</option>
              <option value="PrivateSector">Private Sector CSR/ESG</option>
              <option value="Creators">Media & Creators Advisory</option>
            </select>
          </div>

          {/* Bio */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">150-word Bio</label>
            <textarea
              {...register("bio", { required: true })}
              rows={4}
              className="w-full p-3 rounded-lg bg-[#ffffff]/70 text-gray-800 border border-[#f59e0b]/40 focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent outline-none transition"
              placeholder="Write a short bio (max 150 words)"
            ></textarea>
          </div>

          {/* CV Upload */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">Upload CV (PDF or LinkedIn)</label>
            <input
              type="file"
              {...register("cv", { required: true })}
              className="block w-full text-sm text-gray-800 border border-[#f59e0b]/40 rounded-lg cursor-pointer focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-[#ea580c] file:to-[#f59e0b] file:text-[#1a140b] hover:file:opacity-90 transition"
            />
          </div>
          {/* Profile Image Upload with Preview */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">Upload Profile Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setPreviewImage(URL.createObjectURL(e.target.files[0]));
                }
              }}
              className="block w-full text-sm text-gray-800 border border-[#f59e0b]/40 rounded-lg cursor-pointer focus:outline-none 
                file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 
                file:text-sm file:font-semibold 
                file:bg-gradient-to-r file:from-[#ea580c] file:to-[#f59e0b] 
                file:text-[#1a140b] hover:file:opacity-90 transition"
            />
            {errors.image && (
              <span className="text-red-400 text-sm">Profile image is required</span>
            )}

            {/* Preview */}
            {previewImage && (
              <div className="mt-4 flex justify-center">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-full border-4 border-[#f59e0b] shadow-lg"
                />
              </div>
            )}
          </div>


          {/* References */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">References</label>
            <input
              {...register("references", { required: true })}
              className="w-full p-3 rounded-lg bg-[#ffffff]/70 text-gray-800 border border-[#f59e0b]/40 focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent outline-none transition"
              placeholder="Provide two referees (names & emails)"
            />
          </div>

          {/* COI */}
          <div>
            <label className="block mb-2 font-semibold text-gray-800">Conflict of Interest Declaration</label>
            <textarea
              {...register("coi")}
              rows={3}
              className="w-full p-3 rounded-lg bg-[#ffffff]/70 text-gray-800 border border-[#f59e0b]/40 focus:ring-2 focus:ring-[#f59e0b] focus:border-transparent outline-none transition"
              placeholder="List affiliations, grants, or contracts to declare"
            ></textarea>
          </div>

          {/* Consent */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("consent", { required: true })}
              className="w-4 h-4 text-[#f59e0b] border-gray-300 rounded focus:ring-[#f59e0b]"
            />
            <span className="text-sm text-gray-800">
              I consent to the{" "}
              <a href="/privacy" className="text-[#f59e0b] underline">
                privacy & communications policy
              </a>
              .
            </span>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(245,158,11,0.7)" }}
            whileTap={{ scale: 0.95 }}
            className="w-50 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#ea580c] to-[#f59e0b] font-semibold text-[#1a140b] shadow-[0_0_15px_rgba(245,158,11,0.4)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition"
          >
            <Send className="w-4 h-4" />
            Submit Expression of Interest
          </motion.button>
        </form>
      </div>
    </section>
  );
}
