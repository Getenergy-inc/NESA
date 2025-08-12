
import { notFound } from 'next/navigation';
import Image from 'next/image';
import styles from './ReviewPage.module.css';
import CommentCard from '@/components/UI/judgenomination/JudgeComment';

interface Judges {
  name: string;
  title: string;
  achievements: string;
  experience: string,
  bio:string;
  imageURL: string;
}
interface Comment {
  id: number;
  name: string;
  title: string;
  imageURL: string;
  comment:string;
}

// Mock data for demonstration
const mockJudges: Judges[] = 
[
  {
    name: "Mr Joseph Johnson",
    title: "Brothers Building Futures (BBF)",
    achievements: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change. She aslo partnered with the Ministry of Education to implement Yeelen's innovative after-school program in 10 public schools, improving standardized test scores by an average of 20%.",
    bio:"Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change. ",
    imageURL:"/images/Judgereview1.png",
    experience:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
  },
    {
    name: 'Mr Benneth Osarieme Ogbeiwi',
    title: 'Textured, Opinionated and Professional.',
    bio: 'A highly motivated individual with over two decades of experience: sharing knowledge in music & the arts, benneth ogbeiwi\'s doggedness makes it impossible for individuals to deviate from the cause. He has been constantly told that he is very imposing in getting the job done: "I enjoy this privilege, which has afforded me the opportunity to collaborate with my associates to achieve set goals"',
    imageURL: '/images/judge1.png',
    achievements: "Dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change. She aslo partnered with the Ministry of Education to implement Yeelen's innovative after-school program in 10 public schools, improving standardized test scores by an average of 20%.",
    experience:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
    
  },
  {
    name: 'Damilola Omotosho',
    title: 'Yeelen Education Project',
    achievements: 'Aminah\'s dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community. An innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change. She also partnered with the Ministry of Education to implement Yeelen\'s innovation',
    imageURL: '/images/judge7.png',
    experience:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    bio: 'A highly motivated individual with over two decades of experience: sharing knowledge in music & the arts, benneth ogbeiwi\'s doggedness makes it impossible for individuals to deviate from the cause. He has been constantly told that he is very imposing in getting the job done: "I enjoy this privilege, which has afforded me the opportunity to collaborate with my associates to achieve set goals"',
  },
  {
    name: 'Dr Juliet Ihiabe',
    title: 'Yeelen Education Project',
    achievements: 'Aminah\'s dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community. An innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change. She also partnered with the Ministry of Education to implement Yeelen\'s innovation',
    imageURL: '/images/judge8.png',
    experience:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    bio: 'A highly motivated individual with over two decades of experience: sharing knowledge in music & the arts, benneth ogbeiwi\'s doggedness makes it impossible for individuals to deviate from the cause. He has been constantly told that he is very imposing in getting the job done: "I enjoy this privilege, which has afforded me the opportunity to collaborate with my associates to achieve set goals"',
  },
  {
    name: 'Paul Kayode Joash',
    title: 'Yeelen Education Project',
    achievements: 'Paul-Kayode\'s mission is to develop individuals and organisations to operate in their peak performance.\
     At MyDoubleDouble, Paul-Kayode is a prolific international inspirational Speaker, Sales/Marketing Guru and Personal & Business Transformation Coach/Trainer. Principal Coach at MyDoubleDouble. The host of MyDoubleDouble TV/Radio/Conferences both in the UK & Nigeria.',
    imageURL: '/images/judge9.png',
    experience:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    bio: 'A highly motivated individual with over two decades of experience: sharing knowledge in music & the arts, benneth ogbeiwi\'s doggedness makes it impossible for individuals to deviate from the cause. He has been constantly told that he is very imposing in getting the job done: "I enjoy this privilege, which has afforded me the opportunity to collaborate with my associates to achieve set goals"',
  },
  {
    name: 'Oluwadaisi Patricia Aderibigbe Santos',
    title: 'Educationalist',
    achievements: 'Aminahs dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community. er innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change. She aslo partnered with the Ministry of Education to implement Yeelen\'s innovation',
    imageURL: '/images/judge10.png',
    experience:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    bio: 'A highly motivated individual with over two decades of experience: sharing knowledge in music & the arts, benneth ogbeiwi\'s doggedness makes it impossible for individuals to deviate from the cause. He has been constantly told that he is very imposing in getting the job done: "I enjoy this privilege, which has afforded me the opportunity to collaborate with my associates to achieve set goals"',
  },
  {
    name: 'Dr. Aminah Danjumah',
    title: 'Yeelen Education Project',
    achievements: 'Aminah\'s dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community. An innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change. She also partnered with the Ministry of Education to implement Yeelen\'s innovation',
    imageURL: '/images/judge6.png',
    experience:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    bio: 'A highly motivated individual with over two decades of experience: sharing knowledge in music & the arts, benneth ogbeiwi\'s doggedness makes it impossible for individuals to deviate from the cause. He has been constantly told that he is very imposing in getting the job done: "I enjoy this privilege, which has afforded me the opportunity to collaborate with my associates to achieve set goals"',
  },
];
const mockComment: Comment[] = 
[
  {
    id: 1,
    name: "Dr. Aminah Danjumah",
    title: "Yeelen Education Project",
    comment:"dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change. ",
    imageURL:"/images/Ellipse.png",
  },
  {
    id: 2,
    name: "Dr. Aminah Danjumah",
    title: "Yeelen Education Project",
    comment:"dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community, his innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change. ",
    imageURL:"/images/Ellipse.png",
  },



];

