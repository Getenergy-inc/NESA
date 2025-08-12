"use client";
import React, { useState } from "react";
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaPodcast } from "react-icons/fa";
import Image from "next/image";

const episodes = [
  {
    title: "Inspiring African Educators: Episode 1",
    description: "Meet the changemakers transforming education across Africa. Host: Dr. Babashola.",
    audio: "/audio/episode1.mp3",
    cover: "/images/podcast1.jpg",
    date: "June 2025",
    duration: "28:15"
  },
  {
    title: "Women in STEM: Breaking Barriers",
    description: "A roundtable with leading women in STEM education. Host: Santos Aderibigbe.",
    audio: "/audio/episode2.mp3",
    cover: "/images/podcast2.jpg",
    date: "May 2025",
    duration: "32:10"
  },
  {
    title: "Grassroots Innovation: Local Heroes",
    description: "Stories from rural educators making a difference. Host: Santos shola.",
    audio: "/audio/episode3.mp3",
    cover: "/images/podcast3.jpg",
    date: "April 2025",
    duration: "25:40"
  }
];

export default function RadioPodcastPage() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  const handlePlay = (idx: number) => {
    setCurrent(idx);
    setPlaying(true);
    setTimeout(() => {
      audioRef?.play();
    }, 100);
  };

  const handlePause = () => {
    setPlaying(false);
    audioRef?.pause();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#191307] to-[#2d2d2d] text-white py-20">
      {/* Hero Section */}
      <div className="w-full bg-[#191307] py-16 px-4 md:px-0 flex flex-col items-center text-center">
        <FaPodcast className="text-5xl text-primaryGold mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-2">NESA-Africa Radio & Podcast</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-4">
          Listen to inspiring stories, expert interviews, and educational insights from across Africa. New episodes every month!
        </p>
      </div>

      {/* Featured Episode Player */}
      <div className="max-w-3xl mx-auto bg-[#232323] rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6 mt-[-60px] z-10 relative">
        <div className="w-40 h-40 flex-shrink-0 rounded-xl overflow-hidden shadow-lg">
          <Image src={episodes[current].cover} alt={episodes[current].title} width={160} height={160} className="object-cover w-full h-full" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-primaryGold">{episodes[current].title}</h2>
          <p className="text-gray-300 mb-2">{episodes[current].description}</p>
          <div className="flex items-center gap-4 mt-2">
            <button
              className="bg-primaryGold text-black rounded-full p-3 hover:bg-yellow-400 transition"
              onClick={() => (playing ? handlePause() : handlePlay(current))}
            >
              {playing ? <FaPause size={22} /> : <FaPlay size={22} />}
            </button>
            <span className="text-sm text-gray-400">{episodes[current].date} • {episodes[current].duration}</span>
            <FaVolumeUp className="ml-auto text-xl text-gray-400" />
          </div>
          <audio
            src={episodes[current].audio}
            ref={ref => setAudioRef(ref)}
            onEnded={() => setPlaying(false)}
            className="hidden"
            autoPlay={playing}
          />
        </div>
      </div>

      {/* Episode List */}
      <div className="max-w-4xl mx-auto mt-12 px-4">
        <h3 className="text-2xl font-semibold mb-6 text-primaryGold">All Episodes</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {episodes.map((ep, idx) => (
            <div
              key={ep.title}
              className={`bg-[#232323] rounded-xl shadow-lg p-4 flex flex-col items-center transition-transform hover:scale-105 cursor-pointer ${current === idx ? 'ring-2 ring-primaryGold' : ''}`}
              onClick={() => handlePlay(idx)}
            >
              <Image src={ep.cover} alt={ep.title} width={120} height={120} className="rounded-lg object-cover mb-3" />
              <h4 className="text-lg font-bold text-primaryGold mb-1 text-center">{ep.title}</h4>
              <p className="text-gray-400 text-sm mb-2 text-center line-clamp-2">{ep.description}</p>
              <span className="text-xs text-gray-500 mb-1">{ep.date} • {ep.duration}</span>
              <button
                className="mt-2 bg-primaryGold text-black rounded-full px-4 py-1 text-sm font-semibold hover:bg-yellow-400 transition"
                onClick={e => { e.stopPropagation(); current === idx && playing ? handlePause() : handlePlay(idx); }}
              >
                {current === idx && playing ? "Pause" : "Play"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
