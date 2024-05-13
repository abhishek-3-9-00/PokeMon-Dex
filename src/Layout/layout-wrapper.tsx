import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen overflow-auto bg-lime-50">
      <div className="mx-auto max-w-screen-xl h-full w-full ">{children}</div>
    </main>
  );
};

export default Layout;
