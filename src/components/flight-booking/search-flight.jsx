import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function FlightSearchForm({ onNext }) {
  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    origin: Yup.string().required("Origin is required"),
    destination: Yup.string().required("Destination is required"),
    departureDate: Yup.date().required("Departure date is required"),
    returnDate: Yup.date()
      .required("Return date is required")
      .min(
        Yup.ref("departureDate"),
        "Return date can't be before departure date"
      ),
    airlines: Yup.string().required("Airlines is required"),
    serviceClass: Yup.string().required("Service class is required"),
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
    onNext(); // Trigger the onNext callback when the form is successfully validated
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">
        Start Flight Booking
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Trip Type */}
        <div className="flex space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            One way
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Round trip
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Multi city
          </button>
        </div>

        {/* Origin and Destination */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="origin"
              className="block text-sm font-medium text-gray-700"
            >
              From
            </label>
            <input
              type="text"
              id="origin"
              {...register("origin")}
              placeholder="Enter origin city or airport"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.origin && (
              <p className="text-red-500 text-sm">{errors.origin.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-gray-700"
            >
              To
            </label>
            <input
              type="text"
              id="destination"
              {...register("destination")}
              placeholder="Enter destination city or airport"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.destination && (
              <p className="text-red-500 text-sm">
                {errors.destination.message}
              </p>
            )}
          </div>
        </div>

        {/* Non-stop Flights */}
        <div className="flex items-center">
          <input
            id="nonStop"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            {...register("nonStop")}
          />
          <label htmlFor="nonStop" className="ml-2 block text-sm text-gray-900">
            Only non-stop flights
          </label>
        </div>

        {/* Departure and Return Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="departureDate"
              className="block text-sm font-medium text-gray-700"
            >
              Departure date
            </label>
            <input
              type="date"
              id="departureDate"
              {...register("departureDate")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.departureDate && (
              <p className="text-red-500 text-sm">
                {errors.departureDate.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="returnDate"
              className="block text-sm font-medium text-gray-700"
            >
              Return date
            </label>
            <input
              type="date"
              id="returnDate"
              {...register("returnDate")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.returnDate && (
              <p className="text-red-500 text-sm">
                {errors.returnDate.message}
              </p>
            )}
          </div>
        </div>

        {/* Airlines and Service Class */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="airlines"
              className="block text-sm font-medium text-gray-700"
            >
              Airlines (max 6)
            </label>
            <input
              type="text"
              id="airlines"
              {...register("airlines")}
              placeholder="Enter airline"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.airlines && (
              <p className="text-red-500 text-sm">{errors.airlines.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="serviceClass"
              className="block text-sm font-medium text-gray-700"
            >
              Service class
            </label>
            <select
              id="serviceClass"
              {...register("serviceClass")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select class</option>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First Class">First Class</option>
            </select>
            {errors.serviceClass && (
              <p className="text-red-500 text-sm">
                {errors.serviceClass.message}
              </p>
            )}
          </div>
        </div>

        {/* Search Button */}
        <div className="text-right">
          <button
            type="submit"
            className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
