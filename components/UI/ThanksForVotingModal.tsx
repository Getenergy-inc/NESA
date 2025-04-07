import { motion } from "framer-motion";
import { opacityTrans } from "@/lib/utils/transitions";
import Link from "next/link";
import { useModal } from "@/lib/store/modal";

const ThanksForVotingModal = () => {
  const { hideModal } = useModal();

  return (
    <div className="p-10 bg-white rounded-lg sm:min-w-[30rem] sm:max-w-[45rem] w-4/5">
      <motion.div {...opacityTrans} className="space-y-4 text-center overflow-y-auto" key={"step-3"}>
        <div className="flex items-center justify-center font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 125 124" fill="none">
            <rect x="0.5" width="124" height="124" rx="50" fill="#E0AA3E" />
            <path
              d="M54.6776 86.4382C53.9994 86.4396 53.3276 86.307 52.7007 86.0481C52.0739 85.7892 51.5043 85.4091 51.0247 84.9295L29.1077 63.0074C28.6139 62.5311 28.2199 61.9613 27.9487 61.3311C27.6775 60.7009 27.5345 60.0231 27.5281 59.3371C27.5216 58.651 27.6519 57.9706 27.9112 57.3355C28.1705 56.7003 28.5538 56.1232 29.0385 55.6378C29.5233 55.1523 30.0999 54.7683 30.7347 54.508C31.3694 54.2478 32.0497 54.1166 32.7357 54.122C33.4217 54.1275 34.0998 54.2696 34.7303 54.5399C35.3609 54.8102 35.9313 55.2034 36.4082 55.6965L54.6724 73.9607L87.5582 41.0852C88.527 40.1157 89.8412 39.5708 91.2118 39.5703C92.5824 39.5698 93.897 40.1138 94.8665 41.0826C95.8359 42.0514 96.3809 43.3656 96.3813 44.7362C96.3818 46.1068 95.8378 47.4214 94.8691 48.3909L58.3304 84.9295C57.8508 85.4091 57.2813 85.7892 56.6544 86.0481C56.0276 86.307 55.3558 86.4396 54.6776 86.4382Z"
              fill="#1E1E1E"
            />
          </svg>
        </div>
        <p className="font-bold md:text-3xl text-2xl">Thank You for Voting</p>
        <p>
          Stay tuned to your Dashboard and emails for other information about Nigeria Education Standard Award Progress
          Report
        </p>
        <div className="flex justify-center items-center gap-3 text-xs">
          <div>
            <Link href={"/voting"} onClick={hideModal}>
              <button className="px-5 py-3 rounded-lg text-black bg-deepGold">Vote in another Category</button>
            </Link>
          </div>
          <button className="px-5 py-3 rounded-lg text-black border-deepGold border">Invite Others to Vote</button>
        </div>
      </motion.div>
    </div>
  );
};

export default ThanksForVotingModal;