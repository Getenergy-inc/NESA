"use client";

import { useState } from "react";

export default function NominateAdvisorForm() {
  const [formData, setFormData] = useState({
    nominatorName: "",
    nominatorEmail: "",
    nomineeName: "",
    nomineeTitle: "",
    nomineeOrganization: "",
    nomineeRegion: "",
    nomineeEmail: "",
    category: "",
    reason: "",
    references: "",
    consent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nominate Advisor Submission:", formData);
    // TODO: connect to backend or email service
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-6 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white/95 backdrop-blur-md text-[#1a140b] rounded-2xl shadow-2xl p-10 space-y-8 border border-gray-200 w-full max-w-5xl"
      >
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-[#ea580c] to-[#f59e0b] bg-clip-text text-transparent">
          Nominate an Advisor
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Fill out this form to nominate a qualified candidate for the NESA-Africa Board of Advisors.
        </p>

        {/* Section 1 — Nominator */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#ea580c] border-b border-gray-200 pb-2">
            Your Details
          </h3>
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="nominatorName"
              value={formData.nominatorName}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="nominatorEmail"
              value={formData.nominatorEmail}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] transition"
              required
            />
          </div>
        </div>

        {/* Section 2 — Nominee */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#ea580c] border-b border-gray-200 pb-2">
            Nominee Details
          </h3>
          <input
            type="text"
            name="nomineeName"
            placeholder="Full Name"
            value={formData.nomineeName}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#ea580c] transition"
            required
          />
          <input
            type="text"
            name="nomineeTitle"
            placeholder="Title/Position"
            value={formData.nomineeTitle}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#ea580c] transition"
          />
          <input
            type="text"
            name="nomineeOrganization"
            placeholder="Organization"
            value={formData.nomineeOrganization}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#ea580c] transition"
          />
          <input
            type="text"
            name="nomineeRegion"
            placeholder="Country/Region"
            value={formData.nomineeRegion}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#ea580c] transition"
          />
          <input
            type="email"
            name="nomineeEmail"
            placeholder="Nominee Email"
            value={formData.nomineeEmail}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#ea580c] transition"
          />
        </div>

        {/* Section 3 — Category & Reason */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#ea580c] border-b border-gray-200 pb-2">
            Nomination Details
          </h3>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#ea580c] transition"
            required
          >
            <option value="">Select a category</option>
            <option>EdTech & Digital Learning</option>
            <option>STEM for Girls & Youth Skills</option>
            <option>Libraries, Reading & Open Knowledge</option>
            <option>Inclusive/Special Needs Education</option>
            <option>Sustainability & Climate-Smart Schools</option>
            <option>Media in Education & Literacy</option>
            <option>TVET, Employability & Entrepreneurship</option>
            <option>Regional Hub Representative</option>
            <option>Diaspora Council</option>
            <option>Youth & Teacher Advisory Forum</option>
            <option>Civil Society & Philanthropy</option>
            <option>Private Sector CSR/ESG</option>
            <option>Media & Creators Advisory</option>
          </select>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#ea580c] transition"
            placeholder="Why are you nominating this person?"
            required
          ></textarea>
          <textarea
            name="references"
            value={formData.references}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-[#ea580c] transition"
            placeholder="Provide 2 referees with names and emails..."
          ></textarea>
        </div>

        {/* Section 4 — Consent */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="w-5 h-5 text-[#ea580c] focus:ring-[#ea580c]"
            required
          />
          <label className="text-sm text-gray-600">
            I confirm that the nominee is aware of this nomination and consents
            to data use under the privacy policy.
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-80 py-4 rounded-lg bg-gradient-to-r from-[#ea580c] to-[#f59e0b] text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-[#f59e0b]/50 transition-all"
        >
          Submit Nomination
        </button>
      </form>
    </div>
  );
}
