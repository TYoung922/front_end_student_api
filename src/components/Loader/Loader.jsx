import React from "react";
import "./loader.scss";
const Loader = () => {
  return (
    <tr>
      <td colSpan="6" style={{ textAlign: "center" }}>
        <div className="loader"></div>;
      </td>
    </tr>
  );
};

export default Loader;
