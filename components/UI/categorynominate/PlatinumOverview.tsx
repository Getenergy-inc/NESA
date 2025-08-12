import React from "react";

const PlatinumOverview: React.FC = () => (
  <section className="max-w-4xl mx-auto my-12 bg-white rounded-xl shadow-lg p-8 md:p-12 text-gray-900">
    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primaryGold">Award Overview</h2>
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      <div>
        <h3 className="text-xl font-semibold mb-2">Award Name</h3>
        <p className="mb-4">Platinum Certificate of Recognition</p>
        <h3 className="text-xl font-semibold mb-2">Award Type</h3>
        <p className="mb-4">Non-Competitive (Global Public Nomination + Internal Judging)</p>
        <h3 className="text-xl font-semibold mb-2">Nomination Access</h3>
        <p className="mb-4">Open to the General Public Worldwide via <span className="text-primaryGold font-semibold">NESA.Africa</span></p>
        <h3 className="text-xl font-semibold mb-2">Judging Criteria</h3>
        <p className="mb-4">Based on SDG 4, Africa Agenda 2063, Social Impact, ESG, and Sustainability</p>
        <h3 className="text-xl font-semibold mb-2">Recognition Items</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Digital Certificate</li>
          <li>Letter of Recognition</li>
          <li>Optional Media Feature</li>
          <li>Printed Certificate (on request)</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Presented By</h3>
        <p className="mb-4">Nigeria Chapter, Santos Creations Educational Foundation (SCEF)</p>
        <h3 className="text-xl font-semibold mb-2">Platform</h3>
        <p className="mb-4">NESA.Africa + GFA Wallet for Certificate Access</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Target Recipients</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Unsung classroom teachers, facilitators, and support staff</li>
          <li>Community education volunteers and grassroots influencers</li>
          <li>Individuals driving inclusive or alternative learning pathways</li>
          <li>Diaspora mentors, scholarship donors, and cultural educators</li>
          <li>School leaders or reformers in marginalized or conflict zones</li>
          <li>Faith-based education heroes and village educators</li>
          <li>Education-related health, nutrition, or safety personnel</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Nomination & Evaluation Process</h3>
        <ol className="list-decimal pl-6 mb-4">
          <li><span className="font-semibold">Step 1 – Public Nomination:</span> Anyone worldwide may nominate a deserving candidate on nesa.africa</li>
          <li><span className="font-semibold">Step 2 – Shortlisting:</span> Chapter reps and partners vet entries based on eligibility & impact scope</li>
          <li><span className="font-semibold">Step 3 – Judges Review:</span> NESA-Africa judges evaluate using a matrix focused on SDG 4 & 5, Africa Agenda 2063, ESG, sustainability, reach, and community equity</li>
          <li><span className="font-semibold">Step 4 – Notification:</span> Selected awardees receive official email and digital credential package</li>
        </ol>
        <p className="text-xs text-gray-500 mb-4">Note: Recipients may request a printed certificate at least 3 weeks before the award gala for ceremonial or institutional use.</p>
      </div>
    </div>
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">Recognition Package</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>Platinum Digital Certificate (downloaded via GFA Wallet)</li>
        <li>Official Letter of Recognition from NESA-Africa Secretariat</li>
        <li>Optional Public Feature on NESA TV and Legacy Booklet</li>
        <li>Invitation to the Honorary Ambassadors Circle</li>
        <li>Profile badge for digital platforms</li>
        <li>Printed Certificate on Request (for ceremonial or institutional use)</li>
      </ul>
    </div>
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">Sample Recognition Sub-Themes (2025)</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Best Education-Friendly State (Nigeria)</p>
          <p className="text-sm text-gray-600 mb-2">State governments excelling in education investments</p>
          <p className="font-semibold">Best University Library (Nigeria)</p>
          <p className="text-sm text-gray-600 mb-2">Institutions promoting open research access & literacy equity</p>
          <p className="font-semibold">Diaspora Education Champions</p>
          <p className="text-sm text-gray-600 mb-2">Diaspora-led education funders or program managers</p>
          <p className="font-semibold">Faith-Based Education Support</p>
          <p className="text-sm text-gray-600 mb-2">Religious organizations driving curriculum and school reform</p>
        </div>
        <div>
          <p className="font-semibold">Best Local Government in Education Innovation</p>
          <p className="text-sm text-gray-600 mb-2">LGAs or local councils improving public school systems</p>
          <p className="font-semibold">Global NGO/Partner Honor Roll</p>
          <p className="text-sm text-gray-600 mb-2">Non-African organizations investing in education in Africa</p>
        </div>
      </div>
    </div>
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-2">Why This Award Matters</h3>
      <blockquote className="border-l-4 border-primaryGold pl-4 italic text-gray-700 mb-2">
        “Legacy is not always loud. Through the Platinum Certificate of Recognition, we are telling the world that the quiet warriors of education matter—and their impact shall be remembered.”
      </blockquote>
      <p className="text-right text-sm text-gray-600">— Dr. Babashola Santos-Aderibigbe, CVO, Santos Creations Educational Foundation (SCEF)</p>
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">Key Dates Summary</h3>
      <table className="w-full text-left mb-4">
        <thead>
          <tr>
            <th className="py-2 pr-4 font-semibold">Activity</th>
            <th className="py-2 font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 pr-4">Public Nominations Open</td>
            <td className="py-2">July 15, 2025</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">Public Nominations Close</td>
            <td className="py-2">November 20, 2025</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">Judges Evaluation Period</td>
            <td className="py-2">September – November 20, 2025</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">Announcement & Recognition</td>
            <td className="py-2">December 22, 2025 (Award Gala)</td>
          </tr>
        </tbody>
      </table>
      <p className="text-xs text-gray-500">Recipients can download digital certificates or request a printed version at least 3 weeks prior to the Award Gala.</p>
    </div>
  </section>
);

export default PlatinumOverview;
