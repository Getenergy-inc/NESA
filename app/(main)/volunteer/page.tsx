import TitleDescriptionHeader from "@/components/Common/Hero/basic-title-description";
import { volunteerCategories, volunteerFeatures } from "@/lib/data/others";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <TitleDescriptionHeader
        title="Volunteers @ NESA 2023"
        description="Volunteering with us offers a unique opportunity to give back, develop new skills, and work on projects that have a real impact. Our volunteers are a testament to the power of community engagement in driving educational initiatives"
      />
      <main className="py-10">
        <div className="container">
                    <div className="mt-12">
            <h3 className="text-2xl font-bold text-center mb-2">Volunteer with NESA-Africa 2025</h3>
            <p className="text-lg text-zinc-700 text-center mb-6">
              Contribute your time and talent to Africa’s largest education transformation campaign!<br />
              Join the NESA-Africa 2025 team as a volunteer and help build a continent-wide impact platform recognizing outstanding contributions to education.<br />
              Work remotely or in-person, develop new skills, and collaborate with a passionate pan-African network dedicated to education equity.
            </p>

            <div className="bg-zinc-50 rounded-lg p-6 mb-8">
              <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">🔧 Open Volunteer Roles by Division</h4>
              <p className="mb-2">A total of <span className="font-bold">90 volunteer positions</span> are available across 3 divisions:</p>

              {/* SOCD */}
              <div className="mb-6">
                <h5 className="text-lg font-semibold flex items-center gap-2 mb-2">📋 Strategic Operations & Compliance Division (SOCD)</h5>
                <p className="mb-2 text-zinc-600">Focus: Coordination, Policy, Reporting, Local Chapters</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left border mb-2">
                    <thead>
                      <tr className="bg-zinc-100">
                        <th className="py-2 px-3 font-medium">Volunteer Role</th>
                        <th className="py-2 px-3 font-medium">Slots</th>
                        <th className="py-2 px-3 font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-3">Local Chapter Assistant Coordinators</td>
                        <td className="py-2 px-3">12</td>
                        <td className="py-2 px-3">Support local operations and data reporting in designated cities</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">Membership & Ambassador Registry Assistants</td>
                        <td className="py-2 px-3">5</td>
                        <td className="py-2 px-3">Manage membership and ambassador documentation and queries</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">Monitoring & Evaluation Volunteers</td>
                        <td className="py-2 px-3">4</td>
                        <td className="py-2 px-3">Track project progress and compile feedback reports</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">Chapter Content Reviewers</td>
                        <td className="py-2 px-3">4</td>
                        <td className="py-2 px-3">Help review local chapter reports, media, and project outcomes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-zinc-500">Total SOCD Volunteers: 25</p>
              </div>

              {/* TDSD */}
              <div className="mb-6">
                <h5 className="text-lg font-semibold flex items-center gap-2 mb-2">🖥️ Technology & Digital Services Division (TDSD)</h5>
                <p className="mb-2 text-zinc-600">Focus: Website, Development, User Experience, Security</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left border mb-2">
                    <thead>
                      <tr className="bg-zinc-100">
                        <th className="py-2 px-3 font-medium">Volunteer Role</th>
                        <th className="py-2 px-3 font-medium">Slots</th>
                        <th className="py-2 px-3 font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-3">Frontend Developer Volunteers</td>
                        <td className="py-2 px-3">4</td>
                        <td className="py-2 px-3">Assist with NESA.africa UI implementation</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">Backend Developer Volunteers</td>
                        <td className="py-2 px-3">3</td>
                        <td className="py-2 px-3">Work on system integrations, flows, APIs</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">DevOps Assistants</td>
                        <td className="py-2 px-3">2</td>
                        <td className="py-2 px-3">Support deployment, testing, and security</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">Data Entry / CMS Operators</td>
                        <td className="py-2 px-3">3</td>
                        <td className="py-2 px-3">Upload and update nominations, content, forms</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">Digital QA Testers</td>
                        <td className="py-2 px-3">3</td>
                        <td className="py-2 px-3">Assist with pre-launch testing and feedback loops</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-zinc-500">Total TDSD Volunteers: 15</p>
              </div>

              {/* OMBDD */}
              <div className="mb-4">
                <h5 className="text-lg font-semibold flex items-center gap-2 mb-2">📡 Online Media & Business Development Division (OMBDD)</h5>
                <p className="mb-2 text-zinc-600">Focus: Publicity, Marketing, Partnerships, Events</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left border mb-2">
                    <thead>
                      <tr className="bg-zinc-100">
                        <th className="py-2 px-3 font-medium">Volunteer Role</th>
                        <th className="py-2 px-3 font-medium">Slots</th>
                        <th className="py-2 px-3 font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-3">Social Media Content Writers</td>
                        <td className="py-2 px-3">6</td>
                        <td className="py-2 px-3">Draft posts, captions, and weekly campaigns</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">Media Presenters (NESA TV / It’s In Me Radio)</td>
                        <td className="py-2 px-3">6</td>
                        <td className="py-2 px-3">Host shows, conduct interviews, voiceovers</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">Video Editors / Graphics Designers</td>
                        <td className="py-2 px-3">4</td>
                        <td className="py-2 px-3">Support content visuals and campaign media</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">Corporate Sponsorship Volunteers</td>
                        <td className="py-2 px-3">4</td>
                        <td className="py-2 px-3">Research & support donor outreach strategy</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">Influencer Campaign Assistants</td>
                        <td className="py-2 px-3">3</td>
                        <td className="py-2 px-3">Support brand visibility and online events</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">Virtual Event Hosts (X Spaces, Zoom)</td>
                        <td className="py-2 px-3">2</td>
                        <td className="py-2 px-3">Moderate events and record summaries</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">TikTok & YouTube Micro-Content Creators</td>
                        <td className="py-2 px-3">3</td>
                        <td className="py-2 px-3">Curate reels, shorts, and educational skits</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-zinc-500">Total OMBDD Volunteers: 28</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-2">💼 Benefits of Volunteering</h4>
              <ul className="list-disc ml-6 text-zinc-700 space-y-1">
                <li>Digital Certificate of Service</li>
                <li>Eligibility for free Ambassador Tier-1 Membership (1 year)</li>
                <li>Access to exclusive trainings and mentoring sessions</li>
                <li>Featured Profile on the NESA Volunteer Wall of Achievers</li>
                <li>Discounted access to tickets, merch, and webinars</li>
                <li>Priority for recommendation letters and future roles</li>
              </ul>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-2">📍 Requirements</h4>
              <ul className="list-disc ml-6 text-zinc-700 space-y-1">
                <li>Must be 18 years or older</li>
                <li>Must commit at least 4–8 hours weekly (remote or hybrid roles)</li>
                <li>Proficiency in tools like Google Docs, Zoom, Canva, or Trello is an added advantage</li>
                <li>Passionate about education and youth empowerment in Africa</li>
              </ul>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-2">📝 How to Apply</h4>
              <ol className="list-decimal ml-6 text-zinc-700 space-y-1">
                <li>Review the available roles above.</li>
                <li>
                  Visit:{" "}
                  <a
                    href="https://www.nesa.africa/volunteer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    www.nesa.africa/volunteer
                  </a>
                </li>
                <li>Fill out the volunteer form and indicate your preferred role.</li>
                <li>Attach your short bio or CV and portfolio (if applicable).</li>
                <li>Wait for an email confirmation from the Volunteer Desk.</li>
              </ol>
              <p className="mt-2">
                <span className="font-semibold">Inquiries:</span>{" "}
                <a href="mailto:volunteers@santoscreations.org" className="text-blue-600 underline">
                  volunteers@santoscreations.org
                </a>
              </p>
              <p className="mt-1 text-zinc-600">
                <span className="font-semibold">Volunteer Recruitment Period:</span> June–November 2025
              </p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold mb-3">Ready to help shape Africa’s education story?</p>
              <a
                href="https://forms.gle/3d1b7Z5c9f8g2x1u6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold text-lg"
              >
                Apply Now
              </a>
              <p className="mt-3 text-zinc-500 text-sm">Apply Today. Serve. Learn. Lead.</p>
            </div>
        <br/>
        <br/>

          <h2 className="max-w-4xl mx-auto text-center font-bold md:text-5xl sm:text-4xl text-3xl mb-4">
            Santos Creations Educational Foundation Volunteer Program
          </h2>
          <div className="mt-6 space-y-10">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
              {volunteerCategories.map((data, id) => (
                <div key={id} className="space-y-4 text-center">
                  <div className="flex items-center justify-center">
                    <Image src={`/images/careers/volunteers/${data.image}`} alt={data.title} width={300} height={300} />
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-lg">{data.title}</p>
                    <p className="text-zinc-600">{data.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-5">
              {volunteerFeatures.map((item, id) => (
                <div key={id} className="p-6 space-y-3">
                  <p className="md:text-3xl text-2xl font-semibold">{item.title}</p>
                  <ul className="ml-8 list-disc space-y-1 text-zinc-600">
                    {item.options.map((option, id) => (
                      <li key={id}>{option}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
