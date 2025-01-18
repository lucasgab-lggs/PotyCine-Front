'use client'

import NavBar from "@/components/NavBar";
import { getToken } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const router = useRouter();
  const isLogged = getToken() !== undefined;
  
  if (isLogged) {
    return (
    <div>
      {children}
      <NavBar/>
    </div>
    );
  } else {
    router.push("/login");
  }
}
