import { useContext, Fragment } from "react";
import { Observer } from "mobx-react";
import { StoreContext } from "../conference/contexts";
import Video from "../components/video";

function PinnedStream() {
  const store = useContext(StoreContext);

  const { room } = store;
  return (
    <Observer>
      {() => {
        if (room.pinnedStream === null) {
          return <Fragment></Fragment>;
        }

        const pipStyle: React.CSSProperties = {
          position: "fixed",
          top: "100px",
          width: "70%",
          left: "50%",
          transform: "translateX(-50%)",
          height: "70%",
          border: "1px solid #ccc",
          backgroundColor: "#000",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
          borderRadius: "8px"
        };

        return (
          <div style={pipStyle}>
            <Video stream={room.pinnedStream} isVideoOnly={true} />
          </div>
        );
      }}
    </Observer>
  );
}

export default PinnedStream;