const Painting = (props) => {
  const url = "https://test-front.framework.team" + props.painting.imageUrl;
  return (
    <div className="col-4 col-md-6 col-sm-12 picture-block">
      <img
        src={url}
        className="pictures"
        alt=""
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = url;
        }}
      />
      <div className="text-block">
        <h1>{props.painting.name}</h1>
        <div className="inform-paintings">
          <div>
            Author: <h2>{props.author.name}</h2>
          </div>
          <div>
            Created: <h2>{props.painting.created}</h2>
          </div>
          <div>
            Location: <h2>{props.location.location}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
Painting.defaultProps = {
  author: { name: "нет автора" },
  location: { location: "неизвестно" },
  painting: { imageUrl: "" },
};
export default Painting;
