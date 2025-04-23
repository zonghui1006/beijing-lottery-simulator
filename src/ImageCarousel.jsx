import React, { useEffect, useState } from "react";
import "./carousel.scss";
import img1 from "./images/ka/1.JPG";
import img2 from "./images/ka/2.JPG";
import img3 from "./images/ka/3.JPG";
import img4 from "./images/ka/4.JPG";
import img5 from "./images/ka/5.JPG";
import img6 from "./images/ka/6.JPG";
import img7 from "./images/ka/7.JPG";
import img8 from "./images/ka/8.JPG";
import img9 from "./images/ka/9.JPG";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

const bgColors = ["#f0f4ff", "#ffe4e1", "#e0ffe0", "#fff0c1", "#fce4ff"];

const ImageCarousel = () => {
  const [index, setIndex] = useState(0);
  const [bgColor, setBgColor] = useState(bgColors[0]);

  useEffect(() => {
    // 图片切换频率：每 1 秒切换一次图片
    const imageInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1000); // 每秒切换图片

    // 背景色切换频率：每 3 秒切换一次背景色
    const bgColorInterval = setInterval(() => {
      setBgColor(bgColors[Math.floor(Math.random() * bgColors.length)]);
    }, 300); // 每 3 秒切换背景色

    return () => {
      clearInterval(imageInterval);
      clearInterval(bgColorInterval);
    };
  }, []);

  console.log(images[index]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        overflowX: "hidden",
        alignItems: "center",
      }}
    >
      <div
        className="carousel-wrapper"
        style={{
          background: bgColor,
          transition: "background 0.4s ease-in-out",
        }}
      >
        <h2 className="carousel-title">小卡的个人秀</h2>
        <div className="carousel-image-container">
          <img
            src={images[index]}
            alt={`展示图-${index}`}
            className="carousel-image fade-in"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
