import Hero from "@/components/UI/Fundraiser/Hero";
import Tracks from "@/components/UI/Fundraiser/Tracks";
import Offers from "@/components/UI/Fundraiser/Offers";
import Journey from "@/components/UI/Fundraiser/Journey";
import Eligibility from "@/components/UI/Fundraiser/Eligibility";
import KPIs from "@/components/UI/Fundraiser/KPIs";
import FAQs from "@/components/UI/Fundraiser/FAQs";


// import Footer from "@/components/Footer";

export default function FundraiserMainPage(){
  return (
    <main className="min-h-screen bg-nesa-gradient">
      
      <Hero />
      <Tracks />
      <Offers />
      <Journey />
      <Eligibility />
      <KPIs />
      <FAQs />
    
    
    </main>
  );
}
