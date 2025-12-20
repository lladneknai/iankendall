import { useAudioStore } from "@/store/audioStore";
import { SoundEffectsToggleProps } from "@shared";

export default function SoundEffectsToggle({ handleToggleSound }: SoundEffectsToggleProps) {
  const isSoundEnabled = useAudioStore((s) => s.soundEnabled);

  return (
    <>
      <div className="row gap-05">
        <input
          type="checkbox"
          name="enableSound"
          checked={isSoundEnabled}
          onChange={handleToggleSound}
        />
        <label htmlFor="enableSound" onClick={handleToggleSound}>
          Sound Effects {isSoundEnabled ? "Enabled" : "Disabled"}
        </label>
      </div>
      <p>Sound effects may impact performance in select browsers.</p>
    </>
  );
}
