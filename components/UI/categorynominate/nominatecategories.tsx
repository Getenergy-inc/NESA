"use client";

import Image from "next/image";
import Link from "next/link";


export interface CategoryCardProps {
  categoryData: {
    title: string;
    description: string;
    subCategoryPath: string;
  }[];
  head: string; // Added the missing 'head' property
}

const CategoryCard: React.FC<CategoryCardProps> = ({ categoryData, head }) => {
  return (
    <section className="bg-white">
      <div className="space-y-5 py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="space-y-2 mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl relative inline-block">
              {head}
              <span
              className="absolute left-0 w-1/2 h-1"
              style={{
                bottom: '-5px',
                borderBottom: '4px solid',
                borderImageSource: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
                borderImageSlice: 1,
              }}
              ></span>
            </h2>
          </div>
        </div>

        <div className="relative container mx-auto px-4">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            style={{
              justifyItems: 'center',
            }}
          >
            {categoryData.map((category, id) => (
              <div
                key={id}
                className="w-full h-[460px] sm:h-[500px] md:h-[540px] bg-[#191307] text-white rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="p-4 md:p-6 flex-grow flex flex-col">
                  <div className="mb-4 relative w-full aspect-[364/198]">
                    <Image
                      src="/images/nesa-card2.png"
                      alt="NESA"
                      layout="fill"
                      objectFit="contain"
                      className="rounded"
                    />
                  </div>
                  <h3
                    className={`font-bold ${
                      id === 0
                        ? 'text-xs sm:text-sm md:text-base'
                        : 'text-sm sm:text-base md:text-lg lg:text-xl'
                    } mb-2`}
                  >
                    {category.title}
                  </h3>
                  <p
                    className={`${
                      id === 0 ? 'text-[10px] sm:text-xs' : 'text-xs md:text-sm'
                    } flex-grow overflow-y-auto`}
                  >
                    {category.description}
                  </p>
                  <Link href={category.subCategoryPath}>
                    <div
                      className="w-full py-2 md:py-3 mt-4 text-black font-normal hover:bg-yellow-600 transition duration-300 rounded-xl text-center cursor-pointer"
                      style={{
                        background:
                          'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
                      }}
                    >
                      See Sub-Categories
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryCard;

// const CategoryCard = () => {
//     return (
//     <section className="bg-white">
//       <div className="space-y-5 py-10">
//         <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
//           <div className="space-y-2 mb-4 md:mb-0 text-center md:text-left">
//             <h2 className="text-2xl md:text-3xl relative inline-block">
//             Categories in the Competitive Categories
//               <span
//               className="absolute left-0 w-1/2 h-1"
//               style={{
//                 bottom: '-5px',
//                 borderBottom: '4px solid',
//                 borderImageSource: 'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
//                 borderImageSlice: 1,
//               }}
//               ></span>
//             </h2>
            
//           </div>

//        </div>

//         <div className="relative container mx-auto px-4">
//           <div
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
//             style={{
//               justifyItems: 'center', 
//             }}
//           >
//             {categoryData.map((category, id) => (
//               <div
//           key={id}
//           className="w-full h-[460px] sm:h-[500px] md:h-[540px] bg-[#191307] text-white rounded-2xl overflow-hidden flex flex-col"
//               >
//           <div className="p-4 md:p-6 flex-grow flex flex-col">
//             <div className="mb-4 relative w-full aspect-[364/198]">
//               <Image
//                 src="/images/nesa-card2.png"
//                 alt="NESA"
//                 layout="fill"
//                 objectFit="contain"
//                 className="rounded"
//               />
//             </div>
//             <h3
//               className={`font-bold ${
//                 id === 0
//             ? 'text-xs sm:text-sm md:text-base'
//             : 'text-sm sm:text-base md:text-lg lg:text-xl'
//               } mb-2`}
//             >
//               {category.title}
//             </h3>
//             <p
//               className={`${
//                 id === 0 ? 'text-[10px] sm:text-xs' : 'text-xs md:text-sm'
//               } flex-grow overflow-y-auto`}
//             >
//               {category.description}
//             </p>
//             <Link href={category.subCategoryPath}>
//               <button
//                 className="w-full py-2 md:py-3 mt-4 text-black font-normal hover:bg-yellow-600 transition duration-300 rounded-xl"
//                 style={{
//             background:
//               'linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)',
//                 }}
//               >
//                 See Sub-Categories
//               </button>
//             </Link>
//           </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategoryCard;