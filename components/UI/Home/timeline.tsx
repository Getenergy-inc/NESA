import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const data = [
  {
    range: "May 1, 2025-",
    endRange: "End of May 2025",
    title: "Nomination Launch & Awareness Phase",
    list: [
      "Launch of the nomination process on the NNESA digital platform. Inviting entries from eligible participants across various categories",
      "Continuous collection of nominations, allowing participants to submit their applications along with supporting documents and evidence of work.",
    ],
  },
  {
    range: "June – July",
    endRange: "2025",
    title: "Nomination Review & Pre-Voting Preparation",
    list: [
      "Judges & verification teams review submitted nominations.",
      "Verification of nominees' supporting documents & video documentaries.",
      "Judges evaluate & shortlist the top nominees for public voting.",
    ],
  },
  {
    range: "August 2025",
    endRange: "",
    title: "Pre-Voting Publicity & Event Ticket Sales",
    list: [
      "Feature top nominees in digital ads & interviews.",
      "Behind-the-scenes nominee documentaries on NESA TV & partner networks.",
    ],
  },
  {
    range: "September –",
    endRange: "October 2025",
    title: "Voting, Africa Education Expo & Grand Awards Ceremony",
    list: [
      "Public Voting Opens (August 1, 2025)",
      "NESA Africa Education Expo (October 15, 2025)",
      "Grand Awards & Fundraising Dinner (October 16-17, 2025)",
      "A panel of judges reviews the submissions to determine the recipients of the Platinum Awards in each cate",
    ],
  },
];

const Timeline = () => {
  const router = useRouter(); 
  return (
    <section className="relative text-white py-16 ">
            <Image
        src={"/images/datebg.png"}
        alt="dark background"
        className="w-full h-full object-cover -z-[1] absolute top-0 left-0"
        width={1440}
        height={1580}
      />
      <div className="container mx-auto px-4 py-16">
        <h3 className="relative inline-block font-medium text-2xl pb-2 mb-12">
          NESA Nigera 2025 Award Timelines
          <span className="absolute bottom-0 left-0 w-40 h-1 bg-yellow-500"></span>
        </h3>
        
        <div className="space-y-16">
          {data.map((item, id) => (
            <div key={id} className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/6 text-xl font-medium">
                <p>{item.range}</p>
                <p>{item.endRange}</p>
              </div>
              
              <div className="flex-grow md:w-5/6 border-l-4 border-yellow-500  pl-8 space-y-4">
                <h4 className="text-xl md:text-2xl font-medium">{item.title}</h4>
                
                <ul className="list-disc pl-6 space-y-2 text-white/90">
                  {item.list.map((list, idx) => (
                    <li key={idx}>{list}</li>
                  ))}
                </ul>
                
                <button onClick={() => {router.push('/about-nesa')}} className="flex items-center gap-2 text-yellow-500">
                  <span>Read more</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 bg-yellow-500/10 rounded-xl p-8 flex flex-col md:flex-row justify-center items-center gap-8 shadow-lg border border-yellow-500/30 animate-pulse">
          <div className="flex-1 container mx-auto px-6 flex flex-col items-center text-center">
            <h4 className="text-lg font-bold text-yellow-400 flex items-center gap-2 mb-2 justify-center">
              <span role="img" aria-label="celebration">🎉</span>
              AWARDS GALA: <span className="text-white ml-2">December 22, 2025</span>
            </h4>
            <ul className="space-y-2 text-lg text-white/90">
              <li>
          <span role="img" aria-label="location">📍</span>
          <span className="ml-2">Hybrid Event | Broadcast Across Africa | Host Country: <span className="font-semibold text-yellow-300">Nigeria</span></span>
              </li>
              <li>
          <span role="img" aria-label="organizer">🏛</span>
          <span className="ml-2">Organizer: <span className="font-semibold text-yellow-300">Santos Creations Educational Foundation</span></span>
              </li>
              <li>
          <span role="img" aria-label="money">💰</span>
          <span className="ml-2">Powered by: <span className="font-semibold text-yellow-300">GFA Wallet Technologies Ltd</span></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
