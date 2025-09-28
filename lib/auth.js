import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { dbConnect } from "@/lib/mongodb";
import User from "@/models/User";

const COOKIE_NAME = "auth_token";
const JWT_SECRET = process.env.JWT_SECRET;

export async function getCurrentUser() {
  if (!JWT_SECRET) return null;

  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    await dbConnect();
    const user = await User.findById(payload.sub).select("name email");
    if (!user) return null;

    return {
      id: user._id.toString(),
      name: user.name ?? "",
      email: user.email ?? "",
    };
  } catch (error) {
    return null;
  }
}
