import { useState, useCallback, useRef } from "react";

export interface UseDialogueOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  // Additional styling options
  dialogueClassName?: string;
  overlayClassName?: string;
  titleClassName?: string;
  messageClassName?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
  buttonsContainerClassName?: string;
}

export const useDialogue = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogueProps, setDialogueProps] = useState<UseDialogueOptions>({
    title: "",
    message: "",
  });

  // Use ref to store the latest props to avoid stale closure issues
  const dialoguePropsRef = useRef<UseDialogueOptions>(dialogueProps);
  dialoguePropsRef.current = dialogueProps;

  const showDialogue = useCallback((options: UseDialogueOptions) => {
    setDialogueProps(options);
    setIsOpen(true);
  }, []);

  const hideDialogue = useCallback(() => {
    setIsOpen(false);
    // Clear props after animation completes
    setTimeout(() => {
      setDialogueProps({ title: "", message: "" });
    }, 300);
  }, []);

  const handleConfirm = useCallback(async () => {
    try {
      if (dialoguePropsRef.current.onConfirm) {
        await dialoguePropsRef.current.onConfirm();
      }
    } catch (error) {
      console.error("Error in dialogue confirm handler:", error);
    } finally {
      setIsOpen(false);
    }
  }, []);

  const handleCancel = useCallback(async () => {
    try {
      if (dialoguePropsRef.current.onCancel) {
        await dialoguePropsRef.current.onCancel();
      }
    } catch (error) {
      console.error("Error in dialogue cancel handler:", error);
    } finally {
      setIsOpen(false);
    }
  }, []);

  return {
    isOpen,
    dialogueProps,
    showDialogue,
    hideDialogue,
    handleConfirm,
    handleCancel,
  };
};
