import React from "react";
const AccountRoutesView = React.lazy(() => import("./AccountRoutesView"));

export const AccountRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<p>Loading...</p>}>
      <AccountRoutesView />
    </React.Suspense>
  );
};
