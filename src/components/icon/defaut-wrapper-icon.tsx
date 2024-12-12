const DefaultWrapperIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="flex aspect-square size-6 items-center rounded-[7.5px] border border-gray-400 p-[6px] text-sm">
      {children}
    </span>
  );
};

export default DefaultWrapperIcon;
