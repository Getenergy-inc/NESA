// This script is used to run the SQL migration directly
// It can be run with: node scripts/run-migration.js

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
require('dotenv').config();

async function runMigration() {
  console.log('Running database migration...');
  
  try {
    // Read the migration SQL
    const migrationSQL = fs.readFileSync(
      path.join(__dirname, '../prisma/migrations/migration.sql'),
      'utf8'
    );
    
    // Connect to the database
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    
    await client.connect();
    console.log('Connected to database');
    
    // Run the migration
    console.log('Executing migration SQL...');
    await client.query(migrationSQL);
    
    console.log('Migration completed successfully!');
    
    // Close the connection
    await client.end();
    
    // Generate Prisma client
    console.log('Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    console.log('Prisma client generated successfully!');
    
  } catch (error) {
    console.error('Error running migration:', error);
    process.exit(1);
  }
}

runMigration();