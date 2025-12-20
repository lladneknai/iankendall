================================
 TOP-LEVEL HOOK: useTypewriter
================================
- ACCEPTS: { isAutoType: boolean, isMobile: boolean }
- Instantiated in <TypewriterV2 />
- Contains TEXT and ACTIVE STATE
- Accesses all other sub-hooks
- EXPOSES:
  - methods:
    - handleUserKeystroke
    - onKeyboardRender
    - setSuggestionText
    - setIsActive
    - setText
  - refs (all DOM refs)
  - state:
    - isActive
    - isAutoTyping
    - isAutoTypeConcluded
    - layoutName
    - paperStyles
    - rows
    - suggestionText
    - suggestionTextAc
    - text

==========================================
 SUB-HOOKS: abstracted for maintainability
==========================================

-----------------------
 useTypewriterRefs
-----------------------
- ACCEPTS: {}
- RUNS: initializes all DOM refs for typewriter elements
- EXPOSES: 
  - keyboardInstanceRef
  - onKeyboardRender
  - refs:
    - hammerRef
    - keyboardRef
    - keyRefs
    - linkageRefs
    - soundRef
    - spaceLinkagesRef

---------------------------
 useTypewriterKeyEffects
---------------------------
- ACCEPTS: { isActive, refs }
- RUNS: 
  - sound effects for keystrokes
  - animations for keys/linkages/hammer
  - layout changes (caps lock, shift)
  - event listeners for special keys (backspace, caps, shift)
- EXPOSES:
  - handleKeystrokeEffects
  - layoutName

----------------------------
 useTypewriterAutoTyping
----------------------------
- ACCEPTS: { isAutoType, isMobile, handleKeystrokeEffects, keyboardInstanceRef, setIsActive, setText, text }
- RUNS:
  - automatic typing flow (character-by-character)
  - autocomplete suggestions (CMD+SHIFT shortcut)
  - prompt text management
  - progress tracking through auto-type flow
  - user typing detection & handling
- EXPOSES:
  - methods: 
    - setSuggestionText
  - state:
    - isAutoTyping
    - isAutoTypeConcluded
    - suggestionText
    - suggestionTextAc

-----------------------
 useTypewriterRows
-----------------------
- ACCEPTS: { playSound, text }
- RUNS: 
  - splits text into rows for rendering
  - calculates paper positioning styles
  - plays "ding" sound at ragged edge
- EXPOSES:
  - paperStyles
  - rows


===========================
EXTERNAL SUPPORTING STORES
===========================

---------------------
sendMessageStore
---------------------
- ZUSTAND STORE: Global state for send message functionality
- MANAGES: 
  - message sending behavior and form state
  - email validation (optional field, must be valid if provided)
  - POST to /api/messages/send-message
- STATE:
  - email
  - emailError
  - hasAttemptedSubmit
  - sendProgress (values: "", "preSend", "isSending", "hasSent")
  - submissionError
- ACTIONS:
  - handleCancelSend
  - handleEmailBlur
  - handleEmailChange
  - handleRequestSendMessage
  - handleReset (accepts setText param)
  - handleSendMessage (accepts text, setText params)
  - handleViewCode
  - setSendProgress
  - validateEmail
