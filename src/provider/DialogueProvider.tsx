import React, { createContext, useContext, ReactNode } from "react";
import { useDialogue, UseDialogueOptions } from "../hooks/useDialogue";
import DynamicDialogue from "../components/DynamicDialogue";

type DialogueContextType = {
  showDialogue: (opts: UseDialogueOptions) => void;
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

  return (
    <DialogueContext.Provider value={{ showDialogue }}>
      {children}
      <DynamicDialogue
        isOpen={isOpen}
        title={dialogueProps.title}
        message={dialogueProps.message}
        confirmText={dialogueProps.confirmText}
        cancelText={dialogueProps.cancelText}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onClose={hideDialogue}
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
