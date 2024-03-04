"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";

import styles from "./navMenu.module.css";
// images
import LogoImage from "/public/images/logo.png";
import schIcon from "/public/images/search.png";

const NavMenu = () => {
  const { data: session, status } = useSession();

  const [showAlarm, setShowAlarm] = useState(false);
  const [showMypage, setShowMypage] = useState(false);

  const onSearch = () => {};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      return onSearch();
    }
  };

  return (
    <div className={styles.nav}>
      <div className={styles.nav_wrap}>
        <ul className={styles.nav_menu}>
          <li>
            <Link href="/">
              <Image src={LogoImage} alt="로고" />
            </Link>
          </li>
          <li>
            <Link href="/Cooking"> 요리/조리</Link>
          </li>
          <li>
            <Link href="/home"> 셰프</Link>
          </li>
          <li>
            <Link href="/home"> 입맛테스트</Link>
          </li>
          <li>
            <Link href="/home"> 모두의 라운지</Link>
          </li>
        </ul>
        <ul className={styles.nav_side}>
          <li className={styles.sch_bar}>
            <input
              type="text"
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
              placeholder="레시피 명, 셰프 명 등 다양하게 검색해보세요."
            />
            <button
              onClick={() => {
                onSearch();
              }}
            >
              <Image src={schIcon} alt="검색" />
            </button>
          </li>
          {session ? (
            <>
              <li>
                <button
                  onClick={() => {
                    setShowAlarm(!showAlarm);
                  }}
                >
                  알림
                </button>
                {showAlarm && (
                  <ul>
                    <li>
                      <Link href="/">알림1</Link>
                    </li>
                    <li>
                      <Link href="/">알림2</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                <button
                  onClick={() => {
                    setShowMypage(!showMypage);
                  }}
                >
                  닉네임
                </button>
                {showMypage && (
                  <ul>
                    <li>
                      <Link href="/MyPage">마이페이지</Link>
                    </li>
                    <li>
                      <Link href="/">고객센터</Link>
                    </li>
                    <li>
                      <Link href="/">고객문의</Link>
                    </li>
                    <li>
                      <Link href="/api/auth/signout">로그아웃</Link>
                    </li>
                  </ul>
                )}
              </li>

              <li className={styles.button1}>
                <Link href="/Cooking/Recipe"> 레시피등록</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <button>
                  <Link className={styles.login_font} href="/api/auth/signin">
                    로그인
                  </Link>
                </button>
              </li>
              <li>
                <Link className={styles.login_font} href="/serviceCenter">
                  {" "}
                  고객센터
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavMenu;
