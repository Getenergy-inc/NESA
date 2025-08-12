import Image from "next/image";
import styles from "./style.module.scss";

const Partners = () => (
  <div className={`inline-block ${styles["scroll-el"]}`}>
    {new Array(4).fill(null).map((_, id) => (
      <div key={id} className="inline-block mx-4 md:mx-10">
        <Image
          src={`/images/logos/logos_${id + 1}.png`}
          alt="logo"
          width={100}
          height={100}
          className="w-auto h-auto max-w-[100px] md:max-w-[150px]"
        />
      </div>
    ))}
  </div>
);

export default Partners;