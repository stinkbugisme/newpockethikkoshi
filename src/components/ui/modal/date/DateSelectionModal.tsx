// DateSelectionModal.tsx
import { TextAllowButton } from "../../list/textAllowButton";
import { DateSelection } from "./DateSelection";

interface DateSelectionModalProps {
  title?: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
}

export function DateSelectionModal({
  title = "希望日",
  isOpen,
  onOpenChange,
  selectedDate,
  onDateSelect,
}: DateSelectionModalProps) {
  return (
    <TextAllowButton
      title={title}
      placeholder={
        selectedDate ? selectedDate.toLocaleDateString() : "日付を選択"
      }
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      modalSize="mid"
      modalChildren={
        <DateSelection
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
        />
      }
    />
  );
}
