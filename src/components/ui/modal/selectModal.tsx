interface SelectModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  modalSize: "top" | "mid"; // サイズの型を定義
  //onSelect: (area: string) => void
}

export function SelectModal({
  children,
  isOpen,
  onClose,
  modalSize,
}: SelectModalProps) {
  const getPaddingTop = () => {
    switch (modalSize) {
      case "top":
        return {
          topPadding: "pt-[10dvh]", // dvhに変更
          height: "h-[90dvh]", // dvhに変更
        };
      case "mid":
        return {
          topPadding: "pt-[30dvh]", // dvhに変更
          height: "h-[70dvh]", // dvhに変更
        };
    }
  };
  if (!isOpen) return null;

  return (
    <div
      className={`
            ${getPaddingTop().topPadding}
            mx-auto
            fixed 
            inset-0
            bg-gray-500/50
            flex 
            justify-center
            z-50
            transition-opacity
            duration-300
            ease-in-out
            
            `}
      onClick={onClose}
    >
      <div
        className={`
            ${getPaddingTop().height}
            w-full
            bg-white 
            max-w-[640px]
            rounded-t-lg
            shadow-xl
            p-4
            transition-transform
            duration-300
            ease-in-out
            transform
            translate-y-0
            motion-safe:animate-slideUp
            flex
            flex-col  {/* フレックスボックスで構造化 */}
            `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
