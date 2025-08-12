import FAQs from "@/components/Common/Others/faq";
import { homeFaq } from "@/lib/data/faq";

const HomeFaq = () => {
  return (
    <section>
      <div className="container py-20">
        <h3 className=" md:text-4xl text-3xl">Frequently Asked Questions</h3>

        <FAQs data={homeFaq} />
      </div>
    </section>
  );
};

export default HomeFaq;
