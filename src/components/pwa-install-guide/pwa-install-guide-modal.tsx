import { JSX, useMemo } from "react";
import BottomModal from "../base-modal/bottom-modal";
import ZoomModal from "../base-modal/zoom-modal";
import useInstallPWAGuide from "@/hooks/useInstallPWAGuide";

type InstallPWAGuideModalProps = {
  type?: "modal" | "popup";
  header?: JSX.Element;
  containerClassName?: string;
};

const InstallPWAGuideModal = ({
  type = "modal",
  containerClassName,
  ...props
}: InstallPWAGuideModalProps) => {
  const { isOpen, onClose, steps, showPrompt, loading } = useInstallPWAGuide();

  const body = useMemo(
    () => (
      <>
        {props.header ?? (
          <p className="pt-2 text-center font-semibold text-black">
            Install PWA Guide
          </p>
        )}
        <div className="flex w-full flex-col gap-2 p-4 text-black">
          {steps ? (
            <>
              {steps.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <p className="flex size-6 items-center justify-center rounded-[7.5px] border border-gray-400 text-sm font-semibold">
                    {index + 1}
                  </p>
                  <p className="text-strong-950 flex-1 text-wrap text-sm font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </>
          ) : (
            <button
              data-loading={loading}
              className="group relative w-full rounded-lg bg-blue-500 p-2 font-semibold text-white data-[loading=true]:cursor-wait data-[loading=true]:opacity-70"
              onClick={showPrompt}
            >
              <span className=" opacity-100 transition-all group-data-[loading=true]:opacity-0">
                Install
              </span>

              <span className="absolute inset-0 flex size-full scale-0 items-center justify-center transition-all group-data-[loading=true]:scale-100">
                <span className=" aspect-square h-[55%] animate-spin rounded-full border-t-2 border-white"></span>
              </span>
            </button>
          )}
        </div>
      </>
    ),
    [steps, loading, props.header],
  );
  if (type === "modal") {
    return (
      <BottomModal
        containerClassName={containerClassName}
        isOpen={isOpen}
        onClose={onClose}
      >
        {body}
      </BottomModal>
    );
  }
  return (
    <ZoomModal
      containerClassName={containerClassName}
      isOpen={isOpen}
      onClose={onClose}
    >
      {body}
    </ZoomModal>
  );
};

export default InstallPWAGuideModal;
