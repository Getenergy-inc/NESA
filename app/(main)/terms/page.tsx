"use client";

import React from 'react';
import { FileText, ShieldCheck, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsAndConditionsPage(): JSX.Element {
  const lastUpdated = 'October 2, 2025';

  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      body: `By accessing or using the NESA platform ("Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, do not use the Service.`
    },
    {
      id: 'changes',
      title: '2. Changes to Terms',
      body: `We may modify these Terms at any time. When changes are made we will update the "Last updated" date at the top of this page. It is your responsibility to review the Terms periodically. Continued use of the Service after changes indicates your acceptance of the new Terms.`
    },
    {
      id: 'accounts',
      title: '3. Accounts, Registration & Security',
      body: `To use some features you may need to create an account. You are responsible for maintaining the confidentiality of your credentials, and for all activity that occurs under your account. Notify us immediately of any unauthorized use.`
    },
    {
      id: 'user-content',
      title: '4. User Content & Conduct',
      body: `You retain ownership of content you submit ("User Content") but grant NESA a non-exclusive, royalty-free, worldwide license to host, reproduce, distribute and display that content as necessary to operate the Service. You will not submit content that is unlawful, defamatory, infringing, or otherwise harmful.`
    },
    {
      id: 'fees',
      title: '5. Payments, Fees & Refunds',
      body: (<>Some features of the Service may require payment (e.g., AfriGold Coins). All fees and charges are clearly described on the Site at the time of purchase. Unless otherwise required by applicable law, <strong>All payments are final and non-refundable!</strong>, regardless of usage or cancellation. We reserve the right to change pricing or introduce new fees with advance notice.</>)
    },
    {
      id: 'intellectual-property',
      title: '6. Intellectual Property',
      body: `All rights, title and interest in the Service (except for your User Content) and its original content, features and functionality are and will remain the exclusive property of NESA and its licensors. You may not copy, adapt, or redistribute our materials without prior written permission.`
    },
    {
      id: 'privacy',
      title: '7. Privacy',
      body: `Your privacy is important. Our Privacy Policy explains how we collect, use and disclose information. By using the Service you agree to the practices described in the Privacy Policy.`
    },
    {
      id: 'disclaimer',
      title: '8. Disclaimers & Warranties',
      body: `The Service is provided "as is" and "as available". To the fullest extent permitted by law, NESA disclaims all warranties, whether express or implied, including merchantability and fitness for a particular purpose.`
    },
    {
      id: 'limitation',
      title: '9. Limitation of Liability',
      body: `In no event will NESA, its officers, directors or employees be liable for indirect, incidental, special, consequential or punitive damages arising out of or related to your use of the Service.`
    },
    {
      id: 'termination',
      title: '10. Termination',
      body: `We may suspend or terminate your access for violation of these Terms or for any reason with or without notice. Termination does not waive any accrued rights or remedies.`
    },
    {
      id: 'governing-law',
      title: '11. Governing Law & Dispute Resolution',
      body: `These Terms are governed by the laws of the Federal Republic of Nigeria (or another jurisdiction indicated on the Site). Disputes shall be resolved in the competent courts of that jurisdiction unless otherwise agreed.`
    },
    {
      id: 'contact',
      title: '12. Contact & Notices',
      body: `For questions about these Terms, please contact us at support@nesa.africa or via the contact page on our Site.`
    },
    {
      id: 'entire-agreement',
      title: '13. Entire Agreement',
      body: `These Terms constitute the entire agreement between you and NESA regarding the Service and supersede all prior agreements.`
    },
    {
      id: 'Severability',
      title: '14. Severability',
      body: `If any provision of these Terms is found to be unenforceable, the remainder will continue in full force and effect.`
    },
    {
      id: 'contact',
      title: '15. Contact & Notices',
      body: (<>For questions about these Terms, please contact us at <a className="underline" href="mailto:support@nesa.africa">support@nesa.africa</a> or via the contact page on our Site.</>)
    }
  ];

  const container = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } }
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-whiteGold via-[#fdf3dc] to-xlGold text-darkBrown">
      <header className="relative px-2 bg-gradient-to-br from-darkBrown via-[#2a1f0a] to-secondaryDark text-white py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={container}>
            <div className='flex w-full justify-center'>
            <motion.div variants={item} className="flex items-center w-16 bg-blue-200 rounded-full justify-center gap-4 mb-6"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}>
              <div className="w-16 h-16 bg-gradient-to-r from-primaryGold to-deepGold rounded-full flex items-center justify-center">
                <FileText className="text-darkBrown text-2xl" />
              </div>
             
            </motion.div>
             </div>
            <motion.h1 
            variants={item}
            className="text-4xl md:text-5xl font-bold mb-2 text-deepGold font-raleway">
              Terms & Conditions
            </motion.h1>
            <motion.p variants={item} className="text-lightGold/90 mb-4">
              Last updated: <span className="font-semibold">{lastUpdated}</span>
            </motion.p>
            <motion.p variants={item} className="max-w-3xl mx-auto text-lightGold leading-relaxed">
              Please read these Terms and Conditions carefully before using our Service. These terms govern your access and use of NESA's digital platforms, services and community.
            </motion.p>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-10 py-12 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-primaryGold/20 shadow-lg">
          <div className="flex items-center justify-center w-full py-5 gap-3 mb-6">
            <ShieldCheck className="w-6 h-6 text-center item-center flex text-primaryGold" />
            <h2 className="text-xl text-center font-semibold">Your rights & responsibilities</h2>
          </div>

          <motion.div initial="hidden" animate="visible" variants={container} className="space-y-6">
            {sections.map((s, idx) => (
              <motion.section key={s.id} variants={item} id={s.id} className="prose max-w-none">
                <h3 className="text-lg mb-5 font-semibold text-darkBrown">{s.title}</h3>
                <p className="text-darkBrown/80 leading-relaxed whitespace-pre-line">{s.body}</p>
              </motion.section>
            ))}
          </motion.div>

        </div>

        <div className='w-full flex justify-center'>
            <section className="mt-6 shadow-lg w-full md:w-1/2 p-8 bg-white/50 rounded-2xl border border-primaryGold/10">
              <h4 className="font-semibold text-center text-darkBrown mb-2">Need a printable copy or legal help?</h4>
              <p className="text-sm text-darkBrown/70 mb-3">You can print or save this page as PDF using your browser's print function. For legal inquiries or requests, contact our support team.</p>
              <div className='flex justify-center'>
              <a href="mailto:support@nesa.africa" className="inline-flex items-center gap-2 bg-gradient-to-r from-primaryGold to-deepGold text-darkBrown font-semibold px-4 py-2 rounded-xl">
                <Mail className="w-4 h-4" /> Contact Support
              </a>
              </div>
            </section>
            </div>
      </main>
    </div>
  );
}