interface PageProps {
  params: { name: string };
}

export default function ReviewDetailPage({ params }: PageProps) {
  const formattedName = params.name.toLowerCase().replace(/-/g, " ");
  const judges = mockJudges.find(
    (n) => n.name.toLowerCase() === formattedName
  );


  if (!judges) {
    notFound(); // shows the default 404 page if nominee not found
  }

  const GradientLine = () => (
    <div className="h-[3px] bg-gradient-to-r from-[#FFC247] to-[#E48900] mt-2 w-36" />
  );

  return (
    <div className="	p-0 m-0 flex flex-col">
      <div className="bg-[#FFFFFF] pb-[60px]">

      <div className='mb-[290px]' style={{
            backgroundImage: `url('/images/nomineeNav.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '200px',
          }}>
   
            <div className='flex flex-col space-y-4  pt-28 items-center justify-center'>
                <div>
              <Image
                src={judges.imageURL}
                alt={judges.name}
                width={200}
                height={200}
                className="rounded-full object-cover"
              />
              </div>
              <div>
                <h1 className="flex justify-center px-8  text-[30px] md:text-[40px] font-medium">{judges.name}</h1>
                <p className="flex justify-center text-[19px] md:text-[23px] font-normal">{judges.title}</p>
              </div>
            </div>
      </div>

        <div className='pt-5 pb-10 px-5 md:px-10  ml-10 mr-10 flex flex-col space-y-6 border border-[#B6B5B3] rounded-2xl'>
          <div className="flex flex-col gap-[4px]">
            <h1 className="text-[18px] font-medium mb-[10px]">Bio :</h1>
            <p className="text-[14px] font-normal">{judges.bio}</p>
          </div>

          <div className="flex flex-col gap-[4px]">
            <h1  className="text-[18px] font-medium mb-[10px]">Achievements:</h1>
            <p className="text-[14px] font-normal">{judges.achievements}</p>
          </div>

          <div className="flex flex-col gap-[4px]">
            <h1  className="text-[18px] font-medium mb-[10px]">Experience:</h1>
            <p className="text-[14px] font-normal">{judges.experience}</p>
          </div>

          <div className="flex flex-col gap-[4px]">
            <h1  className="text-[20px] font-medium mb-[20px]">Certificates</h1>
            <div className="flex flex-col md:flex-row gap-6 w-full h-full">
    
                <Image
                src="/images/certificate1.png"
                alt={judges.name}
                width={200}
                height={200}
              />
                <Image
                src="/images/certificate2.png"
                alt={judges.name}
                width={200}
                height={200}
              />
                <Image
                src="/images/certificate1.png"
                alt={judges.name}
                width={200}
                height={200}
              />
            </div>
          </div>

          <div>
            <h1  className="text-[20px] font-medium mb-[20px]">Images and Videos</h1>
            <div className="flex flex-col md:flex-row gap-6">
              <Image
                src="/images/video1.png"
                alt={judges.name}
                width={200}
                height={200}
              />
              <Image
                src="/images/nomineeInfoImg.png"
                alt={judges.name}
                width={200}
                height={200}
              />
              <Image
                src="/images/nomineeInfoImg1.png"
                alt={judges.name}
                width={200}
                height={200}
              />
              <Image
                src="/images/nomineeInfoImg2.png"
                alt={judges.name}
                width={200}
                height={200}
              />
            </div>
          </div>
          
       </div>


      </div>

    </div>
  );
}
