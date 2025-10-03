// app/judges/data.ts
export type Judge = {
  id: string;
  name: string;
  nesaId: string;
  judgeLevel: string,
  imageURL: string;
  title: string;
  certificationDate: string,
  averageScore: number,
  assignedCategories: string[];
};

export type Nominee = {
  id: string;
  title: string;
  name: string;
  category: string;
  bio: string;
  achievements: string;
  imageURL: string;
  reviews: Review[];
};

export type Review = {
    id: string,
  judgeId: string;
  rating: number;
  comment: string;
};

export const MOCK_JUDGE: Judge[] =
    [
    {
  id: 'judge-001',
  name: 'Dr. Jane Smith',
  nesaId: 'NESA-987654',
  judgeLevel: "Senior Judge",
  imageURL: "/images/Ellipse.png",
  title:"Yeelen Education Project",
  certificationDate: "July 20, 2025",
  averageScore: 8.4,
  assignedCategories: ['Best Education Initiative in North West Zone Award', 'Oil And Gas CSR in Education Award',
    'Food And Beverages CSR in Education Award',
    'Manufacturing CSR in Education Award'],
    },
    {
  id: 'judge-002',
  name: 'Dr. Queen',
  nesaId: 'NESA-987655',
  judgeLevel: "Senior Judge",
  imageURL: "/images/Ellipse.png",
  title:"Yeelen Education Project",
  certificationDate: "July 20, 2025",
  averageScore: 8.4,
  assignedCategories: ['Best Education Initiative in North West Zone Award', 'best-csr-education-africa', 'community-impact-local'],
    },
    {
  id: 'judge-003',
  name: 'Dr. Isaiah',
  nesaId: 'NESA-987656',
  judgeLevel: "Senior Judge",
  imageURL: "/images/Ellipse.png",
  title:"Yeelen Education Project",
  certificationDate: "July 20, 2025",
  averageScore: 8.4,
  assignedCategories: ['best-media-advocacy-nigeria', 'best-csr-education-africa', 'community-impact-local'],
    }
    ];


export const MOCK_CATEGORIES = [
  { slug: 'best-Education-initiative-in-north-west-zone-award', title: 'Best Education Initiative in North West Zone Award' },
  { slug: 'oil-and-gas-csr-in-education-award', title: 'Oil And Gas CSR in Education Award' },
  { slug: 'manufacturing-csr-in-education-award', title: 'Manufacturing CSR in Education Award' },
  { slug: 'food-and-Beverages-csr-in-education-award', title: 'Food And Beverages CSR in Education Award'},
];

