"use client"
import React from "react";
import Button from "@/components/Common/Button";
import { useRouter } from "next/navigation";

const AmbassadorPage = () => {
    const router = useRouter();

    const handleApplyClick = () => {
        router.push("/apply-ambassador");
    };

    return (
        <div className="py-20 px-6">
            <div className="flex flex-row justify-between pt-8">
            <h1 className="text-2xl font-bold mb-4">Ambassador Program</h1>
            <Button onClick={handleApplyClick} text="Apply now" variant="filled" className="mb-4 mr-8">
                Apply as Ambassador
            </Button>
            </div>
            <p className="mb-8">
            <span>
                The <b>Ambassador Program</b> is designed to empower individuals who are passionate about education and want to make a difference in their communities. As an ambassador, you will have the opportunity to represent our organization, promote our mission, and engage with your local community.<span role="img" aria-label="Globe">🌍</span> <b>Join as an Ambassador – NESA-Africa 2025</b>
                <br /><br />
                Contribute your skills to achieving <b>Education for All</b> across Africa.
                <br /><br />
                Become part of a powerful movement transforming education in Africa. As a <b>NESA-Africa 2025 Ambassador</b>, you are not just a representative — you are a changemaker. Whether you're in Africa or the diaspora, your voice and effort can help drive continental impact through community engagement, advocacy, project promotion, and digital campaigns.
                <br /><br />
                <b><span role="img" aria-label="Target">🎯</span> Why Join?</b>
                <ul className="list-disc ml-6">
                    <li>Promote education equity and inclusion</li>
                    <li>Represent your country, city, or institution in the NESA movement</li>
                    <li>Gain recognition, experience, and global exposure</li>
                    <li>Join high-impact teams working towards Africa’s Education Agenda 2030</li>
                </ul>
                <br />
                <b><span role="img" aria-label="Medal">🏅</span> 3 Tiers of NESA-Africa Ambassadors</b>
                <table className="w-full my-4 border text-sm">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-2 py-1">Tier</th>
                            <th className="border px-2 py-1">Description</th>
                            <th className="border px-2 py-1">One-Time Admin Fee</th>
                            <th className="border px-2 py-1">Annual Membership Dues</th>
                            <th className="border px-2 py-1">Key Benefits</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-2 py-1">Ambassador-1</td>
                            <td className="border px-2 py-1">Local Chapter Project Ambassador (e.g., EduAid/NESA)</td>
                            <td className="border px-2 py-1">$10</td>
                            <td className="border px-2 py-1">$50/year</td>
                            <td className="border px-2 py-1">Recognition, Project Access, Digital Certificate</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Ambassador-2</td>
                            <td className="border px-2 py-1">Country/Regional Representative across both EduAid & NESA</td>
                            <td className="border px-2 py-1">$20</td>
                            <td className="border px-2 py-1">$80/year</td>
                            <td className="border px-2 py-1">Priority Participation, SCEF Badge, Chapter Leadership Eligibility</td>
                        </tr>
                        <tr>
                            <td className="border px-2 py-1">Ambassador-3</td>
                            <td className="border px-2 py-1">Global or Multi-Project Strategic Ambassador</td>
                            <td className="border px-2 py-1">$50</td>
                            <td className="border px-2 py-1">$200/year</td>
                            <td className="border px-2 py-1">Full Representation Rights, Official ID, Invitation to SCEF Board/Chapter Advisory Teams</td>
                        </tr>
                    </tbody>
                </table>
                <span className="text-xs">
                    <span role="img" aria-label="Lightbulb">💡</span> All tiers are open to professionals, media advocates, educators, students (18+), and sponsors worldwide.
                </span>
                <br /><br />
                <b><span role="img" aria-label="Briefcase">💼</span> Duties of an Ambassador</b>
                <ul className="list-disc ml-6">
                    <li>Represent NESA-Africa 2025 and SCEF in your locality or diaspora network</li>
                    <li>Promote nominations, scholarships, fundraising, and EduAid projects</li>
                    <li>Host or support local chapter activities, online campaigns, and awareness sessions</li>
                    <li>Engage communities, institutions, and media to amplify our message</li>
                    <li>Submit \monthly ambassador updates and referrals via the dashboard</li>
                    <li>Participate in periodic trainings, webinars, and meetings</li>
                </ul>
                <br />
                <b><span role="img" aria-label="Money">💸</span> Benefits of Becoming an Ambassador</b>
                <ul className="list-disc ml-6">
                    <li>Digital Recognition Certificate</li>
                    <li>NESA Africa 2025 Ambassador ID Card</li>
                    <li>Access to training, international mentorship, and webinars</li>
                    <li>Up to 10–20% referral/commission on funds raised or partners you introduce</li>
                    <li>Media features on NESA TV &amp; “It’s In Me” Radio</li>
                    <li>Opportunity to earn allowances during major campaigns</li>
                    <li>Discounted access to NESA-Africa events, merchandise, and courses</li>
                    <li>Eligible for leadership or chapter appointment roles in your region</li>
                </ul>
                <br />
                <b><span role="img" aria-label="Handshake">🤝</span> Global &amp; Diaspora Integration</b>
                <ul className="list-disc ml-6">
                    <li>Local Chapters across Africa</li>
                    <li>Online Country Networks in the diaspora</li>
                    <li>Sector-Focused Missions (Media, EduTech, Policy, Gender, Environment, etc.)</li>
                </ul>
                <span className="block mt-2">
                    SCEF recognizes and mobilizes diaspora support via:
                    <ul className="list-disc ml-6">
                        <li>In-kind contributions (equipment, platforms, time)</li>
                        <li>Skills volunteering (e.g., designers, developers, advisors)</li>
                        <li>Financial contributions or donor engagement</li>
                    </ul>
                </span>
                <br />
                <div className="bg-primaryGold rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-white">
                        <span role="img" className="text-white" aria-label="Medal">🏅</span>
                        Join as an Ambassador – NESA-Africa 2025
                    </h2>
                    <p className="mb-2 font-medium">Empower Education. Lead Change. Represent Africa.</p>
                    <p className="mb-4">
                        Are you ready to be a voice for education transformation across Africa?<br />
                        Do you want to contribute to the future of millions of learners through advocacy, storytelling, fundraising, and leadership?
                    </p>
                    <p className="mb-4">
                        Become a <b>NESA-Africa Ambassador</b> and help us drive the <b>Education For All</b> mission across the continent and diaspora. This is more than just a title—it’s a powerful movement backed by the Santos Creations Educational Foundation (SCEF).
                    </p>

                    <h3 className="text-lg font-semibold mt-6 mb-2 flex items-center gap-2">
                        <span role="img" aria-label="Shield">🔰</span>
                        Ambassador Tiers, Registration &amp; Annual Dues
                    </h3>
                    <div className="overflow-x-auto mb-2">
                        <table className="min-w-full border text-sm mb-2">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-2 py-1">Tier</th>
                                    <th className="border px-2 py-1">Role</th>
                                    <th className="border px-2 py-1">One-Time Administrative Fee</th>
                                    <th className="border px-2 py-1">Yearly Membership Due</th>
                                    <th className="border px-2 py-1">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border px-2 py-1">Ambassador 1</td>
                                    <td className="border px-2 py-1">Project-Based</td>
                                    <td className="border px-2 py-1">$10</td>
                                    <td className="border px-2 py-1">$50</td>
                                    <td className="border px-2 py-1">Works on either EduAid-Africa or NESA-Africa</td>
                                </tr>
                                <tr>
                                    <td className="border px-2 py-1">Ambassador 2</td>
                                    <td className="border px-2 py-1">Local Chapter/ Dual Project</td>
                                    <td className="border px-2 py-1">$20</td>
                                    <td className="border px-2 py-1">$80</td>
                                    <td className="border px-2 py-1">Promotes both projects within a structured local chapter</td>
                                </tr>
                                <tr>
                                    <td className="border px-2 py-1">Ambassador 3</td>
                                    <td className="border px-2 py-1">Strategic/Continental/Diaspora</td>
                                    <td className="border px-2 py-1">$50</td>
                                    <td className="border px-2 py-1">$200</td>
                                    <td className="border px-2 py-1">Represents SCEF globally or at national levels, leads initiatives</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mb-4">
                        <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold mr-2">✅</span>
                        All ambassadors enjoy <b>1-year FREE membership dues upon registration</b>.<br />
                        You only pay a one-time administrative fee to cover onboarding and resource materials.
                    </div>

                    <h3 className="text-lg font-semibold mt-6 mb-2 flex items-center gap-2">
                        <span role="img" aria-label="Pin">📌</span>
                        Benefits of Becoming a NESA-Africa Ambassador
                    </h3>
                    <ul className="list-disc ml-6 mb-4">
                        <li><span role="img" aria-label="Graduation Cap">🎓</span> 1-Year Membership Access (renewable after onboarding)</li>
                        <li><span role="img" aria-label="Medal">🎖️</span> Ambassadorship Certificate &amp; Digital Badge</li>
                        <li><span role="img" aria-label="Building">🏛️</span> Representation Rights in your chapter or region</li>
                        <li><span role="img" aria-label="Globe">🌍</span> Profile Listing on NESA &amp; SCEF Platforms</li>
                        <li><span role="img" aria-label="Loudspeaker">📢</span> Priority Media Features &amp; Ambassador Spotlight</li>
                        <li><span role="img" aria-label="Receipt">🧾</span> Access to Ambassador Toolkit &amp; Trainings</li>
                        <li><span role="img" aria-label="Money">💸</span> Earn Commission (% from donations, sponsorships &amp; ticket sales)</li>
                        <li><span role="img" aria-label="Luggage">🧳</span> Eligible for Travel &amp; Event Representation</li>
                        <li><span role="img" aria-label="Target">🎯</span> Discounts on all SCEF Trainings, Edu-Tours &amp; Merchandise</li>
                        <li><span role="img" aria-label="Medal">🏅</span> Nomination Privileges (Nominate up to 5 candidates/year)</li>
                        <li><span role="img" aria-label="Gift">🎁</span> Afri-Gold Coin Bonus &amp; Referral Points</li>
                        <li><span role="img" aria-label="Books">📚</span> Exclusive Access to SCEF learning resources and partner content</li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-6 mb-2 flex items-center gap-2">
                        <span role="img" aria-label="Toolbox">🧰</span>
                        Duties &amp; Expectations of NESA-Africa Ambassadors
                    </h3>
                    <ul className="list-disc ml-6 mb-4">
                        <li>Drive nomination campaigns and voting participation</li>
                        <li>Mobilize awareness about Education For All</li>
                        <li>Promote EduAid-Africa scholarships and impact stories</li>
                        <li>Organize or co-host virtual/local engagement sessions</li>
                        <li>Represent SCEF at events, panels, and expos</li>
                        <li>Share regular updates from your community or region</li>
                        <li>Fundraise or connect SCEF to donors/sponsors (earn % bonus!)</li>
                        <li>Uphold the mission, vision, and ethics of SCEF in all actions</li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-6 mb-2 flex items-center gap-2">
                        <span role="img" aria-label="Money Bag">💰</span>
                        Ambassador Income Opportunities
                    </h3>
                    <ul className="list-disc ml-6 mb-4">
                        <li>Fundraising commissions (up to 5–10% of funds raised via your unique link)</li>
                        <li>Sponsorship sourcing bonuses</li>
                        <li>Merchandise affiliate sales</li>
                        <li>EduAid donations tracking</li>
                        <li>Voter referrals for Afri-Gold Coin rewards</li>
                        <li>Participation allowances (subject to project budget and engagement)</li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-6 mb-2 flex items-center gap-2">
                        <span role="img" aria-label="Globe">🌍</span>
                        Choose Your Chapter
                    </h3>
                    <ul className="list-disc ml-6 mb-4">
                        <li>
                            <span role="img" aria-label="Nigeria Flag">🇳🇬</span> National Chapters (Nigeria, Ghana, Kenya, etc.)
                        </li>
                        <li>
                            <span role="img" aria-label="Globe">🌍</span> Diaspora Chapters (UK, US, Canada, UAE, etc.)
                        </li>
                        <li>
                            <span role="img" aria-label="Laptop">💻</span> Online Chapter (for remote or cross-border activities)
                        </li>
                    </ul>
                    <p className="mb-4">
                        Each chapter is led by a Local Chapter President (LCP) and supported by members, volunteers, and staff under the Strategic Operations &amp; Compliance Division (SOCD).
                    </p>

                    <h3 className="text-lg font-semibold mt-6 mb-2 flex items-center gap-2">
                        <span role="img" aria-label="Envelope">📩</span>
                        How to Apply
                    </h3>
                    <ol className="list-decimal ml-6 mb-4">
                        <li>
                            Complete the Ambassador Registration Form at:<br />
                            <a
                                href="https://www.nesa.africa/ambassador"
                                className="text-blue-600 underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                👉 www.nesa.africa/ambassador
                            </a>
                        </li>
                        <li>
                            Upload a short 2-minute video on:
                            <ul className="list-disc ml-6">
                                <li>Why you support NESA-Africa</li>
                                <li>What impact you hope to make</li>
                            </ul>
                        </li>
                        <li>Select your Ambassador Tier and preferred chapter</li>
                        <li>Pay your one-time registration/admin fee (via GFA Wallet)</li>
                        <li>Receive your Ambassador Welcome Toolkit and start representing us!</li>
                    </ol>
                    <p className="mb-4">
                        All ambassadors are subject to review after one year for renewal, upgrade, or chapter leadership nomination.
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                        <span className="bg-gray-100 px-2 py-1 rounded">#NESA2025Ambassador</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">#JoinTheMission</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">#EducationForAll</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">#AfricaRising</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">#LeadWithImpact</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">#YouthInAction</span>
                    </div>
                </div>
                <b><span role="img" aria-label="Envelope">📩</span> How to Register</b>
                <ol className="list-decimal ml-6">
                    <li>Choose your Ambassador Tier (1, 2, or 3)</li>
                    <li>Pay a one-time administrative fee via the GFA Wallet:<br />
                        Amb-1: $10 | Amb-2: $20 | Amb-3: $50
                    </li>
                    <li>Complete your ambassador profile and select your chapter of affiliation</li>
                    <li>Pay annual dues ($50, $80, or $200 respectively)</li>
                    <li>Begin your ambassador journey with NESA-Africa 2025!</li>
                </ol>
                <br />
                <b>Ready to make your mark?</b>
                <br /><br />
                <span role="img" aria-label="Pointing Right">👉</span> Visit <a href="https://www.nesa.africa/ambassador" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.nesa.africa/ambassador</a>
                <br />
                <span role="img" aria-label="Email">📧</span> Contact: <a href="mailto:ambassador@santoscreations.org" className="text-blue-600 underline">ambassador@santoscreations.org</a>
                <br />
                <span role="img" aria-label="Credit Card">💳</span> Payments via: <a href="https://www.getfinance.africa" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">GFA Wallet (www.getfinance.africa)</a>
            </span>

            </p>

        </div>
    );
};

export default AmbassadorPage;