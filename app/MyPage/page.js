import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export const MyPage = async () => {
  // const session = await getServerSession(options);

  return (
    <div>
      <h2>마이페이지</h2>
    </div>
  );
};
