import PwaInstallGuideContent from "@/components/pwa-install-guide/pwa-install-guide-content";
import { animateModal } from "@/utils/animation";
import { wait } from "@/utils/common";
import { JSX, useEffect, useMemo, useRef, useState } from "react";

const useInstallPWAGuide = (props?: {
  iconWrapper?: ({ children }: { children: JSX.Element }) => JSX.Element;
  onAfterInstall?: () => void;
  onBeforeInstall?: () => void;
  onInstallError?: (error?: unknown) => void;
}) => {
  const installPrompt = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const content = useMemo(
    () =>
      PwaInstallGuideContent({
        iconWrapper: props?.iconWrapper,
      }),
    [props?.iconWrapper],
  );
  const [isOpen, setIsOpen] = useState(false);

  const onClose = async () => {
    if (animateModal("pwa-guide-modal", false)) {
      await wait(350);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (!!content) {
      setIsOpen(true);
      async function play() {
        await wait(350);
        animateModal("pwa-guide-modal", true);
      }
      play();
    }

    const initPrompt = (event: any) => {
      installPrompt.current = event;
    };

    window.addEventListener("beforeinstallprompt", initPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", initPrompt);
    };
  }, []);

  async function showPrompt() {
    try {
      if (typeof window === "undefined" || typeof document === "undefined") {
        throw new Error(
          "Function showPromt() can only be executed on the client side.",
        );
      }

      if (typeof content !== "boolean") {
        throw new Error(
          "Show prompt not supported! Please display guide content by steps.",
        );
      }
      if (content == false) {
        throw new Error("PWA is installed or not supported on this device.");
      }

      const manifestHref = document
        .querySelector(`link[rel="manifest"]`)
        ?.getAttribute("href");
      if (!manifestHref) {
        throw new Error("Manifest not found");
      }
      if (!installPrompt.current) {
        throw new Error("Prompt not found");
      }

      props?.onBeforeInstall?.();
      setLoading(true);
      await installPrompt.current.prompt();
      installPrompt.current.userChoice.then((choiceResult: any) => {
        setLoading(false);
        if (choiceResult.outcome === "accepted") {
          onClose();
          props?.onAfterInstall?.();
          installPrompt.current = null;
          window.open(window.location.href, "_blank");
          return "accepted";
        } else {
          return "dismissed";
        }
      });
    } catch (error) {
      setLoading(false);
      props?.onInstallError?.(error);
      throw error;
    }
  }

  return {
    showPrompt:
      typeof content != "boolean" || content == false ? undefined : showPrompt,
    loading,
    steps: typeof content != "boolean" ? content : undefined,
    isOpen,
    onClose,
  };
};

export default useInstallPWAGuide;
