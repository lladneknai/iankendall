import Desk from "@components/Desk";
import Room from "@components/Room";
import { useAppStore } from "@store/appStore";
import Typewriter from "@components/Typewriter";
import SendMessageDialog from "@components/SendMessageDialog";
import ReEnableTypewriterDialog from "@components/Typewriter/components/ReEnableTypewriterDialog";

/**
 * CONTACT ROUTE
 * -------------
 * - Identical to home, but with auto-typing / autocomplete contact flow
 * - Typewriter is locked while auto-typing user can respond when finished
 * - Users are aided via fill-in-the-blank prompts and aucomplete suggestions (Cmd+Shift)
 */
export default function Contact() {
  const isMobile = useAppStore((s) => s.isMobile);

  return (
    <>
      <Room>
        <Desk>
          <Typewriter isAutoType isMobileContact={isMobile} />
        </Desk>
        <SendMessageDialog />
      </Room>
      <ReEnableTypewriterDialog />
    </>
  );
}
