import NextAuth, { AuthOptions } from "next-auth";

import NaverProvider from "next-auth/providers/naver";
import GoogleProvider from "next-auth/providers/Google";
import kakaoProvider from "next-auth/providers/kakao";
import axios from "axios";

// 회원 정보 불러오기
const getUserData = async (id) => {
  try {
    const res = await axios.get(`http://localhost:8080/api/v1/members/${id}`);
    let LoginUserData = res.data;
    console.log(LoginUserData, "로그인된 회원 정보", res);
    return true;
  } catch (e) {
    console.error("회원정보 API 호출 중 오류 발생:", e, e?.response?.status);
    if (e?.response?.status === 400) {
      console.log("messages: '이름 또는 비밀번호가 틀립니다.");
    } else {
      return false;
    }
  }
};

// 회원가입
const getSignUp = async (user) => {
  let inputData = {
    id: user?.user?.id,
    name: user?.user?.name,
    password: "1234",
  };

  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1/members/sign-up",
      inputData
    );
    let LoginUserData = res.data;
    console.log("회원가입 완료");
    getSignIn(user, account, profile);
  } catch (e) {
    console.error("API 호출 중 오류 발생:", e, e?.response?.status);
    if (e?.response?.status === 400) {
      return false;
    } else {
      return false;
    }
  }
};

// 로그인
const getSignIn = async (user) => {
  const inputDataSignIn = {
    id: user?.user?.id,
    name: user?.user?.name,
    password: "1234",
  };
  console.log("getSignIngetSignIn", inputDataSignIn);

  // await axios
  //   .post("http://localhost:8080/api/v1/members/sign-in", inputDataSignIn)
  //   .then((res) => {
  //     let resultData = res.data;

  //     return true;
  //     // getUserData(user?.id);
  //   })
  //   .catch((e) => {
  //     console.error("API 호출 중 오류 발생:", e, e?.response?.status);
  //     if (e?.respofnse?.status === 400) {
  //       getSignUp(user);
  //     } else {
  //       return false;
  //     }
  //   });
};
// async signIn {
//   // 로그인 프로세스 완료 전에 추가적인 로직 수행
//   const inputData = {
//     userId: ,
//   };
//

//
// },

export const options: AuthOptions = {
  images: {
    remotePatterns: ["https://naver.com/*"],
  },
  providers: [
    NaverProvider({
      profile(profile) {
        let userRole = "Naver user";

        // 임시 권한 테스트
        if (profile?.email == "pspp103@naver.com") {
          userRole = "admin";
        }
        return {
          ...profile,
          role: userRole,
          id: profile?.response?.id,
        };
      },
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("google googlegooglegoogle", profile);
        let userRole = "google user";

        // 임시 권한 테스트
        if (profile?.email == "pspp103@gmail.com") {
          userRole = "admin";
        }
        return {
          ...profile,
          role: userRole,
          id: profile?.sub,
          name: profile?.name,
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    kakaoProvider({
      profile(profile) {
        console.log("kakao kakaokakaokakao", profile);
        let userRole = "kakao user";
        let inputData = {
          userId: profile?.id,
        };

        return {
          ...profile,
          role: userRole,
          id: profile?.id,
        };
      },
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  // pages: {
  //   signIn: "/signin",
  //   signOut: "/",
  // },

  callbacks: {
    async signIn(user, account, profile) {
      await getSignIn(user);
      return true;
    },

    async jwt({ token, user }) {
      console.log(user, "jwtjwtjwt");
      if (user) token.role = user.role;
      return token;
    },

    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
