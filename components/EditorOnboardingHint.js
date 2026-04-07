import React, { useEffect, useState } from 'react';

const HINT_KEY = 'os-editor-hint-seen';

const EditorOnboardingHint = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(HINT_KEY)) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(HINT_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="mb-5 flex items-center justify-between bg-white border border-gray-200 rounded px-5 py-3 text-xs text-default"
      style={{ width: '210mm' }}
    >
      <div className="flex gap-8">
        <span>
          <span className="font-semibold text-[#101214]">← Sections</span>
          <span className="ml-1.5">navigate your resume</span>
        </span>
        <span>
          <span className="font-semibold text-[#101214]">Live Preview</span>
          <span className="ml-1.5">edits appear instantly</span>
        </span>
        <span>
          <span className="font-semibold text-[#101214]">Font & Print →</span>
          <span className="ml-1.5">customize and export</span>
        </span>
      </div>
      <button
        type="button"
        onClick={dismiss}
        className="ml-6 flex-shrink-0 text-default hover:text-[#101214] transition-colors duration-150"
        aria-label="Dismiss hint"
      >
        ✕
      </button>
    </div>
  );
};

export default EditorOnboardingHint;
