import { SelectModal } from "../modal/selectModal";
interface TextAllowButtonProps {
  modalChildren: React.ReactNode;
  className?: string;
  title: string;
  placeholder?: string; // プレースホルダーテキスト追加
  selectedValue?: string; // 選択された値
  modalSize: "top" | "mid"; // サイズの型を定義
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function TextAllowButton({
  title = "タイトル",
  placeholder = "薄い文字", // デフォルト値
  selectedValue,
  className,
  modalSize,
  modalChildren,
  isOpen,
  onOpenChange,
}: TextAllowButtonProps) {
  return (
    <>
      <SelectModal
        modalSize={modalSize}
        isOpen={isOpen}
        onClose={() => onOpenChange(false)}
      >
        {modalChildren}
      </SelectModal>
      <li
        className={`
          cursor-pointer
          w-full
          border
          border-grey
          p-4
          my-1
          rounded-lg
          flex
          justify-between
          items-center
          ${className}
        `}
        onClick={() => onOpenChange(true)}
      >
        <div className="flex">
          <span
            className={`
            font-semibold
            font-sans
            text-sm
            w-16
          `}
          >
            {title}:
          </span>
          <span
            className={`
            ml-2
            ${selectedValue ? "text-gray-900" : "text-gray-400"}
            ${selectedValue ? "text-md" : "text-sm"}
          `}
          >
            {selectedValue || placeholder}
          </span>
        </div>
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </li>
    </>
  );
}
