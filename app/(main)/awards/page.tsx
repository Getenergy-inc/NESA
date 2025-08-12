import Image from "next/image";
import { allCategories } from "@/lib/data/category";
import Link from "next/link";
import { Trophy, Award, Star } from "lucide-react";

const Page = () => {
  return (
    <>
      {/* Hero Section */}
      <header className="relative min-h-screen bg-gradient-to-br from-darkGold via-[#2a1f0f] to-darkBrown overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-midGold rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-midGold rounded-full"></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-midGold rounded-full"></div>
        </div>

        <div className="container relative z-10 flex items-center min-h-screen py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <div className="space-y-8 text-white">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-midGold">New Education Standard</span>
                  <br />
                  <span className="text-white">Award:</span>
                  <br />
                  <span className="text-lightGold">The award of the</span>
                  <br />
                  <span className="text-midGold">decade</span>
                </h1>
                <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                  NESA stands as the pinnacle award of the decade, celebrating excellence within the Nigerian
                  education system. We uplift contributors, ignite innovation, and envision an ecosystem where
                  excellence becomes the driving force for transformative change.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/categories">
                  <button className="px-8 py-4 bg-gradient-to-r from-midGold to-deepGold text-darkBrown font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    View All Categories
                  </button>
                </Link>
                <Link href="/nominate">
                  <button className="px-8 py-4 border-2 border-midGold text-midGold font-semibold rounded-lg hover:bg-midGold hover:text-darkBrown transition-all duration-300">
                    Nominate Now
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Content - 3D Trophy */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-midGold to-deepGold rounded-full blur-3xl opacity-30 scale-150"></div>

                {/* Trophy Container */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Trophy Base */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gradient-to-r from-midGold to-deepGold rounded-full"></div>

                    {/* Trophy Stem */}
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-6 h-16 bg-gradient-to-b from-midGold to-deepGold"></div>

                    {/* Trophy Cup */}
                    <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-48 h-32 bg-gradient-to-br from-midGold via-deepGold to-[#e48900] rounded-t-full border-4 border-lightGold shadow-2xl">
                      {/* Trophy Handles */}
                      <div className="absolute -left-6 top-4 w-12 h-16 border-4 border-lightGold rounded-full bg-transparent"></div>
                      <div className="absolute -right-6 top-4 w-12 h-16 border-4 border-lightGold rounded-full bg-transparent"></div>

                      {/* Trophy Shine */}
                      <div className="absolute top-2 left-4 w-8 h-16 bg-gradient-to-r from-white to-transparent opacity-40 rounded-full blur-sm"></div>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-10 left-10 animate-bounce">
                      <Star className="w-6 h-6 text-midGold" fill="currentColor" />
                    </div>
                    <div className="absolute top-20 right-8 animate-bounce delay-300">
                      <Award className="w-8 h-8 text-lightGold" />
                    </div>
                    <div className="absolute top-32 left-20 animate-bounce delay-700">
                      <Trophy className="w-5 h-5 text-deepGold" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Two Prestigious Awards Section */}
        <section className="bg-whiteGold py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Medal Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 bg-gradient-to-br from-midGold to-deepGold rounded-full flex items-center justify-center shadow-2xl">
                    <Image
                      src="/images/medal.png"
                      alt="Award Medal"
                      width={300}
                      height={300}
                      className="object-contain w-64 h-64"
                    />
                  </div>
                  {/* Decorative rings */}
                  <div className="absolute -inset-4 border-2 border-midGold rounded-full opacity-30"></div>
                  <div className="absolute -inset-8 border border-lightGold rounded-full opacity-20"></div>
                </div>
              </div>

              {/* Right - Content */}
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-darkGold leading-tight">
                  Two Prestigious awards awaits in every category
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Through the selection process, our judges meticulously examine nominees, choosing a winner from each
                  subcategory to be honored with the esteemed <span className="font-semibold text-midGold">'Platinum Award.'</span> These winners progress to the
                  final stage within their respective categories, where the ultimate victor in each group claims success
                  and is honored with the prestigious <span className="font-semibold text-deepGold">'Blue Garnet Award,'</span> marking the pinnacle of excellence.
                </p>

                <div className="flex gap-4 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-midGold to-deepGold rounded-full text-darkBrown font-semibold">
                    <Trophy className="w-5 h-5" />
                    <span>Platinum Award</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full text-white font-semibold">
                    <Award className="w-5 h-5" />
                    <span>Blue Garnet Award</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Award Categories Grid Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-darkGold mb-6">
                15 Prestigious Award Categories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Recognizing impact and excellence in the Nigerian education system across diverse sectors and initiatives
              </p>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allCategories.map((category, index) => (
                <div
                  key={category.id}
                  className="group relative bg-gradient-to-br from-darkGold to-[#1a1308] rounded-2xl p-8 text-white hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-midGold/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Card Content */}
                  <div className="relative z-10 space-y-6">
                    {/* Trophy Icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-16 h-16 bg-gradient-to-br from-midGold to-deepGold rounded-full flex items-center justify-center shadow-lg">
                        <Trophy className="w-8 h-8 text-darkBrown" />
                      </div>
                      <div className="text-right">
                        <span className="text-midGold font-bold text-lg">#{index + 1}</span>
                      </div>
                    </div>

                    {/* Category Title */}
                    <h3 className="text-xl font-bold uppercase leading-tight group-hover:text-midGold transition-colors duration-300">
                      {category.title}
                    </h3>

                    {/* Category Description */}
                    <p className="text-gray-300 leading-relaxed text-sm overflow-hidden" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {category.description}
                    </p>

                    {/* Action Button */}
                    <div className="pt-4">
                      <Link href={`/categories/${category.id}`}>
                        <button className="w-full bg-gradient-to-r from-midGold to-deepGold text-darkBrown font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                          Nominate Now
                        </button>
                      </Link>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                      <Star className="w-6 h-6 text-midGold" fill="currentColor" />
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-midGold to-deepGold rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300 -z-10"></div>
                </div>
              ))}
            </div>

            {/* View All Categories Button */}
            <div className="text-center mt-16">
              <Link href="/categories">
                <button className="px-12 py-4 bg-gradient-to-r from-midGold to-deepGold text-darkBrown font-bold text-lg rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  View All Categories
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-darkGold to-[#1a1308] text-white">
          <div className="container text-center">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold">
                Ready to Make a Nomination?
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Join us in celebrating excellence in Nigerian education. Nominate deserving individuals,
                organizations, and institutions that have made significant contributions to the education sector.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <Link href="/nominate">
                  <button className="px-10 py-4 bg-gradient-to-r from-midGold to-deepGold text-darkBrown font-bold text-lg rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Start Nomination
                  </button>
                </Link>
                <Link href="/categories">
                  <button className="px-10 py-4 border-2 border-midGold text-midGold font-bold text-lg rounded-lg hover:bg-midGold hover:text-darkBrown transition-all duration-300">
                    Browse Categories
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
                <div className="text-center">
                  <div className="text-4xl font-bold text-midGold mb-2">15</div>
                  <div className="text-gray-300">Award Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-midGold mb-2">2</div>
                  <div className="text-gray-300">Prestigious Awards</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-midGold mb-2">1</div>
                  <div className="text-gray-300">Decade of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
