import Desk from "@components/Desk";
import Room from "@components/Room";
import { useAppStore } from "@store/appStore";
import Typewriter from "@components/Typewriter";
import SendMessageDialog from "@components/SendMessageDialog";
import ReEnableTypewriterDialog from "@components/Typewriter/components/ReEnableTypewriterDialog";
import MobileHome from "./HomeMobile";

/**
 * HOME ROUTE
 * ----------
 * - Present a typewriter for the user to type out a message
 * - Provide a mobile-specific homepage where a message is auto-typed
 */
export default function Home() {
  const isMobile = useAppStore((s) => s.isMobile);
  const isWelcomeComplete = useAppStore((s) => s.isWelcomeComplete);

  if (isMobile) {
    return <MobileHome />;
  }

  return (
    <>
      <Room>
        <Desk>
          <Typewriter
            // Type out the welcom message if not yet typed.
            // Once this is done, type their own message WIHOUT prompts.
            isDesktopHome={!isWelcomeComplete}
          />
        </Desk>
        {!isMobile && <SendMessageDialog />}
      </Room>
      <ReEnableTypewriterDialog />
    </>
  );
}
