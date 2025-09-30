// This file is just to test TypeScript path resolution
import dbConnect from '@/lib/dbConnect';
import Endorsement from '@/lib/models/Endorsement';
import { sendEmail } from '@/lib/services/emailService';

// Just to avoid unused import warnings
const testFunction = async () => {
  await dbConnect();
  const endorsements = await Endorsement.find({});
  await sendEmail({
    to: 'test@example.com',
    subject: 'Test Email',
    html: '<p>This is a test email</p>'
  });
  return endorsements;
};

export default testFunction;