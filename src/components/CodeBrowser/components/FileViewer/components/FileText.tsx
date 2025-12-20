import { CODE_CONFIG } from "@config/code";
import { useCodeStore } from "@store/codeStore";
import { CodeBlock, zenburn } from "react-code-blocks";

/**
 * FILE TEXT | View the requested file in a CodeBlock browser.
 */
export default function FileText({
  fontSize,
}: // isLoading
any) {
  const { text, theme, filetype } = useCodeStore();

  // Load current theme
  const themeKey = theme as keyof typeof CODE_CONFIG.THEME_OPTIONS;
  const activeTheme = CODE_CONFIG.THEME_OPTIONS[themeKey] || zenburn;

  // Inline style for dynamic font sizing
  const style = { "--code-font-size": `${fontSize}px` } as React.CSSProperties;

  // TODO: Something is jacked up in the plugin re: font-size.
  // Manually clearing the text while OR unmounting while loading DIDN'T WORK.
  // I guess we can ship it for now, but... needs to be fixed.
  /*
  const renderedText = useMemo(() => {
    if (isLoading) {
      return "";
    }
    return text;
  }, [isLoading, text]);
  */

  // if (isLoading) {
  // return null;
  // }

  return (
    <div id="FileText" style={style}>
      <CodeBlock
        language={filetype}
        showLineNumbers={true}
        text={text}
        // text={renderedText}
        theme={activeTheme}
        wrapLongLines={false}
      />
    </div>
  );
}
