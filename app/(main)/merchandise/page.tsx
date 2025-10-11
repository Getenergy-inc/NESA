"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "NESA Award Branded T-Shirt",
    price: "$30.00",
    image: "/images/homeshirts/shirt2.jpg",
  },
  {
    id: 2,
    name: "NESA Award Branded T-Shirt",
    price: "$30.00",
    image: "/images/homeshirts/shirt2.jpg",
  },
  {
    id: 3,
    name: "NESA Award Branded T-Shirt",
    price: "$30.00",
    image: "/images/homeshirts/shirt2.jpg",
  },
  {
    id: 4,
    name: "NESA Award Branded T-Shirt",
    price: "$30.00",
    image: "/images/homeshirts/shirt2.jpg",
  },
];

const MerchPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const closeModal = () => setSelectedProduct(null);

  return (
    <main className="min-h-screen bg-white py-16 px-6 md:px-12 lg:px-20 relative">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Buy a Merch and help an African Child get Quality Education
        </h2>
        <div className="mt-2 w-24 h-1 bg-yellow-500 mx-auto rounded-full" />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 place-items-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center text-center"
          >
            <div className="w-72 h-72 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="object-contain"
              />
            </div>
            <h3 className="mt-4 text-sm md:text-base font-medium text-gray-800">
              {product.name}
            </h3>
            <p className="text-gray-600 font-semibold mb-3">{product.price}</p>
            <button
              onClick={() => setSelectedProduct(product)}
              className="bg-[#f59e0b] text-white font-medium py-2 px-6 rounded-full hover:bg-yellow-600 transition"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                width={250}
                height={250}
                className="mx-auto rounded-md mb-4 object-contain"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {selectedProduct.name}
              </h3>
              <p className="text-gray-700 font-bold mb-6">
                {selectedProduct.price}
              </p>

              {/* Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={closeModal}
                  className="bg-gray-200 text-gray-700 py-2 px-5 rounded-full hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    alert(
                      `Redirecting to payment for ${selectedProduct.name}...`
                    )
                  }
                  className="bg-[#f59e0b] text-white py-2 px-5 rounded-full hover:bg-yellow-600 transition"
                >
                  Proceed to Pay
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default MerchPage;
