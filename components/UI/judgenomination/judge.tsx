import React, { useState } from 'react';
import Image from "next/image";
import ReviewCard from '@/components/UI/judgenomination/JudgeReview';
import Judges from "@/components/UI/judgenomination/judges1";
import FAQs from "@/components/Common/Others/faq";
import { Pencil } from 'lucide-react'; // or any icon lib





const JudgePage: React.FC = () => {

const nominees = [
  {
    id: 1,
    name: "Mr Joseph Johnson",
    title: "Brothers Building Futures (BBF)",
    achievements: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community.",
    imageURL:"/images/judgereview.png",
  },
  {
    id: 2,
    name: "Mr Joseph Johnson",
    title: "Brothers Building Futures (BBF)",
    achievements: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community.",
    imageURL:"/images/judgereview.png",
  },
  {
    id: 3,
    name: "Mr Joseph Johnson",
    title: "Brothers Building Futures (BBF)",
    achievements: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community.",
    imageURL:"/images/judgereview.png",
  },
  {
    id: 4,
    name: "Mr Joseph Johnson",
    title: "Brothers Building Futures (BBF)",
    achievements: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community.",
    imageURL:"/images/judgereview.png",
  },
  {
    id: 5,
    name: "Mr Joseph Johnson",
    title: "Brothers Building Futures (BBF)",
    achievements: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community.",
    imageURL:"/images/judgereview.png",
  },
  {
    id: 6,
    name: "Mr Joseph Johnson",
    title: "Brothers Building Futures (BBF)",
    achievements: "dedication to improving rural education, particularly for girls, demonstrates a significant impact on her community.",
    imageURL:"/images/judgereview.png",
  },
];

const Criteria = [
  {
    question: "Criteria 1: Lorem Ipsum",
    answer: `Lorem ipsum dolor sit amet consectetur. Vitae scelerisque non enim laoreet. Suspendisse in ut sagittis.`,
  },
  {
    question: "Criteria 2: Lorem Ipsum",
    answer: `Lorem ipsum dolor sit amet consectetur. Vitae scelerisque non enim laoreet. Suspendisse in ut sagittis.`,
  },
  {
    question: "Criteria 3: Lorem Ipsum",
    answer: `Lorem ipsum dolor sit amet consectetur. Vitae scelerisque non enim laoreet. Suspendisse in ut sagittis. `,
  },
  {
    question: "Criteria 4: Lorem Ipsum",
    answer: `Lorem ipsum dolor sit amet consectetur. Vitae scelerisque non enim laoreet. Suspendisse in ut sagittis. `,
  },
];




const GradientLine = () => (
    <div className="h-[3px] bg-gradient-to-r from-[#FFC247] to-[#E48900] mt-2 w-36" />
  );

return(
  <div className='flex flex-col'>
      <div className='mt-[27px] md:mt-[93px] px-[7%] md:px-[10%] flex items-center gap-10' style={{
            backgroundImage: `url('/images/judgenavimg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '200px',
          }}>
              {/* image */}
<div className="relative flex-shrink-0 w-[150px] h-[150px] hidden md:block">
      {/* Profile image */}
      <Image
        src="/images/Judgereview1.png"
        alt="profileImage"
        width={150}
        height={150}
        className="rounded-full object-cover w-full h-full"
      />

      {/* Edit button */}
      <button
        className="absolute bottom-0 right-0 bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full shadow-md"
        title="Edit"
      >
        <Pencil size={16} className="text-black" />
      </button>
    </div>

            {/* texts */}
            <div className='gap-2 flex flex-col'>
              <h1 className='text-4xl bg-gradient-to-r from-[#FFC247] to-[#E48900] bg-clip-text text-transparent font-medium'>Welcome, [Name] </h1>
              <p className='text-white font-light'>Lorem ipsum dolor sit amet consectetur. Vitae scelerisque non enim laoreet. Suspendisse in ut sagittis.</p>
            </div>
      </div>


{/* second section */}
          <div className='bg-[#FFF5E0] p-20 pl-[50px] md:pl-[8%] '>

            <div className='flex items-center gap-10 px-auto flex flex-col md:flex-row'>

              <div className=' flex-shrink-0'>
                <Image
                src={'/images/awardimg.png'}
                alt={'profileImage'}
                width={300}
                height={300}
                className=" object-cover"
              />
              </div>

              <div className=''>
                <h1 className='text-2xl md:text-3xl'>Your Assigned Category Is:</h1>
                <h1 className='text-2xl md:text-3xl mb-[9px]'>[Category Name]</h1>
                <p className='font-light'>Lorem ipsum dolor sit amet consectetur. Dolor sed enim neque sit tellus. In morbi tristique nulla velit. Mauris sollicitudin non id quam ut vel nunc nullam. Lobortis porttitor et dolor pretium posuere tristique tempus. Eu sit malesuada lacus ultrices feugiat posuere rhoncus diam. Lobortis ante nisi fames tristique feugiat convallis gravida ac sapien. Purus in semper ut egestas elementum mattis feugiat lorem.</p>
              </div>

            </div>

          </div>

          {/* pending nominee */}
                <div className=" bg-gray-100 pt-10">
                  <div className="container px-1 pb-8">
                    <div className="mb-12 mx-12 md:mx-0 flex justify-between" >
                      <div>
                      <h2 className="text-xl font-medium md:text-3xl md:font-medium inline-block">Pending Nominee Reviews</h2>
                      <GradientLine />
                      </div>
                      <div>
                        <a href="/judge/JudgeReview" className='text-[#E0AA3E] underline'>See all &gt;</a>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                      {nominees.map((nominee) => (
                        <ReviewCard key={nominee.id} nominee={nominee} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* meet the judges */}
                <Judges />

                {/* judging crieteria */}
                <section>
                <div className="container py-20">
                  <h3 className="text-3xl">Judging Criteria</h3>
                  <GradientLine/>

                  <FAQs data={Criteria}/>
                </div>
              </section>


      </div>
)

}


export default JudgePage;