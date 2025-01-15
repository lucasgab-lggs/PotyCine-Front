import Link from "next/link";
import "./landingpage.css"

export default function LandingPage() {
  return (
    <div className="container">
      <div className="title">
        <h1>PotyCine</h1>
        <p>Descubra o melhor de cinema local</p>
      </div>

      <Link href="/login">
        <div className="button-next">
            <i className="bi bi-arrow-right-short"></i>
        </div>
      </Link>
    </div>
  );
}
