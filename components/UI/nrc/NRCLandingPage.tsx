'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/lib/context/AuthContext';
import { useNRCStatus } from '@/lib/hooks/useNRCStatus';
import { 
  Users, 
  Globe, 
  Calendar, 
  Target, 
  Award, 
  CheckCircle, 
  ArrowRight,
  Clock,
  MapPin,
  UserCheck
} from 'lucide-react';
import Button from '@/components/Common/Button';
import OptimizedHeroBackground from './OptimizedHeroBackground';

// Import enhanced CSS for hero section
import '@/styles/nrc-hero.css';

const NRCLandingPage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const { loading, hasApplication, isApproved, isPending, isRejected, canAccessDashboard } = useNRCStatus();

  const handleApplyNow = () => {
    // TODO: Re-enable authentication when backend is ready
    // Authentication temporarily disabled for testing purposes

    /* ORIGINAL AUTHENTICATION LOGIC - COMMENTED FOR TESTING
    if (!isAuthenticated) {
      router.push('/account/login');
      return;
    }

    if (canAccessDashboard) {
      router.push('/get-involved/nrc-volunteer/dashboard');
      return;
    }

    if (hasApplication) {
      // User already has an application, show status
      return;
    }
    */

    // For testing: Direct access to application form
    router.push('/get-involved/nrc-volunteer/apply');
  };

  const getButtonText = () => {
    // TODO: Re-enable dynamic button text when backend is ready
    // Authentication-based button text temporarily disabled for testing

    /* ORIGINAL AUTHENTICATION-BASED LOGIC - COMMENTED FOR TESTING
    if (!isAuthenticated) return 'Login to Apply';
    if (canAccessDashboard) return 'Go to Dashboard';
    if (isPending) return 'Application Pending';
    if (isRejected) return 'Application Not Approved';
    if (hasApplication) return 'View Application Status';
    */

    // For testing: Simple button text
    return 'Apply Now';
  };

  const getButtonDisabled = () => {
    // TODO: Re-enable button state logic when backend is ready
    // Button state temporarily enabled for testing

    /* ORIGINAL AUTHENTICATION-BASED LOGIC - COMMENTED FOR TESTING
    return isPending || isRejected;
    */

    // For testing: Button always enabled
    return false;
  };

  const benefits = [
    {
      icon: Award,
      title: "Digital Certificate of Service",
      description: "Official recognition as NESA-NRC Volunteer Officer"
    },
    {
      icon: Users,
      title: "SCEF Membership",
      description: "Free 1-year SCEF Membership with exclusive benefits"
    },
    {
      icon: Target,
      title: "Priority Access",
      description: "VIP access to all NESA Week 2025 events"
    },
    {
      icon: Globe,
      title: "Media Feature",
      description: "Featured spotlight on NESA TV or 'It's In Me Radio'"
    },
    {
      icon: Award,
      title: "AGC Wallet Rewards",
      description: "Earn AGC tokens for verified nominee entries"
    }
  ];
  const incentives = [
    {
      title: "First 10 Uploads",
      reward: "5 AGC total (partially withdrawable)"
    },
    {
      title: "Weekly Best Researcher",
      reward: "3 AGC bonus"
    },
    {
      title: "Verified Entry",
      reward: "0.5 AGC (non-withdrawable)"
    }
  ];

  const operationalPhases = [
    {
      title: "Staff & Volunteer Research Phase",
      timeline: "August 15 – October 15, 2025",
      tasks: [
        "Internal verification of subcategory structures",
        "Research and pre-upload 6,000+ nominees",
        "Coordinate data across local chapters",
        "Content accuracy and link verification"
      ]
    },
    {
      title: "Public Nomination Phase",
      timeline: "September 1 – November 15, 2025",
      tasks: [
        "Public nomination intake and processing",
        "Nominee profile validation",
        "Assessment preparation",
        "Data quality assurance"
      ]
    }
  ];

  const responsibilities = [
    "Research and document 200+ verified nominee profiles",
    "Validate achievements and impact stories",
    "Ensure alignment with SDG 4, AU Agenda 2063, and ESG principles",
    "Submit profiles through structured digital forms",
    "Participate in weekly check-in calls",
    "Tag entries with appropriate award categories"
  ];

  const requirements = [
    "Passionate about education and Africa's development",
    "Excellent research and writing skills",
    "Basic knowledge of SDG/Agenda 2063/ESG concepts",
    "Familiar with digital tools (Google Sheets, Docs, online forms)",
    "Committed to completing 200+ profiles in 30 days",
    "Available for remote work during engagement period"
  ];

  const nrcRoles = [
    {
      title: "Internal Staff",
      subtitle: "SCEF/NESA Team Members",
      description: "Core team members with expertise in education, project management, or regional knowledge.",
      responsibilities: [
        "Platform testing and validation",
        "Pre-populate high-priority subcategories",
        "Ensure national representation",
        "Coordinate with DevOps and content teams"
      ],
      icon: Users
    },
    {
      title: "Regional Volunteers",
      subtitle: "Africa & Diaspora",
      description: "Selected representatives from African countries and major diaspora regions.",
      responsibilities: [
        "Research and nominee interviews",
        "Data uploads and verification",
        "Social impact alignment checks",
        "Geographic subcategory management"
      ],
      icon: Globe
    },
    {
      title: "International Observers",
      subtitle: "Research Fellows",
      description: "Specialists and diaspora professionals with expertise in African education.",
      responsibilities: [
        "Advisory contributions",
        "Endorsement support",
        "Data research assistance",
        "Institutional nominations"
      ],
      icon: UserCheck
    },
    {
      title: "General Public",
      subtitle: "Public Nomination Role",
      description: "Open to anyone from Africa or the diaspora starting September 1, 2025.",
      responsibilities: [
        "Submit nominee details",
        "Provide nomination justification",
        "Upload supporting materials",
        "Share impact evidence"
      ],
      icon: Target
    }
  ];

  const teamStructure = {
    regions: [
      "North Africa",
      "West Africa",
      "East Africa", 
      "Central Africa",
      "Southern Africa",
      "Diaspora"
    ],
    categories: [
      "Gold Certificate Awards (Competitive)",
      "Platinum Awards (Non-competitive)",
      "Africa Icon Awards (Lifetime)"
    ],
    sectors: [
      "EduTech",
      "CSR",
      "Creative Industries",
      "Media",
      "Religious Bodies",
      "Policy",
      "Governance"
    ]
  };

  const workflowSteps = [
    {
      stage: "1",
      activity: "Receive subcategories to cover",
      tool: "NRC Dashboard",
      output: "Task Brief"
    },
    {
      stage: "2",
      activity: "Conduct background research",
      tool: "Verified sources & reports",
      output: "Nominee Profile Draft"
    },
    {
      stage: "3", 
      activity: "Cross-check credibility",
      tool: "Multiple source verification",
      output: "Verification Report"
    },
    {
      stage: "4",
      activity: "Upload data",
      tool: "NRC Portal Entry Form",
      output: "Nominee Submission"
    },
    {
      stage: "5",
      activity: "Tag nominees with metadata",
      tool: "Portal Classification System",
      output: "Database Classification"
    },
    {
      stage: "6",
      activity: "Internal validation",
      tool: "Portal Notification System",
      output: "Validation Queue"
    }
  ];

  const timelineBreakdown = [
    {
      period: "Aug 10–17",
      milestone: "Orientation & Kickoff",
      activities: ["Portal access setup", "Training sessions", "Team briefing"]
    },
    {
      period: "Aug 18–Sept 15",
      milestone: "Initial Research Phase",
      activities: ["Nominee research", "Weekly uploads", "Team coordination"]
    },
    {
      period: "Sept 16–Oct 20",
      milestone: "Intensive Upload Phase",
      activities: ["Bulk data entry", "Internal validation", "Quality checks"]
    },
    {
      period: "Oct 21–Nov 20",
      milestone: "Finalization Phase",
      activities: ["Final edits", "Handover prep", "Documentation"]
    },
    {
      period: "Nov 21–30",
      milestone: "Program Wrap-up",
      activities: ["Recognition ceremony", "Report submission", "Award preparations"]
    }
  ];

  const toolsAndPlatforms = [
    {
      name: "NESA NRC Portal",
      description: "Secure platform for nominee data upload and management",
      features: ["Dashboard access", "Data entry forms", "Validation tools"]
    },
    {
      name: "Collaboration Tools",
      description: "Efficient team coordination and file management",
      features: ["Google Drive/Sheets", "Asana/Trello", "Document templates"]
    },
    {
      name: "Communication Platforms",
      description: "Team communication and training channels",
      features: ["Telegram/WhatsApp groups", "Weekly Zoom meetings", "Training sessions"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section with Background Image */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden nrc-hero-container"
        aria-label="NESA Nominee Research Corps volunteer program hero section"
        role="banner"
      >
        {/* Preload background image */}
        <div className="nrc-hero-preload" aria-hidden="true" />

        {/* Optimized Background Image */}
        <div className="absolute inset-0 z-0">
          <OptimizedHeroBackground
            src="/images/bg/education.png"
            alt="Education and research background - students and educators in Africa"
            className="nrc-hero-bg nrc-hero-gpu-accelerated"
            priority={true}
            quality={90}
          />
        </div>

        {/* Color Overlay */}
        <div className="absolute inset-0 z-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 w-full container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto flex flex-col items-center text-center text-white nrc-hero-animate-in"
          >
            <div className="flex items-center justify-center gap-2 mb-4" role="banner">
              <Users className="w-8 h-8 text-white drop-shadow-2xl" aria-hidden="true" />
              <span className="text-lg font-medium text-white drop-shadow-2xl">NESA Nominee Research Corps</span>
            </div>

            <h1
              className="nrc-hero-title font-bold mb-6 text-white drop-shadow-2xl"
              id="hero-title"
              style={{
                textShadow: '2px 2px 4px rgba(0,0,0,0.8), 4px 4px 8px rgba(0,0,0,0.6), 6px 6px 12px rgba(0,0,0,0.4)'
              }}
            >
              Join the NRC Volunteer Program
            </h1>

            <p
              className="nrc-hero-subtitle leading-relaxed mb-8 font-light text-white drop-shadow-2xl"
              aria-describedby="hero-title"
              style={{
                textShadow: '1px 1px 3px rgba(0,0,0,0.8), 2px 2px 6px rgba(0,0,0,0.6)'
              }}
            >
              Help identify and profile 6,000+ impactful changemakers across Africa
              for the NESA-Africa 2025 Awards
            </p>

            <div
              className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8 text-sm md:text-base"
              role="list"
              aria-label="Program details"
            >
              <div
                className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 text-white"
                role="listitem"
                style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                }}
              >
                <MapPin className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">Remote (All African Countries + Diaspora)</span>
              </div>
              <div
                className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 text-white"
                role="listitem"
                style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                }}
              >
                <Calendar className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">Aug 15 - Oct 15, 2025</span>
              </div>
              <div
                className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 text-white"
                role="listitem"
                style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                }}
              >
                <Clock className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">Two-Phase Operation</span>
              </div>
              <div
                className="flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30 text-white"
                role="listitem"
                style={{
                  textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                }}
              >
                <Users className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">30-50 Volunteer Positions</span>
              </div>
            </div>

            <Button
              text={getButtonText()}
              onClick={handleApplyNow}
              disabled={getButtonDisabled()}
              variant="filled"
              className={`font-semibold px-8 py-4 text-lg shadow-xl nrc-hero-button nrc-hero-gpu-accelerated ${
                getButtonDisabled()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-[#ea580c] hover:bg-gray-100 hover:scale-105 transition-all duration-300'
              }`}
              aria-describedby="hero-title"
              aria-label={getButtonDisabled()
                ? "Application period has ended"
                : "Apply to join the NESA Nominee Research Corps volunteer program"
              }
            />
                              {/* Enhanced Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="z-10 mt-8 -mb-12 self-center nrc-hero-scroll-indicator focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg p-2"
          onClick={() => {
            const nextSection = document.querySelector('#about-section');
            nextSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label="Scroll down to learn more about the program"
          type="button"
        >
          <div className="flex flex-col items-center text-white">
            <span
              className="text-sm mb-2 font-medium"
              style={{
                textShadow: '1px 1px 3px rgba(0,0,0,0.8), 2px 2px 6px rgba(0,0,0,0.6)'
              }}
            >
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white rounded-full flex justify-center hover:border-white/80 transition-colors duration-300 bg-black/40 backdrop-blur-sm"
              aria-hidden="true"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </motion.div>
          </div>
        </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Program Overview */}
      <section id="about-section" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About the NRC Program
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              The NESA Nominee Research Corps (NRC) is a specialized volunteer taskforce 
              responsible for the critical pre-nomination research phase of NESA-Africa 2025. 
              Our volunteers ensure quality, credibility, and balanced representation across 
              all award categories before public nominations open.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <Target className="w-12 h-12 text-[#ea580c] mb-4" />
              <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
              <p className="text-gray-600">
                Compile a verified database of 6,000+ changemakers worthy of recognition 
                across Africa and the diaspora.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <CheckCircle className="w-12 h-12 text-[#ea580c] mb-4" />
              <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                Ensure each nominee is documented with verifiable information 
                reflecting impact and alignment with core values.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <Globe className="w-12 h-12 text-[#ea580c] mb-4" />
              <h3 className="text-xl font-semibold mb-3">Global Impact</h3>
              <p className="text-gray-600">
                Support a seamless launch of public nominations and ensure 
                balanced representation across all regions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Responsibilities Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Volunteer Responsibilities
              </h2>
              <p className="text-lg text-gray-700">
                As an NRC volunteer, you'll play a crucial role in building the foundation 
                for Africa's most prestigious education awards.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4 text-[#ea580c]">Key Responsibilities</h3>
                <ul className="space-y-3">
                  {responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-4 text-[#ea580c]">Ideal Volunteer Profile</h3>
                <ul className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <UserCheck className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Structure Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Program Structure
            </h2>
            <p className="text-lg text-gray-700">
              The NRC operates in two strategic phases to ensure comprehensive coverage and quality data collection.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-4 text-[#ea580c] flex items-center gap-2">
                <span className="bg-[#ea580c] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
                Staff & Volunteer Research Phase
              </h3>
              <p className="text-gray-600 mb-4">August 15 – October 15, 2025</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Internal verification of subcategory structures</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Research and pre-upload of 6,000+ nominees</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Coordination with local chapters and regional teams</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-4 text-[#ea580c] flex items-center gap-2">
                <span className="bg-[#ea580c] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
                Public Nomination Phase
              </h3>
              <p className="text-gray-600 mb-4">September 1 – November 15, 2025</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Public nominations for outstanding changemakers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Profile uploads via NESA-Africa platform</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Validation of incoming nominations</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Regional Coverage</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { region: "North Africa", countries: "Algeria, Morocco, Egypt..." },
                { region: "East Africa", countries: "Kenya, Ethiopia, Uganda..." },
                { region: "Central Africa", countries: "Cameroon, DRC..." },
                { region: "West Africa", countries: "Nigeria, Ghana, Senegal..." },
                { region: "Southern Africa", countries: "South Africa, Zambia..." },
                { region: "Diaspora", countries: "UK, USA, France, Caribbean..." }
              ].map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
                >
                  <h4 className="font-semibold text-[#ea580c] mb-2">{area.region}</h4>
                  <p className="text-sm text-gray-600">{area.countries}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who Can Join Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Who Can Join the NESA-NRC?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              NESA-NRC is a special task force of researchers, education advocates, and data curators 
              mobilized to identify and document changemakers across Africa and the diaspora.
            </p>
          </motion.div>

          {/* Application Process Cards */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-[#ea580c] to-[#dc2626] rounded-xl p-6 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">How to Apply</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-xl font-semibold text-white mb-2">Platform Access</h4>
                  <ul className="space-y-2 text-white/90">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span>Secure login credentials for NRC Portal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span>Access to nomination forms and dashboards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span>Data curation and management tools</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="text-xl font-semibold text-white mb-2">Nomination Process</h4>
                  <ul className="space-y-2 text-white/90">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span>Africa Icon Blue Garnet Awards (Lifetime Impact)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span>Gold Certificate Awards (Competitive)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                      <span>Platinum Certificate Recognition (Institutions)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {nrcRoles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-[#ea580c]/10 rounded-lg p-3">
                    <role.icon className="w-6 h-6 text-[#ea580c]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {role.title}
                    </h3>
                    <p className="text-[#ea580c] font-medium mb-3">
                      {role.subtitle}
                    </p>
                    <p className="text-gray-600 mb-4">
                      {role.description}
                    </p>
                    <ul className="space-y-2">
                      {role.responsibilities.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-[#ea580c] mb-2">How to Apply:</h4>
                      {role.title === "Internal Staff" && (
                        <p className="text-gray-600">
                          Internal staff are assigned based on expertise. SCEF/NESA team members can express interest through the internal portal.
                        </p>
                      )}
                      {role.title === "Regional Volunteers" && (
                        <p className="text-gray-600">
                          Apply through the NRC Portal. Selection based on regional representation and research capabilities. Must commit to at least 3 subcategories.
                        </p>
                      )}
                      {role.title === "International Observers" && (
                        <p className="text-gray-600">
                          Submit your expertise profile and areas of interest. Selected based on experience in African education and research.
                        </p>
                      )}
                      {role.title === "General Public" && (
                        <p className="text-gray-600">
                          Access opens September 1, 2025. Submit nominations through the public portal with required documentation and justification.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Verification Process */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mt-12 bg-gray-50 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Verification & Publishing Process
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-[#ea580c] mb-2">Impact Alignment</h4>
                <p className="text-sm text-gray-600">
                  Entries validated against SDG 4, ESG principles, and AU Agenda 2063 goals
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-[#ea580c] mb-2">Authentication</h4>
                <p className="text-sm text-gray-600">
                  Verification of nominee track record and credentials
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-[#ea580c] mb-2">Documentation</h4>
                <p className="text-sm text-gray-600">
                  Review of public-facing work and supporting evidence
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits & Rewards Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Benefits & AGC Rewards
            </h2>
            <p className="text-lg text-gray-700">
              Join a meaningful mission while earning recognition and AGC tokens for your valuable contributions.
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-[#ea580c]/20 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-[#ea580c]/10 to-[#ea580c]/5 rounded-lg p-3">
                    <benefit.icon className="w-8 h-8 text-[#ea580c]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* AGC Incentives */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              AGC Token Incentives
            </h3>
            <p className="text-lg text-gray-700 mb-8">
              Earn AGC tokens for your research contributions and performance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {incentives.map((incentive, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg border border-[#ea580c]/10 relative overflow-hidden group hover:border-[#ea580c]/30 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#ea580c]/10 to-transparent transform rotate-45 translate-x-12 -translate-y-12" />
                <h4 className="text-lg font-semibold mb-3 text-[#ea580c]">
                  {incentive.title}
                </h4>
                <p className="text-2xl font-bold mb-2 text-gray-900">
                  {incentive.reward.split('(')[0]}
                </p>
                {incentive.reward.includes('(') && (
                  <p className="text-sm text-gray-600">
                    ({incentive.reward.split('(')[1]}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Program Timeline
            </h2>
            <p className="text-lg text-gray-700">
              A structured approach to identifying and documenting Africa's education changemakers
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {timelineBreakdown.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex items-start gap-8 mb-8 last:mb-0"
              >
                {/* Timeline Line */}
                {index !== timelineBreakdown.length - 1 && (
                  <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-[#ea580c] to-transparent" />
                )}

                {/* Timeline Content */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#ea580c] to-[#dc2626] flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <div className="flex-1 bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-semibold text-[#ea580c] mb-2">
                    {phase.period}
                  </h3>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">
                    {phase.milestone}
                  </h4>
                  <ul className="space-y-2">
                    {phase.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Platforms Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Tools & Platforms
            </h2>
            <p className="text-lg text-gray-700">
              Access a suite of powerful tools to streamline your research and collaboration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {toolsAndPlatforms.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-[#ea580c]/20 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {tool.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {tool.description}
                </p>
                <ul className="space-y-2">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ArrowRight className="w-5 h-5 text-[#ea580c] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#ea580c] to-[#dc2626] text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl mb-8">
              Join 30 passionate volunteers in building the foundation for Africa's 
              most prestigious education awards. Applications close July 14, 2025.
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-8">
              <Clock className="w-5 h-5" />
              <span className="text-lg">Application Deadline: July 14, 2025</span>
            </div>

            <Button
              text={getButtonText()}
              onClick={handleApplyNow}
              disabled={getButtonDisabled()}
              variant="filled"
              className={`font-semibold px-8 py-4 text-lg ${
                getButtonDisabled()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-[#ea580c] hover:bg-gray-100'
              }`}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NRCLandingPage;
