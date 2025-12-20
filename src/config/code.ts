import {
  zenburn,
  tomorrow,
  codepen,
  hybrid,
  monokaiSublime,
  tomorrowNightBright,
} from "react-code-blocks";

/**
 * CODE WINDOW CONFIG
 * TODO: this uses a different format than the rest. Consider updating it
 */
export const CODE_CONFIG = {
  DEFAULT_FILENAME: "src/main.tsx",
  DEFAULT_FILETYPE: "tsx",
  DEFAULT_EXPANDED_ITEMS: [
    "__DIR__src/components/App.tsx",
    "__DIR__App/App.tsx",
    "__DIR__components/App/App.tsx",
    "__DIR__src/components/App/App.tsx",
    "__DIR__src",
    "__DIR__src/components",
    "__DIR__src/components/App",
    "src/components/App/App.tsx",
  ],
  DEFAULT_THEME: "Default",
  THEME_OPTIONS: {
    Default: hybrid,
    Mellow: codepen,
    Monokai: monokaiSublime,
    "Tomorrow Night": tomorrowNightBright,
    Mirage: zenburn,
    Light: tomorrow,
  },
};

/*
  --------------------------------
  MORE THEMES (save for later use)
  --------------------------------
  All themes: https://react-code-blocks-rajinwonderland.vercel.app/?path=/story/code--default

  SUNSET THEMES:
    arta, hopscotch
  LIGHT THEMES:
    github, monoblue
  DARK THEMES:
    dracula, hybrid, irBlack, monokai, monokaiSublime, tomorrowNightBright
  THEMES FOR TYPEWRITER:
    zenburn, tomorrow, solarizedLight, pojoaque, paraisoLight, paraisoDark, codepen
    
 */
