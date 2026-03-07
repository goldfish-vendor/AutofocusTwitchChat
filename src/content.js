(() => {
  if (!/twitch\.tv/i.test(window.location.host)) return;
  const videoSelectors = [
    ".video-player",
    ".video-player__container",
    ".player",
    ".persistent-player",
    "video",
    "[data-a-player]",
    '[data-test-selector="video-player"]',
  ];
  const chatBoxSelector = '[data-a-target="chat-input"]';
  const isVideoContainer = (el) => {
    if (!el) return false;
    try {
      return videoSelectors.some((sel) => el.closest?.(sel));
    } catch (_) {
      return false;
    }
  };
  const isInteractible = (el) => {
    if (!el) return false;
    return Boolean(
      el.closest?.(
        'a, button, input, textarea, select, label, summary, [contenteditable], [role="button"], [role="link"], [role="textbox"]'
      )
    );
  };
  const focusChat = () => {
    const chat = document.querySelector(chatBoxSelector);
    if (!chat) return;

    chat.focus?.({ preventScroll: true });

    try {
      if (typeof chat.selectionStart === "number") {
        const t = chat.value || "";
        chat.setSelectionRange(t.length, t.length);
      }
    } catch (e) {
    }
  };
    document.addEventListener("click",(e) => {
      if (e.defaultPrevented) return;

      if (e.ctrlKey || e.metaKey) return; // because twitch hates firefox and so do i

      const t = e.target;
      if (!t) return;

      if (isVideoContainer(t)) return;

      if (isInteractible(t) && !t.closest?.(chatBoxSelector)) return;

      const sel = window.getSelection?.();
      if (sel && sel.toString()) return;

      focusChat();
    },
    true
  );
})();