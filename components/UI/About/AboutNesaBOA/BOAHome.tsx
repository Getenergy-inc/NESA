import Spotlight from "./Spotlight";
import Values from "./Values";
import AdvisoryCategories from "./AdvisoryCategories";
import Responsibilities from "./Responsibilties";
import Safeguards from "./Safeguards";
import Benefit from "./Benefits";
import Join from "./Join";
import ApplyNominate from "./ApplyNominate";
import Calendar from "./Calendar";
import FAQs from "./FAQs";

export default function BOAHome() {
  return <div>
    <Spotlight />
    <Values />
    <AdvisoryCategories />
    <Responsibilities />
    <Safeguards />
    <Benefit />
    <Join />
    <ApplyNominate />
    <Calendar />
    <FAQs />
  </div>;
}