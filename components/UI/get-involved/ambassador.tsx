// components/NesaAmbassador.tsx

import Image from 'next/image'
import Link from 'next/link'

export default function NesaAmbassador() {
  return (
    <section className="bg-[#FFF3DB] py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="rounded-2xl h-full overflow-hidden">
          <Image
            src="/images/amb.jpg" // Replace with actual image path
            alt="NESA Ambassador"
            width={600}
            height={900}
            className="w-full h-full  object-cover"
          />
        </div>

        {/* Text content */}
        <div className="text-[#1C1C1C]">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Become a NESA Ambassador
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-6">
            The NESA Africa Ambassadorship Program is an exclusive opportunity
            for passionate individuals, thought leaders, and education advocates
            to play a vital role in promoting and expanding the reach of NESA
            Africa. Ambassadors serve as key representatives in their respective
            countries or regions, driving engagement through nominations,
            partnerships, advocacy, and fundraising efforts. As a NESA Africa
            Ambassador, you will be recognized as a leading voice in Africa&apos;s
            education landscape, enjoy access to VIP networking opportunities,
            and contribute to shaping policies and initiatives that empower the
            next generation.
          </p>

          <h3 className="text-xl font-semibold mb-3">What Ambassadors Do</h3>
          <ul className="space-y-2 text-lg">
            <li>✅ Represent NESA Africa in your country</li>
            <li>✅ Engage local communities in education initiatives</li>
            <li>✅ Promote NESA Africa through social media & events</li>
            <li>✅ Mobilize nominations & sponsorships</li>
          </ul>

          <div className="mt-6">
            <Link
              href="/apply-ambassador"
              className="text-[#FFA63A] font-semibold text-lg inline-flex items-center gap-2 hover:underline"
            >
              Apply as an Ambassador <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
