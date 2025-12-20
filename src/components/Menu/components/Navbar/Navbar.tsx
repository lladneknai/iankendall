import { NavbarProps } from "@shared";
import IanKendall from "./components/IanKendall";
import MenuButton from "./components/MenuButton";
import ContactButton from "./components/ContactButton";

export default function Navbar({
  handleContactClick,
  handleIanKendall,
  handleMenuToggle,
  isOpen,
  isScrolled,
}: NavbarProps) {
  return (
    <div
      id="Navbar"
      className={`${isOpen ? "open" : "closed"}${
        isScrolled ? " scrolled" : ""
      }`}
    >
      <div id="NavbarContent">
        <IanKendall handleIanKendall={handleIanKendall} />
        <div id="NavbarActions">
          <ContactButton handleContactClick={handleContactClick} />
          <MenuButton handleMenuToggle={handleMenuToggle} isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
}
