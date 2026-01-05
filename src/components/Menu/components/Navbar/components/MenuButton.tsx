import { wait } from "@/util/promises";
import { useEffect, useRef, useState } from "react";
import { MenuButtonProps } from "@shared";

export default function MenuButton({ handleMenuToggle, isOpen }: MenuButtonProps) {
  const [buttonText, setButtonText] = useState("Menu");
  const hasInteracted = useRef(false);

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
    const nextText = isOpen ? "Close" : "Menu";
    
    // If user hasn't interacted yet, just set the text immediately
    if (!hasInteracted.current) {
      setButtonText(nextText);
      return;
    }
    
    // After first interaction, always animate
    buildString(nextText);
  }, [isOpen]);

  const handleClick = () => {
    hasInteracted.current = true;
    handleMenuToggle();
  };

  return (
    <button id="NavbarMenuBtn" onClick={handleClick} type="button">
      <div id="NavbarMenuBtnText">{buttonText}</div>
      <div id="NavbarMenuIcon" className={isOpen ? "open" : ""}>
        <span />
        <span />
        <span />
      </div>
    </button>
  );
}
