'use client';

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { MdArrowBack } from "react-icons/md";
import { fetchCategories, fetchRooms, fetchMessages, fetchPoll, submitVote, API_URL } from '@/app/api/chatroom/api';

type Message = {
  username: string;
  text: string;
  timestamp: string | number | Date;
};

type Poll = {
  question: string;
  options: string[];
  votes: { [option: string]: number };
};

export default function Chatroom() {
  const socketRef = useRef<any>();
  const [username, setUsername] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [currentRoom, setCurrentRoom] = useState('');
  const [availableRooms, setAvailableRooms] = useState<string[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [showChatMobile, setShowChatMobile] = useState(false);
  const [polls, setPolls] = useState<Record<string, Poll>>({});
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});
  const [showPoll, setShowPoll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    socketRef.current = io(API_URL);

    socketRef.current.on('roomMessages', ({ room, messages }: { room: string; messages: Message[] }) => {
      setMessages((prev) => ({ ...prev, [room]: messages }));
    });

    socketRef.current.on('message', ({ room, message }: { room: string; message: Message }) => {
      setMessages((prev) => ({
        ...prev,
        [room]: [...(prev[room] || []), message],
      }));
    });

    socketRef.current.on('availableRooms', (rooms: string[]) => {
      setAvailableRooms(rooms);
    });

    fetchCategories().then((data) => setCategories(data));

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const handleJoin = async () => {
    if (username && category) {
      const rooms = await fetchRooms(category);
      const allRooms = ['General', ...rooms]; // One general per category

      setAvailableRooms(allRooms);

      const defaultRoom = allRooms[0];
      setCurrentRoom(defaultRoom);
      loadMessages(defaultRoom);
      loadPoll(defaultRoom);

      socketRef.current.emit('join', { username, category });
      socketRef.current.emit('joinRoom', defaultRoom);

      setIsJoined(true);
    }
  };

  const loadMessages = async (room: string) => {
    const roomMessages = await fetchMessages(room);
    setMessages((prev) => ({ ...prev, [room]: roomMessages }));
  };

    const sendMessage = () => {
      if (messageInput.trim()) {
        const newMessage = {
          username,
          text: messageInput,
          timestamp: new Date().toISOString(),
        };

      socketRef.current.emit('sendMessage', { room: currentRoom, message: messageInput });


      setMessageInput('');
    }
  };

  const handleRoomClick = async (room: string) => {
    setCurrentRoom(room);
    setShowChatMobile(true);
    setShowPoll(false);

    socketRef.current.emit('joinRoom', room);

    loadMessages(room);
    loadPoll(room);
  };

  const loadPoll = async (room: string) => {
    try {
      const poll = await fetchPoll(room);
      if (poll) {
        setPolls((prev) => ({ ...prev, [room]: poll }));
      }
    } catch (error) {
      console.error('Poll not found for this room.');
    }
  };

  const vote = async (room: string, option: string) => {
    if (userVotes[room]) return;

    await submitVote(room, option);

    setPolls((prev) => ({
      ...prev,
      [room]: {
        ...prev[room],
        votes: {
          ...prev[room].votes,
          [option]: prev[room].votes[option] + 1,
        },
      },
    }));

    setUserVotes((prev) => ({ ...prev, [room]: option }));
  };

  if (!isJoined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Join Chatroom</h2>
          <input
            className="w-full mb-4 p-3 border rounded"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <select
            className="w-full mb-6 p-3 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={handleJoin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex pt-[29px] md:pt-[93px] h-screen">

      {/* Room Section */}
      <div className={`w-full md:w-1/3 bg-[#FFF5E0] border-r overflow-y-auto ${showChatMobile ? 'hidden md:block' : ''}`}>
        <div className="px-7 py-3 sticky top-0 z-10 bg-[#FFF5E0] border-b">
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 px-4 bg-transparent rounded-full border border-gray-300"
          />
        </div>

        {availableRooms
          .filter((room) => room.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((room) => (
            <div
              key={room}
              onClick={() => handleRoomClick(room)}
              className={`px-7 p-3 mb-2 rounded cursor-pointer ${room === currentRoom ? 'bg-white shadow font-bold' : 'hover:bg-gray-200'}`}
            >
              <div className="flex justify-between items-center">
                <span>{room}</span>
                <span className="text-xs text-gray-500">
                  {messages[room]?.[messages[room].length - 1]?.timestamp
                    ? new Date(messages[room][messages[room].length - 1].timestamp).toLocaleTimeString()
                    : ''}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {messages[room]?.[messages[room].length - 1]?.text || 'No messages yet'}
              </p>
            </div>
          ))}
      </div>

      {/* Chat Section */}
      <div className={`w-full md:w-2/3 flex flex-col ${!showChatMobile && 'hidden md:flex'}`}>
        <div className="px-4 py-3 border-b bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setShowChatMobile(false)} className="md:hidden pl-2 text-blue-600">
              <MdArrowBack className="mr-2 text-gray-600 cursor-pointer md:hidden" size={24} />
            </button>
            <div className='pl-5'>
              <h2 className="text-xl font-bold">{currentRoom}</h2>
              <p className="text-sm text-gray-500">Category chatroom</p>
            </div>
          </div>
          <button
            onClick={() => setShowPoll(!showPoll)}
            className="text-sm text-blue-500 border px-2 py-1 rounded hover:bg-blue-50"
          >
            {showPoll ? 'Back to Chat' : 'View Poll'}
          </button>
        </div>

        {showPoll ? (
            <div className="p-4 bg-white overflow-y-auto flex-1">
    {polls[currentRoom] && (
      <>
        <h3 className="font-semibold mb-4 text-lg">{polls[currentRoom].question}</h3>
        <ul className="space-y-4">
          {polls[currentRoom].options.map((option) => {
            const totalVotes = Object.values(polls[currentRoom].votes).reduce((a, b) => a + b, 0);
            const voteCount = polls[currentRoom].votes[option];
            const percentage = totalVotes ? Math.round((voteCount / totalVotes) * 100) : 0;

            return (
              <li key={option} className="relative">
                <button
                  disabled={!!userVotes[currentRoom]}
                  onClick={() => vote(currentRoom, option)}
                  className={`w-full text-left p-3 rounded-lg border flex justify-between items-center
                    ${userVotes[currentRoom] === option ? 'bg-[#FFBE5C] border-[#FFBE5C]' : 'hover:bg-gray-100'}`}
                >
                  <span className="font-medium">{option}</span>
                  <span className="text-sm text-gray-500">{voteCount} votes ({percentage}%)</span>
                </button>

                {/* Progress Bar */}
                <div className="h-2 mt-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8C5400] transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </li>
            );
          })}
        </ul>
      </>
    )}
  </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {(messages[currentRoom] || []).map((msg, index) => {
                const isOwnMessage = msg.username === username;
                const imgUrl = `/images/chat1.png`;

                return (
                  <div key={index} className={`flex items-end gap-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                    {!isOwnMessage && (
                      <img src={imgUrl} alt={msg.username} className="w-8 h-8 rounded-full" />
                    )}

                    <div className={`max-w-md p-3 rounded shadow ${isOwnMessage ? 'ml-auto bg-[#FFBE5C] text-right' : 'bg-gray-200'}`}>
                      {!isOwnMessage && (
                        <div className="font-bold text-sm text-gray-700">{msg.username}</div>
                      )}
                      <div>{msg.text}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </div>

                    {isOwnMessage && (
                      <img src={imgUrl} alt={msg.username} className="w-8 h-8 rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t bg-white flex gap-2">
              <div className='flex-1 bg-white rounded-full border border-gray-300 mr-2'>
                <input
                  className="flex-1 py-2 px-4 bg-transparent outline-none w-full"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
              </div>
              <button
                onClick={sendMessage}
                className="px-6 py-2 rounded-full text-white"
                style={{ background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)' }}
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
