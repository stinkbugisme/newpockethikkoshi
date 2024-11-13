import { useState, useEffect } from "react";
import type { PrefectureName } from "./areaSelectByName";

interface LocationResponse {
  response: {
    location: Array<{
      city: string;
      city_kana: string;
    }>;
  };
}
export const KANA_GROUPS = {
  あ行: ["あ", "い", "う", "え", "お"],
  か行: ["か", "き", "く", "け", "こ"],
  さ行: ["さ", "し", "す", "せ", "そ"],
  た行: ["た", "ち", "つ", "て", "と"],
  な行: ["な", "に", "ぬ", "ね", "の"],
  は行: ["は", "ひ", "ふ", "へ", "ほ"],
  ま行: ["ま", "み", "む", "め", "も"],
  や行: ["や", "ゆ", "よ"],
  ら行: ["ら", "り", "る", "れ", "ろ"],
  わ行: ["わ", "を", "ん"],
} as const;
type KanaGroup = keyof typeof KANA_GROUPS;
interface AddressSelectByCityProps {
  prefecture: PrefectureName | undefined;
  onSelect?: (city: string) => void;
}

export function AddressSelectByCity({
  prefecture,
  onSelect,
}: AddressSelectByCityProps) {
  const [cities, setCities] = useState<
    Array<{ city: string; city_kana: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<KanaGroup>("あ行");

  useEffect(() => {
    const getCityDatas = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `https://geoapi.heartrails.com/api/json?method=getCities&prefecture=${encodeURIComponent(
            prefecture as string
          )}`
        );
        const data: LocationResponse = await response.json();
        setCities(data.response.location);
      } catch (error) {
        setError(`都道府県データの取得に失敗しました: ${error}`);
        console.error("都道府県データの取得失敗:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCityDatas();
  }, [prefecture]); // prefectureが変更されたときに再取得

  // かな行に基づいて都市をフィルタリング
  const filteredCities = cities.filter(({ city_kana }) => {
    return KANA_GROUPS[selectedGroup].some((kana) =>
      city_kana.startsWith(kana)
    );
  });

  if (isLoading) return <div>読み込み中...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-4 text-center">
        {prefecture}の市区町村
      </h3>

      {/* かな行選択ボタングループ */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4 items-center justify-center">
          {Object.keys(KANA_GROUPS).map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group as KanaGroup)}
              className={`
                px-4 
                py-2 
                rounded-md 
                text-sm
                border
                transition-colors
                ${
                  selectedGroup === group
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      {/* 都市一覧 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {filteredCities.map(({ city }) => (
          <button
            onClick={() => onSelect?.(city)}
            key={city}
            className="
              px-3 
              py-2 
              text-sm 
              rounded-md 
              hover:bg-blue-50
              text-center
              transition-colors
              border-gray-300
              border
            "
          >
            {city}
          </button>
        ))}
      </div>

      {/* フィルタリング結果が0件の場合 */}
      {filteredCities.length === 0 && (
        <div className="text-gray-500 text-center py-4">
          該当する市区町村がありません
        </div>
      )}
    </div>
  );
}
