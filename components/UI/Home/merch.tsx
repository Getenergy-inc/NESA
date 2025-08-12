"use client";
import Image from "next/image";
const products = [
  { id: 1, title: "NESA Award Branded T-Shirt", price: "$30.00" },
  { id: 2, title: "NESA Award Branded T-Shirt", price: "$30.00" },
  { id: 3, title: "NESA Award Branded T-Shirt", price: "$30.00" },
  { id: 4, title: "NESA Award Branded T-Shirt", price: "$30.00" },
];

const MerchSection = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto pl-4">
        <h2 className="_under_border text-[16px] md:text-[20px] font-semibold text-[#1E1E1E] mb-8 ">
          Buy a Merch and help an African Child 
          get Quality Education
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, id) => (
            <div key={id} className="text-center">
              <div className="bg-gray-100 h-[200px] flex items-center justify-center">
                <Image
                  src={`/images/homeshirts/shirt${id + 1}.jpg`}
                  alt={`shirt ${id + 1}`}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
                  {/* </span> */}
              </div>
              <p className="mt-3 text-sm text-[#1E1E1E]">NESA Award Branded T-Shirt</p>
              <p className="text-base font-medium text-[#1E1E1E]">$30.00</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MerchSection;
