import Carousel from "../Carousel";

export default function ServerBrowser(props) {
  const rooms = props.rooms;

  const placeholder_num = 8
  var tempList = [];
  for (var i = 0; i < placeholder_num; i++) {
    tempList.push("x");
  }
  return (
    <div className="server-browser">
      {rooms.length > 0 && (
        <Carousel
          rooms={rooms}
          active={0}
        />
      )}

      {rooms.length === 0 &&
        tempList.map((room, i) => {
          return (
            <article className="information card" key={i}>
              <div className="noRooms">
                <span className="tag temp">{"    "}</span>
                <span className="tag temp">{"    "}</span>
                <span className="tag temp">{"    "}</span>
                <span className="tag temp">{"    "}</span>
                <span className="tag temp">{"    "}</span>
              </div>
            </article>
          );
        })}
    </div>
  );
}
