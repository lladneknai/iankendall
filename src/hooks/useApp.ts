import { useEffect } from "react";
import { UAParser } from "ua-parser-js";
import { useLocation } from "react-router-dom";
import { useAppStore } from "@store/appStore";
import { useAudioStore } from "@store/audioStore";
import { isTypewriterRoute } from "@util/typewriter";

/**
 * USE APP | configure global app behavior
 *
 * - Capture user agent details on init to optimize behavior
 * - TODO: match color scheme to user's selected device scheme
 */

export default function useApp() {
  // Watch route to activate typewriter.
  const { pathname } = useLocation();
  const route = pathname.split("/")[1];

  // Global state subs
  // const isActive = useAppStore((s) => s.isActive);
  const setIsActive = useAppStore((s) => s.setIsActive);
  const setIsMobile = useAppStore((s) => s.setIsMobile);
  const setUserAgent = useAppStore((s) => s.setUserAgent);
  const setSoundEnabled = useAudioStore((s) => s.setSoundEnabled);

  const getUserAgentDetails = () => {
    const parser = new UAParser();
    return {
      browser: parser.getBrowser(),
      engine: parser.getEngine(),
      os: parser.getOS(),
      device: parser.getDevice(),
      cpu: parser.getCPU(),
    };
  };

  // Watch routes and automatically activate the typewriter when needed.
  useEffect(() => {
    const shouldEnableTypewriter = isTypewriterRoute(route);
    if (shouldEnableTypewriter) {
      // console.log("[useApp] Activating Typewriter! route:", route);
      setIsActive(true);
    } else {
      // console.log("[useApp] DE-activating Typewriter! route:", route);
      setIsActive(false);
    }
    setIsActive(shouldEnableTypewriter);
  }, [route]);

  useEffect(() => {
    const { browser, device, os } = getUserAgentDetails();
    setUserAgent({ browser, os });
    setIsMobile(device.type === "mobile");

    // Safari SUCKS at rendering audio. We might even want to disable the button
    if (browser?.name === "Safari") {
      setSoundEnabled(false);
    }

    // Set VH variable
    // Fix mobile viewport height - capture once on load to prevent jumps when address bar hides
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVH();
    //
    // Recalculate on resize (orientation change, etc) - NOT on scroll
    // TODO: THIS SHOULD BE IN, BUT DOESN'T WORK ON MOBILE.
    // window.addEventListener('resize', setVH);
  }, []);
}
