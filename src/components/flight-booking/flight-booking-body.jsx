import React, { useState } from "react";
import {
  CheckIcon,
  HandThumbUpIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CurrencyDollarIcon } from "@heroicons/react/16/solid";
import FlightSearchForm from "./search-flight";
import PassengerInfoForm from "./passenger-info";
import PaymentForm from "./payment-info-form";
import Preview from "./preview";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FlightBookingBody() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);

  const timeline = [
    {
      id: 1,
      content: "",
      target: "Search flight",
      icon: MagnifyingGlassIcon,
      iconBackground: completedSteps.includes(1)
        ? "bg-green-500"
        : "bg-gray-400",
    },
    {
      id: 2,
      content: "",
      target: "Passenger info",
      icon: UserIcon,
      iconBackground: completedSteps.includes(2)
        ? "bg-green-500"
        : "bg-gray-400",
    },
    {
      id: 3,
      content: "",
      target: "Payment info",
      icon: CurrencyDollarIcon,
      iconBackground: completedSteps.includes(3)
        ? "bg-green-500"
        : "bg-gray-400",
    },
    {
      id: 4,
      content: "",
      target: "Preview and submit",
      icon: HandThumbUpIcon,
      iconBackground: completedSteps.includes(4)
        ? "bg-green-500"
        : "bg-gray-400",
    },
  ];

  const goToStep = (step) => {
    if (completedSteps.includes(step - 1) || step === 1) {
      setCurrentStep(step);
    }
  };

  const markStepComplete = () => {
    setCompletedSteps([...completedSteps, currentStep]);
    if (currentStep < timeline.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <div className="flex mt-10 justify-center">
        <ul role="list" className="flex space-x-8">
          {timeline.map((event, eventIdx) => (
            <li key={event.id} className="flex-1">
              <div className="relative flex items-center">
                <div className="flex flex-col items-center">
                  <span
                    onClick={() => goToStep(event.id)}
                    className={classNames(
                      event.iconBackground,
                      "flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white cursor-pointer"
                    )}
                  >
                    <event.icon
                      aria-hidden="true"
                      className="h-5 w-5 text-white"
                    />
                  </span>
                </div>
                {eventIdx !== timeline.length - 1 && (
                  <div className="flex-1 h-0.5 bg-gray-200"></div>
                )}
              </div>
              <div className="text-center mt-3">
                <p className="text-sm text-gray-500">
                  <a
                    href="#"
                    onClick={() => goToStep(event.id)}
                    className="font-medium text-gray-900"
                  >
                    {event.target}
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Render forms based on the current step */}
      {currentStep === 1 && <FlightSearchForm onNext={markStepComplete} />}
      {currentStep === 2 && (
        <PassengerInfoForm
          onNext={markStepComplete}
          onPrevious={goToPreviousStep}
        />
      )}
      {currentStep === 3 && (
        <PaymentForm onNext={markStepComplete} onPrevious={goToPreviousStep} />
      )}
      {currentStep === 4 && (
        <Preview onSubmit={markStepComplete} onPrevious={goToPreviousStep} />
      )}
    </>
  );
}
