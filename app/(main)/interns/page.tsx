import TitleDescriptionHeader from "@/components/Common/Hero/basic-title-description";
import { volunteerCategories } from "@/lib/data/others";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <TitleDescriptionHeader
        title="Intern @ NESA 2023"
        description="Our internships provide real-world experience in educational program management, event coordination, and research. Interns at NESA Africa will not only contribute to our mission but also develop professional skills that will serve them in their future careers."
      />
      <main className="py-10">
        <div className="container">
          <h2 className="max-w-4xl mx-auto text-center font-bold md:text-5xl sm:text-4xl text-3xl mb-4">
            Santos Creations Educational Foundation Volunteer Program
          </h2>
          <div className="mt-6 space-y-10">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
              {volunteerCategories.map((data, id) => (
                <div key={id} className="space-y-4 text-center">
                  <div className="flex items-center justify-center">
                    <Image src={`/images/careers/volunteers/${data.image}`} alt={data.title} width={300} height={300} />
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-lg">{data.title}</p>
                    <p className="text-zinc-600">{data.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
