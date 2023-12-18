import NaverProvider from "next-auth/providers/naver";
import GoogleProvider from "next-auth/providers/Google";
import kakaoProvider from "next-auth/providers/kakao";

export const options = {
  images: {
    remotePatterns: ["https://naver.com/*"],
  },
  providers: [
    NaverProvider({
      profile(profile) {
        console.log(
          "naver navernavernavernavernaver",
          profile,
          profile.response.id
        );
        let userRole = "Naver user";

        // 임시 권한 테스트
        if (profile?.email == "pspp103@naver.com") {
          userRole = "admin";
        }
        return {
          ...profile,
          role: userRole,
          // id: profile.sub, //왜 안돼....
          id: profile?.response?.id, //왜 안돼....
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
          id: profile.sub,
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
          // id: profile.sub,
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
    alert("테스트");

    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },

    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};
