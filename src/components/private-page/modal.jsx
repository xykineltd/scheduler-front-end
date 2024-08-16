import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useApplicationContext } from "../../contexts/ApplicationContext";

export default function AppModal({
  children,
  title,
  getSubmitStatus = () => true,
}) {
  const { isModalOpen, setIsModalOpen } = useApplicationContext();

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setIsModalOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-auto transform overflow-hidden rounded-lg bg-white px-5 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                {title && (
                  <Dialog.Title
                    as="h2"
                    className="text-base  mb-6 font-semibold leading-6 text-gray-900"
                  >
                    {title.toUpperCase()}
                  </Dialog.Title>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
