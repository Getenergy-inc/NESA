import { NextRequest, NextResponse } from 'next/server';

// Route segment config - prevent static generation
export const dynamic = 'force-dynamic';
export const revalidate = false;


// Mock GFA Wallet data - In production, this would be replaced with actual wallet service
const mockWalletData: { [key: string]: any } = {
  'user123': {
    userId: 'user123',
    balance: {
      agc: 2500.75, // AfriGold Coin
      usd: 1250.00,
      ngn: 987500.00
    },
    transactions: [
      {
        id: 'tx001',
        type: 'endorsement_payment',
        amount: -500,
        currency: 'usd',
        description: 'NESA-Africa Endorsement - Silver Tier',
        timestamp: '2024-01-20T14:30:00Z',
        status: 'completed'
      },
      {
        id: 'tx002',
        type: 'deposit',
        amount: 1000,
        currency: 'usd',
        description: 'Wallet Top-up',
        timestamp: '2024-01-15T10:15:00Z',
        status: 'completed'
      }
    ],
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-20T14:30:00Z'
  }
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get wallet data for user
    const walletData = mockWalletData[userId];

    if (!walletData) {
      // Create new wallet for user
      mockWalletData[userId] = {
        userId,
        balance: {
          agc: 0,
          usd: 0,
          ngn: 0
        },
        transactions: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }

    const wallet = mockWalletData[userId];

    return NextResponse.json({
      success: true,
      wallet: {
        userId: wallet.userId,
        balance: wallet.balance,
        lastUpdated: wallet.updated_at
      }
    });

  } catch (error) {
    console.error('Error retrieving wallet balance:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, amount, currency, type, description } = body;

    if (!userId || !amount || !currency || !type) {
      return NextResponse.json(
        { success: false, message: 'User ID, amount, currency, and type are required' },
        { status: 400 }
      );
    }

    // Get or create wallet
    if (!mockWalletData[userId]) {
      mockWalletData[userId] = {
        userId,
        balance: {
          agc: 0,
          usd: 0,
          ngn: 0
        },
        transactions: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }

    const wallet = mockWalletData[userId];

    // Validate sufficient balance for debit transactions
    if (amount < 0 && Math.abs(amount) > wallet.balance[currency]) {
      return NextResponse.json(
        { success: false, message: 'Insufficient balance' },
        { status: 400 }
      );
    }

    // Update balance
    wallet.balance[currency] += amount;

    // Add transaction record
    const transaction = {
      id: `tx${Date.now()}`,
      type,
      amount,
      currency,
      description: description || `${type} transaction`,
      timestamp: new Date().toISOString(),
      status: 'completed'
    };

    wallet.transactions.unshift(transaction);
    wallet.updated_at = new Date().toISOString();

    return NextResponse.json({
      success: true,
      message: 'Transaction completed successfully',
      wallet: {
        userId: wallet.userId,
        balance: wallet.balance,
        lastTransaction: transaction
      }
    });

  } catch (error) {
    console.error('Error processing wallet transaction:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
