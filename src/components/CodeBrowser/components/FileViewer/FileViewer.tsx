import { useCodeStore } from "@store/codeStore";
import { FileViewerProps } from "@shared";
import LoadingBar from "@components/LoadingBar";
import FileText from "./components/FileText";
import FileViewerActions from "./components/FileViewerActions";

export default function FileViewer({
  decrementFontSize,
  fontSize,
  incrementFontSize,
  isWindow,
}: FileViewerProps) {
  const isLoading = useCodeStore((s) => s.loading);
  return (
    <div id="FileViewer">
      <FileViewerActions
        decrementFontSize={decrementFontSize}
        incrementFontSize={incrementFontSize}
        isWindow={isWindow}
      />
      <LoadingBar height={2} isLoading={isLoading} />
      <FileText fontSize={fontSize} isLoading={isLoading} />
    </div>
  );
}
