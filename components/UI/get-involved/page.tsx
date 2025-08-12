"use client";
import React from 'react';
import Image from 'next/image';
import Button from "@/components/Common/Button";
import { ArrowRight } from 'lucide-react';
import SponsorshipPackages from '@/components/UI/get-involved/sponsorship';
import NesaAmbassador from '@/components/UI/get-involved/ambassador';
import DonateNow from '@/components/UI/get-involved/donate';
import VolunteerWithUs from '@/components/UI/get-involved/volunteer';
import { useRouter } from 'next/navigation'


const NESACommunityPage = () => {
  const router = useRouter()

  const benefits = [
    "Brand Visibility Across Africa",
    "Recognition in All NESA Communications",
    "Prime Placement on NESA TV & Digital Billboards",
    "Complimentary Tickets to Award Ceremony & Gala Dinner",
    "Exclusive Networking Opportunities"
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-gray-800 text-white mt-12 sm:mt-20 md:pt-20">
        <Image
          src="/images/getinvolved1.png"
          alt="NESA 2023 Community"
          layout="fill"
          objectFit="cover"
          />
        {/* Content Overlay font-raleway font-bold text-[48px] leading-[60px] tracking-normal text-white mb-6 */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24  bg-gradient-to-b from-gray-800 to-transparent">  
        <div className="max-w-4xl container mx-auto">
          <h1 className="font-raleway text-[48px] md:text-4xl lg:text-5xl font-medium text-white mb-6 leading-tight">
            Be a part of NESA Africa 2025 and help drive transformative change in education across the continent.
          </h1>
          
            <p
              className="text-white mb-6 font-poppins font-normal md:text-xl leading-[36px] tracking-[0]">
              Contribute to advocating for the Excellence of Education in Africa with NESA Africa
            </p>
          
          <div className="flex flex-wrap gap-4">
            <button onClick={() => {router.push('/apply-ambassador')}} className="bg-transparent hover:bg-yellow-500 text-yellow-500 hover:text-black font-medium py-3 px-6 border border-yellow-500 hover:border-transparent rounded-md transition duration-300">
              Become an Ambassador
            </button>
            
            <Button text='Become a Sponsor' onClick={() => {router.push('/sponsor')}} variant='filled' className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 px-6 rounded-md transition duration-300" />
              
        
          </div>
        </div>
        </div>
      </section>
          <section className="bg-white py-12 px-4 md:px-0">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">Get Involved – NESA-Africa 2025</h2>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Be part of Africa’s greatest movement for education transformation!
        </p>
        <p className="text-gray-700 mb-8 text-center">
          The New Education Standard Award Africa (NESA-Africa) 2025 is more than an awards ceremony — it’s a continental call to action. Together, we are building a sustainable future where every vote, every donation, every new member fuels scholarships, innovation, and access to quality education for all.
        </p>
        <p className="text-gray-800 font-semibold mb-10 text-center">
          Your involvement shapes the future. Start today.
        </p>

        <div className="mb-10">
          <h3 className="text-2xl font-bold text-amber-600 mb-4 flex items-center gap-2">
            <span role="img" aria-label="star">🌟</span> 5 Ways to Get Involved
          </h3>
          <ol className="space-y-8">
            <li>
              <div className="flex items-center gap-2 mb-2">
                <span role="img" aria-label="sponsor">🤝</span>
                <span className="font-semibold text-lg">Sponsor a Category or the Gala Event</span>
              </div>
              <p className="text-gray-700 mb-2">Be the force behind Africa’s changemakers.</p>
              <p className="text-gray-700 mb-2">
                By sponsoring an award category, a session at the EduAid Expo, or the NESA-Africa Awards Gala itself, your organization directly empowers the heroes working to achieve education for all.
                Your brand will be featured in front of millions across Africa, celebrated for investing in social impact, sustainability, and the future of our continent.
              </p>
              <a href="/sponsor" className="inline-block text-amber-600 font-semibold hover:underline mb-1">🔗 Become a Sponsor</a>
              <p className="text-sm text-gray-500">(Your sponsorship will fund scholarships, rural school support, and innovation in African education.)</p>
            </li>
            <li>
              <div className="flex items-center gap-2 mb-2">
                <span role="img" aria-label="ambassador">🏅</span>
                <span className="font-semibold text-lg">Join as an Ambassador (Local Chapters — Online or Real-Time)</span>
              </div>
              <p className="text-gray-700 mb-2">Lead the change, locally and globally.</p>
              <p className="text-gray-700 mb-2">
                Join our vibrant network of Ambassadors, representing cities, universities, diaspora communities, and local chapters across Africa and the world.
                Ambassadors are the heart of our engagement strategy — they organize, promote, and expand the movement both online and on-ground.
              </p>
              <a href="/apply-ambassador" className="inline-block text-amber-600 font-semibold hover:underline mb-1">🌍 Apply Now to Become an Ambassador</a>
              <p className="text-sm text-gray-500">(Lead initiatives in your country, attend exclusive training, and be recognized as a Champion for Education.)</p>
            </li>
            <li>
              <div className="flex items-center gap-2 mb-2">
                <span role="img" aria-label="member">👥</span>
                <span className="font-semibold text-lg">Become a Member</span>
              </div>
              <p className="text-gray-700 mb-2">Membership that makes a difference.</p>
              <p className="text-gray-700 mb-2">
                When you join NESA-Africa and Santos Creations Educational Foundation (SCEF) as a Member, you become part of a growing community of educators, innovators, advocates, and businesses committed to changing lives through education.
              </p>
              <div className="mb-2">
                <span className="font-semibold">🎓 Choose Your Membership Type:</span>
                <ul className="list-disc list-inside ml-4 text-gray-700">
                  <li>Ordinary Member</li>
                  <li>Standard Member</li>
                  <li>Corporate Member</li>
                </ul>
              </div>
              <a href="/ambassador" className="inline-block text-amber-600 font-semibold hover:underline mb-1">💬 Join Now as a Member</a>
              <p className="text-sm text-gray-500">(Access special member-only events, workshops, nomination rights, and more.)</p>
            </li>
            <li>
              <div className="flex items-center gap-2 mb-2">
                <span role="img" aria-label="volunteer">🙌</span>
                <span className="font-semibold text-lg">Volunteer with Us</span>
              </div>
              <p className="text-gray-700 mb-2">Give your time. Grow your impact.</p>
              <p className="text-gray-700 mb-2">
                Volunteers are the backbone of our movement. From media production to ambassador support, logistics to research, volunteering with NESA-Africa offers the opportunity to gain experience, make friends, and leave a lasting mark on education transformation across Africa.
              </p>
              <a href="/volunteer" className="inline-block text-amber-600 font-semibold hover:underline mb-1">📋 Sign Up to Volunteer</a>
              <p className="text-sm text-gray-500">(Open to all backgrounds — Students, Professionals, Educators, Creatives, and Changemakers.)</p>
            </li>
            <li>
              <div className="flex items-center gap-2 mb-2">
                <span role="img" aria-label="donate">💖</span>
                <span className="font-semibold text-lg">Donate to Empower Education for All</span>
              </div>
              <p className="text-gray-700 mb-2">Every contribution creates opportunities.</p>
              <p className="text-gray-700 mb-2">
                Your donation directly funds scholarships, provides rural schools with digital tools, supports displaced learners, and strengthens our sustainable education programs.
                Secure and easy — donate through the GFA Wallet and make a real difference.
              </p>
              <a href="/donate" className="inline-block text-amber-600 font-semibold hover:underline mb-1">💰 Donate Now</a>
              <p className="text-sm text-gray-500">(Support Africa’s future leaders. Give once or monthly.)</p>
            </li>
          </ol>
        </div>

        <div className="bg-amber-50 rounded-xl p-6 md:p-8 mb-8">
          <h4 className="text-xl font-bold text-gray-800 mb-2">✨ Together, We Can:</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li>Reach 40 million Africans online</li>
            <li>Empower 4,000 nominees through global recognition</li>
            <li>Fund 10,000+ scholarship opportunities</li>
            <li>Launch 10 new local chapters globally</li>
            <li>Build a legacy of education sustainability by 2030</li>
          </ul>
        </div>

        <div className="text-center">
          <h5 className="text-lg font-semibold mb-2">🎯 Ready to Get Involved?</h5>
          <p className="mb-1">
            <span className="font-semibold">🌐 Visit</span> <a href="https://www.nesa.africa/getinvolved" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline">www.nesa.africa/getinvolved</a>
          </p>
          <p className="mb-4">
            <span className="font-semibold">📩 Contact:</span> <a href="mailto:info@nesa.africa" className="text-amber-600 hover:underline">info@nesa.africa</a>
          </p>
          <p className="text-gray-700 font-medium">
            Your voice, your vote, your contribution — Africa’s future depends on it. <span role="img" aria-label="earth">🌍</span>
          </p>
        </div>
      </div>
    </section>
      {/* Get Involved Section */}
      <div className="bg-amber-50 p-6 md:p-12 md:ml-4 lg:p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Left side - Image */}
        <div className="md:w-1/2">
          <div className="rounded-2xl overflow-hidden h-full">
            <Image
              src="/images/involvedshake.png"
              alt="Business handshake representing sponsorship"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Become a Sponsor</h2>
          
          <p className="text-gray-700 mb-8">
            Becoming a sponsor of NESA Africa 2025 means positioning your brand at the forefront of 
            Africa's educational transformation. Our sponsorship opportunities provide a unique 
            platform for corporate and individual partners to gain premium visibility while making a 
            tangible impact on education across the continent. Sponsors play a crucial role in 
            funding scholarships, infrastructure, and mentorship programs that directly benefit 
            students, educators, and institutions. Your support ensures that Africa's education 
            champions receive the recognition they deserve while reinforcing your organization's 
            commitment to Corporate Social Responsibility (CSR) and sustainable development. By 
            sponsoring NESA Africa, you align with a movement that is driving innovation, 
            empowerment, and excellence in education.
          </p>

          <h3 className="text-2xl font-bold text-gray-800 mb-4">Benefits of being a NESA Sponsor</h3>
          
          <ul className="mb-8">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start mb-3">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div 
            onClick={() => {router.push('/sponsor')}} 
            className="inline-flex items-center text-amber-500 font-semibold text-lg hover:text-amber-600 transition-colors"
          >
            Apply to Sponsor
            <ArrowRight className="ml-2 h-5 w-5" />
          </div>
        </div>
      </div>
    </div>

    <SponsorshipPackages />
    <NesaAmbassador />
    <DonateNow />
    <VolunteerWithUs />
    </div>

  );
};

export default NESACommunityPage;