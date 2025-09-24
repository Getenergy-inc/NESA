"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { X, CheckCircle, AlertCircle } from "lucide-react";

const PartnersPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    brandName: "",
    brandLink: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!formData.brandName.trim()) {
      setError("Brand name is required");
      return;
    }
    if (!formData.brandLink.trim()) {
      setError("Brand link is required");
      return;
    }
    if (!validateUrl(formData.brandLink)) {
      setError("Please enter a valid URL");
      return;
    }

    // Success
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsFormOpen(false);
      setFormData({ name: "", email: "", brandName: "", brandLink: "" });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="min-h-screen relative">
        <Image
          src="/images/partnerhero.jpg"
          alt="Partnership background"
          width={1920}
          height={1080}
          className="w-full h-full object-cover absolute top-0 left-0"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white max-w-4xl">
            <h1 className="font-bold text-5xl md:text-6xl mb-6 text-deepGold">
              Partner With Us
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Join forces with industry leaders and unlock unprecedented growth
              opportunities
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-deepGold hover:bg-darkGold text-black font-bold px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105"
            >
              Become a Partner
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Partnership Benefits
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-deepGold rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-black">01</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Expanded Reach
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Access our extensive network and reach new markets with proven
                strategies and established relationships.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-deepGold rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-black">02</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Shared Resources
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Leverage our technology, expertise, and infrastructure to
                accelerate your business growth and innovation.
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-deepGold rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-black">03</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Revenue Growth
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Unlock new revenue streams through collaborative opportunities
                and strategic market positioning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Partnership Process
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Application",
                  desc: "Submit your partnership application with business details",
                },
                {
                  step: "02",
                  title: "Review",
                  desc: "Our team evaluates your application and business alignment",
                },
                {
                  step: "03",
                  title: "Discussion",
                  desc: "Schedule a meeting to discuss partnership opportunities",
                },
                {
                  step: "04",
                  title: "Launch",
                  desc: "Finalize agreements and launch your partnership journey",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-deepGold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-black">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-darkGold/30 transform translate-x-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Take the first step towards a successful partnership. Fill out our
            application form and let's build something amazing together.
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-deepGold hover:bg-darkGold text-black font-bold px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105"
          >
            Partner with us
          </button>
          +
        </div>
      </section>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Partnership Application
            </h3>

            {isSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-green-600 mb-2">
                  Success!
                </h4>
                <p className="text-gray-600">
                  Your application has been submitted successfully. We'll be in
                  touch soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600">
                    <AlertCircle size={16} />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGold focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGold focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="brandName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Brand Name *
                  </label>
                  <input
                    id="brandName"
                    type="text"
                    value={formData.brandName}
                    onChange={(e) =>
                      handleInputChange("brandName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGold focus:border-transparent"
                    placeholder="Enter your brand name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="brandLink"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Brand Website *
                  </label>
                  <input
                    id="brandLink"
                    type="url"
                    value={formData.brandLink}
                    onChange={(e) =>
                      handleInputChange("brandLink", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-deepGold focus:border-transparent"
                    placeholder="https://yourbrand.com"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-deepGold hover:bg-darkGold text-black font-bold py-3 rounded-xl transition-colors"
                >
                  Partner
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PartnersPage;
