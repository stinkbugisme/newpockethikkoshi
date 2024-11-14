// Header.tsx
export function Header() {
  return (
    <header className="fixed w-full bg-white border-b">
      <div className="max-w-[640px] mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/icon.png" alt="アイコン" className="w-8 h-8" />
          <span className="font-bold">ポケット格安引越し検索</span>
        </div>
        <button className="p-2">
          <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
        </button>
      </div>
    </header>
  );
}
