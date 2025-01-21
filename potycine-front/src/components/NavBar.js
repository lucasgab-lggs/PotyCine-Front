"use client";

import Link from "next/link";
import "./NavBar.css";
import { usePathname } from "next/navigation";
import { getDataByUserId, getUserId } from "@/services/auth";
import { useEffect, useState } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const id = await getUserId();
        setUserId(id);
        const userData = await getDataByUserId(id);
        if (userData && userData.role) {
          setUserRole(userData.role);
        } else {
          console.error("Role not found in user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  const isActive = (path) => pathname === path;

  return (
    <div>
      <nav className="fixed-bottom py-3">
        <div className="row">
          <div className="col text-center">
            <div className={`${isActive("/eventos/explorar") ? "nav-selected" : ""} mx-5 rounded-5`}>
              <Link href="/eventos/explorar" className="nav-link">
                <i className="bi bi-geo-alt fs-2"></i>
              </Link>
            </div>
            <span>Explorar</span>
          </div>

          <div className="col text-center">
            {userRole === "PRODUCER" && userId ? (
              <div className={`${isActive(`/perfil/${userId}`) ? "nav-selected" : ""} mx-5 rounded-5`}>
                <Link href={`/perfil/${userId}`} className="nav-link">
                  <i className="bi bi-person-circle fs-2"></i>
                </Link>
              </div>
            ) : userRole === "USER" ? (
              <div className={`${isActive("/salvos") ? "nav-selected" : ""} mx-5 rounded-5`}>
                <Link href="/salvos" className="nav-link">
                  <i className="bi bi-bookmark-heart fs-2"></i>
                </Link>
              </div>
            ) : (
              <div className="mx-5 rounded-5">
                <span className="text-danger">{userRole}</span>
              </div>
            )}
            <span>
              {userRole === "PRODUCER"
                ? "Perfil"
                : userRole === "USER"
                ? "Ingressos"
                : userRole === null
                ? ""
                : "Inválido"}
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}
