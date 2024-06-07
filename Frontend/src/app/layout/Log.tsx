import React from "react";
import { Outlet } from "react-router-dom";

const Log = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Log;
