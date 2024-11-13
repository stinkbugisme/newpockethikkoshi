"use client";

import { MainContainer } from "@/components/ui/container/mainContainer";
import { ContantsContainer } from "@/components/ui/container/contentsContainer";
import { EstimateFormContainer } from "@/components/ui/container/estimateFormContainer";
import { EstimateFormList } from "@/components/ui/list/estimateFormList";
import { useState } from "react";
import type { Selection } from "@/components/ui/modal/address/AddressSelectionSteps";
import { AddressSection } from "@/components/ui/modal/address/AddressSelection";
import { BaggageSection } from "@/components/ui/modal/baggage/BaggageSelection";

export default function Home() {
  const [currentAddressModalOpen, setCurrentAddressModalOpen] = useState(false);
  const [newAddressModalOpen, setNewAddressModalOpen] = useState(false);
  const [baggageModalOpen, setBaggageModalOpen] = useState(false);

  const [currentAddress, setCurrentAddress] = useState<Selection>({
    postal: undefined,
    prefecture: undefined,
    city: undefined,
    town: undefined,
    street: undefined,
    buildingType: "mansion",
  });

  const [newAddress, setNewAddress] = useState<Selection>({
    postal: undefined,
    prefecture: undefined,
    city: undefined,
    town: undefined,
    street: undefined,
    buildingType: "mansion",
  });

  const handleCurrentAddressComplete = (selection: Selection) => {
    setCurrentAddress(selection);
    setCurrentAddressModalOpen(false);
  };

  const handleNewAddressComplete = (selection: Selection) => {
    setNewAddress(selection);
    setNewAddressModalOpen(false);
  };

  const handleAddressError = (error: Error) => {
    console.error("住所選択エラー:", error);
  };

  return (
    <MainContainer>
      <ContantsContainer>
        <EstimateFormContainer>
          <EstimateFormList>
            <AddressSection
              title="現住所"
              address={currentAddress}
              isOpen={currentAddressModalOpen}
              onOpenChange={setCurrentAddressModalOpen}
              onComplete={handleCurrentAddressComplete}
              onError={handleAddressError}
            />
            <AddressSection
              title="引越し先"
              address={newAddress}
              isOpen={newAddressModalOpen}
              onOpenChange={setNewAddressModalOpen}
              onComplete={handleNewAddressComplete}
              onError={handleAddressError}
            />
            <BaggageSection
              isOpen={baggageModalOpen}
              onOpenChange={setBaggageModalOpen}
            />
          </EstimateFormList>
        </EstimateFormContainer>
      </ContantsContainer>
    </MainContainer>
  );
}
