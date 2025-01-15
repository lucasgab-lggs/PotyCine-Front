"use client";

import Link from "next/link";
import "./NavBar.css"
import { usePathname } from "next/navigation";

export default function NavBar() {
   const pathname = usePathname(); 
   const isActive = (path) => pathname === path;
   const isActiveSubstring = (path) => pathname.includes(path);
    console.log(pathname)
    console.log(isActive('/eventos/explorar'))
  return (
    <div>
      <nav className="fixed-bottom py-3">
        <div className="row">
            <div className="col text-center">
                <div className={`${isActive('/eventos/explorar')? 'nav-selected' : ''} mx-5 rounded-5`}>
                    <Link href="/eventos/explorar" className="nav-link"><i className="bi bi-geo-alt fs-2"></i></Link>
                </div>
                <span>Explorar</span>
            </div>
            <div className="col text-center">
                <div className={`${isActive('/perfil')? 'nav-selected' : ''} mx-5 rounded-5`}>
                    <Link href="/perfil" className="nav-link"><i className="bi bi-person-circle fs-2"></i></Link>
                </div>
                <span>Perfil</span>
            </div>
        </div>
      </nav>
    </div>
  );
}
