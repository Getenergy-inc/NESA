import { motion } from "framer-motion";
import { toTopV, parentV, opacityV } from "@/lib/utils/variants";
import { 
  UserPlus, 
  Vote, 
  DollarSign, 
  Users, 
  MapPin, 
  Tv, 
  Mail, 
  Phone,
  ArrowRight,
  Heart,
  Globe,
  Award
} from "lucide-react";
import Link from "next/link";

const CallToAction = () => {
  const actionItems = [
    {
      title: "Nominate a Champion",
      description: "Recognize outstanding educators and institutions making a difference",
      icon: UserPlus,
      color: "from-blue-500 to-blue-600",
      link: "/get-involved/nomination",
      badge: "Start Now"
    },
    {
      title: "Vote & Support with AGC",
      description: "Use AfriGoldCoin to vote and directly fund scholarships",
      icon: Vote,
      color: "from-green-500 to-green-600",
      link: "/vote",
      badge: "Vote Now"
    },
    {
      title: "Become a Sponsor",
      description: "Partner with us to amplify educational impact across Africa",
      icon: DollarSign,
      color: "from-purple-500 to-purple-600",
      link: "/sponsor",
      badge: "Partner Up"
    },
    {
      title: "Apply as Judge or Ambassador",
      description: "Join our expert panel or become a regional ambassador",
      icon: Award,
      color: "from-orange-500 to-orange-600",
      link: "/judgeapply",
      badge: "Apply Now"
    },
    {
      title: "Join/Lead a Local Chapter",
      description: "Establish or join NESA chapters in your community",
      icon: MapPin,
      color: "from-teal-500 to-teal-600",
      link: "/local-chapters",
      badge: "Get Involved"
    },
    {
      title: "Watch NESA TV & Webinars",
      description: "Stay connected with educational transformation stories",
      icon: Tv,
      color: "from-red-500 to-red-600",
      link: "/media/nesa-tv",
      badge: "Watch Now"
    }
  ];

  const impactStats = [
    { number: "2025", label: "Launch Year", icon: "🚀" },
    { number: "54+", label: "Target Countries", icon: "🌍" },
    { number: "1M+", label: "Learners to Impact", icon: "👥" },
    { number: "100K", label: "Scholarships Goal", icon: "🎓" }
  ];

  const contactInfo = {
    email: "info@nesa.africa",
    phone: "+234 805 667 7770",
    address: "19 Godwin Okigbo Street, Marsha Kilo, Surulere, Lagos, Nigeria",
    host: "Santos Creations Educational Foundation (SCEF)"
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#191307] via-[#33270E] to-[#191307]">
      <div className="container mx-auto px-4">
        <motion.div
          variants={parentV}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Main CTA Header */}
          <motion.div variants={toTopV} className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 rounded-full border border-[#FFC247]/30 mb-6">
              <Heart className="w-5 h-5 text-[#FFC247] mr-2" />
              <span className="text-[#FFC247] font-medium">JOIN THE MOVEMENT</span>
            </div>
            
            <h2 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-6 leading-tight">
              🙌 Transform Africa's
              <br />
              Educational Future
            </h2>
            
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Be part of the continental movement that's recognizing excellence, driving innovation, 
              and creating sustainable change in African education. Every action you take creates 
              ripple effects of positive impact.
            </p>

            {/* Impact Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {impactStats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="bg-gradient-to-br from-[#191307]/60 to-[#33270E]/40 backdrop-blur-sm border border-[#FFC247]/20 rounded-xl p-6 hover:border-[#FFC247]/40 transition-all duration-300"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action Items Grid */}
          <motion.div variants={toTopV} className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                Choose Your Impact Path
              </h3>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Multiple ways to contribute to Africa's educational transformation
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {actionItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={opacityV}
                  className="group"
                >
                  <Link href={item.link}>
                    <div className="bg-gradient-to-br from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/20 rounded-2xl p-8 hover:border-[#FFC247]/40 transition-all duration-300 h-full cursor-pointer group-hover:transform group-hover:scale-105">
                      <div className="flex items-center mb-6">
                        <div className={`bg-gradient-to-r ${item.color} p-3 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300`}>
                          <item.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg md:text-xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                              {item.title}
                            </h4>
                            <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 text-[#FFC247] px-3 py-1 rounded-full text-xs font-medium">
                              {item.badge}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <div className="flex items-center text-[#FFC247] font-medium group-hover:text-[#E48900] transition-colors duration-300">
                        <span className="mr-2">Get Started</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Vision Statement */}
          <motion.div variants={opacityV} className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 rounded-2xl p-8 md:p-12 border border-[#FFC247]/30 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-[#FFC247]/20 to-[#E48900]/20 p-4 rounded-full mr-4">
                <Globe className="w-10 h-10 text-[#FFC247]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text">
                Our Collective Vision
              </h3>
            </div>
            
            <blockquote className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8 italic">
              "By 2035, every child and youth across Africa will have access to quality education, 
              supported by a continental network of changemakers, innovators, and champions who 
              believe in the transformative power of learning."
            </blockquote>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-involved/nomination">
                <button className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] font-semibold px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 flex items-center">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Start Your Impact Journey
                </button>
              </Link>
              <Link href="/about">
                <button className="border border-[#FFC247] text-[#FFC247] font-semibold px-8 py-4 rounded-full hover:bg-[#FFC247]/10 transition-all duration-300 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Learn More About NESA
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={toTopV} className="bg-gradient-to-r from-[#33270E]/60 to-[#191307]/60 rounded-2xl p-8 border border-[#FFC247]/20">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-4">
                📬 Get In Touch
              </h3>
              <p className="text-gray-300">
                Ready to join the movement? Contact us to learn more about partnership opportunities
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                  <Mail className="w-8 h-8 text-[#FFC247] mx-auto mb-3" />
                  <h4 className="text-[#FFC247] font-semibold mb-2">Email</h4>
                  <p className="text-gray-300 text-sm">{contactInfo.email}</p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                  <Phone className="w-8 h-8 text-[#FFC247] mx-auto mb-3" />
                  <h4 className="text-[#FFC247] font-semibold mb-2">Phone</h4>
                  <p className="text-gray-300 text-sm">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                  <MapPin className="w-8 h-8 text-[#FFC247] mx-auto mb-3" />
                  <h4 className="text-[#FFC247] font-semibold mb-2">Address</h4>
                  <p className="text-gray-300 text-sm">{contactInfo.address}</p>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-gradient-to-r from-[#FFC247]/10 to-[#E48900]/10 p-6 rounded-xl border border-[#FFC247]/20 mb-4">
                  <Users className="w-8 h-8 text-[#FFC247] mx-auto mb-3" />
                  <h4 className="text-[#FFC247] font-semibold mb-2">Host</h4>
                  <p className="text-gray-300 text-sm">{contactInfo.host}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div variants={opacityV} className="text-center">
            <div className="bg-gradient-to-r from-[#191307]/80 to-[#33270E]/60 backdrop-blur-sm border border-[#FFC247]/30 rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#FFC247] to-[#E48900] inline-block text-transparent bg-clip-text mb-6">
                The Future of African Education Starts Now
              </h3>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
                Join thousands of educators, leaders, and changemakers who are already part of the NESA-Africa movement. 
                Together, we're not just recognizing excellence—we're creating it.
              </p>
              <Link href="/get-involved">
                <button className="bg-gradient-to-r from-[#FFC247] to-[#E48900] text-[#191307] font-bold text-lg px-12 py-4 rounded-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  Join the Movement Today
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;