"use client";
import Image from "next/image";
import React, { useState } from "react";
import Slider from "react-slick";

import styles from "./page.module.css";

export default function Home() {
  const [tabIndex, setTabIndex] = useState(0);

  const mainImage = [
    {
      src: "/images/test_img_01.png",
      subText: "추운날 즐겨먹는 뜨끈한 국물!",
      mainText: "어묵전골",
      time: "20~30분",
      level: 1,
    },
    {
      src: "/images/test_img_02.png",
      subText: "분위기 있는 저녁을 원한다면",
      mainText: "새우감바스",
      time: "20~30분",
      level: 1,
    },
    {
      src: "/images/test_img_03.png",
      subText: "추운날 즐겨먹는 뜨끈한 국물!",
      mainText: "어묵전골",
      time: "20~30분",
      level: 1,
    },
    {
      src: "/images/test_img_04.png",
      subText: "추운날 즐겨먹는 뜨끈한 국물!",
      mainText: "어묵전골",
      time: "20~30분",
      level: 1,
    },
  ];

  const clickSlideBtn = [
    {
      id: 0,
      title: "전체",
    },
    {
      id: 1,
      title: "메인요리",
    },
    {
      id: 2,
      title: "간단요리",
    },
    {
      id: 3,
      title: "겨울간식",
    },
    {
      id: 4,
      title: "다이어트",
    },
    {
      id: 5,
      title: "디저트",
    },
  ];

  const SlideMainImg02 = [
    {
      src: "/images/test_img_01.png",
    },
    {
      src: "/images/test_img_01.png",
    },
    {
      src: "/images/test_img_01.png",
    },

    {
      src: "/images/test_img_01.png",
    },
    {
      src: "/images/test_img_02.png",
    },
    {
      src: "/images/test_img_02.png",
    },
    {
      src: "/images/test_img_02.png",
    },
    {
      src: "/images/test_img_02.png",
    },
  ];

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  console.log(tabIndex);
  return (
    <>
      <main className={styles.main} id="home">
        <section className={styles.section} id="main_01">
          <p className={styles.title}>오늘의 요리는 이걸로 어떤가요?</p>
          <div className="grid_container">
            {mainImage?.map((item, index) => {
              return (
                <div
                  className="grid_item"
                  key={item?.src}
                  id={`main_sl_img${index}`}
                >
                  <img src={item?.src} alt={`메인이미지${index}`} />
                  <div className={styles.mainText}>
                    <p>{item?.subText}</p>
                    <p>{item?.mainText}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className={styles.section} id="main_02">
          <p className={styles.title}>인기요리</p>
          <div>
            {clickSlideBtn?.map((btnItem, i) => {
              return (
                <button
                  key={btnItem.id}
                  className={
                    tabIndex === btnItem.id
                      ? "btn_default active"
                      : "btn_default"
                  }
                  onClick={() => setTabIndex(btnItem.id)}
                >
                  {btnItem?.title}
                </button>
              );
            })}
          </div>
          <Slider {...settings} className={styles.slider}>
            {SlideMainImg02?.map((ImgItem, i) => {
              return (
                <div key={i}>
                  <img src={ImgItem?.src} alt={`슬라이드 이미지 ${i}`} />
                </div>
              );
            })}
          </Slider>
        </section>
      </main>
    </>
  );
}
