import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Dialog, Transition } from "@headlessui/react"; // Headless UI for modals
import { FaGoogle, FaMicrosoft } from "react-icons/fa"; // For logos

export default function CalenderSideBar() {
  const [showPeopleItineraries, setShowPeopleItineraries] = useState(false);
  const [showPersonalItineraries, setShowPersonalItineraries] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false); // New state for Add Person Itinerary modal
  const [email, setEmail] = useState("");
  const [addedPeople, setAddedPeople] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]); // State for selected people from checkboxes

  // Handler to toggle People Itineraries dropdown
  const togglePeopleItineraries = () => {
    setShowPeopleItineraries(!showPeopleItineraries);
  };

  // Handler to toggle Personal Itineraries dropdown
  const togglePersonalItineraries = () => {
    setShowPersonalItineraries(!showPersonalItineraries);
  };

  // Function to handle modal open/close
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openPersonModal = () => setIsPersonModalOpen(true); // Open Add Person Itinerary modal
  const closePersonModal = () => setIsPersonModalOpen(false); // Close Add Person Itinerary modal

  // Function to handle adding a person to the itinerary
  const handleAddPerson = () => {
    if (email && !addedPeople.includes(email)) {
      setAddedPeople([...addedPeople, email]);
      setEmail(""); // Clear the input after adding
    }
  };

  // Handler for selecting/unselecting people in the "People Itineraries" section
  const handlePeopleSelection = (person) => {
    if (selectedPeople.includes(person)) {
      setSelectedPeople(selectedPeople.filter((p) => p !== person));
    } else {
      setSelectedPeople([...selectedPeople, person]);
    }
  };

  return (
    <div className="mt-20 flex flex-1 flex-col w-64">
      {/* Sidebar container with border */}
      <div className="border p-4 rounded-md shadow-md">
        {/* Add People Itinerary Button */}
        <button
          onClick={openModal}
          className="text-white bg-blue-600 py-2 px-4 mb-4 rounded-md hover:bg-indigo-700"
        >
          + Add People Itinerary
        </button>

        {/* People Itineraries Dropdown */}
        <div className="mb-4">
          <button
            onClick={togglePeopleItineraries}
            className="text-gray-800 font-semibold flex items-center"
          >
            People Itineraries
            {showPeopleItineraries ? (
              <ChevronUpIcon className="h-5 w-5 ml-2" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 ml-2" />
            )}
          </button>
          {showPeopleItineraries && (
            <div className="ml-4 mt-2">
              <label className="block">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={() => handlePeopleSelection("Ademola Hammed")}
                  checked={selectedPeople.includes("Ademola Hammed")}
                />
                Ademola Hammed
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={() => handlePeopleSelection("Kazeem Alaraje")}
                  checked={selectedPeople.includes("Kazeem Alaraje")}
                />
                Kazeem Alaraje
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={() => handlePeopleSelection("Simisola")}
                  checked={selectedPeople.includes("Simisola")}
                />
                Simisola
              </label>
            </div>
          )}
        </div>

        {/* Add Person Itinerary Button */}
        <button
          onClick={openPersonModal} // Open Add Person Itinerary modal
          className="text-white bg-blue-600 py-2 px-4 mb-4 rounded-md hover:bg-indigo-700"
        >
          + Add Person Itinerary
        </button>

        {/* Personal Itineraries Dropdown */}
        <div>
          <button
            onClick={togglePersonalItineraries}
            className="text-gray-800 font-semibold flex items-center"
          >
            Personal Itineraries
            {showPersonalItineraries ? (
              <ChevronUpIcon className="h-5 w-5 ml-2" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 ml-2" />
            )}
          </button>
          {showPersonalItineraries && (
            <div className="ml-4 mt-2">
              <label className="block">
                <input type="checkbox" className="mr-2" />
                adebola@gmail.com
              </label>
              <label className="block">
                <input type="checkbox" className="mr-2" />
                omotola@gmail.com
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Adding People Itinerary */}
      <Transition appear show={isModalOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add People Itinerary
                  </Dialog.Title>

                  <div className="mt-4">
                    {/* Search bar */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                      <button
                        onClick={handleAddPerson}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                      >
                        Search
                      </button>
                    </div>

                    {/* Added People List */}
                    {addedPeople.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-700">
                          Selected People:
                        </h4>
                        <div className="space-y-2 mt-2">
                          {addedPeople.map((person, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 border rounded-md"
                            >
                              <span>{person}</span>
                              <XMarkIcon
                                className="h-5 w-5 text-red-600 cursor-pointer"
                                onClick={() =>
                                  setAddedPeople(
                                    addedPeople.filter((p) => p !== person)
                                  )
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Display Selected People from People Itineraries */}
                    {selectedPeople.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-700">
                          People Itineraries:
                        </h4>
                        <div className="space-y-2 mt-2">
                          {selectedPeople.map((person, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 border rounded-md"
                            >
                              <span>{person}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Add Button */}
                    <div className="mt-4">
                      <button
                        onClick={handleAddPerson}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Modal for Adding Person Itinerary with Outlook and Google Options */}
      <Transition appear show={isPersonModalOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closePersonModal}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Person Itinerary
                  </Dialog.Title>

                  <div className="mt-4 flex space-x-4 ">
                    {/* Button for Outlook */}
                    <a
                      href="https://outlook.live.com/owa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border p-4 mb-4 rounded-lg bg-blue-100 hover:bg-blue-200 w-64"
                    >
                      <div className="flex items-center">
                        <FaMicrosoft className="h-6 w-6 text-blue-500 mr-2" />
                        <span className="font-medium text-gray-700">
                          Outlook.com, Hotmail, Live, MSN
                        </span>
                      </div>
                    </a>

                    {/* Button for Google */}
                    <a
                      href="https://mail.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between border p-4 mb-4 rounded-lg bg-red-100 hover:bg-red-200 w-64"
                    >
                      <div className="flex items-center">
                        <FaGoogle className="h-6 w-6 text-red-500 mr-2" />
                        <span className="font-medium text-gray-700">
                          Google
                        </span>
                      </div>
                    </a>
                  </div>

                  {/* Close Button */}
                  <div className="mt-4">
                    <button
                      onClick={closePersonModal}
                      className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
