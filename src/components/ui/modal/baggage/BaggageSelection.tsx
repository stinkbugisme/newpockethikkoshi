// components/ui/baggage/BaggageSection.tsx
import { useState } from "react";
import { TextAllowButton } from "../../list/textAllowButton";
import Image from "next/image";
import type {
  Category,
  Subcategory,
  BaggageSelection,
  SelectedItem,
} from "@/types/baggage";
import baggageData from "@/data/baggage.json";
import { BaggageQuantityControl } from "./BaggageQuantityControl";

interface BaggageSectionProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: (items: SelectedItem[], totalVolume: number) => void;
}

export function BaggageSection({
  isOpen,
  onOpenChange,
  onComplete,
}: BaggageSectionProps) {
  const [selections, setSelections] = useState<BaggageSelection[]>([]);
  const { categories } = baggageData;

  // 数量取得
  const getItemQuantity = (name: string): number => {
    const item = selections.find(
      (s) => s.subcategory?.name === name || s.category.name === name
    );
    return item?.quantity || 0;
  };

  // 数量変更
  const handleQuantityChange = (
    itemName: string,
    increment: boolean,
    category: Category,
    subcategory?: Subcategory
  ) => {
    setSelections((prev) => {
      const itemIndex = prev.findIndex(
        (s) => s.subcategory?.name === itemName || s.category.name === itemName
      );

      if (itemIndex === -1 && increment) {
        return [
          ...prev,
          {
            category,
            subcategory,
            quantity: 1,
          },
        ];
      }

      if (itemIndex !== -1) {
        const newSelections = [...prev];
        const newQuantity = prev[itemIndex].quantity + (increment ? 1 : -1);

        if (newQuantity <= 0) {
          newSelections.splice(itemIndex, 1);
        } else {
          newSelections[itemIndex] = {
            ...newSelections[itemIndex],
            quantity: newQuantity,
          };
        }
        return newSelections;
      }

      return prev;
    });
  };

  // 体積計算
  const calculateVolume = (selections: BaggageSelection[]): number => {
    return selections.reduce((total, selection) => {
      const dims =
        selection.subcategory?.dimensions || selection.category.dimensions;
      if (!dims) return total;

      const volume =
        parseFloat(dims.length) *
        parseFloat(dims.width) *
        parseFloat(dims.height) *
        selection.quantity;
      return total + volume;
    }, 0);
  };

  // 完了処理
  // 完了処理を修正
  const handleComplete = () => {
    // シンプルな形式に変換
    const simplifiedSelections = selections.map((selection) => ({
      name: selection.subcategory?.name || selection.category.name,
      quantity: selection.quantity,
      dimensions:
        selection.subcategory?.dimensions || selection.category.dimensions!,
    }));

    const totalVolume = calculateVolume(selections);

    console.log("Selected Items:", simplifiedSelections);
    console.log("Total Volume:", totalVolume);

    onComplete?.(simplifiedSelections, totalVolume);
    onOpenChange(false);
  };

  const displaySummary = () => {
    const itemCount = selections.reduce((sum, item) => sum + item.quantity, 0);
    return `${itemCount}点の荷物`;
  };

  return (
    <TextAllowButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      modalChildren={
        <div className="max-w-4xl mx-auto p-4">
          <h2 className="text-xl font-bold mb-6">荷物を選択</h2>

          <div className="space-y-8 max-h-[70vh] overflow-y-auto pb-[50px]">
            {categories.map((category) => (
              <div key={category.name} className="space-y-4">
                <h3 className="text-lg font-semibold">{category.name}</h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {category.has_subcategories && category.subcategories
                    ? // サブカテゴリーの表示
                      category.subcategories.map((sub) => (
                        <div key={sub.name} className="border rounded-lg p-4">
                          <div className="aspect-square relative mb-2">
                            <Image
                              src={`/images/baggage/${sub.image_path}`}
                              alt={sub.name}
                              fill
                              loading="eager" // 即時読み込みが必要な場合
                              sizes="(max-width: 768px) 150px,
                                (max-width: 1024px) 200px,
                                256px"
                              className="object-contain"
                            />
                          </div>
                          <div className="text-sm font-medium mb-2">
                            {sub.name}
                          </div>
                          <div className="text-xs text-gray-500 mb-3">
                            {sub.dimensions.width}×{sub.dimensions.length}×
                            {sub.dimensions.height}cm
                          </div>
                          <div className="flex justify-center">
                            <BaggageQuantityControl
                              quantity={getItemQuantity(sub.name)}
                              onQuantityChange={(quantity) => {
                                const increment =
                                  quantity > getItemQuantity(sub.name);
                                handleQuantityChange(
                                  sub.name,
                                  increment,
                                  category,
                                  sub
                                );
                              }}
                            />
                          </div>
                        </div>
                      ))
                    : // メインカテゴリーの表示
                      category.dimensions && (
                        <div className="border rounded-lg p-4">
                          <div className="aspect-square relative mb-2">
                            <Image
                              src={`/images/baggage/${category.image_path}`}
                              alt={category.name}
                              fill
                              sizes="(max-width: 768px) 150px,
                                (max-width: 1024px) 200px,
                                256px"
                              className="object-contain"
                            />
                          </div>
                          <div className="flex justify-center">
                            <BaggageQuantityControl
                              quantity={getItemQuantity(category.name)}
                              onQuantityChange={(quantity) => {
                                const increment =
                                  quantity > getItemQuantity(category.name);
                                handleQuantityChange(
                                  category.name,
                                  increment,
                                  category
                                );
                              }}
                            />
                          </div>
                        </div>
                      )}
                </div>
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 bg-white p-4 border-t mt-4">
            <button
              onClick={handleComplete}
              className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
            >
              選択完了
            </button>
          </div>
        </div>
      }
      modalSize="top"
      title="荷物"
      placeholder={selections.length > 0 ? displaySummary() : "荷物を選択"}
    />
  );
}
