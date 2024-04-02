/* eslint-disable react/prop-types */
import Stand from "../stand/Stand";

const PathStand = (props) => {
  const { userInfo, userPath } = props;
  return (
    <div className="flex flex-col-reverse justify-between  items-center path w-full  ">
      {userPath.map((stand, index) => {
        if (index < userInfo.current_stand) {
          return (
            <div key={index}>
              <Stand topic={userPath[index]} isDone={true} />
            </div>
          );
        }
        if (index > userInfo.current_stand) {
          return (
            <div key={index}>
              <Stand isLocked={true} />
            </div>
          );
        }
        if (index === userInfo.current_stand) {
          return (
            <div key={index}>
              <Stand level={index + 1} topic={userPath[index]} />
            </div>
          );
        }
      })}
    </div>
  );
};

export default PathStand;
