import WrapperModal, { ModalProps } from "./wrapper-modal";

const BottomModal = ({ className, children, ...props }: ModalProps) => {
  return (
    <WrapperModal {...props}>
      <div
        data-open={false}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`absolute bottom-0 left-0 right-0 flex w-full translate-y-full items-center justify-center overflow-visible opacity-0 transition-all duration-200  data-[open=true]:!translate-y-0 data-[open=true]:!opacity-100 `}
      >
        <div
          className={`max-h-[80dvh] w-full overflow-auto rounded-t-2xl bg-white shadow-lg ${className}`}
        >
          <div className="flex w-full justify-center pt-1.5">
            <span className="h-1 w-[50px] rounded-full bg-gray-400" />
          </div>
          {children}
        </div>
      </div>
    </WrapperModal>
  );
};

export default BottomModal;
