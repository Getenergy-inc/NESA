import NomineeProfile from '@/components/UI/judgenomination/NomineeProfile';
import ReviewsAndComments from '@/components/UI/judgenomination/ReviewsSection';

const NomineePage = () => {
  return (
    <div className="">
      <NomineeProfile />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <ReviewsAndComments />
      </div>
    </div>
  );
};

export default NomineePage;