import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
}

function DashboardLayout({ children }: Props) {
  return (
    <>
      <Header />

      <div
        style={{
          display: "flex",
        }}
      >
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: 30,
          }}
        >
          {children}
        </main>
      </div>

      <Footer />
    </>
  );
}

export default DashboardLayout;