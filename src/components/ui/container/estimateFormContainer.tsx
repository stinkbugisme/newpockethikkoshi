interface EstimateFormContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function EstimateFormContainer({
  children,
  className,
}: EstimateFormContainerProps) {
  return (
    <div
      className={`
            w-full
            px-3
            flex
            flex-col
            items-center
            ${className}
            `}
    >
      {children}
    </div>
  );
}
