import React from "react";
const AuthRoutesView = React.lazy(() => import("./AuthRoutesView"));

export const AuthRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <AuthRoutesView />
    </React.Suspense>
  );
};
