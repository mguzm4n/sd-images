import {GiGroundSprout} from "react-icons/gi"

const CardThree = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <GiGroundSprout/>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="flex flex-row items-center justify-center gap-2">
            <svg
              className="fill-meta-3"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                fill=""
              />
            </svg>
            <h4 className="text-title-md font-bold text-black dark:text-white">
              2.450
            </h4>
          </div>
          <span className="text-sm font-medium">Total Sequias</span>
        </div>

      </div>
    </div>
  );
};

export default CardThree;
