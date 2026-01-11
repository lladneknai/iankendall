import { useEffect, useMemo, useState } from "react";
import { CHARS_PER_LINE, DING_LENGTH } from "@/config/typing";
import { useAppStore } from "@/store/appStore";
import { UseTypingTipsProps } from "@shared";

export default function useTypingTips({
  ignoreAutocompleteSuggestion,
  isAutoTypeConcluded,
  isAutoTyping,
  isPromptRendered,
  isSuggestionRendered,
  progress,
  rows,
  suggestionTextAc,
}: UseTypingTipsProps) {
  const isAtLimit = useAppStore((s) => s.isAtLimit);
  const setIsActive = useAppStore((s) => s.setIsActive);
  const [tipText, setTipText] = useState("");

  console.log("[useTypingTips] suggestionTextAc:", suggestionTextAc);
  //
  // TIP CONFIG
  // ----------
  // - Keyed tips are shown to the user depending on typewriter state
  // - Use derived types to easily expand the list (add text and threshold)
  //
  const TIPS = {
    atLimit: "You have reached the end of the page.",
    autocomplete: 'Press "CMD+SHIFT" to autocomplete.',
    ding: 'When you hear a "ding", press "Enter" for a line break.',

    // TODO: would be nice to have this GO AWAY on Enter.
    enter: 'Press "Enter" for a new line.',
    prompt: "Type your response to complete the prompt.",
    send: 'Click "Send Message" to email your message.',
    willSuggest: "Suggestion will appear 3 seconds after typing.",
  };
  type TipKey = keyof typeof TIPS;
  type TipCounts = Record<TipKey, number>;

  //
  // TIP THRESHOLDS
  // --------------
  // - Set a maximum threshold for each tip
  // - Prevents users repeatedly seeing a tip and being annoyed
  // - Dismissing a tip prevents it from being re-shown, count is set to threshold
  //
  const THRESHOLDS: TipCounts = {
    atLimit: 10,
    autocomplete: 50,
    ding: 3,
    enter: 3,
    prompt: 2,
    send: 4,
    willSuggest: 2,
  };
  const [tipCounts, setTipCounts] = useState<TipCounts>(
    Object.fromEntries(Object.keys(TIPS).map((key) => [key, 0])) as TipCounts
  );

  // Set a tip by key
  function setTip(tipKey: TipKey) {
    if (tipCounts[tipKey] >= THRESHOLDS[tipKey]) {
      console.log("[useTypingTips] SKIPPING tip:", {
        key: tipKey,
        count: tipCounts[tipKey],
        threshold: THRESHOLDS[tipKey],
      });
      return;
    }
    if (tipText === TIPS[tipKey]) {
      // console.log("[useTypingTips] SKIPPING (ALREADY ACTIVE):", tipKey);
      return;
    }
    console.log("[useTypingTips] SETTING TIP:", {
      tipKey,
      currCount: tipCounts[tipKey],
      threshold: THRESHOLDS[tipKey],
    });
    setTipText(TIPS[tipKey]);
    setTipCounts({
      ...tipCounts,
      [tipKey]: tipCounts[tipKey] + 1,
    });
  }

  //
  // MANAGE TIP CONDITIONS
  // ---------------------
  // - Watch what the user has typed and render tips accordingly
  // - Each tip has a maximum threshold (managed in `setTip` fn above)
  //
  // Returns TRUE if user is on the ragged edge, and should line break.
  const sholdPressEnter = useMemo(() => {
    return rows[rows.length - 1].length >= DING_LENGTH;
  }, [rows]);

  // Returns TRUE if user likely typed straight onto the next line.
  const shouldBeLinebroken = useMemo(() => {
    if (!rows[rows.length - 2]) {
      return false;
    }
    return (
      rows.length > 1 &&
      rows[rows.length - 1].length < 10 &&
      CHARS_PER_LINE === rows[rows.length - 2].length &&
      /[^ .!?]/.test(rows[rows.length - 1].slice(-1)) &&
      (rows[rows.length - 2].length === 0 ||
        /[^ .!?]/.test(rows[rows.length - 2].slice(-1)))
    );
  }, [rows]);

  // Watch relevant vars and set the tip accordingly.
  useEffect(() => {
    if (isAutoTyping) {
      setTipText("");
      return;
    }

    if (isAtLimit) {
      setTip("atLimit");
    } else if (isSuggestionRendered) {
      setTip("autocomplete");
    } else if (isPromptRendered) {
      setTip("prompt");
    } else if (isAutoTypeConcluded && progress > 0 && rows.length > 1) {
      setTip("send");
    } else if (sholdPressEnter) {
      setTip("enter");
    } else if (progress > 0) {
      setTip("willSuggest");
    } else if (shouldBeLinebroken) {
      // This one's a bit buggy for now
      // setTip("ding");
    } else if (tipText) {
      console.log("[useTypingTips] -> CLEARING TIP (no cases hit)");
      setTipText("");
    }
  }, [
    rows,
    isAtLimit,
    isAutoTyping,
    isAutoTypeConcluded,
    isPromptRendered,
    isSuggestionRendered,
  ]);

  // User has manually dismissed the tip; don't show it again.
  const handleDismissTip = () => {
    const tipKey = (Object.keys(TIPS) as TipKey[]).find(
      (key) => TIPS[key] === tipText
    );

    if (tipKey === "prompt") {
      ignoreAutocompleteSuggestion();
      setTipCounts({
        ...tipCounts,
        [tipKey]: THRESHOLDS[tipKey] + 1,
      });
    } else if (tipKey) {
      setTipText("");
      setTipCounts({
        ...tipCounts,
        [tipKey]: THRESHOLDS[tipKey] + 1,
      });
    }

    console.log("[handleDismissTip] tipKey:", tipKey);

    // Since this click will deactivate the Typewriter, re-focus it immediately.
    setIsActive(true);
  };

  return {
    handleDismissTip,
    tipText,
  };
}

// const currRow = rows[rows.length - 1];
// const lastChar = rows[rows.length - 1].slice(-1);
// const prevRowLastChar = rows[rows.length - 2]?.slice(-1);
// const currRowLength = rows[rows.length - 1].length;
