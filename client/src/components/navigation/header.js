import React from "react";

import logo from "./logo/PijarCamp.png";

const logoStyle = {
  display: "flex",
  maxWidth: "10%",
  marginRight: "10px",
  marginLeft: "40px",
  marginTop: "-35px",
  borderRadius: "50%",
  cursor: "pointer",
  position: "absolute",
  zIndex: 1000,
};

const Header = () => {

  return (
    <div>
      <header
        className="bck_w_light"
        style={{ position: "fixed", width: "100%", zIndex: 1000 }}
      >
        <div className="container">
          <div className="left">
            <a href="/">
              <img src={logo} alt="logo" style={logoStyle} />
            </a>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
