import { NamePlateProps } from "@shared";

/**
 * TYPEWRITER | Name plate and hammer
 * - Hammer animates to strike the paper on char update
 * - Abstracted to keep top-level component neat ¯\_(ツ)_/¯
 */
export default function NamePlate({ hammerRef }: NamePlateProps) {
  return (
    <div id="NamePlate">
      <div id="ian">Ian E. Kendall</div>
      <div id="hammer" ref={hammerRef} />
    </div>
  );
}
