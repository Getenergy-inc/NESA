import TitleDescriptionHeader from "@/components/Common/Hero/basic-title-description";
import { moreUnderTiers, tiers } from "@/lib/data/others";
import { Group } from "lucide-react";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <TitleDescriptionHeader
        title="Become a Member"
        description="Join SCEF to actively participate in transformative education across Africa. Memberships are available in four categories, each offering distinct benefits and opportunities. Silver, Platinum, Gold, and Blue Garnet members contribute to and access SCEF's initiatives, influencing educational policies and practices."
      />

      <main className="py-16">
        <div className="space-y-5 text-center">
          <p>Membership Tiers:</p>
          <h2 className="font-bold md:text-4xl text-3xl">SCEF Membership Program</h2>
          <p className="max-w-3xl mx-auto">
            A tiered membership system for individuals and corporations to join and support the Santos Creations
            Educational Foundation&apos;s initiatives.
          </p>
        </div>

        <div className="mt-16 space-y-10 container">
          <div className="grid-cols-3 md:grid gap-10">
            <div className="space-y-5">
              {tiers.map((tier, id) => (
                <div
                  key={id}
                  className="w-full rounded-lg border duration-200 border-yellow-200 hover:border-yellow-500 p-5 space-y-2"
                >
                  <div className="w-16 h-16 rounded-lg bg-deepGold grid place-content-center">
                    <Group />
                  </div>
                  <p className="text-xl font-semibold">{tier.title}</p>
                  <ul className="ml-5 text-zinc-600 list-disc space-y-1">
                    {tier.options.map((option, id) => (
                      <li key={id}>{option}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="col-span-2 relative overflow-hidden grid place-content-center border rounded-lg text-black">
              <Image
                src={"/images/become-a-member.png"}
                width={600}
                height={900}
                className="absolute top-0 left-0 w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>

          <div className="md:space-y-8 space-y-16">
            {moreUnderTiers.map((item, id) => (
              <div key={id} className="md:p-6 space-y-3">
                <p className="md:text-3xl text-2xl font-semibold">{item.title}</p>
                <ul className="ml-8 list-disc space-y-1 text-zinc-600">
                  {item.options.map((option, id) => (
                    <li key={id}>{option}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
