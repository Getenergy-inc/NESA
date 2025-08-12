import Image from "next/image";

type Props = {
  heading: string;
  description: string;
};

const BasicHeader: React.FC<Props> = ({ heading, description }) => {
  return (
    <header className="relative">
      <Image
        src={"/images/join/join_us_hero.png"}
        alt="hero image"
        width={1024}
        height={800}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className={`md:min-h-[35rem] min-h-screen text-white relative flex items-center`}>
        <div className="container text-center md:mt-10">
          <div className="space-y-5 max-w-4xl mx-auto">
            <h1 className="font-bold md:text-5xl text-4xl text-deepGold">{heading}</h1>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BasicHeader;
