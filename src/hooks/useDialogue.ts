import { useState, useCallback } from "react";

export interface UseDialogueOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const useDialogue = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogueProps, setDialogueProps] = useState<UseDialogueOptions>({
    title: "",
    message: "",
  });

  const showDialogue = useCallback((options: UseDialogueOptions) => {
    setDialogueProps(options);
    setIsOpen(true);
  }, []);

  const hideDialogue = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    if (dialogueProps.onConfirm) {
      dialogueProps.onConfirm();
    }
    setIsOpen(false);
  }, [dialogueProps]);

  const handleCancel = useCallback(() => {
    if (dialogueProps.onCancel) {
      dialogueProps.onCancel();
    }
    setIsOpen(false);
  }, [dialogueProps]);

  return {
    isOpen,
    dialogueProps,
    showDialogue,
    hideDialogue,
    handleConfirm,
    handleCancel,
  };
};
