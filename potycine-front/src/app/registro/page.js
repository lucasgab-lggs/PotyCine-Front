"use client";
import { useState } from "react";

import "./registropage.css";
import FormTipoUsuario from "@/components/FormTipoUsuario";
import FormDadosPessoais from "@/components/FormDadosPessoais";
import FormPortfolio from "@/components/FormPortfolio";

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    <FormTipoUsuario onNext={() => setCurrentStep(1)} />,
    <FormDadosPessoais onNext={() => setCurrentStep(2)} />,
    <FormPortfolio
      onNext={() => setCurrentStep(3)}
      onSubmit={() => alert("Submit")}
    />,
  ];

  return (
    <div>
        {steps[currentStep]}
    </div>
  );
}
