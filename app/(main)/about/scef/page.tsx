"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Target, BarChart, Heart, Users } from "lucide-react";

const ScefPage = () => {
  const stats = [
    {
      icon: <Users className="w-10 h-10 text-deepGold" />,
      value: "10,000+",
      label: "Students Reached",
    },
    {
      icon: <BookOpen className="w-10 h-10 text-deepGold" />,
      value: "50+",
      label: "Educational Programs",
    },
    {
      icon: <Heart className="w-10 h-10 text-deepGold" />,
      value: "1,000+",
      label: "Volunteers Engaged",
    },
  ];

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="min-h-screen relative">
        <Image
          src="/images/bg/back_.jpeg"
          alt="SCEF Background"
          layout="fill"
          objectFit="cover"
          className="w-full h-full absolute top-0 left-0 opacity-40"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <Image
                src="/images/logos/logos_5.jpg"  
                alt="SCEF Logo"
                width={150}
                height={150}
                className="mx-auto"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-bold text-4xl md:text-6xl mb-6 text-whiteGold"
            >
              Santos Creations Educational Foundation (SCEF)
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 leading-relaxed text-gray-200"
            >
              Pioneering Educational Transformation Across Africa.
            </motion.p>
          </div>
        </div>
      </section>

      {/* About SCEF Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold mb-4 text-deepGold"
              >
                About The Foundation
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                {/* Replace with content from your docs */}
                The Santos Creations Educational Foundation (SCEF) is a
                non-profit organization dedicated to fostering educational
                excellence and innovation. Our mission is to create sustainable
                pathways for quality education, empowering individuals and
                communities to thrive in a rapidly changing world.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gray-300 text-lg leading-relaxed"
              >
                {/* Replace with content from your docs */}
                Founded on the principles of equity, access, and impact, SCEF
                drives initiatives that range from grassroots literacy programs
                to high-level policy advocacy, all aimed at building a brighter
                future through education.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-xl overflow-hidden"
            >
              <Image
                src="/images/santos.png" 
                alt="SCEF Team in action"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 p-8 bg-gray-900/50 rounded-xl border border-deepGold/20"
          >
            <div className="flex items-center gap-4">
              <Target className="w-10 h-10 text-deepGold" />
              <h3 className="text-3xl font-bold text-whiteGold">Our Mission</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              {/* Replace with content from your docs */}
              To champion and implement innovative, sustainable, and inclusive
              educational initiatives that empower learners and educators across
              Africa, fostering a generation of critical thinkers and leaders.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6 p-8 bg-gray-900/50 rounded-xl border border-deepGold/20"
          >
            <div className="flex items-center gap-4">
              <BookOpen className="w-10 h-10 text-deepGold" />
              <h3 className="text-3xl font-bold text-whiteGold">Our Vision</h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              {/* Replace with content from your docs */}
              An Africa where every individual has access to world-class
              education, enabling them to reach their full potential and
              contribute to a prosperous and equitable continent.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-12 text-deepGold"
          >
            Our Impact at a Glance
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center p-8 rounded-xl bg-black/30 hover:bg-black/50 transition-all duration-300"
              >
                <div className="mb-4">{stat.icon}</div>
                <p className="text-4xl font-bold text-whiteGold mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-400 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-6"
          >
            Join Us in Shaping the Future of Education
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto"
          >
            Your support can help us expand our reach and deepen our impact.
            Partner with SCEF to make a lasting difference.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/contact">
              <button className="bg-deepGold hover:bg-darkGold text-black font-bold px-8 py-4 text-lg rounded-xl transition-all duration-300">
                Get Involved
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ScefPage;