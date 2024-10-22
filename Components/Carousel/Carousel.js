import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "../../Components/Carousel/Carouselmodule.css"; // Adjust the path to your CSS module file

import { img } from "./img/data";

function Carouseleffect() {
  return (
    <div>
      <Carousel
        showIndicators={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
      >
        {img.map((imageItemLink, index) => (
          <div key={index}>
            <img
              src={imageItemLink}
              alt="carousel item"
              className="hero__image"
            />
          </div>
        ))}
      </Carousel>
      <div className={classes.hero__img}></div>
    </div>
  );
}

export default Carouseleffect;


