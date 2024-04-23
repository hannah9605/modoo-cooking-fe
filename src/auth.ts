import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NaverProvider from "next-auth/providers/naver";
import GoogleProvider from "next-auth/providers/Google";
import kakaoProvider from "next-auth/providers/kakao";

import { cookies } from "next/headers";
import cookie from "cookie";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/login",
    // signIn: "/login",
    // newUser: "/i/flow/signup",
  },
  callbacks: {
    jwt({ token, user, account, profile }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  events: {
    signOut(data) {
      if ("session" in data) {
        data.session = null;
      }
      if ("token" in data) {
        data.token = null;
      }
    },
    session(data) {
      console.log(
        "auth.ts events session",
        "session" in data && data.session,
        "token" in data && data.token
      );
    },
  },
  providers: [
    // CredentialsProvider({
    //   async authorize(credentials) {
    //     const authResponse = await fetch(
    //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           id: credentials.username,
    //           password: credentials.password,
    //         }),
    //       }
    //     );
    //     let setCookie = authResponse.headers.get("Set-Cookie");
    //     console.log("set-cookie", setCookie);
    //     if (setCookie) {
    //       const parsed = cookie.parse(setCookie);
    //       cookies().set("connect.sid", parsed["connect.sid"], parsed); // 브라우저에 쿠키를 심어주는 것
    //     }
    //     if (!authResponse.ok) {
    //       return null;
    //     }

    //     const user = await authResponse.json();
    //     console.log("user", user);
    //     return {
    //       email: user.id,
    //       name: user.nickname,
    //       image: user.image,
    //       ...user,
    //     };
    //   },
    // }),
    // NaverProvider({
    //   profile(profile) {
    //     console.log("Naver NaverNaverNaverNaver", profile);

    //     let userRole = "Naver user";

    //     // 임시 권한 테스트
    //     if (profile?.email == "pspp103@naver.com") {
    //       userRole = "admin";
    //     }
    //     return {
    //       ...profile,
    //       role: userRole,
    //       id: profile?.id,
    //       expires_in: Number(profile?.expires_in),
    //     };
    //   },
    //   clientId: process.env.NAVER_CLIENT_ID,
    //   clientSecret: process.env.NAVER_CLIENT_SECRET,
    // }),
    GoogleProvider({
      profile(profile) {
        console.log("google googlegooglegoogle", profile);
        let userRole = "google user";

        return {
          ...profile,
          role: userRole,
          id: profile?.email,
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

        return {
          ...profile,
          role: userRole,
          id: profile?.email,
        };
      },
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
});
