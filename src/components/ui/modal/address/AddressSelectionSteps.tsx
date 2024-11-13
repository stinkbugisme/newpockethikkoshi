import { useState } from "react";
import { AreaSelectByName } from "./areaSelectByName";
import type { PrefectureName } from "./areaSelectByName";
import { AddressSelectByCity } from "./AddressSelectByCity";
import { AddressSelectByTown } from "./AddressSelectByTown";
import { AreaSelectByZipcode } from "./AreaSelectByZipcode";
import { CompleteSelection } from "./CompleteSelection";

export type SelectionStep = "prefecture" | "city" | "town" | "complete";

export interface Selection {
  postal: string | undefined;
  prefecture: PrefectureName | undefined;
  city: string | undefined;
  town: string | undefined;
  street: string | undefined;
  buildingType: "mansion" | "house";
  mansionName?: string;
  roomNumber?: string;
  hasElevator?: "yes" | "no";
  floor?: number;
}

interface AddressSelectionStepsProps {
  onComplete: (selection: Selection) => void;
  onError?: (error: Error) => void;
}

export function AddressSelectionSteps({
  onComplete,
  onError,
}: AddressSelectionStepsProps) {
  const [step, setStep] = useState<SelectionStep>("prefecture");
  const [selection, setSelection] = useState<Selection>({
    postal: undefined,
    prefecture: undefined,
    city: undefined,
    town: undefined,
    street: undefined,
    buildingType: "mansion",
  });

  const handlePrevStep = () => {
    switch (step) {
      case "city":
        setStep("prefecture");
        break;
      case "town":
        setStep("city");
        break;
      case "complete":
        setStep("town");
        break;
      default:
        break;
    }
  };
  const handleZipcodeSelect = (
    prefecture: PrefectureName,
    city: string,
    town: string,
    postal: string
  ) => {
    try {
      const newSelection = {
        ...selection,
        prefecture,
        city,
        town,
        postal,
      };
      setSelection(newSelection);
      setStep("complete");
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const handlePrefectureSelect = (prefecture: PrefectureName) => {
    try {
      const newSelection = { ...selection, prefecture };
      setStep("city");
      setSelection(newSelection);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const handleCitySelect = (city: string) => {
    if (!city.trim()) return;
    try {
      const newSelection = {
        ...selection,
        city,
      };
      setStep("town");
      setSelection(newSelection);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const handleTownSelect = (town: string, postal: string) => {
    if (!town.trim() || !postal.trim()) return;
    try {
      const newSelection = {
        ...selection,
        town,
        postal,
      };
      setStep("complete");
      setSelection(newSelection);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  const handleAddressComplete = (updatedSelection: Selection) => {
    setSelection(updatedSelection);
    onComplete(updatedSelection);
  };

  return (
    <div className="w-full p-4 overflow-y-auto scrollbar-thin pb-[80px]">
      {step !== "prefecture" && (
        <button
          className="bg-red-400 text-white px-3 py-1 font-bold rounded-md"
          onClick={handlePrevStep}
        >
          戻る
        </button>
      )}

      {step === "prefecture" && (
        <div className="space-y-4">
          <div className="text-center py-3 border-b">郵便番号から検索</div>
          <AreaSelectByZipcode
            onSelect={handleZipcodeSelect}
            onError={onError}
          />
          <div className="text-center py-3 border-b">都道府県名から検索</div>
          <AreaSelectByName onSelect={handlePrefectureSelect} />
        </div>
      )}

      {step === "city" && selection.prefecture && (
        <AddressSelectByCity
          prefecture={selection.prefecture}
          onSelect={handleCitySelect}
        />
      )}

      {step === "town" && selection.prefecture && selection.city && (
        <AddressSelectByTown
          prefecture={selection.prefecture}
          city={selection.city}
          onSelect={handleTownSelect}
        />
      )}
      {step == "complete" && (
        <CompleteSelection
          selection={selection}
          onConfirm={handleAddressComplete}
        />
      )}
    </div>
  );
}
