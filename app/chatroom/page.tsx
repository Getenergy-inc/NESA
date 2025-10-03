'use client';

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { MdArrowBack } from 'react-icons/md';
import {
  fetchCategories,
  fetchMessages,
  fetchPoll,
  submitVote,
  API_URL,
} from '@/app/api/chatroom/api';
import { MOCK_JUDGE } from '../judge/data'; // adjust if needed

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
  const judge = MOCK_JUDGE && MOCK_JUDGE.length ? MOCK_JUDGE[0] : null;

  const [username] = useState<string>(judge ? judge.name : '');
  const [serverCategories, setServerCategories] = useState<string[]>([]);
  const [availableRooms, setAvailableRooms] = useState<string[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string>('');
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [messageInput, setMessageInput] = useState<string>('');
  const [polls, setPolls] = useState<Record<string, Poll>>({});
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});
  const [showChatMobile, setShowChatMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPoll, setShowPoll] = useState(false);

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/['"]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  useEffect(() => {
    if (!judge) return;

    socketRef.current = io(API_URL);

    socketRef.current.on('roomMessages', ({ room, messages: roomMessages }: { room: string; messages: Message[] }) => {
      setMessages((prev) => ({ ...prev, [room]: Array.isArray(roomMessages) ? roomMessages : [] }));
    });

socketRef.current.on('message', ({ room, message }: { room: string; message: Message }) => {
  setMessages((prev) => {
    const roomMsgs = prev[room] || [];
    // dedupe
    const duplicate = roomMsgs.some(
      (m) => m.username === message.username && m.text === message.text && new Date(m.timestamp).getTime() === new Date(message.timestamp).getTime()
    );
    if (duplicate) return prev;
    return { ...prev, [room]: [...roomMsgs, message] };
  });
});


    // initialize: fetch categories then build rooms
    (async () => {
      try {
        const cats = await fetchCategories();
        setServerCategories(cats);

        const assigned = Array.isArray(judge.assignedCategories) ? judge.assignedCategories : [];

        // accept exact matches or slug matches
        const serverSet = new Set(cats);
        const serverSlugs = new Set(cats.map((c) => slugify(c)));

        const validAssigned = assigned.filter((a) => {
          if (serverSet.has(a)) return true;
          if (serverSlugs.has(slugify(a))) return true;
          return false;
        });

        const rooms = Array.from(new Set(['General', ...validAssigned]));
        setAvailableRooms(rooms);

        const defaultRoom = rooms.includes('General') ? 'General' : rooms[0] || '';
        setCurrentRoom(defaultRoom);
        setMessages((prev) => ({ ...prev, [defaultRoom]: prev[defaultRoom] || [] }));

        if (defaultRoom) {
          await loadMessages(defaultRoom);
          await loadPoll(defaultRoom);
        }

        // emit join info for presence
        socketRef.current.emit('join', { username: judge.name, userId: judge.id, assignedCategories: validAssigned });
        if (defaultRoom) socketRef.current.emit('joinRoom', defaultRoom);
      } catch (err) {
        console.error('Init error', err);
      }
    })();

    return () => {
      socketRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMessages = async (room: string) => {
    try {
      const ms = await fetchMessages(room);
      setMessages((prev) => ({ ...prev, [room]: Array.isArray(ms) ? ms : [] }));
    } catch (err) {
      console.error('loadMessages error', room, err);
      setMessages((prev) => ({ ...prev, [room]: prev[room] || [] }));
    }
  };

  const loadPoll = async (room: string) => {
    try {
      const poll = await fetchPoll(room);
      if (poll) setPolls((prev) => ({ ...prev, [room]: poll }));
    } catch (err) {
      console.error('loadPoll error', err);
      setPolls((prev) => ({ ...prev, [room]: prev[room] || null }));
    }
  };

  const handleRoomClick = async (room: string) => {
    setCurrentRoom(room);
    setShowChatMobile(true);
    setShowPoll(false);
    socketRef.current.emit('joinRoom', room);
    await loadMessages(room);
    await loadPoll(room);
  };

  const sendMessage = () => {
    if (!messageInput.trim() || !currentRoom) return;
    socketRef.current.emit('sendMessage', { room: currentRoom, message: messageInput });

    const newMsg: Message = {
      username,
      text: messageInput,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => ({ ...prev, [currentRoom]: [...(prev[currentRoom] || []), newMsg] }));
    setMessageInput('');
  };

  const vote = async (room: string, option: string) => {
    if (userVotes[room]) return;
    try {
      await submitVote({ room, option, userId: judge?.id || '' });
      setPolls((prev) => ({
        ...prev,
        [room]: {
          ...prev[room],
          votes: {
            ...prev[room].votes,
            [option]: (prev[room].votes?.[option] || 0) + 1,
          },
        },
      }));
      setUserVotes((prev) => ({ ...prev, [room]: option }));
    } catch (err) {
      console.error('vote error', err);
    }
  };

  // UI note when no rooms
  const noRooms = availableRooms.length === 0;

  return (
    <div className="flex pt-[29px] md:pt-[93px] h-screen">
      <div className={`w-full md:w-1/3 bg-[#FFF5E0] border-r overflow-y-auto ${showChatMobile ? 'hidden md:block' : ''}`}>
        <div className="px-7 py-3 sticky top-0 z-10 bg-[#FFF5E0] border-b">
          <div className="font-bold">{judge?.name}</div>
          <div className="text-xs text-gray-600">{judge?.title}</div>

          <input
            type="text"
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-3 w-full py-2 px-4 bg-transparent rounded-full border border-gray-300"
          />
        </div>

        {noRooms ? (
          <div className="p-6 text-center text-gray-600">
            <p>No rooms available for this judge.</p>
            <p className="text-xs">Make sure judge.assignedCategories match server categories.</p>
          </div>
        ) : (
          availableRooms
            .filter((r) => r.toLowerCase().includes(searchQuery.toLowerCase()))
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
                <p className="text-sm text-gray-600 truncate">{messages[room]?.[messages[room].length - 1]?.text || 'No messages yet'}</p>
              </div>
            ))
        )}
      </div>

      <div className={`w-full md:w-2/3 flex flex-col ${!showChatMobile && 'hidden md:flex'}`}>
        <div className="px-4 py-3 border-b bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={() => setShowChatMobile(false)} className="md:hidden pl-2 text-blue-600">
              <MdArrowBack className="mr-2 text-gray-600 cursor-pointer md:hidden" size={24} />
            </button>
            <div className="pl-5">
              <h2 className="text-xl font-bold">{currentRoom}</h2>
              <p className="text-sm text-gray-500">Category chatroom</p>
            </div>
          </div>

          <button onClick={() => setShowPoll(!showPoll)} className="text-sm text-blue-500 border px-2 py-1 rounded hover:bg-blue-50">
            {showPoll ? 'Back to Chat' : 'View Poll'}
          </button>
        </div>

        {showPoll ? (
          <div className="p-4 bg-white overflow-y-auto flex-1">
            {polls[currentRoom] && polls[currentRoom].question ? (
              <>
                <h3 className="font-semibold mb-4 text-lg">{polls[currentRoom].question}</h3>
                <ul className="space-y-4">
                  {polls[currentRoom].options.map((option) => {
                    const totalVotes = Object.values(polls[currentRoom].votes || {}).reduce((a, b) => a + b, 0);
                    const voteCount = polls[currentRoom].votes?.[option] || 0;
                    const percentage = totalVotes ? Math.round((voteCount / totalVotes) * 100) : 0;

                    return (
                      <li key={option} className="relative">
                        <button
                          disabled={!!userVotes[currentRoom]}
                          onClick={() => vote(currentRoom, option)}
                          className={`w-full text-left p-3 rounded-lg border flex justify-between items-center ${userVotes[currentRoom] === option ? 'bg-[#FFBE5C] border-[#FFBE5C]' : 'hover:bg-gray-100'}`}
                        >
                          <span className="font-medium">{option}</span>
                          <span className="text-sm text-gray-500">{voteCount} votes ({percentage}%)</span>
                        </button>

                        <div className="h-2 mt-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-[#8C5400] transition-all duration-300" style={{ width: `${percentage}%` }} />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <p>No poll for this room yet.</p>
            )}
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {(messages[currentRoom] || []).map((msg, idx) => {
                const isOwn = msg.username === username;
                return (
                  <div key={idx} className={`flex items-end gap-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                    {!isOwn && <img src="/images/chat1.png" className="w-8 h-8 rounded-full" alt={msg.username} />}
                    <div className={`max-w-md p-3 rounded shadow ${isOwn ? 'ml-auto bg-[#FFBE5C] text-right' : 'bg-gray-200'}`}>
                      {!isOwn && <div className="font-bold text-sm text-gray-700">{msg.username}</div>}
                      <div>{msg.text}</div>
                      <div className="text-xs text-gray-500 mt-1">{new Date(msg.timestamp).toLocaleTimeString()}</div>
                    </div>
                    {isOwn && <img src="/images/chat1.png" className="w-8 h-8 rounded-full" alt={msg.username} />}
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t bg-white flex gap-2">
              <div className="flex-1 bg-white rounded-full border border-gray-300 mr-2">
                <input className="flex-1 py-2 px-4 bg-transparent outline-none w-full" placeholder="Type a message..." value={messageInput} onChange={(e) => setMessageInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
              </div>
              <button onClick={sendMessage} className="px-6 py-2 rounded-full text-white" style={{ background: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)' }}>
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
