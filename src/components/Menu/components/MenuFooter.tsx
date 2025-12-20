import { MouseHoverHandlers } from "@shared";

const MenuFooter = ({ handleMouseIn, handleMouseOut }: MouseHoverHandlers) => {
  return (
    <div id="MenuFooter">
      Made with
      <img
        onMouseEnter={() => handleMouseIn("react")}
        onMouseLeave={handleMouseOut}
        src="img/icon/react.svg"
        alt="react-logo"
        width="20"
      />
      +
      <img
        onMouseEnter={() => handleMouseIn("vite")}
        onMouseLeave={handleMouseOut}
        src="img/icon/vite.svg"
        alt="vite-logo"
        width="20"
      />
      +
      <img
        onMouseEnter={() => handleMouseIn("ampt")}
        onMouseLeave={handleMouseOut}
        src="img/icon/ampt.svg"
        alt="ampt-logo"
        width="20"
      />
      {/* +<p>love from Ian</p> */}
    </div>
  );
};

export default MenuFooter;
