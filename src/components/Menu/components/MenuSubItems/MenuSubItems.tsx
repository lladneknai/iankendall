import { useAudioStore } from "@/store/audioStore";
import { MenuSubItemsProps } from "@shared";

const MenuSubItems = ({
  handleNewPage,
  handleToggleSound,
  subtextShown,
}: MenuSubItemsProps) => {
  const isSoundEnabled = useAudioStore((s) => s.soundEnabled);
  return (
    <>
      <div className={`subItems ${subtextShown ? "closed" : "open"}`}>
        <button id="soundButton" onClick={handleToggleSound} type="button">
          {isSoundEnabled ? "Disable Sound FX" : "Enable Sound FX"}
        </button>
        <button id="newPageButton" onClick={handleNewPage} type="button">
          Reset Typewriter
        </button>
        <button
          id="usageGuideButton"
          onClick={() => window.alert("TODO!")}
          type="button"
        >
          Download Resume
        </button>
      </div>
    </>
  );
};

export default MenuSubItems;

/* 

     TODO: come back to this stuff (maybe?)
        <div
          className={`subItem-detail ${hovered ? "shown" : "hidden"}`}
          onMouseLeave={() => setHovered("")}
        >
          {hovered === "sound" && (
            <SoundEffectsToggle handleToggleSound={handleToggleSound} />
          )}
          {hovered === "theme" && <ThemeSelector />}
        </div> 
          // const [hovered, setHovered] = useState("");
        // useEffect(() => {
        // setHovered("");
        // }, [subtextShown]);

*/