export const MOCK_NOMINEES: Nominee[] = [
  {
    id: 'nom-001',
    title: "Brothers Building Futures (BBF)",
    name: 'Educational Times (Print)',
    category: 'Best Education Initiative in North West Zone Award',
    achievements:
      "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.",
    bio: 'Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.',
    imageURL: "/images/judgereview.png",
    reviews:[
          {
    id: "r1",
    judgeId: "judge-001",
    rating: 4,
    comment: "Great work on education initiatives.",
  },
  {
    id: "r2",
    judgeId: "judge-002",
    rating: 3,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 1,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 2,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },
    ]
  },
    { id: 'nom-002', 
    title: "Brothers Building Futures (BBF)",
    name: 'EduVoice FM', 
    category: 'Best Education Initiative in North West Zone Award', 
    achievements:
      "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.",
    bio: 'Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.',
    imageURL:"/images/judgereview.png",
        reviews:[
          {
    id: "r1",
    judgeId: "judge-001",
    rating: 4,
    comment: "Great work on education initiatives.",
  },
  {
    id: "r2",
    judgeId: "judge-002",
    rating: 3,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },  {
    id: "r2",
    judgeId: "judge-003",
    rating: 1,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 2,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },
    ]
  },

  { id: 'nom-003', 
    title: "Brothers Building Futures (BBF)",
    name: 'BankAid CSR Program', 
    category: 'Best Education Initiative in North West Zone Award', 
    achievements:
      "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.",
    bio: 'Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.',
    imageURL:"/images/judgereview.png",
        reviews:[
  {
    id: "r2",
    judgeId: "judge-002",
    rating: 3,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },  {
    id: "r2",
    judgeId: "judge-003",
    rating: 1,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 2,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },
    ]
  },

  { id: 'nom-004',
    title: "Brothers Building Futures (BBF)",
    name: 'Local Helpers NGO', 
    category: 'Oil And Gas CSR in Education Award', 
    achievements:
      "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.",
    bio: 'Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.',
    imageURL:"/images/judgereview.png",
        reviews:[
          {
    id: "r1",
    judgeId: "judge-001",
    rating: 4,
    comment: "Great work on education initiatives.",
  },
  {
    id: "r2",
    judgeId: "judge-002",
    rating: 3,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },  {
    id: "r2",
    judgeId: "judge-003",
    rating: 1,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 2,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },
    ]
  },
  { id: 'nom-005',
    title: "Brothers Building Futures (BBF)",
    name: 'Local Helpers NGO', 
    category: 'Oil And Gas CSR in Education Award', 
    achievements:
      "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.",
    bio: 'Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.',
    imageURL:"/images/judgereview.png",
        reviews:[
  {
    id: "r2",
    judgeId: "judge-002",
    rating: 3,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },  {
    id: "r2",
    judgeId: "judge-003",
    rating: 1,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 2,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },
    ]
  },
  { id: 'nom-006',
    title: "Brothers Building Futures (BBF)",
    name: 'Local Helpers NGO', 
    category: 'Manufacturing CSR in Education Award', 
    achievements:
      "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.",
    bio: 'Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.',
    imageURL:"/images/judgereview.png",
        reviews:[
          {
    id: "r1",
    judgeId: "judge-001",
    rating: 4,
    comment: "Great work on education initiatives.",
  },
  {
    id: "r2",
    judgeId: "judge-002",
    rating: 3,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },  {
    id: "r2",
    judgeId: "judge-003",
    rating: 1,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 2,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },
    ]
  },
  { id: 'nom-007',
    title: "Brothers Building Futures (BBF)",
    name: 'Local Helpers NGO', 
    category: 'Manufacturing CSR in Education Award', 
    achievements:
      "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.",
    bio: 'Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.',
    imageURL:"/images/judgereview.png",
        reviews:[
          {
    id: "r1",
    judgeId: "judge-001",
    rating: 4,
    comment: "Great work on education initiatives.",
  },
  {
    id: "r2",
    judgeId: "judge-002",
    rating: 3,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },  {
    id: "r2",
    judgeId: "judge-003",
    rating: 1,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 2,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },
    ]
  },
  { id: 'nom-008',
    title: "Brothers Building Futures (BBF)",
    name: 'Local Helpers NGO', 
    category:'Food And Beverages CSR in Education Award', 
    achievements:
      "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.",
    bio: 'Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.',
    imageURL:"/images/judgereview.png",
        reviews:[
  {
    id: "r2",
    judgeId: "judge-002",
    rating: 3,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },  {
    id: "r2",
    judgeId: "judge-003",
    rating: 1,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 2,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },
    ]
  },
  { id: 'nom-009',
    title: "Brothers Building Futures (BBF)",
    name: 'Local Helpers NGO', 
    category: 'Food And Beverages CSR in Education Award', 
    achievements:
      "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.",
    bio: 'Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.',
    imageURL:"/images/judgereview.png",
        reviews:[
  {
    id: "r2",
    judgeId: "judge-002",
    rating: 3,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },  {
    id: "r2",
    judgeId: "judge-003",
    rating: 1,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 2,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },
    ]
  },
  { id: 'nom-010',
    title: "Brothers Building Futures (BBF)",
    name: 'Local Helpers NGO', 
    category: 'Food And Beverages CSR in Education Award', 
    achievements:
      "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.",
    bio: 'Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change.',
    imageURL:"/images/judgereview.png",
        reviews:[
          {
    id: "r1",
    judgeId: "judge-001",
    rating: 4,
    comment: "Great work on education initiatives.",
  },
  {
    id: "r2",
    judgeId: "judge-002",
    rating: 3,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },  {
    id: "r2",
    judgeId: "judge-003",
    rating: 1,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 2,
    comment: "Outstanding impact on the community.",
  },
  {
    id: "r2",
    judgeId: "judge-003",
    rating: 5,
    comment: "Outstanding impact on the community.",
  },
    ]
  },
];


