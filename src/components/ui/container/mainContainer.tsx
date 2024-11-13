interface MainContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function MainContainer({ children, className }: MainContainerProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div
        className={`
          bg-gray-50
          w-full
          ${className}
        `}
      >
        {children}
      </div>
    </main>
  );
}
