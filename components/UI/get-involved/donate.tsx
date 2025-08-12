// components/DonateNow.tsx

import Image from 'next/image'
import Link from 'next/link'

export default function DonateNow() {
  return (
    <section className="bg-white py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="text-[#1C1C1C]">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Donate now</h2>
          <p className="text-base md:text-lg leading-relaxed mb-6">
            Volunteering with NESA Africa 2025 is a rewarding opportunity to be part
            of a transformative movement that recognizes and promotes excellence in
            education across Africa. As a volunteer, you will contribute your skills,
            time, and expertise to support the planning, execution, and post-event
            activities of the NESA Africa Awards. Volunteers play a key role in areas
            such as event coordination, outreach, digital engagement, logistics, and
            administrative support. Whether you are passionate about education, event
            management, media, or advocacy, your involvement helps ensure the success
            of NESA Africa while gaining valuable experience, networking opportunities,
            and professional recognition. Join our team and be a driving force behind
            Africa&apos;s most prestigious education awards!
          </p>

          <h3 className="text-xl font-semibold mb-3">Ways to Donate:</h3>
          <ul className="space-y-2 text-lg">
            <li>✅ One-time or Monthly Contributions</li>
            <li>✅ Sponsor a Student&apos;s Education</li>
            <li>✅ Fund an Educational Project</li>
            <li>✅ Corporate & Institutional Giving</li>
          </ul>

          <div className="mt-6">
            <Link
              href="/donate"
              className="text-[#FFA63A] font-semibold text-lg inline-flex items-center gap-2 hover:underline"
            >
              Donate Now <span>→</span>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="rounded-2xl h-full overflow-hidden">
          <Image
            src="/images/getinvolved/get5.png" 
            alt="Donate sign being held by hands"
            width={600}
            height={700}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
