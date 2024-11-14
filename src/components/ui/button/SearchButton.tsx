// SearchButton.tsx
interface SearchButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function SearchButton({ onClick, disabled = false }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
          w-full
          my-4
          py-4
          px-6
          bg-blue-500
          disabled:bg-gray-300
          text-white
          font-bold
          rounded-lg
          shadow
          transition
          duration-200
          ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        `}
    >
      見積もりを検索
    </button>
  );
}
