import React from 'react';
import ReviewCard from '@/components/UI/judgenomination/JudgeReview';

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
const GradientLine = () => (
    <div className="h-[3px] bg-gradient-to-r from-[#FFC247] to-[#E48900] mt-2 w-36" />
  );
  
  const NomineeReviewPage = () => {
    return (
      <div className="min-h-screen bg-gray-100 pt-20"> {/* Added pt-20 for top padding */}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-12">
            <h2 className="text-3xl font-medium inline-block">Nominees</h2>
            <GradientLine />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {nominees.map((nominee) => (
              <ReviewCard key={nominee.id} nominee={nominee} />
            ))}
          </div>

        </div>
      </div>
    );
  };
  
  export default NomineeReviewPage;