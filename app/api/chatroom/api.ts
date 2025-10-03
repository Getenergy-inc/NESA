export const API_URL = 'http://localhost:5000'//'https://socket-production-fe9d.up.railway.app'; // Your backend URL

// Fetch available categories (chatroom categories)
export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

// Fetch available rooms for a specific category
export async function fetchAllRooms(): Promise<string[]> {
  const res = await fetch(`${API_URL}/rooms`);
  if (!res.ok) throw new Error('Failed to fetch rooms');
  return res.json();
}

// Fetch messages for a specific room
export async function fetchMessages(room: string) {
  const res = await fetch(`${API_URL}/messages/${encodeURIComponent(room)}`);
  if (!res.ok) throw new Error('Failed to fetch messages');
  return res.json();
}

// Fetch the poll for a specific room
export async function fetchPoll(room: string) {
  const res = await fetch(`${API_URL}/poll/${encodeURIComponent(room)}`);
  if (!res.ok) throw new Error('Failed to fetch poll');
  return res.json();
}

// Submit a vote for a specific poll option in a room
export async function submitVote({
  room,
  option,
  userId,
}: {
  room: string;
  option: string;
  userId: string;
}) {
  const res = await fetch(`${API_URL}/poll/${encodeURIComponent(room)}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ room, option, userId }),
  });
  if (!res.ok) throw new Error('Failed to submit vote');
  return res.json();
}
