'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Copy, Download, User, Wallet, Share2, CircleDollarSign } from 'lucide-react';

export default function ReferralPage() {
  const referralCode = '237980hszaya8';
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-white text-white pt-20">
      {/* Sidebar */}
        <aside className="w-20 md:w-64 bg-[#151007] p-6 flex pt-[50px] flex-col space-y-6 items-center md:items-start">
          <div className="flex flex-col gap-5">
            <button 
            onClick={() => router.push('/ProfileSetting')}
            className="flex items-center px-2 md:px-4 py-2 rounded text-sm hover:bg-white/10">
              <User className="w-5 h-5" />
              <span className="hidden md:inline ml-2">Profile Settings</span>
            </button>

            <button
            onClick={() => router.push('/ProfileSetting/ProfileWallet')}
             className="flex items-center px-2 md:px-4 py-2 rounded text-sm hover:bg-white/10">
              <Wallet className="w-5 h-5" />
              <span className="hidden md:inline ml-2">Wallet</span>
            </button>

            <button className="font-normal px-2 md:px-4 py-2 border bg-white text-black border-white/30 rounded text-sm flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              <span className="hidden md:inline">Referrals</span>
            </button>
          </div>
        </aside>


      {/* Main Content */}
      <main className="flex-1 p-10 space-y-8 bg-white text-black">
        {[ 
          {
            title: 'Voting/Nomination Referral',
            showWithdraw: false,
          },
          {
            title: 'Merchandise Referral',
            showWithdraw: true,
          },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-[#151007] text-white mt-5 rounded-3xl p-6 w-full shadow-md"
          >
            <div className="mb-4">
              <h1 className="text-2xl font-bold mb-2">              <Image
                              src={"/svgs/logo.svg"}
                              alt="nesa logo"
                              width={100}
                              height={100}
                              id="nav_logo"
                            /></h1>
              <h2 className="text-lg font-medium mt-[40px]">{card.title}</h2>
            </div>

            <div className="flex items-center gap-4 text-yellow-400 text-3xl font-bold mb-2">
              <span className="text-4xl">
                              <Image
                                src={'/images/coinimg.png'}
                                alt={'coin'}
                                width={60}
                                height={60}
                                className="rounded-full object-cover"
                              />
              </span>
              <span className="bg-gradient-to-r from-[#FFC247] to-[#E48900] bg-clip-text text-transparent text-5xl font-medium" >25</span>
            </div>

            <p className="text-sm text-white mb-4">
              Refer to get more earn more coins
            </p>

            <div className="flex flex-col  sm:flex-row sm:items-center gap-4">
              <input
                type="text"
                value={referralCode}
                readOnly
                className="flex-1 px-4 py-2 rounded text-black font-mono"
              />
              <div className='flex flex-col gap-2'>
              {card.showWithdraw && (
                <button
                className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm border hover:bg-gradient-to-r from-[#FFC247] to-[#E48900]"
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
                Withdraw Reward <CircleDollarSign size={16} />
              </button>

              )}

              <button className="flex items-center gap-2 bg-gradient-to-r from-[#FFC247] to-[#E48900] text-black px-4 py-2 rounded-[10px] text-sm hover:bg-yellow-300"
              >
                Copy Referral Link <Copy size={16} />
              </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
