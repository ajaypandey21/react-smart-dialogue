import React, { useEffect } from "react";

export interface DialogueProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose?: () => void;
}

const DynamicDialogue: React.FC<DialogueProps> = ({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose ? onClose() : onCancel();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onCancel]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose ? onClose() : onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 transition-opacity duration-300"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialogue-title"
      aria-describedby="dialogue-message"
    >
      <div
        className="bg-white rounded-xl shadow-xl w-[90%] max-w-sm mx-auto overflow-hidden transition-all duration-300 border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="dialogue-title"
          className="text-xl font-semibold text-gray-800 px-6 pt-6 pb-2"
        >
          {title}
        </h2>

        <p
          id="dialogue-message"
          className="text-gray-600 text-base px-6 pb-6 leading-relaxed"
        >
          {message}
        </p>

        <div className="flex justify-end gap-3 px-6 pb-6 pt-2">
          {cancelText && (
            <button
              onClick={onCancel}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 border border-gray-200 transition-all duration-200"
              type="button"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            type="button"
            autoFocus
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicDialogue;
