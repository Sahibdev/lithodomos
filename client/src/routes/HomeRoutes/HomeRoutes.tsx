import React from "react";
const HomeRoutesView = React.lazy(() => import("./HomeRoutesView"));

export const HomeRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <HomeRoutesView />
    </React.Suspense>
  );
};
