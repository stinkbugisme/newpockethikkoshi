import { useState } from "react";
import type { PrefectureName } from "./areaSelectByName";

interface AreaSelectByZipcodeProps {
  onSelect: (
    prefecture: PrefectureName,
    city: string,
    town: string,
    postal: string
  ) => void;
  onError?: (error: Error) => void;
}

export function AreaSelectByZipcode({
  onSelect,
  onError,
}: AreaSelectByZipcodeProps) {
  const [loading, setLoading] = useState(false);
  const [zipcode, setZipcode] = useState("");

  const searchZipcode = async (zipcode: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`
      );
      const data = await response.json();
      if (data.results) {
        const result = data.results[0];
        onSelect(
          result.address1 as PrefectureName,
          result.address2,
          result.address3,
          zipcode
        );
      }
    } catch (error) {
      console.error("郵便番号検索エラー:", error);
      onError?.(error as Error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-2 flex flex-col">
      <input
        type="text"
        value={zipcode}
        onChange={(e) => {
          // 全角から半角への変換
          const converted = e.target.value
            .replace(/[０-９]/g, function (s) {
              return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
            })
            .replace(/[^0-9]/g, ""); // 数字以外を除去

          setZipcode(converted);
        }}
        placeholder="郵便番号を入力"
        className="border p-2 rounded"
      />
      <button
        onClick={() => searchZipcode(zipcode)}
        disabled={loading}
        className="bg-orange-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? "検索中..." : "検索"}
      </button>
    </div>
  );
}
