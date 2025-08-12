import GetInvolved from "@/components/Common/Others/get-involved";
import UnderlineText from "@/components/Common/Others/underline-text";
import PartnersHeader from "@/components/UI/Partners/header";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <PartnersHeader />

      <main>
        <div className="space-y-20 py-20 container">
          <div>
            <UnderlineText text="GOVERNMENT BODIES PARTNERS" />
            <Logos />
          </div>
          <div>
            <UnderlineText text="NGO PARTNERS" />
            <Logos />
          </div>
          <div>
            <UnderlineText text="AGENCY PARTNERS" />
            <Logos />
          </div>
        </div>

        <div className="mb-20">
          <GetInvolved />
        </div>
      </main>
    </>
  );
};

const Logos = () => {
  const imgs = [1, 2, 3, 4, 5];

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-8 my-6">
      {imgs.map((_, id) => (
        <div key={id} className="p-4 shadow-lg rounded-md flex items-center justify-center">
          <Image src={`/images/logos/logo_${_}.png`} alt="logo" width={150} height={150} />
        </div>
      ))}
    </div>
  );
};

export default Page;
