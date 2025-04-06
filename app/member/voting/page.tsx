"use client";

import Image from 'next/image';
import React, { useState } from 'react';

interface Nominee {
  id: number;
  name: string;
  description: string;
  image: string;
}

const nominees: Nominee[] = [
  {
    id: 1,
    name: 'Nominee One',
    description: 'An outstanding contributor in the education sector with innovative ideas.',
    image: '/images/nesa-card.png',
  },
  {
    id: 2,
    name: 'Nominee Two',
    description: 'Exemplary leadership in education reforms and community initiatives.',
    image: '/images/nesa-card.png',
  },
  // Add more nominee objects as needed
];

interface NomineeCardProps extends Nominee {
  onVote: (id: number) => void;
  voted: boolean;
}

const NomineeCard: React.FC<NomineeCardProps> = ({ id, name, description, image, onVote, voted }) => (
  <div className="bg-white rounded-3xl shadow p-4 flex flex-col justify-between h-full">
    <div>
      <div className="mb-4">
        <Image
          src={image}
          alt={name}
          width={250}
          height={250}
          className="w-full h-auto object-cover rounded-full"
        />
      </div>
      <div className="p-2">
        <h3 className="text-xl font-bold mb-2">{name}</h3>
        <p className="text-sm mb-4">{description}</p>
      </div>
    </div>
    <div className="p-2">
      <button
        onClick={() => onVote(id)}
        className={`w-full mt-auto bg-yellow-500 text-black py-2 px-4 rounded-lg font-medium transition-colors ${
          voted ? "bg-gray-400 cursor-not-allowed" : "hover:bg-yellow-600"
        }`}
        disabled={voted}
      >
        {voted ? "Voted" : "Vote"}
      </button>
    </div>
  </div>
);

const NomineesPage = () => {
  // Track the nominee that the user has voted for (for demo purposes only)
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleVote = (id: number) => {
    // This is where you would also trigger an API call in production
    setSelectedId(id);
  };

  return (
    <div className="bg-yellow-50 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-medium mb-2">Nominees</h2>
          <div className="h-1 w-40 bg-[#E48900] rounded-xl"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nominees.map((nominee) => (
            <NomineeCard
              key={nominee.id}
              {...nominee}
              onVote={handleVote}
              voted={selectedId === nominee.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NomineesPage;
