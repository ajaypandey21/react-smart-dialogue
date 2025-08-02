import React, { createContext, useContext, ReactNode } from "react";
import { useDialogue, UseDialogueOptions } from "../hooks/useDialogue";
import DynamicDialogue from "../components/DynamicDialogue";

type DialogueContextType = {
  showDialogue: (opts: UseDialogueOptions) => Promise<boolean>;
};

const DialogueContext = createContext<DialogueContextType | undefined>(
  undefined
);

export function useDialogueContext() {
  const ctx = useContext(DialogueContext);
  if (!ctx)
    throw new Error(
      "useDialogueContext must be used within a DialogueProvider"
    );
  return ctx;
}

export const DialogueProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isOpen, dialogueProps, showDialogue, handleConfirm, handleCancel } =
    useDialogue();

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
      />
    </DialogueContext.Provider>
  );
};
