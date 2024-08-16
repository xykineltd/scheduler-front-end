import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function PaymentForm({ onPrevious, onNext }) {
  // Validation schema
  const validationSchema = Yup.object().shape({
    cardholderName: Yup.string().required("Cardholder name is required"),
    cardNumber: Yup.string()
      .required("Card number is required")
      .matches(/^[0-9]{16}$/, "Card number must be exactly 16 digits"),
    expirationDate: Yup.string()
      .required("Expiration date is required")
      .matches(
        /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
        "Expiration date must be MM/YY"
      ),
    cvv: Yup.string()
      .required("CVV is required")
      .matches(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),
    billingAddress: Yup.string().required("Billing address is required"),
    city: Yup.string().required("City is required"),
    postalCode: Yup.string()
      .required("Postal code is required")
      .matches(/^[0-9]{5}$/, "Postal code must be exactly 5 digits"),
  });

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data);
    onNext(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-6">Payment Information</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Cardholder Name */}
          <div>
            <label
              htmlFor="cardholderName"
              className="block text-sm font-medium text-gray-700"
            >
              Cardholder Name
            </label>
            <input
              type="text"
              id="cardholderName"
              {...register("cardholderName")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="John Doe"
            />
            {errors.cardholderName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cardholderName.message}
              </p>
            )}
          </div>

          {/* Card Number */}
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              {...register("cardNumber")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.cardNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Expiration Date */}
          <div>
            <label
              htmlFor="expirationDate"
              className="block text-sm font-medium text-gray-700"
            >
              Expiration Date (MM/YY)
            </label>
            <input
              type="text"
              id="expirationDate"
              {...register("expirationDate")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="12/23"
            />
            {errors.expirationDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.expirationDate.message}
              </p>
            )}
          </div>

          {/* CVV */}
          <div>
            <label
              htmlFor="cvv"
              className="block text-sm font-medium text-gray-700"
            >
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              {...register("cvv")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="123"
            />
            {errors.cvv && (
              <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
            )}
          </div>
        </div>

        {/* Billing Address */}
        <div className="mb-6">
          <label
            htmlFor="billingAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Billing Address
          </label>
          <input
            type="text"
            id="billingAddress"
            {...register("billingAddress")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="1234 Main St"
          />
          {errors.billingAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.billingAddress.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              {...register("city")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="New York"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* Postal Code */}
          <div>
            <label
              htmlFor="postalCode"
              className="block text-sm font-medium text-gray-700"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              {...register("postalCode")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="10001"
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onPrevious}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Previous
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
