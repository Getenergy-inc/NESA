// Node 18+ script to test local signup-flow and log key response parts
// Usage: node c:\Users\USER\Desktop\nesa-work\nesa\nesa-test\scripts\test-signup.js

const axios = require('axios');

const BASE = 'http://localhost:5000';
const api = axios.create({ baseURL: BASE, withCredentials: true, headers: { 'Content-Type': 'application/json' } });

async function run() {
  const email = `test.signup+${Date.now()}@example.com`;
  const payload = {
    email,
    password: 'Test@12345',
    country: 'Nigeria',
    state: 'Lagos',
    accountType: 'Individual',
    intents: ['Become Ambassador', 'Join Local Chapter'],
    fullName: 'Test User',
    phoneNumber: '+2348000000000',
    preferredLanguage: 'EN'
  };

  try {
    const res = await api.post('/api/v1/auth/signup-flow', payload);
    const data = res.data || {};
    console.log('success:', data.success);
    console.log('message:', data.message);
    console.log('user role:', data?.data?.user?.role);
    console.log('chapter:', data?.data?.chapter);
    console.log('wallet:', data?.data?.wallet);
    console.log('tokens present:', !!data?.data?.tokens);
    console.log('post-signup actions:', data?.data?.postSignupActions || data?.data?.nextSteps);
  } catch (err) {
    const e = err.response?.data || err.message;
    console.error('Signup test failed:', e);
    process.exitCode = 1;
  }
}

run();