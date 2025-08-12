import { CategoryChild } from "@/lib/types/global";
import Image from "next/image";
import styles from "./style.module.scss";
import Link from "next/link";

interface Props {
  categories: CategoryChild[];
  direction?: "left" | "right";
  contained?: boolean;
}

const CategorySlide: React.FC<Props> = ({ categories, direction, contained }) => {
  return (
    <div className={`overflow-hidden flex items-center relative space-x-4 ${styles["award_con"]}`}>
      {!contained ? (
        <>
          {Array.from({ length: 3 }).map((_, id) => (
            <Block categories={categories} key={id} direction={direction} />
          ))}
        </>
      ) : (
        <Block categories={categories} direction={direction} />
      )}
    </div>
  );
};

const Block: React.FC<{ categories: CategoryChild[]; direction?: "left" | "right" }> = ({ categories, direction }) => {
  const determineDirection = (): string => {
    switch (direction) {
      case "right":
        return `${styles["scroll-right"]}`;
      default:
        return `${styles["scroll-el"]}`;
    }
  };

  return (
    <div className={`space-x-4 inline-flex items-center flex-shrink-0 ${determineDirection()}`}>
      {categories.map((category, id) => (
        <div
          key={id}
          className={`md:h-[28rem] h-[26rem] aspect-[5.5/7] w-auto rounded-2xl bg-darkGold overflow-hidden text-white relative`}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[#181818a8]"></div>

          <div className="py-8 px-5 absolute top-0 left-0 w-full h-full">
            <div className="flex flex-col space-y-6 h-full">
              <div className="w-16 h-16">
                <Image src={"/images/logos/small_logo.png"} alt="medal" width={200} height={200} />
              </div>

              <p className="font-bold text-xl uppercase">{category.title}</p>
              <p className="font-light leading-[1.8]">{category.description}</p>

              <div>
                <Link href={`/categories/${category.id}`}>
                  <button
                    className="bg-[#e0aa3e] w-fit px-5 text-sm font-semibold py-3 rounded-lg text-black"
                    style={{ background: `linear-gradient(90deg, #FFC247 -6.07%, #E48900 156.79%)` }}
                  >
                    Nominate
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySlide;
