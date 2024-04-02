import line from "../../assets/LinePath.png";
import Path from "../path/Path";
const CompletePath = (props) => {
  const { userInfo, userPath } = props;
  return (
    <div className="relative w-full h-full flex justify-center ">
      <img
        className="absolute bg-no-repeat -z-10 right-line h-full mt-4 pb-8"
        width={"2px"}
        src={line}
      />
      <Path userInfo={userInfo} userPath={userPath} />
    </div>
  );
};

export default CompletePath;
