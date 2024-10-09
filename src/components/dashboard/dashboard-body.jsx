import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
  Bars3Icon,
  EllipsisHorizontalIcon,
  PlusSmallIcon,
} from "@heroicons/react/20/solid";
import { BellIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Invoices", href: "#" },
  { name: "Clients", href: "#" },
  { name: "Expenses", href: "#" },
];
const secondaryNavigation = [
  { name: "Last 7 days", href: "#", current: true },
  { name: "Last 30 days", href: "#", current: false },
  { name: "All-time", href: "#", current: false },
];
const stats = [
  {
    name: "Revenue",
    value: "$405,091.00",
    change: "+4.75%",
    changeType: "positive",
  },
  {
    name: "Overdue invoices",
    value: "$12,787.00",
    change: "+54.02%",
    changeType: "negative",
  },
  {
    name: "Outstanding invoices",
    value: "$245,988.00",
    change: "-1.39%",
    changeType: "positive",
  },
  {
    name: "Expenses",
    value: "$30,156.00",
    change: "+10.18%",
    changeType: "negative",
  },
];
const statuses = {
  Completed: "text-green-700 bg-green-50 ring-green-600/20",
  Upcoming: "text-blue-600 bg-blue-50 ring-gray-500/10",
  OnHold: "text-red-700 bg-red-50 ring-red-600/10",
};
const days = [
  {
    date: "Today",
    dateTime: "2023-03-22",
    transactions: [
      {
        id: 1,
        invoiceNumber: "00012",
        href: "#",
        amount: "$7,600.00 USD",
        tax: "$500.00",
        status: "Paid",
        client: "Reform",
        description: "Website redesign",
        icon: ArrowUpCircleIcon,
      },
      {
        id: 2,
        invoiceNumber: "00011",
        href: "#",
        amount: "$10,000.00 USD",
        status: "Withdraw",
        client: "Tom Cook",
        description: "Salary",
        icon: ArrowDownCircleIcon,
      },
      {
        id: 3,
        invoiceNumber: "00009",
        href: "#",
        amount: "$2,000.00 USD",
        tax: "$130.00",
        status: "On Hold",
        client: "Tuple",
        description: "Logo design",
        icon: ArrowPathIcon,
      },
    ],
  },
  {
    date: "Yesterday",
    dateTime: "2023-03-21",
    transactions: [
      {
        id: 4,
        invoiceNumber: "00010",
        href: "#",
        amount: "$14,000.00 USD",
        tax: "$900.00",
        status: "Paid",
        client: "SavvyCal",
        description: "Website redesign",
        icon: ArrowUpCircleIcon,
      },
    ],
  },
];
const clients = [
  {
    id: 1,
    name: "Meet the President",
    eventDetails: "Meet president Tinubu to discuss matters related to the upcoming 2025 budget",
    imageUrl: "https://tailwindui.com/img/logos/48x48/tuple.svg",
    lastInvoice: {
      date: "December 13, 2024",
      dateTime: "2022-12-13",
      amount: "$2,000.00",
      status: "Upcoming",
    },
  },
  {
    id: 2,
    name: "Fed Executive Meeting",
    eventDetails: "Attend the 8 editions of federal executive council meeting at the Aso rock.",
    imageUrl: "https://tailwindui.com/img/logos/48x48/savvycal.svg",
    lastInvoice: {
      date: "September 22, 2024",
      dateTime: "2023-01-22",
      amount: "$14,000.00",
      status: "Completed",
    },
  },
  {
    id: 3,
    name: "Nigeria Independence Day",
    eventDetails: "Join the president at the Aso rock to celebrate the Nigeria independence Day.",
    imageUrl: "https://tailwindui.com/img/logos/48x48/reform.svg",
    lastInvoice: {
      date: "October 01, 2024",
      dateTime: "2023-01-23",
      amount: "$7,600.00",
      status: "Completed",
    },
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardBody() {
  return (
    <>
      <main>
        <div className="space-y-16 py-16 xl:space-y-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-xl4 font-semibold leading-7 text-gray-600">
                  Recent and Upcoming events
                </h2>
                <a
                  href="#"
                  className=" font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  View all<span className="sr-only">, clients</span>
                </a>
              </div>
              <ul
                role="list"
                className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
              >
                {clients.map((client) => (
                  <li
                    key={client.id}
                    className="overflow-hidden rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                      {/*<img*/}
                      {/*  alt={client.name}*/}
                      {/*  src={client.imageUrl}*/}
                      {/*  className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"*/}
                      {/*/>*/}
                      <div className="text-sm font-medium leading-6 text-gray-900">
                        {client.name}
                      </div>
                      <Menu as="div" className="relative ml-auto">
                        <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Open options</span>
                          <EllipsisHorizontalIcon
                            aria-hidden="true"
                            className="h-5 w-5"
                          />
                        </MenuButton>
                        <MenuItems
                          transition
                          className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                          <MenuItem>
                            <a
                              href="#"
                              className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                            >
                              View
                              <span className="sr-only">, {client.name}</span>
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <a
                              href="#"
                              className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                            >
                              Edit
                              <span className="sr-only">, {client.name}</span>
                            </a>
                          </MenuItem>
                        </MenuItems>
                      </Menu>
                    </div>
                    <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                      <div className="flex justify-between gap-x-4 py-3">
                        <dt className="text-gray-500"> <div>
                          {client.eventDetails}
                        </div></dt>
                        <dd className="text-gray-700">

                        </dd>
                      </div>
                      <div className="flex justify-between gap-x-4 py-3">
                        <dt className="text-gray-500">
                          <div
                              className={classNames(
                                  statuses[client.lastInvoice.status],
                                  "rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                              )}
                          >
                            {client.lastInvoice.status}
                          </div>
                        </dt>
                        <dd className="flex items-start gap-x-2">
                          <div className="font-medium text-gray-900">
                            <time dateTime={client.lastInvoice.dateTime}>
                              {client.lastInvoice.date}
                            </time>
                          </div>
                        </dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
