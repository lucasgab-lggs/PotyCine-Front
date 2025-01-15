import NavBar from "@/components/NavBar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <NavBar/>
      </body>
    </html>
  );
}
