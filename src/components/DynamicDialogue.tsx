// src/components/DynamicDialogue.tsx
import React from "react";

export interface DialogueProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose?: () => void;
  // Styling props with Tailwind classes
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
  dialogueClassName = "bg-white rounded-lg shadow-xl max-w-md w-full mx-4",
  overlayClassName = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
  titleClassName = "text-xl font-semibold text-gray-900 mb-4",
  messageClassName = "text-gray-700 mb-6",
  confirmButtonClassName = "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500",
  cancelButtonClassName = "px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500",
  buttonsContainerClassName = "flex justify-end space-x-3",
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose ? onClose() : onCancel();
    }
  };

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div
      className={overlayClassName}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialogue-title"
      aria-describedby="dialogue-message"
    >
      <div className={dialogueClassName}>
        <div className="p-6">
          <h2 id="dialogue-title" className={titleClassName}>
            {title}
          </h2>

          <p id="dialogue-message" className={messageClassName}>
            {message}
          </p>

          <div className={buttonsContainerClassName}>
            <button
              onClick={handleCancel}
              className={cancelButtonClassName}
              type="button"
            >
              {cancelText}
            </button>

            <button
              onClick={handleConfirm}
              className={confirmButtonClassName}
              type="button"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicDialogue;

// src/index.ts
