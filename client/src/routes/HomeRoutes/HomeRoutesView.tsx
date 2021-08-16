import React from "react";
import { Banner } from "./Banner";
import { Tours } from "./Tours";

const HomeRoutesView: React.FC = () => {
  return (
    <div>
      <Banner img="/images/banner.jpg" />

      <Tours />
    </div>
  );
};

export default HomeRoutesView;
