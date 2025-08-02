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
  dialogueClassName?: string;
  overlayClassName?: string;
  titleClassName?: string;
  messageClassName?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
  buttonsContainerClassName?: string;
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
  dialogueClassName = "bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden transform transition-all duration-300 border border-gray-100 scale-100 opacity-100",
  overlayClassName = "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 transition-opacity duration-300",
  titleClassName = "text-xl font-bold text-gray-800 px-6 pt-6 pb-2",
  messageClassName = "text-gray-600 text-base px-6 pb-6 leading-relaxed",
  confirmButtonClassName = "px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md",
  cancelButtonClassName = "px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 border border-gray-200",
  buttonsContainerClassName = "flex justify-end gap-3 px-6 pb-6 pt-2",
}) => {
  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose ? onClose() : onCancel();
      }
    };

    document.addEventListener("keydown", handleEsc);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onCancel]);

  // Don't render anything if not open
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose ? onClose() : onCancel();
    }
  };

  return (
    <>
      {/* Portal-like rendering to ensure it's on top */}
      <div
        className={overlayClassName}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialogue-title"
        aria-describedby="dialogue-message"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
        }}
      >
        <div
          className={dialogueClassName}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          <h2 id="dialogue-title" className={titleClassName}>
            {title}
          </h2>

          <p id="dialogue-message" className={messageClassName}>
            {message}
          </p>

          <div className={buttonsContainerClassName}>
            <button
              onClick={onCancel}
              className={cancelButtonClassName}
              type="button"
              autoFocus={false}
            >
              {cancelText}
            </button>

            <button
              onClick={onConfirm}
              className={confirmButtonClassName}
              type="button"
              autoFocus={true}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DynamicDialogue;
