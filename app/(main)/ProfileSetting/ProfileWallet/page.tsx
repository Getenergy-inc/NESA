'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Copy,
  User,
  Wallet,
  Share2,
  CircleDollarSign,
  ArrowUp,
  ArrowDown,
  ArrowRight
} from 'lucide-react';

export default function WalletPage() {
  const router = useRouter();

  const transactions = [
    {
      status: 'Credit',
      Date: '24 Jan 2024',
      coins: '4'
    },
    {
      status: 'Debit',
      Date: '20 Jan 2024',
      coins: '2'
    },
    {
      status: 'Debit',
      Date: '20 Jan 2024',
      coins: '5'
    },
    {
      status: 'Credit',
      Date: '19 Jan 2024',
      coins: '7'
    },
    {
      status: 'Credit',
      Date: '19 Jan 2024',
      coins: '3'
    },
];
            const getIcon = (status: string) => {
  if (status === 'Credit') return ArrowDown;
  if (status === 'Debit') return ArrowUp;
  return ArrowRight;
};


  return (
    <div className="flex min-h-screen bg-white text-white pt-20">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-[#151007] p-6 flex pt-[50px] flex-col space-y-6 items-center md:items-start">
        <div className="flex flex-col gap-5">
          <button
            onClick={() => router.push('/ProfileSetting')}
            className="flex items-center px-2 md:px-4 py-2 rounded text-sm hover:bg-white/10"
          >
            <User className="w-5 h-5" />
            <span className="hidden md:inline ml-2">Profile Settings</span>
          </button>

          <button className="font-normal px-2 md:px-4 py-2 border bg-white text-black border-white/30 rounded text-sm flex items-center gap-2">
            <Wallet className="w-5 h-5" />
            <span className="hidden md:inline ml-2">Wallet</span>
          </button>

          <button
            onClick={() => router.push('/ProfileSetting/refer')}
            className="flex items-center px-2 md:px-4 py-2 rounded text-sm hover:bg-white/10"
          >
            <Share2 className="w-5 h-5" />
            <span className="hidden md:inline ml-2">Referrals</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 space-y-8 bg-white text-black">
        {/* Current Balance */}
        <div className="bg-[#151007] text-white mt-5 rounded-3xl p-6 w-full shadow-md mb-[50px]">
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-2">
              <Image src="/svgs/logo.svg" alt="nesa logo" width={100} height={100} />
            </h1>
          </div>

          <div className="px-5">
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center text-[9px] gap-2 bg-white text-black px-1 py-1 rounded-[5px] mb-3">
                Afrigold coin
              </div>
            </div>
            <h2 className="text-lg font-medium text-center mb-3">Current Balance</h2>

            <div className="flex items-center justify-center gap-2 text-yellow-400 text-3xl font-bold mb-5">
              <span className="text-4xl">
                <Image
                  src="/images/coinimg.png"
                  alt="coin"
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
              </span>
              <span className="bg-gradient-to-r from-[#FFC247] to-[#E48900] bg-clip-text text-transparent text-5xl font-medium text-center">
                5
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4">
              <div className="flex flex-col gap-2">
                <button
                  className="flex items-center text-[9.5px] justify-center font-medium gap-2 px-10 py-2 rounded-[10px] text-[12px] border hover:bg-gradient-to-r from-[#FFC247] to-[#E48900]"
                  style={{
                    borderColor: '#FFC247',
                    color: '#FFC247',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'black';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#FFC247';
                  }}
                >
                  Donate to get more coins
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#FFC247] to-[#E48900] text-black text-[12px] font-medium px-20 py-2 rounded-[10px] text-sm hover:bg-yellow-300">
                  Fund wallet
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-6">
          <h2 className="text-2xl  mb-4">Transaction History</h2>
          <div className="space-y-3">


{transactions.map((tx, index) => {
  const Icon = getIcon(tx.status);
   const isCredit = tx.status === 'Credit';
  return (
    <div key={index} className="flex items-center gap-3 bg-[#FFF5E0] text-white p-3 rounded-xl px-5">

      <div>
      <h1 className='text-lg text-[#292620]'>Voting Points</h1>

      <div className='flex items-center gap-2'>
        <p className="text-[12px] font-normal text-[#4B463E]">{tx.status}</p>
        <p className='text-2xl text-[#4B463E]'>•</p>
        <p className="text-[12px] text-[#4B463E] font-normal">{tx.Date}</p>
      </div>
      </div>
      
      <div className="ml-auto flex items-center text-sm font-bold text-yellow-400 gap-1">
                                      <Image
                                        src={'/images/coinimg.png'}
                                        alt={'coin'}
                                        width={25}
                                        height={25}
                                        className="rounded-full object-cover"
                                      />
        <p className='font-medium text-xl bg-gradient-to-r from-[#FFC247] to-[#E48900] bg-clip-text text-transparent'>{tx.coins}</p>
        </div>
            <Icon className={`w-4 h-4 ${isCredit ? 'text-green-500' : 'text-red-500'}`}/>
    </div>
  );
})}

          </div>
        </div>
      </main>
    </div>
  );
}
