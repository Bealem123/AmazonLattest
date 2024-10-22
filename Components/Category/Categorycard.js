import React from "react";
import { Link } from "react-router-dom";

function CategoryCard({ data }) {
  return (
    <div className="category">
      <Link to={`/category/${data.title}`}>
        <h2 className="categoryCard__title">{data.title}</h2>
        <img
          src={data.imglink}
          alt={data.title}
          className="categoryCard__image"
        />
        <p className="categoryCard__name">Shop Now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
