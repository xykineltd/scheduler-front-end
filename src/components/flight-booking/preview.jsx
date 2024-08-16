import React, { useState } from "react";

export default function Preview({ formData, setIsPreview }) {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleFinalSubmit = () => {
    alert("Form submitted successfully!");
    console.log("Final form data:", formData);
    // Reset or further processing
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-6 text-center">
        Review Your Information
      </h2>

      {/* Passenger Information Section */}
      <div className="border-b mb-4">
        <button
          type="button"
          onClick={() => toggleSection("passengerInfo")}
          className="w-full text-left py-2 text-lg font-medium text-gray-900"
        >
          Passenger Information
        </button>
        {activeSection === "passengerInfo" && (
          <div className="pt-4 pb-2">
            <p>
              <strong>First Name:</strong> {formData?.personalInfo?.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {formData?.personalInfo?.lastName}
            </p>
            <p>
              <strong>Email:</strong> {formData?.personalInfo?.email}
            </p>
          </div>
        )}
      </div>

      {/* Travel Information Section */}
      <div className="border-b mb-4">
        <button
          type="button"
          onClick={() => toggleSection("travelInfo")}
          className="w-full text-left py-2 text-lg font-medium text-gray-900"
        >
          Travel Information
        </button>
        {activeSection === "travelInfo" && (
          <div className="pt-4 pb-2">
            <p>
              <strong>Departure City:</strong>{" "}
              {formData?.travelInfo?.departureCity}
            </p>
            <p>
              <strong>Destination City:</strong>{" "}
              {formData?.travelInfo?.destinationCity}
            </p>
            <p>
              <strong>Departure Date:</strong>{" "}
              {formData?.travelInfo?.departureDate}
            </p>
            <p>
              <strong>Return Date:</strong> {formData?.travelInfo?.returnDate}
            </p>
          </div>
        )}
      </div>

      {/* Payment Information Section */}
      <div className="border-b mb-4">
        <button
          type="button"
          onClick={() => toggleSection("paymentInfo")}
          className="w-full text-left py-2 text-lg font-medium text-gray-900"
        >
          Payment Information
        </button>
        {activeSection === "paymentInfo" && (
          <div className="pt-4 pb-2">
            <p>
              <strong>Cardholder Name:</strong>{" "}
              {formData?.paymentInfo?.cardholderName}
            </p>
            <p>
              <strong>Card Number:</strong> **** **** ****{" "}
              {formData?.paymentInfo?.cardNumber?.slice(-4)}
            </p>
            <p>
              <strong>Expiration Date:</strong>{" "}
              {formData?.paymentInfo?.expirationDate}
            </p>
            <p>
              <strong>CVV:</strong> ***
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setIsPreview(false)}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Back to Edit
        </button>
        <button
          onClick={handleFinalSubmit}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Confirm and Submit
        </button>
      </div>
    </div>
  );
}
