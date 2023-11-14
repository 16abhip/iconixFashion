import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/productCard/productCard";
import { Link } from "react-router-dom";
import "./Home.css";
import gif1 from "../../assets/product_image_1.gif";
import gif2 from "../../assets/product_image_2.gif";
import gif3 from "../../assets/product_image_3.gif";
import { Button, ButtonBase, ButtonGroup } from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
const { fetchProductDetails } = require("../../fetchDetails");

const slideData = [
  {
    index: 0,
    headline: "New Fashion Apparel",
    button: "Shop now",
    src: "https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/e/o/v/xxl-nk-368-violate-viscose-embroidered-kurta-with-pant-navlik-original-imagzhhhvpwurnzz.jpeg?q=70",
  },
  {
    index: 1,
    headline: "In The Wilderness",
    button: "NEW ARRIVAL",
    src: "https://www.libas.in/cdn/shop/files/pink-embroidered-georgette-anarkali-kurta-with-churidar-and-dupatta-libas-1_1800x1800.jpg?v=1695043346",
  },
  {
    index: 2,
    headline: "For Your Current Mood",
    button: "SUITS THAT SUIT",
    src: "https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/b/y/f/m-26kbd353iaa-skylee-original-imagsd84dngk7kra.jpeg?q=70",
  },
  {
    index: 3,
    headline: "Focus On The Trend",
    button: "TRENDING NOW",
    src: "https://rukminim2.flixcart.com/image/832/832/xif0q/ethnic-set/2/x/v/xl-1001-shree-ramkrishna-fab-original-imaggtyyvtvpedcm.jpeg?q=70",
  },
];

// =========================
// Slide
// =========================

class Slide extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
    this.imageLoaded = this.imageLoaded.bind(this);
    this.slide = React.createRef();
  }

  handleMouseMove(event) {
    const el = this.slide.current;
    const r = el.getBoundingClientRect();

    el.style.setProperty(
      "--x",
      event.clientX - (r.left + Math.floor(r.width / 2))
    );
    el.style.setProperty(
      "--y",
      event.clientY - (r.top + Math.floor(r.height / 2))
    );
  }

  handleMouseLeave(event) {
    this.slide.current.style.setProperty("--x", 0);
    this.slide.current.style.setProperty("--y", 0);
  }

  handleSlideClick(event) {
    this.props.handleSlideClick(this.props.slide.index);
  }

  imageLoaded(event) {
    event.target.style.opacity = 1;
  }

  render() {
    const { src, button, headline, index } = this.props.slide;
    const current = this.props.current;
    let classNames = "slide";

    if (current === index) classNames += " slide--current";
    else if (current - 1 === index) classNames += " slide--previous";
    else if (current + 1 === index) classNames += " slide--next";

    return (
      <li
        ref={this.slide}
        className={classNames}
        onClick={this.handleSlideClick}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="slide__image-wrapper">
          <img
            className="slide__image"
            alt={headline}
            src={src}
            onLoad={this.imageLoaded}
          />
        </div>

        <article className="slide__content">
          <h2 className="slide__headline">{headline}</h2>
          <Link to="/Shop">
            <button className="slide__action btn">{button}</button>
          </Link>
        </article>
      </li>
    );
  }
}

// =========================
// Slider control
// =========================

const SliderControl = ({ type, title, handleClick }) => {
  return (
    <button className={`btn btn--${type}`} title={title} onClick={handleClick}>
      {/* <svg className="icon" viewBox="0 0 24 24">
        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
      </svg> */}
    </button>
  );
};

// =========================
// Slider
// =========================

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = { current: 0 };
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
  }

  handlePreviousClick() {
    const previous = this.state.current - 1;

    this.setState({
      current: previous < 0 ? this.props.slides.length - 1 : previous,
    });
  }

  handleNextClick() {
    const next = this.state.current + 1;

    this.setState({
      current: next === this.props.slides.length ? 0 : next,
    });
  }

  handleSlideClick(index) {
    if (this.state.current !== index) {
      this.setState({
        current: index,
      });
    }
  }

  render() {
    const { current, direction } = this.state;
    const { slides, heading } = this.props;
    const headingId = `slider-heading__${heading
      .replace(/\s+/g, "-")
      .toLowerCase()}`;
    const wrapperTransform = {
      transform: `translateX(-${current * (100 / slides.length)}%)`,
    };

    return (
      <div className="slider" aria-labelledby={headingId}>
        <ul className="slider__wrapper" style={wrapperTransform}>
          <h3 id={headingId} class="visuallyhidden">
            {heading}
          </h3>

          {slides.map((slide) => {
            return (
              <Slide
                key={slide.index}
                slide={slide}
                current={current}
                handleSlideClick={this.handleSlideClick}
              />
            );
          })}
        </ul>

        <div className="slider__controls">
          <SliderControl
            type="previous"
            title="Go to previous slide"
            handleClick={this.handlePreviousClick}
          />

          <SliderControl
            type="next"
            title="Go to next slide"
            handleClick={this.handleNextClick}
          />
        </div>
      </div>
    );
  }
}

const Home = ({ productData, setProductData }) => {
  let products = productData.slice(0, 3);
  return (
    <div className="home-main">
      {productData.length > 0 ? (
        <>
          <div className="main-bar-home">
            <Link to="/shop">
              <div>Clothes</div>
            </Link>
            <Link to="/shop">
              <div>Footwear</div>
            </Link>
            <Link to="/shop">
              <div>Accessories</div>
            </Link>
          </div>

          <div className="carousel">
            <Slider heading="Example Slider" slides={slideData} />
          </div>
          <h1 className="home-heading">Featured Products</h1>
          <div className="container-home">
            {products.map((product) => (
              <div className="item-home">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="image-line">
            <img src={gif1} alt="video" />
            <p>Be Iconic. Be You.</p>
          </div>

          <div className="image-line">
            <p>Elevate Your Style with Iconix Fashion.</p>
            <img src={gif2} alt="video" />
          </div>
          <div className="image-line">
            <img src={gif3} alt="video" />
            <p>Iconic Fashion for Iconic Women.</p>
          </div>
        </>
      ) : (
        <h2>Loading..</h2>
      )}
    </div>
  );
};

export default Home;
