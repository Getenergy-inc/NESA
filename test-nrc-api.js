// Quick test script to check NRC API
// Run with: node test-nrc-api.js

async function testNRCAPI() {
  console.log('🧪 Testing NRC API...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const health = await fetch('http://localhost:3000/api/v1/nrc/health');
    const healthData = await health.json();
    console.log('✅ Health:', healthData);

    // Test 2: Pending nominees
    console.log('\n2. Testing pending nominees endpoint...');
    const pending = await fetch('http://localhost:3000/api/v1/nrc/admin/nominees/pending');
    const pendingData = await pending.json();
    console.log('Response:', JSON.stringify(pendingData, null, 2));
    
    if (pendingData.success) {
      console.log('\n📊 Stats:');
      console.log('  Pending:', pendingData.data.stats.pending);
      console.log('  Verified:', pendingData.data.stats.verified);
      console.log('  Published:', pendingData.data.stats.published);
      console.log('  Rejected:', pendingData.data.stats.rejected);
      console.log('\n📝 Nominees:', pendingData.data.nominees.length);
    } else {
      console.log('❌ Error:', pendingData.message);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testNRCAPI();
