import { useCodeStore } from "@store/codeStore";

/**
 * USE CODE WINDOW | run the code preview window
 *
 * - Source code tree is built using a static text file (public/sourcecode-ref.txt)
 * - File text for selected files is copied and stored at its proper path (public/sourcecode/)
 * - When selected, a request retrieves the file's contents and displayes them in the code window dialog
 */

function useCodePreview() {
  const { setFiletype, setLoading, setText } = useCodeStore();

  function fetchFile(requestedFile: string) {
    setLoading(true);
    setFiletype(requestedFile.split(".")[1]);

    // Fetch the public copy of the file
    const fileUrl = `/sourcecode/${requestedFile}`;
    fetch(fileUrl)
      .then((response) => response.text())
      .then((text) => {
        setText(text);
        setLoading(false);
      });
  }

  return {
    fetchFile,
  };
}

export default useCodePreview;
