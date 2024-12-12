import { createPortal } from "react-dom";

export type ModalProps = {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  containerClassName?: string;
  hideIndicator?: boolean;
};
const WrapperModal = ({
  isOpen,
  onClose,
  children,
  containerClassName,
}: ModalProps) => {
  if (!isOpen) return null;
  return createPortal(
    <div
      id="pwa-guide-modal"
      data-open={false}
      className={` ${"w-full"} ${containerClassName ?? ""} `}
      onClick={onClose}
      style={{
        position: "fixed",
        zIndex: 9999,
        top: 0,
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        height: "100%",
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onTouchMove={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="overlay absolute inset-0 bg-black transition-all"></div>
      <>{children}</>
    </div>,
    document.body,
  );
};

export default WrapperModal;
