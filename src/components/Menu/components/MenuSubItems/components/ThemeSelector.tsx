import { useAppStore } from "@/store/appStore";

export default function ThemeSelector() {
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  return (
    <div className="col gap-05">
      <div className="row gap-05">
        <button
          className={`btn bg-light${theme === "light" ? " current-theme" : ""}`}
          onClick={() => setTheme("light")}
          type="button"
        >
          Default
        </button>
        <button
          className={`btn bg-mint${theme === "mint" ? " current-theme" : ""}`}
          onClick={() => setTheme("mint")}
          type="button"
        >
          Mint
        </button>
        <button
          className={`btn bg-aqua${theme === "aqua" ? " current-theme" : ""}`}
          onClick={() => setTheme("aqua")}
          type="button"
        >
          Aqua
        </button>
        <button
          className={`btn bg-lavendar${
            theme === "lavendar" ? " current-theme" : ""
          }`}
          onClick={() => setTheme("lavendar")}
          type="button"
        >
          Lavendar
        </button>
        <button
          className={`btn bg-sienna${
            theme === "sienna" ? " current-theme" : ""
          }`}
          onClick={() => setTheme("sienna")}
          type="button"
        >
          Sienna
        </button>
        <button
          className={`btn bg-coral${theme === "coral" ? " current-theme" : ""}`}
          onClick={() => setTheme("coral")}
          type="button"
        >
          Coral
        </button>
      </div>
      <p className="theme-label">Select your theme from the options above.</p>
    </div>
  );
}
