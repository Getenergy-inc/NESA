"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import {
  Cookie,
  ShieldCheck,
  Globe,
  Mail,
  X,
  Check,
  ChevronRight,
} from "lucide-react";

export default function CookiesPolicyPage(): JSX.Element {
  const lastUpdated = "October 2, 2025";
  const [consent, setConsent] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [prefs, setPrefs] = useState({
    essential: true,
    analytics: false,
    ads: false,
  });

  useEffect(() => {
    // Clear localStorage only on client side
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    
    const stored = localStorage.getItem("nesa_cookie_consent");
    if (stored) {
      setConsent(stored);
      setShowBanner(false);
    } else {
      // banner delay to avoid jarring first paint
      const t = setTimeout(() => setShowBanner(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const storedPrefs = localStorage.getItem("nesa_cookie_prefs");
    if (storedPrefs) setPrefs(JSON.parse(storedPrefs));
  }, []);

  const acceptAll = () => {
    localStorage.setItem("nesa_cookie_consent", "all");
    localStorage.setItem(
      "nesa_cookie_prefs",
      JSON.stringify({ essential: true, analytics: true, ads: true })
    );
    setConsent("all");
    setPrefs({ essential: true, analytics: true, ads: true });
    setShowBanner(false);
  };

  const savePreferences = () => {
    localStorage.setItem("nesa_cookie_consent", "custom");
    localStorage.setItem("nesa_cookie_prefs", JSON.stringify(prefs));
    setConsent("custom");
    setShowBanner(false);
  };

  const rejectAds = () => {
    localStorage.setItem("nesa_cookie_consent", "essential");
    localStorage.setItem(
      "nesa_cookie_prefs",
      JSON.stringify({ essential: true, analytics: false, ads: false })
    );
    setConsent("essential");
    setPrefs({ essential: true, analytics: false, ads: false });
    setShowBanner(false);
  };

  const togglePref = (k: "analytics" | "ads") => {
    const next = { ...prefs, [k]: !prefs[k] };
    setPrefs(next);
  };

  return (
    <>
      {/* Floating Consent Banner */}
      <AnimatePresence>
        {showBanner && !consent && (
          <div className="w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="fixed bottom-6 transform -translate-x-1/2 z-50 w-full md:w-[820px] lg:w-[900px]"
            >
              <div className="backdrop-blur-md bg-white/90 border border-gray-200 rounded-2xl shadow-2xl p-5 flex flex-col md:flex-row gap-4 items-center">
                <div className="flex items-center gap-4 flex-1">
                  <div className="p-3 rounded-full bg-gradient-to-br from-[#FFC247]/20 to-[#E48900]/20">
                    <Cookie className="w-6 h-6 text-[#E48900]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      We use cookies
                    </h4>
                    <p className="text-sm text-gray-700">
                      To improve your experience and measure how you use the
                      site. Manage preferences or accept all.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={rejectAds}
                    className="px-4 py-2 rounded-full border border-gray-200 text-sm font-semibold hover:bg-gray-50"
                  >
                    Reject non-essential
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] font-semibold shadow"
                  >
                    Accept all
                  </button>
                  <button
                    onClick={() => setShowBanner(false)}
                    aria-label="close"
                    className="ml-2 p-2 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <header className="relative inset-0 min-h-[50vh] w-full text-white overflow-hidden">
        <Image
          src="/images/bg/timeline.png"
          alt="Cookies Hero"
          fill
          className="object-cover z-0"
          quality={100}
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#191307]/85 via-[#2a1f0a]/60 to-[#33270E]/70 z-10"></div>

        <div className="relative z-30 container mx-auto px-4 py-20">
          <motion.div
            variants={parentV}
            initial="initial"
            animate="animate"
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div variants={toTopV} className="space-y-4">
              <div className="inline-flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-gradient-to-br from-[#FFC247]/20 to-[#E48900]/20 rounded-full border border-[#FFC247]/30">
                  <Cookie className="w-9 h-9 text-[#FFC247]" />
                </div>
                <div className="text-left">
                  <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] bg-clip-text text-transparent">
                    Cookies & Tracking
                  </h1>
                  <p className="text-sm text-white/80">
                    Last updated:{" "}
                    <span className="font-semibold">{lastUpdated}</span>
                  </p>
                </div>
              </div>

              <motion.p
                variants={opacityV}
                className="text-lg sm:text-xl text-white/90 leading-relaxed"
              >
                We use cookies to give you a faster, safer and more personalized
                experience. Control what you share at any time.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </header>

      <main className="py-20 bg-gradient-to-b from-white via-[#FFF8E6] to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={parentV}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="gap-8 mb-10 ">
              {/* Sidebar card centered on small screens */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr]  gap-8 items-start mb-10 ">
                <div className=" flex justify-center">
                  <motion.div
                    variants={toTopV}
                    className="sticky top-24 w-full max-w-sm p-6 bg-gradient-to-br from-white/60 to-white/40 rounded-2xl shadow-2xl border border-primaryGold/10 backdrop-blur-md"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-full bg-[#FFF3DE]">
                        <ShieldCheck className="w-5 h-5 text-[#E48900]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Quick summary
                        </h4>
                        <p className="text-sm text-gray-600">
                          Essential cookies only are required for site
                          functions. Analytics and ads are optional.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100">
                        <div>
                          <p className="text-sm font-medium">Essential</p>
                          <p className="text-xs text-gray-500">Always active</p>
                        </div>
                        <div className="inline-flex items-center gap-2">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100">
                        <div>
                          <p className="text-sm font-medium">Analytics</p>
                          <p className="text-xs text-gray-500">
                            Help us improve
                          </p>
                        </div>
                        <div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={prefs.analytics}
                              readOnly
                              className="sr-only"
                            />
                            <div
                              onClick={() => togglePref("analytics")}
                              className={`w-11 h-6 flex items-center rounded-full transition-colors ${
                                prefs.analytics ? "bg-[#E48900]" : "bg-gray-200"
                              }`}
                            >
                              <span
                                className={`block w-5 h-5 bg-white rounded-full transform transition-transform ${
                                  prefs.analytics
                                    ? "translate-x-5"
                                    : "translate-x-1"
                                }`}
                              />
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-100">
                        <div>
                          <p className="text-sm font-medium">
                            Advertising & Personalization
                          </p>
                          <p className="text-xs text-gray-500">
                            Optional — tailored ads
                          </p>
                        </div>
                        <div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={prefs.ads}
                              readOnly
                              className="sr-only"
                            />
                            <div
                              onClick={() => togglePref("ads")}
                              className={`w-11 h-6 flex items-center rounded-full transition-colors ${
                                prefs.ads ? "bg-[#E48900]" : "bg-gray-200"
                              }`}
                            >
                              <span
                                className={`block w-5 h-5 bg-white rounded-full transform transition-transform ${
                                  prefs.ads ? "translate-x-5" : "translate-x-1"
                                }`}
                              />
                            </div>
                          </label>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={savePreferences}
                          className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] font-semibold"
                        >
                          Save preferences
                        </button>
                        <button
                          onClick={acceptAll}
                          className="w-full mt-3 px-4 py-2 rounded-full border border-gray-200 text-sm"
                        >
                          Accept all
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-8 ">
                  <motion.div className="space-y-8">
                    <motion.section
                      variants={toTopV}
                      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-semibold text-gray-800">
                          What are cookies?
                        </h3>
                        <span className="text-sm text-gray-500">
                          First-party & third-party
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Cookies are small text files placed on your device when
                        you visit websites. They help sites remember your
                        preferences and provide useful features. Cookies can be
                        set by the site you are visiting (first-party) or by
                        third parties (third-party) for services such as
                        analytics and advertising.
                      </p>
                    </motion.section>

                    <motion.section
                      variants={toTopV}
                      className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                    >
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                        Types of cookies we use
                      </h3>

                      <div className="grid sm:grid-cols-3 gap-6">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm">
                          <div className="flex items-start gap-3 mb-3">
                            <Cookie className="w-6 h-6 text-[#E48900]" />
                            <h4 className="font-semibold">Essential</h4>
                          </div>
                          <p className="text-sm text-gray-600">
                            Required for login, security and accessibility.
                            These keep the site running and cannot be disabled.
                          </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm">
                          <div className="flex items-start gap-3 mb-3">
                            <ShieldCheck className="w-6 h-6 text-[#E48900]" />
                            <h4 className="font-semibold">
                              Performance & Analytics
                            </h4>
                          </div>
                          <p className="text-sm text-gray-600">
                            Help us measure and improve performance, content and
                            UX. Examples: page views, load times.
                          </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm">
                          <div className="flex items-start gap-3 mb-3">
                            <Globe className="w-6 h-6 text-[#E48900]" />
                            <h4 className="font-semibold">
                              Advertising & Personalization
                            </h4>
                          </div>
                          <p className="text-sm text-gray-600">
                            Used to deliver relevant ads and content. May be
                            placed by partners to track visits across sites.
                          </p>
                        </div>
                      </div>
                    </motion.section>
                  </motion.div>
                </div>
              </div>
              <div className="">
                <motion.section
                  variants={toTopV}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-10"
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Managing cookies & consent
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You can control cookie preferences on this page (use the
                    controls on the top left) or via your browser settings.
                    Disabling cookies may affect site functionality.
                  </p>

                
                </motion.section>

                <motion.section
                  variants={toTopV}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-10"
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Third-party cookies
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may allow third-party providers to place cookies for
                    analytics, advertising or social features. These providers
                    operate under their own privacy policies, please review them
                    for details and opt-out options.
                  </p>
                </motion.section>

                <motion.section
                  variants={toTopV}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-10"
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Changes to this Cookies Policy
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We may update this policy occasionally. Material changes
                    will be communicated and the Last updated date will reflect
                    updates.
                  </p>
                </motion.section>

                <motion.section
                  variants={toTopV}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-10"
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Contact
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    If you have questions about our use of cookies, email{" "}
                    <a className="underline" href="mailto:support@nesa.africa">
                      support@nesa.africa
                    </a>
                    .
                  </p>
                </motion.section>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
