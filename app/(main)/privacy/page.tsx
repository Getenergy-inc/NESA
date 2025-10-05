"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import { ShieldCheck, FileText, Mail, Globe, ShieldAlert } from 'lucide-react';

export default function PrivacyPolicyPage(): JSX.Element {
  const lastUpdated = 'October 2, 2025';

  const sections = [
    {
      id: 'intro',
      title: 'Introduction',
      body: `NESA respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and protect information when you use our website and other online services. By accessing or using the Service, you consent to the practices described in this policy.`
    },
    {
      id: 'information-collected',
      title: 'Information We Collect',
      body: (
        <>
        We collect information you provide directly to us and information that is automatically collected when you use the Service.<br/><br/>

        <strong>• Information you provide:</strong> Name, email, profile details, payment information (processed by third-party payment providers), nomination content, messages, and other content you upload.<br/><br/>

        <strong>• Automatically collected information:</strong> Usage data, device information, IP address, cookies and similar tracking technologies, and analytics data.<br/><br/>

        <strong>• Third-party sources:</strong> Information from social logins, partners, and publicly available sources where permitted.</>)
    },
    {
      id: 'how-we-use',
      title: 'How We Use Information',
      body: `We use your information to provide, operate, and improve the Service; process payments and manage accounts; communicate with you; personalize content and recommendations; detect, prevent and address fraud, abuse, security, or technical issues; and to comply with legal obligations.`
    },
    {
      id: 'sharing',
      title: 'Sharing & Disclosure',
      body: `We do not sell personal information. We may share information with service providers (payment processors, hosting providers, analytics), legal authorities when required, with your consent, or in connection with a business transfer (merger, acquisition).`
    },
    {
      id: 'cookies',
      title: 'Cookies & Tracking Technologies',
      body: `We and our partners use cookies and similar technologies to provide and enhance the Service, understand usage, and deliver relevant features. You can control cookies through your browser settings, but disabling cookies may limit functionality.`
    },
    {
      id: 'security',
      title: 'Security',
      body: `We implement reasonable administrative, technical, and physical safeguards to protect information. However, no method of transmission or storage is completely secure; we cannot guarantee absolute security.`
    },
    {
      id: 'retention',
      title: 'Data Retention',
      body: `We retain personal information as long as necessary to provide the Service, fulfill legal obligations, resolve disputes, and enforce agreements. Retention periods vary by data type and purpose.`
    },
    {
      id: 'rights',
      title: 'Your Rights',
      body: `Depending on your jurisdiction, you may have rights to access, correct, delete, or port your personal data, and to restrict or object to certain processing. To exercise these rights, contact us at the address below. We may ask you to verify your identity before responding to requests.`
    },
    {
      id: 'children',
      title: 'Children',
      body: `The Service is not intended for children under 13 (or higher age where required). We do not knowingly collect personal information from children without parental consent. If we learn we have collected such information, we will take steps to delete it.`
    },
    {
      id: 'third-parties',
      title: 'Third-Party Links & Services',
      body: `The Service may contain links to third-party sites or integrate third-party services (social logins, payment processors). This Privacy Policy does not apply to those third parties; please review their privacy policies.`
    },
    {
      id: 'international',
      title: 'International Transfers',
      body: `We are global and may transfer information across borders for processing and storage. We will take appropriate steps to ensure adequate protections when transferring data internationally.`
    },
    {
      id: 'changes',
      title: 'Changes to this Policy',
      body: `We may update this Privacy Policy from time to time. If we make material changes, we will provide notice via the Service or by other means. The "Last updated" date at the top of this page will reflect the change.`
    },
    {
      id: 'contact',
      title: 'Contact Us',
      body: (<>If you have questions about this Privacy Policy or want to exercise your data rights, contact us at <a className="underline" href="mailto:support@nesa.africa">support@nesa.africa</a>.</>)
    }
  ];

  return (
    <>
      {/* Hero */}
      <header className="relative inset-0 min-h-[30vh] w-full px-5 text-white overflow-hidden">
        <Image
          src="/images/bg/home_back.png"
          alt="Privacy Hero"
          fill
          className="object-cover z-0"
          quality={100}
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#191307]/85 via-[#2a1f0a]/60 to-[#33270E]/70 z-10"></div>
        <div className="absolute top-16 left-12 w-28 h-28 bg-gradient-to-br from-[#FFC247]/20 to-[#E48900]/10 rounded-full blur-xl z-20"></div>

        <div className="relative z-30 container mx-auto px-4 py-24">
          <motion.div variants={parentV} initial="initial" animate="animate" className="max-w-5xl mx-auto text-center">
            <motion.div variants={toTopV} className="space-y-6">
              <div className="flex flex-col items-center justify-center gap-4 mb-4">
                <div className="p-3 bg-gradient-to-br from-[#FFC247]/20 to-[#E48900]/20 rounded-full border border-[#FFC247]/30">
                  <ShieldCheck className="w-8 h-8 text-[#FFC247]" />
                </div>
                <div className="">
                  <h1 className="text-4xl mb-4 sm:text-5xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] bg-clip-text text-transparent">Privacy Policy</h1>
                  <p className="text-sm text-white/80">Last updated: <span className="font-semibold">{lastUpdated}</span></p>
                </div>
              </div>

              <p className="text-lg sm:text-xl text-white/90 leading-relaxed">We value your privacy. Below is a clear explanation of what we collect, why we collect it, and how you can manage your data.</p>
            </motion.div>
          </motion.div>
        </div>
      </header>

      <main className="py-20 bg-[#FFF8E6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={parentV} initial="initial" whileInView="animate" viewport={{ once: true }} className="max-w-5xl mx-auto">
            <div className="grid gap-8 mb-10">
              <div className="flex justify-center">
                <div className="w-[60%] md:w-1/2 sticky top-24 p-6 bg-white rounded-2xl shadow-lg border border-primaryGold/10">
                  <div className="p-4 flex items-center justify-center"><ShieldAlert className="w-8 h-8 text-center text-red-500" /></div>
                  <p className="text-sm pb-5 text-gray-600 leading-relaxed">We collect personal and usage data to operate the Service, process payments, and improve user experience. <strong>We do not sell your personal information!.</strong> </p>
                </div>
              </div>

              <div className="px-5 md:px-0">
                <motion.div variants={toTopV} className="space-y-8">
                  {sections.map((s) => (
                    <section key={s.id} id={s.id} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                      <h3 className="text-2xl font-semibold text-center md:text-left text-gray-800 mb-3">{s.title}</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{s.body}</p>
                    </section>
                  ))}

                  <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Data Requests & Contact</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">To exercise your rights (access, correction, deletion, portability), send a request to <a className="underline" href="mailto:support@nesa.africa">support@nesa.africa</a>. We may require identity verification before fulfilling requests.</p>
                    <p className="text-sm text-gray-600">We aim to respond to verified requests within a reasonable timeframe depending on jurisdiction and complexity.</p>
                  </section>

                  <section className="text-center mt-6">
                    <div className="inline-flex items-center shadow-xl gap-4 bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-6 rounded-2xl border border-[#FFC247]/20">
                      <div>
                        <div className=" flex gap-4 items-center justify-center">
                        <Globe className="w-8 h-8 text-xl text-[#E48900]" />
                        <h4 className="font-semibold text-lg">Want to learn more?</h4>
                        </div>
                        <p className="text-sm text-gray-700">Visit <span className="font-semibold">www.nesa.africa</span> or contact our Data Protection Team for detailed inquiries.</p>
                        <a href="mailto:support@nesa.africa" className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] font-semibold px-4 py-2 rounded-full">Contact Support <Mail className="w-4 h-4" /></a>
                      </div>
                    </div>
                  </section>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
