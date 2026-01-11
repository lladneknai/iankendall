import useMenu from "@hooks/useMenu";
import Navbar from "./components/Navbar";
import MenuItems from "./components/MenuItems";
import MenuFooter from "./components/MenuFooter";
import MenuSubtext from "./components/MenuSubtext";
import MenuSubItems from "./components/MenuSubItems";

/**
 * MENU | main application navbar and menu
 */
const Menu = () => {
  const {
    methods: {
      handleContactClick,
      handleIanKendall,
      handleMenuToggle,
      handleMouseIn,
      handleMouseOut,
      handleNewPage,
      handleToggleSound,
    },
    state: { isLight, isMenuOpen, isScrolled, subtext, subtextShown },
  } = useMenu();

  return (
    <div
      id="Menu"
      className={`${isMenuOpen ? "open" : "closed"}${isLight ? " light" : ""}`}
    >
      <Navbar
        handleContactClick={handleContactClick}
        handleIanKendall={handleIanKendall}
        handleMenuToggle={handleMenuToggle}
        isOpen={isMenuOpen}
        isScrolled={isScrolled}
      />
      <div id="MenuContentContainer">
        <div id="MenuContent">
          <MenuItems
            handleContactClick={handleContactClick}
            handleMenuToggle={handleMenuToggle}
            handleMouseIn={handleMouseIn}
            handleMouseOut={handleMouseOut}
            subtext={subtext}
          />
          <MenuSubtext subtext={subtext} subtextShown={subtextShown} />
          <MenuSubItems
            handleNewPage={handleNewPage}
            handleToggleSound={handleToggleSound}
            subtextShown={subtextShown}
          />
          <MenuFooter
            handleMouseIn={handleMouseIn}
            handleMouseOut={handleMouseOut}
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;
