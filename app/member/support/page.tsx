"use client";

import { HelpCircle, Mail, MessageSquare, Phone, Zap, Clock, ChevronRight } from "lucide-react";
import { useState } from "react";

const SupportPage = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "general", name: "General Questions" },
    { id: "account", name: "Account Help" },
    { id: "payments", name: "Payments & Billing" },
    { id: "technical", name: "Technical Issues" },
    { id: "safety", name: "Safety & Privacy" }
  ];

  const faqs = [
    {
      id: 1,
      question: "How do I reset my password?",
      answer: "You can reset your password by going to the login page and clicking 'Forgot Password'. You'll receive an email with instructions to create a new password.",
      category: "account"
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for certain regions.",
      category: "payments"
    },
    {
      id: 3,
      question: "How do I update my account information?",
      answer: "Navigate to your Account Settings page where you can edit your personal information, email address, and other account details.",
      category: "account"
    },
    {
      id: 4,
      question: "Why is my account temporarily suspended?",
      answer: "Accounts may be suspended due to suspicious activity or violation of our terms. Contact our support team for specific details about your account.",
      category: "safety"
    },
    {
      id: 5,
      question: "How do I contact customer support?",
      answer: "You can reach us through the contact form on this page, via email at support@nesa.org, or by phone at +234 800 123 4567 during business hours.",
      category: "general"
    },
    {
      id: 6,
      question: "What are your business hours?",
      answer: "Our customer support team is available Monday to Friday from 9:00 AM to 6:00 PM WAT. Emails are typically answered within 24 hours.",
      category: "general"
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    (activeCategory === "all" || faq.category === activeCategory) &&
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-yellow-100 text-yellow-800 rounded-full px-6 py-2 mb-4">
            <HelpCircle className="w-5 h-5 mr-2" />
            <span className="font-medium">We're here to help</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">How can we help you today?</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to your questions or contact our support team directly
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 max-w-3xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full p-4 pl-12 pr-6 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`p-4 rounded-xl border transition-all ${
                  activeCategory === category.id
                    ? "bg-yellow-500 border-yellow-500 text-white shadow-md"
                    : "bg-white border-gray-200 hover:border-yellow-300 hover:shadow-sm"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 rounded-full mb-3 ${
                    activeCategory === category.id ? "bg-yellow-400" : "bg-yellow-100"
                  }`}>
                    <HelpCircle className={`w-6 h-6 ${
                      activeCategory === category.id ? "text-white" : "text-yellow-600"
                    }`} />
                  </div>
                  <span className="font-medium">{category.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Frequently asked questions</h2>
            <button 
              onClick={() => setActiveCategory("all")}
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              View all questions
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div key={faq.id} className="border-b border-gray-200 last:border-b-0">
                  <details className="group">
                    <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                      <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                      <ChevronRight className="w-5 h-5 text-gray-400 transform group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-6 pb-6 -mt-2 text-gray-600">
                      {faq.answer}
                    </div>
                  </details>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="mx-auto w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500 mb-4">
                  <HelpCircle className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  We couldn't find any articles matching your search. Try different keywords or contact our support team.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12 text-center text-white">
            <div className="inline-flex items-center justify-center bg-white/20 rounded-full px-6 py-2 mb-4">
              <Zap className="w-5 h-5 mr-2" />
              <span className="font-medium">Need more help?</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Contact our support team</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Our dedicated support team is ready to assist you with any questions or issues you may have.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="bg-white/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Email Us</h3>
                <p className="opacity-90 mb-3">We typically reply within 24 hours</p>
                <a href="mailto:support@nesa.org" className="inline-block bg-white text-yellow-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
                  support@nesa.org
                </a>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="bg-white/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Live Chat</h3>
                <p className="opacity-90 mb-3">Chat with a support agent now</p>
                <button className="inline-block bg-white text-yellow-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
                  Start Chat
                </button>
              </div>
              
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="bg-white/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">Call Us</h3>
                <p className="opacity-90 mb-3">Mon-Fri, 9AM-6PM WAT</p>
                <a href="tel:+2348001234567" className="inline-block bg-white text-yellow-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
                  +234 800 123 4567
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Helpful resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4 text-yellow-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg">Documentation</h3>
              </div>
              <p className="text-gray-600 mb-4">Browse our comprehensive documentation and user guides.</p>
              <a href="#" className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center">
                View documentation <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4 text-yellow-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg">Video Tutorials</h3>
              </div>
              <p className="text-gray-600 mb-4">Watch step-by-step video guides for common tasks.</p>
              <a href="#" className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center">
                Watch tutorials <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
              <div className="flex items-center mb-4">
                <div className="bg-yellow-100 p-3 rounded-lg mr-4 text-yellow-600">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg">Status Page</h3>
              </div>
              <p className="text-gray-600 mb-4">Check our system status and scheduled maintenance.</p>
              <a href="#" className="text-yellow-600 hover:text-yellow-700 font-medium flex items-center">
                View status <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;