#!/bin/bash

# Script to fix all NRC database connections
# This replaces connectDB with connectNRCDB in all NRC API routes

echo "Fixing NRC database connections..."

# List of files to fix
files=(
  "app/api/v1/nrc/volunteers/[id]/nominees/route.ts"
  "app/api/v1/nrc/volunteers/[id]/tasks/route.ts"
  "app/api/v1/nrc/volunteers/[id]/dashboard/route.ts"
  "app/api/v1/nrc/volunteers/[id]/agc/withdraw/route.ts"
  "app/api/v1/nrc/volunteers/[id]/agc/transactions/route.ts"
  "app/api/v1/nrc/volunteers/register/route.ts"
  "app/api/v1/nrc/volunteers/bulk-operations/route.ts"
  "app/api/v1/nrc/volunteers/check-status/route.ts"
  "app/api/v1/nrc/tasks/route.ts"
  "app/api/v1/nrc/tasks/[id]/complete/route.ts"
  "app/api/v1/nrc/reports/generate/route.ts"
  "app/api/v1/nrc/nominees/[id]/route.ts"
  "app/api/v1/nrc/nominees/bulk/route.ts"
  "app/api/v1/nrc/health/route.ts"
  "app/api/v1/nrc/analytics/dashboard/route.ts"
  "app/api/v1/nrc/agc/transactions/route.ts"
  "app/api/v1/nrc/agc/process-weekly-bonuses/route.ts"
  "app/api/v1/nrc/agc/award-verification/route.ts"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Fixing $file..."
    # Replace import statement
    sed -i "s/import connectDB from '@\/lib\/configs\/database';/import connectNRCDB from '@\/lib\/configs\/nrcDatabase';/g" "$file"
    # Replace function calls
    sed -i "s/await connectDB();/await connectNRCDB();/g" "$file"
  else
    echo "File not found: $file"
  fi
done

echo "Done! All NRC routes now use connectNRCDB"
