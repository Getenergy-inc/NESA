"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ReadMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReadMoreModal: React.FC<ReadMoreModalProps> = ({ isOpen, onClose }) => {
  // Close modal on ESC key press
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-[#1a140b] to-[#2a1f15] rounded-2xl shadow-2xl border border-deepGold/20 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-deepGold/20">
              <h2 className="text-2xl md:text-3xl font-bold text-deepGold font-raleway">
                About NESA Africa Awards 2025
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
              >
                <X size={24} className="text-white" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6 text-white">
                <div>
                  <h3 className="text-xl font-semibold text-deepGold mb-3">Our Mission</h3>
                  <p className="text-gray-300 leading-relaxed">
                    After 15 years of vision, setbacks, and unwavering commitment — NESA-Africa 2025 emerges as the continent's highest platform for honoring those rebuilding African education from the ground up. We celebrate the unsung heroes, innovative changemakers, and bold institutions shaping Africa's education future.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-deepGold mb-3">What Makes Us Different</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    The NESA Africa Awards 2025 is a flagship initiative of the Santos Creations Educational Foundation (SCEF) — recognizing visionaries across NGOs, corporations, policy, media, EdTech, philanthropy, creative sectors, and the diaspora who are architecting Africa's education systems.
                  </p>
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                    <p className="text-red-300 font-medium">
                      🛑 This is not a teacher or student award. It celebrates builders of systems, advocates of change, and funders of futures.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-deepGold mb-3">Award Categories</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-deepGold mb-2">Innovation in Education</h4>
                      <p className="text-sm text-gray-400">Recognizing groundbreaking educational technologies and methodologies</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-deepGold mb-2">Policy Excellence</h4>
                      <p className="text-sm text-gray-400">Honoring transformative educational policies and governance</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-deepGold mb-2">Corporate Social Responsibility</h4>
                      <p className="text-sm text-gray-400">Celebrating corporate commitment to educational development</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h4 className="font-semibold text-deepGold mb-2">Lifetime Achievement</h4>
                      <p className="text-sm text-gray-400">Recognizing sustained impact in African education</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-deepGold mb-3">Get Involved</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Join us in celebrating Africa's education champions. Whether you're nominating a deserving candidate, voting with AfriGoldCoin, or attending our gala event, your participation helps recognize and amplify the voices of those transforming education across the continent.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReadMoreModal;
