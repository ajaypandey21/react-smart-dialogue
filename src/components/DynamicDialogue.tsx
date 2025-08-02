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
  dialogueClassName = "bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 transition-all duration-300",
  overlayClassName = "fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/30 backdrop-blur-md",
  titleClassName = "text-2xl font-bold text-gray-800 mb-4 text-center",
  messageClassName = "text-gray-600 mb-8 leading-relaxed text-center",
  confirmButtonClassName = "px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl",
  cancelButtonClassName = "px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-200 border border-gray-300",
  buttonsContainerClassName = "flex justify-end space-x-4 pt-4",
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
        <div className="p-8">
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
