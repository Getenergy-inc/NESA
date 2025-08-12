import Image from 'next/image';
import styles from './headerjudges.module.css';
import JudgingPanel from '@/components/UI/About judges/howtojudge';
const JudgesSection = () => {
  return (
    <section className="relative bg-[#191307CC] text-white py-20 px-5 sm:px-10 lg:px-20 min-h-[80vh] flex items-center">
      <div>
        <Image
          src="/images/judgenavimg.png"
          alt="Background"
          fill
        />
      </div>
      <div className="relative z-10 w-full max-w-[80rem] ml-[25px] mr-auto mt-[50px] flex flex-col items-center gap-10 
                lg:flex-row lg:items-start">
        <div className="w-full lg:w-3/5 text-center flex bg-blue flex-col lg:text-left">
          <h2 className={styles.text1}>
          NESA-Africa 2025: Our Distinguished Judges Panel
          </h2>
          <p className="text-base sm:text-lg lg:text-xl font-light leading-relaxed mx-auto lg:mx-0 lg:-ml-10">
            Meet the elite panel of accomplished judges — thought leaders, educators, innovators, media professionals,
            NGO executives, CSR advocates, and public servants — collectively shaping the future of African education.
            These distinguished professionals serve as the gatekeepers of Africa's most prestigious educational recognition system.
          </p>
        </div>
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="col-span-1">
              <Image
                src='/images/judge1.png'
                alt="Judge 1"
                width={100}
                height={100}
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div className="col-span-1 row-span-2 mt-10 sm:mt-20 ml-0 sm:ml-3">
              <Image
                src='/images/judge7.png'
                alt="Judge 2"
                width={200}
                height={220}
                className="rounded-md w-full h-auto"
              />
            </div>
            <div className="col-span-1 mt-4 ml-0 sm:ml-5">
              <Image
                src='/images/judge6.png'
                alt="Judge 3"
                width={200}
                height={180}
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
   
    </section>
  );
};

export default JudgesSection;