// src/hooks/useDialogue.ts
import { useState, useCallback } from "react";

export interface UseDialogueOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export const useDialogue = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogueProps, setDialogueProps] = useState<UseDialogueOptions>({
    title: "",
    message: "",
  });
  const [resolvePromise, setResolvePromise] = useState<
    ((value: boolean) => void) | null
  >(null);

  const showDialogue = useCallback(
    (options: UseDialogueOptions): Promise<boolean> => {
      setDialogueProps(options);
      setIsOpen(true);

      return new Promise<boolean>((resolve) => {
        setResolvePromise(() => resolve);
      });
    },
    []
  );

  const handleConfirm = useCallback(() => {
    setIsOpen(false);
    if (resolvePromise) {
      resolvePromise(true);
      setResolvePromise(null);
    }
  }, [resolvePromise]);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    if (resolvePromise) {
      resolvePromise(false);
      setResolvePromise(null);
    }
  }, [resolvePromise]);

  return {
    isOpen,
    dialogueProps,
    showDialogue,
    handleConfirm,
    handleCancel,
  };
};
