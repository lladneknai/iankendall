import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { wait } from "@util/promises";
import { useAppStore } from "@store/appStore";
import { useAudioStore } from "@store/audioStore";
import { isTypewriterRoute } from "@util/typewriter";

/**
 * USE MENU | shared functionality for the app's menu
 */
export default function useMenu() {
  // Global state
  const isMenuOpen = useAppStore((s) => s.isMenuOpen);
  const setIsActive = useAppStore((s) => s.setIsActive);
  const primeAudio = useAudioStore((s) => s.primeAudio);
  const setIsMenuOpen = useAppStore((s) => s.setIsMenuOpen);
  const soundEnabled = useAudioStore((s) => s.soundEnabled);
  const setSoundEnabled = useAudioStore((s) => s.setSoundEnabled);
  const requestTypewriterReset = useAppStore((s) => s.requestTypewriterReset);

  // URL handling
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const route = pathname.split("/")[1];

  // Local state
  const [subtext, setSubtext] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [subtextShown, setSubtextShown] = useState(false);

  // Route-specific state
  const isLight = useMemo(() => route === "about", [route]);

  // Animation refs
  const isAnimatingRef = useRef(false);
  const currentHoverRef = useRef<string | null>(null);
  const pendingAnimationRef = useRef<string | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollTicking = useRef(false);

  // Handle "Contact" click, which triggers the auto-typing behavior
  const handleContactClick = (e: React.MouseEvent) => {
    setIsMenuOpen(false);
    e.preventDefault();
    if (soundEnabled) {
      primeAudio();
    }
    navigate("/contact");
  };

  // Many have tried, many have failed... ;)
  const handleIanKendall = () => {
    setIsMenuOpen(false);
    // If you click this while already home, GO TO PROJECTS.
    if (route === "") {
      navigate("/projects");
      return;
    }
    // If not, GO TO HOME, and make sure the typewriter is active.
    navigate("/");
    setIsActive(true);
  };

  // Reset the typewriter.
  const handleNewPage = () => {
    requestTypewriterReset();
    handleMenuToggle();
    navigate("/");
  };

  // HANDLE MENU OPEN/CLOSE
  // - Clear state when closing
  // - If closing on a Typewriter route, re-activate it.
  const handleMenuToggle = () => {
    const isCurrentlyOpen = isMenuOpen;
    setIsMenuOpen(!isMenuOpen);
    if (isCurrentlyOpen) {
      setSubtext("");
      setSubtextShown(false);
      if (isTypewriterRoute(route)) {
        setIsActive(true);
      }
    }
  };

  // Toggle sound on/off
  const handleToggleSound = () => {
    setSoundEnabled(!soundEnabled);
    handleMenuToggle();
  };

  const handleMouseIn = async (type: string) => {
    currentHoverRef.current = type;

    // If currently animating, just update the pending animation
    if (isAnimatingRef.current) {
      pendingAnimationRef.current = type;
      return;
    }

    // If user is coming from outside (no current subtext), wait 100ms
    // If user is switching between items (subtext exists), start immediately
    if (!subtext && !subtextShown) {
      await wait(100);
      if (currentHoverRef.current !== type) {
        return;
      }
    }

    // Start the show animation immediately
    isAnimatingRef.current = true;
    pendingAnimationRef.current = null;
    setSubtextShown(true);
    setSubtext(type);

    // Wait for full CSS animation: 125ms delay + 250ms transition = 375ms
    animationTimeoutRef.current = setTimeout(() => {
      isAnimatingRef.current = false;

      // Check if user is still hovering on the same element
      if (currentHoverRef.current !== type) {
        // User is no longer hovering on this element, trigger mouse out
        if (currentHoverRef.current === null) {
          // User left completely, hide the subtext
          handleMouseOut();
        } else {
          // User moved to a different element, switch to that one
          const newType = currentHoverRef.current;
          handleMouseIn(newType);
        }
        return;
      }

      // Check if there's a pending animation and user is still hovering somewhere
      if (pendingAnimationRef.current && currentHoverRef.current) {
        const nextType = pendingAnimationRef.current;
        pendingAnimationRef.current = null;
        handleMouseIn(nextType);
      }
    }, 375);
  };

  const handleMouseOut = () => {
    currentHoverRef.current = null;

    // If currently animating, mark that we want to hide when done
    if (isAnimatingRef.current) {
      pendingAnimationRef.current = "OUT";
      return;
    }

    // Start the hide animation
    isAnimatingRef.current = true;
    pendingAnimationRef.current = null;
    setSubtextShown(false);

    // Wait for full CSS animation: 125ms delay + 100ms transition = 225ms
    animationTimeoutRef.current = setTimeout(() => {
      setSubtext("");
      isAnimatingRef.current = false;

      // Check if user moved to another item while we were hiding
      if (currentHoverRef.current && pendingAnimationRef.current !== "OUT") {
        handleMouseIn(currentHoverRef.current);
      }
    }, 225);
  };

  //
  // SIDE-EFFECTS
  // Trigger effects based on user behavior
  //

  // Lock menu when opening
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  // Track scroll position to handle nav background color
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollTicking.current) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 25;
          if (scrolled !== isScrolled) {
            setIsScrolled(scrolled);
          }
          scrollTicking.current = false;
        });
        scrollTicking.current = true;
      }
    };
    // Set initial state
    setIsScrolled(window.scrollY > 25);
    // Add listener with passive flag for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  return {
    methods: {
      handleContactClick,
      handleIanKendall,
      handleMenuToggle,
      handleMouseIn,
      handleMouseOut,
      handleNewPage,
      handleToggleSound,
    },
    state: {
      isLight,
      isMenuOpen,
      isScrolled,
      subtext,
      subtextShown,
    },
  };
}
