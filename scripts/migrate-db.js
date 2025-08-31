// This script is used to run Prisma migrations in production
// It can be run with: node scripts/migrate-db.js

const { execSync } = require('child_process');

// Run Prisma migrations
console.log('Running Prisma migrations...');
try {
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  console.log('Migrations completed successfully!');
} catch (error) {
  console.error('Error running migrations:', error);
  process.exit(1);
}

// Generate Prisma client
console.log('Generating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Prisma client generated successfully!');
} catch (error) {
  console.error('Error generating Prisma client:', error);
  process.exit(1);
}

console.log('Database setup completed!');