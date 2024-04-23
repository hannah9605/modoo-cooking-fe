"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <section
        style={{
          overflow: "hidden",
        }}
      >
        <div className={styles.slider_wr}>
          <div
            style={{ width: "1200px", height: "460px", background: "#000" }}
          ></div>
          <div
            style={{ width: "1200px", height: "460px", background: "#222" }}
          ></div>
          <div
            style={{ width: "1200px", height: "460px", background: "#555" }}
          ></div>
        </div>
        <div className={styles.m_banner}>
          <div className="flex_center" style={{ height: "100%" }}>
            <span style={{ marginRight: "19px", fontSize: "22px" }}>
              무엇을 먹어야 할지 고민된다면?
            </span>
            <Link href="/" className={styles.m_game_btn}>
              요리추천 테스트 바로가기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
