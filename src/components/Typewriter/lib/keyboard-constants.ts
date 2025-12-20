//
// PLUGIN KEYBOARD LAYOUT: manage the keyboard's layout. (DOCS: https://hodgef.com/simple-keyboard/documentation/options/layout/
//
export const keyLayout = {
  default: [
    "{tab} 1 2 3 4 5 6 7 8 9 !",
    "q w e r t y u i o p {bksp}",
    "{lock} a s d f g h j k l {enter}",
    "{shift} z x c v b n m . '",
    "{space}",
    '" , ? : ; / ( ) @ = + - – 0',
  ],
  shift: [
    "{tab} 1 2 3 4 5 6 7 8 9 !",
    "Q W E R T Y U I O P {bksp}",
    "{lock} A S D F G H J K L {enter}",
    "{shift} Z X C V B N M . '",
    "{space}",
    '" , ? : ; / ( ) @ = + - – 0',
  ],
};

//
// Translate keys declared in `keyLayout` into names on the keys.
//
export const displayKeys = {
  "{bksp}": "Back\nSpace",
  "{enter}": "Enter",
  "{shift}": "Shift\nKey",
  "{tab}": "Tab",
  "{lock}": "Shift\nLock",
  "{space}": " ",
  ".": `. ,`,
  "'": `&rdquo; &rsquo;`,
  "1": "1 ?",
  "2": "2 :",
  "3": "3 ;",
  "4": "4 /",
  "5": "5 (",
  "6": "6 )",
  "7": "7 @",
  "8": "8 =",
  "9": "9 +",
  "!": "! -",
};

//
// Themes for buttons on the keyboard.
// These classes are targeted by custom CSS rules.
// The bottom row is hidden, to allow users to type all characters.
//
export const buttonThemes = [
  {
    class: "key-bksp",
    buttons: "{bksp}",
  },
  {
    class: "key-enter",
    buttons: "{enter}",
  },
  {
    class: "key-shift",
    buttons: "{shift}",
  },
  {
    class: "key-tab",
    buttons: "{tab}",
  },
  {
    class: "key-space",
    buttons: "{space}",
  },
  {
    class: "key-q",
    buttons: "q Q",
  },
  {
    class: "key-caps",
    buttons: "{lock}",
  },
  {
    class: "key-period",
    buttons: ".",
  },
  {
    class: "key-quote",
    buttons: "'",
  },
  {
    class: "key-twoline",
    buttons: "1 2 3 4 5 6 7 8 9 !",
  },
  {
    class: "key-hidden",
    buttons: '" , ? : ; / ( ) @ = + - – 0',
  },
];

//
//	KEY & LINKAGE OVERRIDES
//
// Communicating with the plugin (to run custom animations, ref DOM elements, etc) requires a translation
// layer. These overrides provide lookups for non-standard keys, both when creating and managing the DOM.
//
// - keyOverrides: Use keystroke chars to look up the ID for that `data-skbtn` the DOM.
// - linkageOverrides: Find the corresponding linkage element in the DOM for the key that was pressed.
//
export const keyOverrides: Record<string, string> = {
  bksp: "{bksp}",
  " ": "{space}",
  "\n": "{enter}",
  "    ": "{tab}",
  '"': "'",
  ",": ".",
  "?": "1",
  ":": "2",
  ";": "3",
  "/": "4",
  "(": "5",
  ")": "6",
  "@": "7",
  "=": "8",
  "+": "9",
  "-": "!",
  "–": "!",
  "0": "o",
};

export const linkageOverrides: Record<string, string> = {
  "\n": "enter",
  "{enter}": "enter",
  "{space}": "space",
  "    ": "tab",
  "1": "one",
  "?": "one",
  "2": "two",
  ":": "two",
  "3": "three",
  ";": "three",
  "4": "four",
  "/": "four",
  "5": "five",
  "(": "five",
  "6": "six",
  ")": "six",
  "7": "seven",
  "@": "seven",
  "8": "eight",
  "=": "eight",
  "9": "nine",
  "+": "nine",
  "!": "exmark",
  "-": "exmark",
  "–": "exmark",
  ".": "period",
  ",": "period",
  "'": "quote",
  '"': "quote",
  " ": "space",
  "0": "o",
};

//
// LINKAGE LAYOUT: This array generates the linkage elements, in order.
//
export const linkageLayout = [
  "tab",
  "lock",
  "q",
  "shift",
  "1",
  "a",
  "w",
  "z",
  "2",
  "s",
  "e",
  "x",
  "3",
  "d",
  "r",
  "c",
  "4",
  "f",
  "t",
  "v",
  "5",
  "g",
  "y",
  "b",
  "6",
  "h",
  "u",
  "n",
  "7",
  "j",
  "i",
  "m",
  "8",
  "k",
  "o",
  ".",
  "9",
  "l",
  "p",
  `'`,
  "!",
  "enter",
  "bksp",
];
