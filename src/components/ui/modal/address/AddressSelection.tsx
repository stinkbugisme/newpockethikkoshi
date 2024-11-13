import { TextAllowButton } from "../../list/textAllowButton";
import { AddressSelectionSteps } from "./AddressSelectionSteps";
import { Selection } from "./AddressSelectionSteps";
type AddressSectionProps = {
  title: "現住所" | "引越し先";
  address: Selection;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (selection: Selection) => void;
  onError: (error: Error) => void;
};

export function AddressSection({
  title,
  address,
  isOpen,
  onOpenChange,
  onComplete,
  onError,
}: AddressSectionProps) {
  const getDisplayAddress = () => {
    if (!address.prefecture) return "エリアを選択";

    let displayAddress = `${address.prefecture}${address.city || ""}${
      address.town || ""
    }`;

    if (address.street) {
      displayAddress += address.street;
      if (address.buildingType === "mansion" && address.mansionName) {
        displayAddress += ` ${address.mansionName}`;
        if (address.roomNumber) {
          displayAddress += ` ${address.roomNumber}`;
        }
      }
    }

    return displayAddress;
  };

  return (
    <TextAllowButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      modalChildren={
        <AddressSelectionSteps onComplete={onComplete} onError={onError} />
      }
      modalSize="top"
      title={title}
      placeholder={getDisplayAddress()}
    />
  );
}
