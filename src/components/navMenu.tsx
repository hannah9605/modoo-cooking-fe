"use client";

import Link from "next/link";
import styles from "./navMenu.module.css";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const NavMenu = async () => {
  const session = await getServerSession(options);
  console.log(session);

  const onSearch = () => {
    console.log("검색");
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      return onSearch();
    }
  };

  return (
    <ul className={styles.nav}>
      <li>
        <Link href="/"> 로고이미지</Link>
      </li>
      <li>
        <Link href="/Cooking"> 요리조리</Link>
      </li>
      <li>
        <Link href="/home"> 셰프</Link>
      </li>
      <li>
        <Link href="/home"> 입맛테스트</Link>
      </li>
      <li>
        <input
          type="text"
          onKeyDown={(e) => {
            handleKeyDown(e);
          }}
          placeholder="검색어를 입력해주세요"
        />
        <button
          onClick={() => {
            onSearch();
          }}
        >
          검색 아이콘
        </button>
      </li>
      {session ? (
        <li>
          <Link href="/MyPage">마이페이지</Link>
          <button>
            <Link href="/api/auth/signout">로그아웃</Link>
          </button>
        </li>
      ) : (
        <li>
          <button>
            <Link href="/api/auth/signin">로그인</Link>
          </button>
        </li>
      )}
      <li>
        <Link href="/serviceCenter"> 고객센터</Link>
      </li>
      <li className={styles.button1}>
        <Link href="/Cooking/Recipe"> 레시피등록</Link>
      </li>
    </ul>
  );
};

export default NavMenu;
