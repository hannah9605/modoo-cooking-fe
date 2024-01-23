import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

const MyPage = async () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/Mypage");
    },
  });
  // const session = await getServerSession(options);

  return (
    <div>
      <h2>마이페이지</h2>
      <p>환영합니다 {session?.name}님 </p>
    </div>
  );
};

export default MyPage;
