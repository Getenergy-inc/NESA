"use client";
import Image from 'next/image';
import { useRouter } from "next/navigation";

const judges = [
  {
    name: 'Mr Benneth Osarieme Ogbeiwi',
    title: 'Textured, Opinionated and Professional.',
    about: 'A highly motivated individual with over two decades of experience: sharing knowledge in music & the arts, benneth ogbeiwi\'s doggedness makes it impossible for individuals to deviate from the cause. He has been constantly told that he is very imposing in getting the job done: "I enjoy this privilege, which has afforded me the opportunity to collaborate with my associates to achieve set goals"',
    imageSrc: '/images/judge1.png',
  },
  {
    name: 'Damilola Omotosho',
    project: 'Yeelen Education Project',
    achievements: 'Aminah\'s dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community. An innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change. She also partnered with the Ministry of Education to implement Yeelen\'s innovation',
    imageSrc: '/images/judge7.png',
  },
  {
    name: 'Dr Juliet Ihiabe',
    project: 'Yeelen Education Project',
    achievements: 'Aminah\'s dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community. An innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change. She also partnered with the Ministry of Education to implement Yeelen\'s innovation',
    imageSrc: '/images/judge8.png',
  },
  {
    name: 'Paul Kayode Joash',
    project: 'Yeelen Education Project',
    achievements: 'Paul-Kayode\'s mission is to develop individuals and organisations to operate in their peak performance.\
     At MyDoubleDouble, Paul-Kayode is a prolific international inspirational Speaker, Sales/Marketing Guru and Personal & Business Transformation Coach/Trainer. Principal Coach at MyDoubleDouble. The host of MyDoubleDouble TV/Radio/Conferences both in the UK & Nigeria.',
    imageSrc: '/images/judge9.png',
  },
  {
    name: 'Oluwadaisi Patricia Aderibigbe Santos',
    project: 'Educationalist',
    achievements: 'Aminahs dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community. er innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change. She aslo partnered with the Ministry of Education to implement Yeelen\'s innovation',
    imageSrc: '/images/judge10.png',
  },
  {
    name: 'Dr. Aminah Danjumah',
    project: 'Yeelen Education Project',
    achievements: 'Aminah\'s dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community. An innovative mobile library system and successful partnership with the government showcase her ability to create sustainable change. She also partnered with the Ministry of Education to implement Yeelen\'s innovation',
    imageSrc: '/images/judge6.png',
  },
];




const JudgesList = () => {
     const router = useRouter();

       const handleReview = (name: string) => {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  router.push(`/judge/review/Judge/${slug}`);
  };
  return (
    <section className="bg-white text-black py-10 px-5 lg:px-20">
      <div>
        <h1 className="text-2xl _under_border font-medium mb-6 flex items-center mx-[10px]">Meet Our Current Judges</h1>
        <p className="text-l  font-normal mb-10 flex items-center mx-[10px]">Get to know the NESA Africa/Nigeria Judges, their background, and achievements</p>
      </div>
      <div className="max-w-7xl mx-auto space-y-10">
        {judges.map((judge, index) => (
          <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
              <Image
                src={judge.imageSrc}
                alt={judge.name}
                width={300}
                height={300}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="w-full md:w-2/3 md:px-8">
              <h3 className="font-medium text-3xl mb-2">{judge.name}</h3>
              {judge.title && <p className="text-l mb-6 font-light">{judge.title}</p>}
              {judge.project && <p className="text-l mb-6 font-light">{judge.project}</p>}
              {judge.about && (
                <>
                  <h4 className="text-l mb-1 font-medium">About:</h4>
                  <p className="mb-4 text-black-600 mb-2 font-light">{judge.about}</p>
                </>
              )}
              {judge.achievements && (
                <>
                  <h4 className="text-l mb-1 font-medium">Achievements:</h4>
                  <p className="mb-4 text-black-600 mb-2 font-light">{judge.achievements}</p>
                </>
              )}
            <div
            onClick={()=>handleReview(judge.name)}
            >
<p className="inline-flex items-center cursor-pointer mt-2">
  <span className="relative">
    <span style={{ background: 'var(--Gradient, #FFC247)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
      View Full Profile
    </span>
    <span className="absolute bottom-[-1px] left-0 w-full h-[1px]" style={{ background: 'var(--Gradient, #FFC247)' }}></span>
  </span>
  <span className="ml-1" style={{ color: 'var(--Gradient, #FFC247)' }}> &gt; </span>
</p> 
</div>
 </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JudgesList;