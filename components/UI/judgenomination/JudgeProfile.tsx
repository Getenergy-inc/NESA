"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const judges = [
  {
    id: 1,
    name: "Mr Joseph Johnson",
    organization: "Brothers Building Futures (BBF)",
    imageUrl: "/images/judgereview.png"
  },
  {
    id: 2,
    name: "Mr Joseph Johnson",
    organization: "Brothers Building Futures (BBF)",
    imageUrl: "/images/judgereview.png"
  },
  {
    id: 3,
    name: "Mr Joseph Johnson",
    organization: "Brothers Building Futures (BBF)",
    imageUrl: "/images/judgereview.png"
  },
  {
    id: 4,
    name: "Mr Joseph Johnson",
    organization: "Brothers Building Futures (BBF)",
    imageUrl: "/images/judgereview.png"
  },
  {
    id: 5,
    name: "Mr Joseph Johnson",
    organization: "Brothers Building Futures (BBF)",
    imageUrl: "/images/judgereview.png"
  },
];

const JudgeCard = ({ judge }: { judge: any }) => {
  const handleViewProfile = () => {
    console.log(`Viewing profile of ${judge.name}`);
    // Add your logic here for viewing the profile
  };

  return (
    <div className="bg-[#191307] rounded-lg overflow-hidden w-[412px] h-[520px] flex flex-col">
      <div className="p-4 flex-grow">
        <div className="mb-4 flex justify-center">
          <Image
            src={judge.imageUrl}
            alt={judge.name}
            width={332}
            height={261}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white text-lg font-bold truncate mr-2">{judge.name}</h3>
          <div className="flex items-center space-x-2">
            <Link href="#" className="text-gray-400 hover:text-white">
              <FaLinkedinIn size={16} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <FaFacebookF size={16} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <FaInstagram size={16} />
            </Link>
          </div>
        </div>
        <p className="text-gray-400 text-sm">{judge.organization}</p>
      </div>
      <div className="p-4">
        <button 
          onClick={handleViewProfile}
          className="w-full py-2 px-4 rounded-full text-black font-semibold cursor-pointer transition-colors"
          style={{background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)'}}
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

const JudgeProfile = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, judges.length - 3));
  };

  const handleMessage = () => {
    console.log("Messaging Mr. Benneth Osarieme Ogbe");
    // Add your logic here for messaging
  };

  return (
    <div className="bg-[#FFF8E7] min-h-screen flex flex-col">
      {/* Header Image */}
      <div className="relative w-full h-[200px]">
        <Image
          src="/images/hero.jpeg"
          alt="Header"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#191307CC] to-[#191307AA]" />
      </div>
      
      {/* Main Content */}
      <div className="px-4 relative w-full flex justify-center">
        {/* Profile Picture */}
        <div className="absolute -top-16 w-full max-w-5xl mx-auto px-4">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40">
            <Image
              src="/images/judge1.png"
              alt="Profile Picture"
              fill
              className="rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>
        
        {/* Judge Information */}
        <div className="pt-24 sm:pt-32 flex flex-col items-start w-full max-w-5xl">
          <div className="flex justify-between items-center w-full mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">Mr. Benneth Osarieme Ogbe</h1>
              <h2 className="text-md text-gray-700">Textured, Opinionated and Professional.</h2>
            </div>
            <button 
              onClick={handleMessage}
              className="bg-[#FFC247] text-black px-4 py-2 rounded-full cursor-pointer"
            >
              Message
            </button>
          </div>
          
          <h3 className="text-lg font-bold mb-2">Bio:</h3>
          <p className="mb-4">
            Mr. Benneth Osarieme Ogbe has the ability to read and positively enhance talents and abilities. He is
            receptive to challenges and developing music skills. He has the ability to memorize and retain information
            concerning positive development in a multi- diverse environment. He works well with others, self-motivated
            and a great team player.
          </p>
          <p className="mb-4">
            He is a very highly motivated individual with over two decades of experience sharing knowledge in music
            & the arts. Mr. Benneth Osarieme Ogbe' deepness makes it impossible for individuals to deviate from
            the cause, he has been constantly told that he is very imposing in getting the job done." I enjoy this
            privilege, which has afforded me the opportunity to collaborate with my associates to achieve set goals"
          </p>
          
          <h3 className="text-lg font-bold mb-2">Early Life and Education:</h3>
          <p className="mb-4">
            Mr. Benneth Osarieme Ogbe started as a choirboy at St. Dominic's Choir, St. Dominic's Catholic Church,
            Yaba. To further enhance his singing, he joined Demola Olota and other members to promote the
            choral group DE'CLIQUE VOCALS. After a solo performance at one of the masses in church, he got an
            opportunity to audition for a voice part from "STEVE RHODES VOICES late Uncle Steve Rhodes took him
            through the rigors of professional vocal training in the contemporary and jazz genres and he has since
            not looked back in this rich field of commercial and personal choice of career. A graduate of Civil
            Engineering from the Ambrose Alli University Ekpoma, Benneth Ogbewi has decided to embrace the
            ups-and-downs of this profession and contribute his own quota to the development of the industry
          </p>
          
          <h3 className="text-lg font-bold mb-2">Classical Career:</h3>
          <p className="mb-4">
            In order not to lose out in the classical field, he joined the LAZ EKWUEME CHORALE to further strengthen
            his hold in this rare and sacred field of music. He is the conductor of the SR ORCHESTRA, an ensemble
            of trained musicians put together by the late music icon, composer and arranger, ELDER STEVE RHODES.
          </p>
          <p className="mb-4">
            The stage scene in Nigeria jumped above limits with the production of KAKADU THE MUSICAL; a story of
            Lagos centering on the gains and conflicts of Lagos. KAKADU THE MUSICAL is a story that sets the tone
            for success across the globe. He played the lead role LORD LUGARD. Official Quizmaster: (SEFLAT school
            quiz) 4 years and counting. TOASTMASTER: Official launch of Copterjet international Limited (Sept 30,
            2021)Official compere for the MUSON festival 21-24 October, 2021.
          </p>
          
          <h3 className="text-lg font-bold mb-2">History:</h3>
          <ol className="list-decimal list-inside mb-4">
            <li>Voice coach: West African IDOLS</li>
            <li>Music facilitator: NOKIAFIRST CHANCE</li>
            <li>Presenter: CELEBRITY TAKES 2</li>
            <li>Narrator: GULDER ULTIMATE SEARCH V</li>
            <li>Head of music: MTN PROJECT FAME WEST AFRICA( 9 YEARS)</li>
            <li>Music Director/ Lead Cast (LORD LUGARD)-KAKADU THE MUSICAL (2013 LAGOS, 2016 DAVOS, 2017 SOUTH-AFRICA, LAGOS 2022)</li>
            <li>DIRECTOR:OPERAABUJA2023: AMEMUSO'S SOUND OF MUSIC</li>
            <li>HOST: UNUSUAL PRAISE ( GLOBALWORSHIP CONCERT OF THE CATHOLIC ARCHDIOCESE OF LAGOS TILL DATE).</li>
            <li>MUSIC MONTAGE COMPOSER: E.V.E (An M-Net Original Drama (Seasons1 -4)</li>
            <li>PRESENTER for CELEBRITY TAKES2,HYMNODIA,</li>
            <li>SINGTHESONG,UNUSUALPRAISE. QUIZMASTER: SEPLAT PEARLS QUIZ COMPETITION. STAGE:"KAKADU THE MUSICAL" (MUSIC</li>
            <li>DIRECTOR AND LEAD; "LORD LUGARD). LAGOS,CALABAR,DAVOS(SWITZERLAND).</li>
          </ol>
          
          <h3 className="text-lg font-bold mb-2">Social Media:</h3>
          <div className="flex space-x-4 mb-8">
            <Link href="#" className="text-[#FFC247] hover:text-[#E48900]">
              <FaFacebookF size={24} />
            </Link>
            <Link href="#" className="text-[#FFC247] hover:text-[#E48900]">
              <FaInstagram size={24} />
            </Link>
            <Link href="#" className="text-[#FFC247] hover:text-[#E48900]">
              <FaTwitter size={24} />
            </Link>
            <Link href="#" className="text-[#FFC247] hover:text-[#E48900]">
              <FaYoutube size={24} />
            </Link>
          </div>
        </div>
      </div>
      
      {/* White background section */}
      <div className="w-full bg-white">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Other Judges Section */}
          <h2 className="text-2xl font-bold mb-4 mt-12">See Other Judges</h2>
          <div className="relative">
            <div ref={carouselRef} className="flex space-x-4 overflow-x-auto">
              {judges.map((judge, index) => (
                <div key={judge.id} style={{transform: `translateX(-${currentIndex * 416}px)`}} className="transition-transform duration-300">
                  <JudgeCard judge={judge} />
                </div>
              ))}
            </div>
            <button 
              onClick={handlePrev} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              disabled={currentIndex === 0}
            >
              <IoIosArrowBack size={24} />
            </button>
            <button 
              onClick={handleNext} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              disabled={currentIndex === judges.length - 3}
            >
              <IoIosArrowForward size={24} />
            </button>
          </div>
          <div className="flex justify-center mt-4">
            {judges.slice(0, judges.length - 2).map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${index === currentIndex ? 'bg-[#FFC247]' : 'bg-gray-300'}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgeProfile;