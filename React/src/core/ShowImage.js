import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => (
  <div className="product-img">
    <img
      src={`${API}/${url}/photo/${item._id}`}
      alt={item.name}
      className="mb-3"
      style={{
        maxHeight: "100%",
        maxWidth: "100%",
        width: "300px",
        height: "300px",
      }}
      title={item.name}
    />
  </div>
);

export default ShowImage;
