// DateSelectionStep.tsx
import DatePicker from "react-datepicker";
import { ja } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

interface DateSelectionProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date | null) => void;
}

export function DateSelection({
  selectedDate,
  onDateSelect,
}: DateSelectionProps) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date: Date | null) => onDateSelect(date)}
      locale={ja}
      dateFormat="yyyy年MM月dd日"
      className=" p-2  w-full"
      minDate={new Date()}
      isClearable
      showYearDropdown
      inline // カレンダーを常に表示
      calendarClassName="w-full" // カレンダーの幅を調整
    />
  );
}
