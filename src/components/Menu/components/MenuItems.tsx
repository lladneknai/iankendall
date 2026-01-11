import { useNavigate } from "react-router";
import { useCodeStore } from "@/store/codeStore";
import { useAppStore } from "@/store/appStore";
import { MenuItemsProps } from "@shared";

const MenuItems = ({
  handleContactClick,
  handleMenuToggle,
  handleMouseIn,
  handleMouseOut,
  subtext,
}: MenuItemsProps) => {
  const navigate = useNavigate();
  const { isMobile } = useAppStore();
  const { setOpen } = useCodeStore();

  const handleOpenCode = () => {
    handleMenuToggle();
    if (isMobile) {
      navigate("/code");
      return;
    }
    setOpen(true);
  };

  const goto = (href: string) => {
    navigate(href);
    handleMenuToggle();
  };

  return (
    <div className="items">
      <div className="items-main">
        <button
          className={subtext && subtext !== "code" ? "gray" : ""}
          onClick={handleOpenCode}
          onMouseEnter={() => handleMouseIn("code")}
          onMouseLeave={handleMouseOut}
          type="button"
        >
          Source Code
        </button>
        <button
          className={subtext && subtext !== "projects" ? "gray" : ""}
          onClick={() => goto("projects")}
          onMouseEnter={() => handleMouseIn("projects")}
          onMouseLeave={handleMouseOut}
          type="button"
        >
          Projects
        </button>
        <button
          className={subtext && subtext !== "about" ? "gray" : ""}
          onClick={() => goto("about")}
          onMouseEnter={() => handleMouseIn("about")}
          onMouseLeave={handleMouseOut}
          type="button"
        >
          About Me
        </button>
        <button
          // className={`${subtext && subtext !== "contact" ? "gray" : ""} ${
          // isContactDisabled ? "gray strikethrough" : ""
          // }`}
          // disabled={isContactDisabled}
          onClick={handleContactClick}
          onMouseEnter={() => handleMouseIn("contact")}
          onMouseLeave={handleMouseOut}
          type="button"
        >
          Contact
        </button>
      </div>
    </div>
  );
};

export default MenuItems;
