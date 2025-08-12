import { ImgTitleDesc, ListWithOption } from "../types/global";

type Sponsor = {
  title: string;
  description: string;
};

type Benefit = Sponsor;

export const sponsors: Sponsor[] = [
  {
    title: "Blue Garnet Sponsorship (50 Million Naira): ",
    description: `Gain premier visibility as the title sponsor, with your branding featured prominently across all event communications, two premium tables at the dinner, and special recognition during the ceremony.`,
  },
  {
    title: "Diamond Sponsorship (25 Million Naira): ",
    description: `Sponsor a major award category, enjoy prominent branding, and receive one premium table, along with verbal recognition at the event.`,
  },
  {
    title: "Platinum Sponsorship (10 Million Naira): ",
    description: `Support an award sub-category, benefit from eventbranding, acknowledgment during the ceremony, and 8 preferred seats.`,
  },
  {
    title: "Gold Sponsorship (5 Million Naira): ",
    description: `Feature your branding within the event venue and on our website, with 6 seats reserved for your guests.`,
  },
  {
    title: "Silver Sponsorship (1.5 Million Naira): ",
    description: `Enjoy website branding and 4 seats at this prestigious event.`,
  },
];

export const additionalOpportunities: Sponsor[] = [
  {
    title: "Table Sponsorship:",
    description: `Host a table for your organization or guests, offering a unique opportunity for networking in an inspiring environment. Includes table branding and mention in the event program.`,
  },
  {
    title: "Custom Branding:",
    description: `Tailor your branding across various event materials, from brochures to digital displays, ensuring your brand stands out.`,
  },
];

export const benefits: Benefit[] = [
  {
    title: "Brand Visibility",
    description:
      "Your brand will be prominently displayed to a distinguished audience, aligning with a cause that impacts the nation.",
  },
  {
    title: "Make Impact",
    description:
      "Directly support educational initiatives and the NESA mission, making a tangible difference in the educational landscape of Nigeria.",
  },
  {
    title: "Networking Opportunities",
    description:
      "Connect with key figures from the government, educational sector, corporate Nigeria, and international organizations in an exclusive setting.",
  },
];

// BECOME A MEMBER
type Tier = ListWithOption;

type UnderTier = ListWithOption;

export const tiers: Tier[] = [
  {
    title: "Silver Membership",
    options: [
      "Access to SCEF newsletters and updates.",
      "Invitations to select SCEF events and webinars.",
      "SCEF membership certificate.",
    ],
  },
  {
    title: "Platinum Membership",
    options: [
      "All benefits of Silver Membership.",
      "Early access to new SCEF programs and initiatives.",
      "Opportunities to participate in policy discussion forums.",
    ],
  },
  {
    title: "Gold Membership",
    options: [
      "All benefits of Platinum Membership.",
      "Exclusive invitations to SCEF's high-profile events and galas.",
      "Recognition in SCEF publications and on the website.",
    ],
  },
  {
    title: "Blue Garnet Membership (Corporate)",
    options: [
      "All benefits of Gold Membership.",
      "Corporate logo featured on SCEF's partner page.",
      "Opportunities for joint initiatives and co-branding with SCEF.",
    ],
  },
];

export const moreUnderTiers: UnderTier[] = [
  {
    title: "Features and Functionalities:",
    options: [
      "Financial contributions from members, allocated to SCEF operations and projects.",
      "A transparent system for the distribution of funds, with set percentages allocated to operations, project support, and educational grants.",
      "Regular financial statements and impact reports for members.",
    ],
  },
  {
    title: "Goals and Objectives:",
    options: [
      "	To establish a sustainable financial base for SCEF's operations and projects.",
      "To create a transparent and accountable system for financial contributions.",
      "	To enable SCEF to extend more educational grants to deserving candidates and projects.",
    ],
  },
  {
    title: "Allocation of Funds:",
    options: [
      "A specified percentage of each membership contribution allocatedto operational costs.",
      "Remaining funds distributed among various SCEF projects, including direct support and educational grants",
    ],
  },
  {
    title: "Performance Metrics:",
    options: [
      "Total funds raised through memberships.",
      "Distribution efficiency of funds to various projects and operational needs.",
      "Impact assessment of funded projects and educational grants.",
    ],
  },
];

// JOIN US

type JoinUsType = {
  heading: string;
  body: string;
  image: string;
  ctaText: string;
  path: string;
};

export const joinUsContents: JoinUsType[] = [
  {
    heading: "JOIN US BY BECOMING A MEMBER",
    body: `By becoming a member, you not only unlock exclusive benefits but also stay at the forefront of educational innovation. Join a community of forward-thinkers committed to spearheading the transformation of education in Nigeria. Your membership is a key to shaping the future of learning!"`,
    image: "/images/join/pic1.png",
    ctaText: "Become a Member",
    path: "/become-a-member",
  },
  {
    heading: "VOLUNTEER FOR NESA",
    body: ` As a volunteer for NESA 2023, you have the power to contribute your time and skills to create an unforgettable experience. 

Be an essential part of the team that orchestrates a memorable event dedicated to advancing education in Nigeria. Your commitment can spark a positive revolution`,
    image: "/images/join/pic2.png",
    ctaText: "Volunteer Now",
    path: "/volunteer",
  },
  {
    heading: "INTERN WITH US",
    body: `Our internships provide real-world experience in educational program management, event coordination, and research. Interns 

    at NESA Africa will not only contribute to our mission but also develop professional skills that will serve them in their future careers.`,
    image: "/images/join/pic4.png",
    ctaText: "Continue",
    path: "/interns",
  },
  {
    heading: "WORK WITH US",
    body: `Become an integral part of our passionate team! Explore diverse opportunities to collaborate and contribute to the resounding success of NESA 2023. 

Whether you're an individual, organization or expert in your field, we welcome you to explore meaningful ways to shape the educational landscape together. Your expertise can be the driving force behind our collective success`,
    image: "/images/join/pic3.png",
    ctaText: "Explore Careers",
    path: "/careers",
  },
];

// VOLUNTEER
export const volunteerCategories: ImgTitleDesc[] = [
  {
    image: "project-based.png",
    description: "Participate in educational projects, contributing to their development and execution",
    title: "Project-Based Volunteering",
  },
  {
    image: "operational-support.png",
    description: "Assist in SCEF's day-to-day operations, including administrative tasks and community outreach.",
    title: "Operational Support Volunteering:",
  },
  {
    image: "volunteer-teaching.png",
    description:
      "Engage directly in educational programs, delivering quality education and impacting student learning across Africa.",
    title: "Volunteer Teaching",
  },
];

export const volunteerFeatures: UnderTier[] = [
  {
    title: "Features and Functionalities:",
    options: [
      "A structured application and selection process for volunteers.",
      "	Comprehensive orientation and training for all volunteers.",
      "Matching system to align volunteers with roles that suit their skills and interests.",
      "Continuous support and feedback mechanism for volunteer development.",
    ],
  },
  {
    title: "Goals and Objectives:",
    options: [
      "To effectively utilize volunteer skills and enthusiasm in enhancing SCEF's educational projects and operations.",
      "To provide volunteers with enriching experiences that contribute to SCEF's goals and their personal development.",
      "To foster a sense of community and commitment among volunteers towards SCEF's mission.",
    ],
  },
];

// NESA MEDIA
