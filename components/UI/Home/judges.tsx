"use client";
import React from 'react';
import Image from 'next/image';

interface JudgeProps {
  category?: 'competitive' | 'non-competitive';
}

const Judges: React.FC<JudgeProps> = ({ category = 'competitive' }) => {
  // This is a placeholder component for judges
  // You can customize this with actual judge data later
  
  const judges = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      title: 'Education Policy Expert',
      image: '/images/placeholder-judge.jpg',
      category: 'competitive',
    },
    {
      id: 2,
      name: 'Prof. Michael Okonkwo',
      title: 'EdTech Innovator',
      image: '/images/placeholder-judge.jpg',
      category: 'competitive',
    },
    {
      id: 3,
      name: 'Ms. Amina Diallo',
      title: 'NGO Leadership Specialist',
      image: '/images/placeholder-judge.jpg',
      category: 'non-competitive',
    },
    {
      id: 4,
      name: 'Mr. David Mensah',
      title: 'Education Philanthropy Director',
      image: '/images/placeholder-judge.jpg',
      category: 'non-competitive',
    },
  ];

  const filteredJudges = judges.filter(judge => judge.category === category);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          {category === 'competitive' ? 'Competitive Category Judges' : 'Non-Competitive Category Judges'}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredJudges.map(judge => (
            <div key={judge.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64 w-full">
                <Image
                  src={judge.image}
                  alt={judge.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold">{judge.name}</h3>
                <p className="text-gray-600">{judge.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Judges;