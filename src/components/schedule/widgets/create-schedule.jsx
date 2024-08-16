import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Select from "react-select";

export default function ScheduleForm({
  attendeesList = [],
  handleCreateSchedule = () => {},
}) {
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .max(255, "Title is too long"),
    description: Yup.string(),
    startTime: Yup.date().required("Start time is required"),
    endTime: Yup.date()
      .required("End time is required")
      .min(Yup.ref("startTime"), "End time can't be before start time"),
    isRecurring: Yup.boolean(),
    attendees: Yup.array().min(1, "At least one attendee is required"),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    handleCreateSchedule(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Start Time and End Time on the same row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <input
              type="datetime-local"
              id="startTime"
              {...register("startTime")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.startTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startTime.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="endTime"
              className="block text-sm font-medium text-gray-700"
            >
              End Time
            </label>
            <input
              type="datetime-local"
              id="endTime"
              {...register("endTime")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.endTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.endTime.message}
              </p>
            )}
          </div>
        </div>

        {/* Is Recurring */}
        <div className="mb-4 flex items-center">
          <input
            id="isRecurring"
            type="checkbox"
            {...register("isRecurring")}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label
            htmlFor="isRecurring"
            className="ml-2 block text-sm text-gray-900"
          >
            Recurring
          </label>
        </div>

        {/* Attendees */}
        <div className="mb-4">
          <label
            htmlFor="attendees"
            className="block text-sm font-medium text-gray-700"
          >
            Attendees
          </label>
          <Controller
            name="attendees"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                options={attendeesList}
                placeholder="Select attendees..."
                className="mt-1"
                classNamePrefix="select"
              />
            )}
          />
          {errors.attendees && (
            <p className="text-red-500 text-sm mt-1">
              {errors.attendees.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Schedule
          </button>
        </div>
      </form>
    </div>
  );
}
