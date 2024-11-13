// CompleteSelection.tsx
import type { Selection } from "./AddressSelectionSteps";
import { useState, useEffect } from "react";

interface CompleteSelectionProps {
  selection: Selection;
  onConfirm: (selection: Selection) => void;
}

export function CompleteSelection({
  selection,
  onConfirm,
}: CompleteSelectionProps) {
  const [formData, setFormData] = useState({
    street: "",
    buildingType: "mansion" as "mansion" | "house",
    mansionName: "",
    roomNumber: "",
    hasElevator: "yes" as "yes" | "no",
    floor: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    const completeSelection = {
      ...selection,
      ...formData,
      ...(formData.buildingType === "mansion" && {
        mansionName: formData.mansionName.trim(),
        roomNumber: formData.roomNumber.trim(),
        hasElevator: formData.hasElevator,
        floor: formData.hasElevator === "no" ? formData.floor : undefined,
      }),
    };
    onConfirm(completeSelection);
  };

  return (
    <div className="max-w-md mx-auto p-1 space-y-6">
      {/* 住所表示 */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="mb-2 text-lg">〒{selection.postal}</div>
        <div className="text-xl font-bold">
          {selection.prefecture}
          {selection.city}
          {selection.town}
        </div>
      </div>

      {/* フォーム */}
      <div className="space-y-4">
        <div className="">それ以降の住所:</div>
        <div>
          <input
            name="street"
            placeholder="番地を入力 (例: 5-1-6)"
            type="text"
            value={formData.street}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex gap-6 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="buildingType"
                value="mansion"
                checked={formData.buildingType === "mansion"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-500"
              />
              <span className="ml-2">マンション</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="buildingType"
                value="house"
                checked={formData.buildingType === "house"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-500"
              />
              <span className="ml-2">一戸建て</span>
            </label>
          </div>

          {formData.buildingType === "mansion" && (
            <div className="space-y-4">
              <input
                name="mansionName"
                placeholder="マンション名"
                value={formData.mansionName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              />
              <input
                name="roomNumber"
                placeholder="部屋番号"
                value={formData.roomNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              />
              <div>
                <div className="flex gap-6 mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasElevator"
                      value="yes"
                      checked={formData.hasElevator === "yes"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-500"
                    />
                    <span className="ml-2">エレベーターあり</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasElevator"
                      value="no"
                      checked={formData.hasElevator === "no"}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-500"
                    />
                    <span className="ml-2">エレベーターなし</span>
                  </label>
                </div>
                {formData.hasElevator === "no" && (
                  <select
                    name="floor"
                    value={formData.floor}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                      <option key={n} value={n}>
                        {n}階
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleConfirm}
        className="w-full py-3 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
      >
        送信する
      </button>
    </div>
  );
}
