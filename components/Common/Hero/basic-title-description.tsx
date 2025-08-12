import { raleway } from "@/lib/utils/font";
import Image from "next/image";

type Props = {
  title: string;
  description: string;
  image?: string;
};

const TitleDescriptionHeader: React.FC<Props> = ({ title, description, image }) => {
  return (
    <header className="md:min-h-[40rem] min-h-screen relative">
      <Image
        src={image ?? "/images/bg/team_bg.jpg"}
        alt={"background"}
        width={1024}
        height={800}
        className="w-full h-full object-cover absolute top-0 left-0"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center">
        <div className="space-y-3 text-white md:max-w-4xl container mx-auto text-center mt-5">
          <h1 className={`${raleway.className} font-bold md:text-5xl text-4xl text-deepGold`}>{title}</h1>
          <p className="leading-loose">{description}</p>
        </div>
      </div>
    </header>
  );
};

export default TitleDescriptionHeader;
