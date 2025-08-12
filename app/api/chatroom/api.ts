export const API_URL = 'https://socket-production-fe9d.up.railway.app'; // Your backend URL

// Fetch available categories (chatroom categories)
export async function fetchCategories() {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return await res.json();
}

// Fetch available rooms for a specific category
export async function fetchRooms(category: string) {
  const res = await fetch(`${API_URL}/categories/${category}/rooms`);
  if (!res.ok) throw new Error('Failed to fetch rooms');
  return await res.json();
}

// Fetch messages for a specific room
export async function fetchMessages(room: string) {
  const res = await fetch(`${API_URL}/messages/${room}`);
  if (!res.ok) throw new Error('Failed to fetch messages');
  return await res.json();
}

// Fetch the poll for a specific room
export async function fetchPoll(room: string) {
  const res = await fetch(`${API_URL}/poll/${room}`);
  if (!res.ok) throw new Error('Failed to fetch poll');
  return await res.json();
}

// Submit a vote for a specific poll option in a room
export async function submitVote(room: string, option: string) {
  const res = await fetch(`${API_URL}/vote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ room, option }),
  });
  if (!res.ok) throw new Error('Failed to submit vote');
  return await res.json();
}
