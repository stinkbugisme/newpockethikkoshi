interface ContantsContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function ContantsContainer({
  children,
  className,
}: ContantsContainerProps) {
  return (
    <div
      className={`
            max-w-[640px]
            w-full
            mx-auto
            bg-white
            shadow-md
            ${className}
            `}
    >
      {children}
    </div>
  );
}
