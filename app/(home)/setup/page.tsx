"use client";

import React, { useState } from "react";
import SetupPage from "./SetupPage";
import SummaryPage from "./SummaryPage";
import CompletePage from "./CompletePage";
import { SetupProvider } from "../../../contexts/setup/SetupContext";

const MultiStepWizard = () => {
  const [step, setStep] = useState<"setup" | "summary" | "complete">("setup");

  const handleNextFromSetup = () => {
    setStep("summary");
  };

  const handleEditFromSummary = () => {
    setStep("setup");
  };

  const handleSubmitFromSummary = () => {
    setStep("complete");
  };

  const handleRestart = () => {
    setStep("setup");
  };

  return (
    <SetupProvider>
      {step === "setup" && <SetupPage onNext={handleNextFromSetup} />}
      {step === "summary" && (
        <SummaryPage onEdit={handleEditFromSummary} onSubmit={handleSubmitFromSummary} />
      )}
      {step === "complete" && <CompletePage onRestart={handleRestart} />}
    </SetupProvider>
  );
};

export default MultiStepWizard;
