import { wait } from "@/util/promises";
import { useEffect, useState } from "react";
import { MenuButtonProps } from "@shared";

export default function MenuButton({ handleMenuToggle, isOpen }: MenuButtonProps) {
  const [buttonText, setButtonText] = useState("Menu");

  // Build the text slowly with timeouts
  // TODO: could this be done with CSS?
  async function buildString(string: string) {
    setButtonText("");
    await wait(250);
    for (let i = 1; i <= string.length; i++) {
      await wait(50);
      setButtonText(string.slice(0, i));
    }
    return;
  }

  useEffect(() => {
    buildString(isOpen ? "Close" : "Menu");
  }, [isOpen]);

  return (
    <button id="NavbarMenuBtn" onClick={handleMenuToggle} type="button">
      <div id="NavbarMenuBtnText">{buttonText}</div>
      <div id="NavbarMenuIcon" className={isOpen ? "open" : ""}>
        <span />
        <span />
        <span />
      </div>
    </button>
  );
}
