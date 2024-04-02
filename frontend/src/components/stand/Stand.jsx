/* eslint-disable react/prop-types */
import green from "../../assets/greenstandbg.png";
import purple from "../../assets/purplestandbg.png";

const SingleStand = ({ level, topic, isDone, isLocked }) => {
  return level ? (
    <div className="flex flex-col-reverse items-center ">
      <h4
        style={{ color: "#3F3D56" }}
        className="bg-white font-bold text-base mt-4 text-center"
      >
        {topic}
      </h4>
      <div
        style={{
          backgroundImage: `url("${green}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
        className="h-20 w-20 flex justify-center items-center "
      >
        <h1
          style={{ fontSize: "32px" }}
          className="mr-2 text-white font-extrabold"
        >
          {level}
        </h1>
      </div>
    </div>
  ) : isDone ? (
    <div className="flex flex-col-reverse items-center justify-center ">
      <h4
        style={{ color: "#929292" }}
        className="bg-white font-normal text-base text-center"
      >
        {topic}
      </h4>
      <div
        style={{
          backgroundImage: `url("${purple}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
        }}
        className=" h-20 w-20 flex justify-center items-center  "
      >
        <h1
          style={{
            fontSize: "32px",
          }}
          className="mr-1 mt-1.5 text-white font-extrabold"
        >
          <svg
            width="30"
            height="28"
            viewBox="0 0 30 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 15.25L10.4286 24L27 3"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </h1>
      </div>
    </div>
  ) : isLocked ? (
    <div
      style={{
        backgroundImage: `url("${purple}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
      className=" h-20 w-20 flex justify-center items-center "
    >
      <h1
        style={{
          fontSize: "32px",
        }}
        className="mr-2 mt-1.5 text-white  font-extrabold"
      >
        <svg
          width="37"
          height="36"
          viewBox="0 0 37 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.825 11.0509V13.0636L10.1576 13.3663V11.0807C10.1633 10.2443 10.2984 9.43726 10.5442 8.67795C10.5564 8.59823 10.5767 8.51919 10.6054 8.44181C11.4489 6.07643 13.3428 4.27064 15.6811 3.46353C16.5429 3.16342 17.4696 3 18.434 3C18.4376 3 18.4411 3 18.4446 3.00001C18.4481 3 18.4516 3 18.4551 3C19.4196 3 20.3463 3.16342 21.208 3.46352C23.5464 4.27063 25.4403 6.07642 26.2837 8.44181C26.3125 8.51919 26.3328 8.59823 26.345 8.67795C26.5907 9.43726 26.7258 10.2443 26.7316 11.0807V13.3663L24.0642 13.0636V11.0509C24.0612 10.4533 23.9586 9.87763 23.7717 9.33882C23.7654 9.32375 23.7593 9.30852 23.7535 9.29311C23.7094 9.16773 23.6609 9.04471 23.6082 8.92418C22.7481 6.98482 20.763 5.61692 18.4446 5.60912C16.1262 5.61692 14.1411 6.98486 13.2809 8.92426C13.2283 9.04476 13.1798 9.16776 13.1356 9.29311C13.1298 9.30851 13.1237 9.32375 13.1174 9.33881C12.9305 9.87762 12.828 10.4533 12.825 11.0509Z"
            fill="white"
          />
          <path
            d="M24.7914 13.0666C28.3275 13.0666 31.1946 15.871 31.1946 19.3299V26.7367C31.1946 30.1956 28.3275 33 24.7914 33H12.0978C8.56161 33 5.69458 30.1956 5.69458 26.7367V19.3299C5.69458 15.871 8.56161 13.0666 12.0978 13.0666H24.7914ZM18.437 20.0738C17.7053 20.0738 17.1109 20.6553 17.1109 21.3709V24.6807C17.1109 25.4113 17.7053 25.9927 18.437 25.9927C19.1838 25.9927 19.7783 25.4113 19.7783 24.6807V21.3709C19.7783 20.6553 19.1838 20.0738 18.437 20.0738Z"
            fill="white"
          />
        </svg>
      </h1>
    </div>
  ) : (
    <></>
  );
};

export default SingleStand;
