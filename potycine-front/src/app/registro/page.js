"use client";
import { useState } from "react";

import "./registropage.css";
import FormTipoUsuario from "@/components/FormTipoUsuario";
import FormDadosPessoais from "@/components/FormDadosPessoais";
import FormPortfolio from "@/components/FormPortfolio";
import { registerProducer, registerUser } from "@/services/auth";
import { useRouter } from "next/navigation";
//import { useRouter } from "next/router";

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [userType, setUserType] = useState(null);
  const [portfolio, setPortfolio] = useState({});
  const [formValues, setFormValues] = useState({});

  const saveFormData = (data) => {
    setFormValues(data);
  };

  const handlePortfolioSubmit = (data) => {
    setPortfolio(data);
    if (userType === "PRODUCER") {
      const portfolioData = {
        userId: null,
        companyName: data.companyName,
        portfolio: data.portfolio,
      };

      registerUser(formValues).then((response) => {
        portfolioData.userId = response.id;

        registerProducer(portfolioData);
      });
      router.push("/login");
    } else {
      handleSubmit(formValues);
    }

  };

  const handleSubmit = (data) => {
    registerUser(data);
    router.push("/login");
  };

  const steps = [
    <FormTipoUsuario
      onNext={() => setCurrentStep(1)}
      setUserType={setUserType}
    />,
    <FormDadosPessoais
      onNext={() => setCurrentStep(2)}
      userType={userType}
      saveFormData={saveFormData}
      onSubmit={handleSubmit}
    />,
    <FormPortfolio
      onNext={() => setCurrentStep(3)}
      onPortfolioSubmit={handlePortfolioSubmit}
      onSubmit={handleSubmit}
    />,
  ];

  return <div>{steps[currentStep]}</div>;
}
