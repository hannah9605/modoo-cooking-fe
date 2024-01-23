import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

import styles from "./Nav.module.css";

import Logo from "/public/logo.png";

const Nav = async () => {
  const session = await getServerSession(options);
  console.log(session);

  return (
    <div className={styles.nav}>
      <Image src="/logo.png" alt="로고" width={250} height={70} priority />
      <div className={styles.nav_list}>
        <Link href="/Recipe">
          요리<span>/조리</span>
        </Link>
        <Link href="/Cooking">요리등록</Link>
        {session ? (
          <>
            <Link href="/MyPage">마이페이지</Link>
            <button>
              <Link href="/api/auth/signout">로그아웃</Link>
            </button>
          </>
        ) : (
          <button>
            <Link href="/api/auth/signin">로그인</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Nav;
