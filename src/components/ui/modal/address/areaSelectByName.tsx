// types/regions.ts
export type PrefectureName =
  | "北海道"
  | "青森県"
  | "岩手県"
  | "宮城県"
  | "秋田県"
  | "山形県"
  | "福島県"
  | "茨城県"
  | "栃木県"
  | "群馬県"
  | "埼玉県"
  | "千葉県"
  | "東京都"
  | "神奈川県"
  | "新潟県"
  | "富山県"
  | "石川県"
  | "福井県"
  | "山梨県"
  | "長野県"
  | "岐阜県"
  | "静岡県"
  | "愛知県"
  | "三重県"
  | "滋賀県"
  | "京都府"
  | "大阪府"
  | "兵庫県"
  | "奈良県"
  | "和歌山県"
  | "鳥取県"
  | "島根県"
  | "岡山県"
  | "広島県"
  | "山口県"
  | "徳島県"
  | "香川県"
  | "愛媛県"
  | "高知県"
  | "福岡県"
  | "佐賀県"
  | "長崎県"
  | "熊本県"
  | "大分県"
  | "宮崎県"
  | "鹿児島県"
  | "沖縄県";

export type RegionName =
  | "北海道・東北"
  | "関東"
  | "中部"
  | "近畿"
  | "中国"
  | "四国"
  | "九州・沖縄";

export type RegionPrefectures = {
  [key in RegionName]: PrefectureName[];
};

// constants/regions.ts
const REGION_PREFECTURES: RegionPrefectures = {
  "北海道・東北": [
    "北海道",
    "青森県",
    "岩手県",
    "宮城県",
    "秋田県",
    "山形県",
    "福島県",
  ],
  関東: [
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
  ],
  中部: [
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
  ],
  近畿: [
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
  ],
  中国: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"],
  四国: ["徳島県", "香川県", "愛媛県", "高知県"],
  "九州・沖縄": [
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県",
  ],
} as const;

interface AreaSelectByNameProps {
  regionPrefectures?: Partial<typeof REGION_PREFECTURES>;
  onSelect?: (prefecture: PrefectureName) => void; // 型を明確に
}

export function AreaSelectByName({
  regionPrefectures = REGION_PREFECTURES,
  onSelect,
}: AreaSelectByNameProps) {
  return (
    <>
      {/* 地域ごとのグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {Object.entries(regionPrefectures).map(([region, prefectures]) => (
          <div key={region} className="bg-white rounded-lg shadow-md p-4">
            {/* 地域名 */}
            <h3 className="text-lg font-bold mb-3 text-gray-800 border-b pb-2">
              {region}
            </h3>

            {/* 都道府県のグリッド */}
            <div className="grid grid-cols-2 gap-2">
              {prefectures.map((prefecture) => (
                <button
                  key={prefecture}
                  onClick={() => onSelect?.(prefecture)}
                  className="
                  border
                        border-grey-400
                      px-3 
                      py-2 
                      text-sm 
                      rounded-md
                      hover:bg-blue-50 
                      transition-colors
                      text-gray-700
                      hover:text-blue-600
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-blue-500 
                      focus:ring-opacity-50
                    "
                >
                  {prefecture}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
