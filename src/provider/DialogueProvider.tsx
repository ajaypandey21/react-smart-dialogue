import React, { createContext, useContext, ReactNode } from "react";
import { useDialogue, UseDialogueOptions } from "../hooks/useDialogue";
import DynamicDialogue from "../components/DynamicDialogue";

type DialogueContextType = {
  showDialogue: (opts: UseDialogueOptions) => void;
  hideDialogue: () => void;
  isOpen: boolean;
  // Additional utilities
  showConfirmation: (
    title: string,
    message: string,
    onConfirm?: () => void
  ) => void;
  showAlert: (title: string, message: string, onClose?: () => void) => void;
};

const DialogueContext = createContext<DialogueContextType | undefined>(
  undefined
);

export function useDialogueContext() {
  const ctx = useContext(DialogueContext);
  if (!ctx) {
    throw new Error(
      "useDialogueContext must be used within a DialogueProvider"
    );
  }
  return ctx;
}

export const DialogueProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    isOpen,
    dialogueProps,
    showDialogue,
    hideDialogue,
    handleConfirm,
    handleCancel,
  } = useDialogue();

  // Utility function for simple confirmations
  const showConfirmation = (
    title: string,
    message: string,
    onConfirm?: () => void
  ) => {
    showDialogue({
      title,
      message,
      confirmText: "Yes",
      cancelText: "No",
      onConfirm,
    });
  };

  // Utility function for simple alerts
  const showAlert = (title: string, message: string, onClose?: () => void) => {
    showDialogue({
      title,
      message,
      confirmText: "OK",
      cancelText: "",
      onConfirm: onClose,
      onCancel: onClose,
      // Hide cancel button for alerts
      cancelButtonClassName: "hidden",
      buttonsContainerClassName: "flex justify-center gap-3 px-6 pb-6 pt-2",
    });
  };

  const contextValue: DialogueContextType = {
    showDialogue,
    hideDialogue,
    isOpen,
    showConfirmation,
    showAlert,
  };

  return (
    <DialogueContext.Provider value={contextValue}>
      {children}
      {/* Render dialog with all custom props */}
      <DynamicDialogue
        isOpen={isOpen}
        title={dialogueProps.title}
        message={dialogueProps.message}
        confirmText={dialogueProps.confirmText}
        cancelText={dialogueProps.cancelText}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onClose={hideDialogue}
        // Pass through custom styling props
        dialogueClassName={dialogueProps.dialogueClassName}
        overlayClassName={dialogueProps.overlayClassName}
        titleClassName={dialogueProps.titleClassName}
        messageClassName={dialogueProps.messageClassName}
        confirmButtonClassName={dialogueProps.confirmButtonClassName}
        cancelButtonClassName={dialogueProps.cancelButtonClassName}
        buttonsContainerClassName={dialogueProps.buttonsContainerClassName}
      />
    </DialogueContext.Provider>
  );
};
