import Login from "./Login";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth/authOptions";
import { redirect } from "next/navigation";
export default async function Page() {

  const session = await getServerSession(authOptions)
  // if (session) redirect(`/profile/${session?.user?.username}`)
  return (<Login />)
}