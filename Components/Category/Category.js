import React from "react";
import CategoryInfos from "../Category/CategoryFullinfos";
import CategoryCard from "../Category/Categorycard";
import "../Category/Categorymodule.css";

function Category() {
  return (
    <div className="categoryContainer">
      {CategoryInfos.map((infos, index) => (
        <CategoryCard key={index} data={infos} />
      ))}
    </div>
  );
}

export default Category;
