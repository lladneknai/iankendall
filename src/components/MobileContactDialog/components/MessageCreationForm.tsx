import { AUTO_COMPLETE_BLOCKS_MOBILE } from "@/config/typing";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { MessageCreationFormProps } from "@shared";

export default function MessageCreationForm({
  isAutoTyping,
  onFinish,
  progress,
  setProgress,
  setText,
  suggestionText,
  text,
  typeBlock,
}: MessageCreationFormProps) {
  const textRef = useRef("");
  const [value, setValue] = useState("");

  // Update localized text ref when auto-typing stops
  useEffect(() => {
    const addNewlineIndices = [1, 2, 3];
    if (!isAutoTyping) {
      const suffix = "";
      const newText = addNewlineIndices.includes(progress)
        ? `${text}${suffix}`
        : text;
      console.log("saving at progress index:", progress);
      textRef.current = newText;
    }
  }, [isAutoTyping]);

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    const newText = `${textRef.current}${e.target.value}`;
    setText(newText);
  };

  const submitCurrentBlock = (e: React.FormEvent) => {
    e.preventDefault();
    setValue("");
    if (AUTO_COMPLETE_BLOCKS_MOBILE[progress]) {
      typeBlock(`\n${AUTO_COMPLETE_BLOCKS_MOBILE[progress]}`);
    } else {
      onFinish();
    }
    setProgress(progress + 1);
  };

  const errors = {
    name: "",
  };

  return (
    <>
      <form className="inline-form" onSubmit={submitCurrentBlock}>
        {errors.name && <p className="error">{errors.name}</p>}
        <input
          id="MessageCreationFormInput"
          disabled={isAutoTyping}
          name="name"
          type="text"
          onChange={handleTextInput}
          placeholder={suggestionText}
          value={value}
        />
        <button className="btn form-btn">
          Next
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </form>
    </>
  );
}
