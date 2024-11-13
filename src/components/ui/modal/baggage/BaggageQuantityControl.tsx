// components/ui/baggage/BaggageQuantityControl.tsx
interface BaggageQuantityControlProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export function BaggageQuantityControl({
  quantity,
  onQuantityChange,
}: BaggageQuantityControlProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => quantity > 0 && onQuantityChange(quantity - 1)}
        className="p-2 rounded-full border hover:bg-gray-100"
      >
        -
      </button>
      <span className="w-8 text-center">{quantity}</span>
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className="p-2 rounded-full border hover:bg-gray-100"
      >
        +
      </button>
    </div>
  );
}
