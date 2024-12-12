import WrapperModal, { ModalProps } from "./wrapper-modal";

const ZoomModal = ({ className, children, ...props }: ModalProps) => {
  return (
    <WrapperModal {...props}>
      <div
        data-open={false}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 scale-0 items-center  justify-center overflow-visible opacity-0 transition-all duration-200 data-[open=true]:!scale-100 data-[open=true]:!opacity-100`}
      >
        <div
          className={`max-h-[80dvh] w-full min-w-[20dvw] max-w-[90dvw] overflow-auto rounded-2xl bg-white shadow-lg max-sm:min-w-[80dvw] ${className}`}
        >
          {children}
        </div>
      </div>
    </WrapperModal>
  );
};

export default ZoomModal;
