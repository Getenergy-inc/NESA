// careers
export type Career = {
  id: number | string;
  image: string;
  title: string;
};

export type CareerCategory = Career & { description: string };

const careers: Career[] = [
  {
    id: "admin-and-business",
    image: "/images/careers/admin.png",
    title: "Administrative and Business Development Services Team",
  },
  {
    id: "2",
    image: "/images/careers/service.png",
    title: "Online Services Team",
  },
  {
    id: "3",
    image: "/images/careers/tech.png",
    title: "ICT and Technology Development Team",
  },
  {
    id: "4",
    image: "/images/careers/project.png",
    title: "Project and Event Management Team",
  },
  {
    id: "5",
    image: "/images/careers/media.png",
    title: "Media Services Team",
  },
  {
    id: "6",
    image: "/images/careers/intern.png",
    title: "Internship & Volunteers",
  },
];

export default careers;

export const careerCategories: CareerCategory[] = [
  {
    ...careers[0],
    description:
      "the Administrative and Business Development Services Team. We are the driving force that ensures seamless operations and strategic growth for the success of this groundbreaking initiative. Our dedicated team is committed to excellence, working tirelessly to provide robust administrative support and spearhead business development efforts.",
  },
];

// jobs
export type JobType = "full-time" | "part-time" | "contract" | "remote" | "intern";
export type Job = { image: string; position: string; description: string; lagos: string; type: JobType };
