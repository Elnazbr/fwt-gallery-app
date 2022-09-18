import Painting from "./Painting";
import React from "react";

class Gallery extends React.Component {
  renderPaintings() {
    return this.props.paintings.map((objectPainting) => {
      return (
        <Painting
          key={objectPainting.id}
          painting={objectPainting}
          author={this.props.authors.find(
            (objectAuthor) => objectAuthor.id === objectPainting.authorId
          )}
          location={this.props.locations.find(
            (objectLocation) => objectLocation.id === objectPainting.locationId
          )}
        />
      );
    });
  }

  render() {
    return <div className="gallery row">{this.renderPaintings()}</div>;
  }
}

export default Gallery;
