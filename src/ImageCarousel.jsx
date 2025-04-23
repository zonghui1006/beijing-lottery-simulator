import React, { useEffect, useState } from "react";
import "./carousel.scss";

const images = [];

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
