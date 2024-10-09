import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser, logoutUser } from "../../auth/auth_helper.js";
import acedLogo from "../images/acedlogo1.png";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const userNavigation = [
  {
    name: "Your Profile",
    href: "#",
    action: () => console.log("implementation not available"),
  },
  {
    name: "Sign out",
    href: "#",
    action: () => logoutUser().then((r) => console.log(r)),
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateHeader() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();

  const navigation = [
    {
      name: "Dashboard",
      href: "dashboard",
      action: () => navigate("dashboard"),
      current: currentPath === "/dashboard",
    },
    {
      name: "Itinerary Calendar",
      href: "calendar",
      action: () => navigate("calendar"),
      current: currentPath === "/calendar",
    },
    {
      name: "My Itinerary",
      href: "my-itenary",
      action: () => navigate("my-itenary"),
      current: currentPath === "/my-itenary",
    },
    // {
    //   name: "Travel Itenary",
    //   href: "book-flight",
    //   current: currentPath === "/book-flight",
    // },
    {
      name: "Itinerary Notification",
      href: "notification",
      action: () => navigate("notification"),
      current: currentPath === "/notification",
    },
  ];

  const smallScreenNavigation = [
    ...navigation,
    {
      name: "Create Itinerary",
      href: "create-itenary",
      action: () => navigate("create-itenary"),
      current: currentPath === "/create-itenary",
    },
  ];

  return (
    <Disclosure as="header" className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-1 sm:px-2 lg:divide-y lg:divide-gray-200 lg:px-0">
        <div className="relative flex h-16 justify-between">
          <div className="relative z-10 flex px-2 lg:px-0">
            <div className="flex flex-shrink-0 items-center">
              <img alt="" src={acedLogo} className="h-8 w-auto mr-5" />
            </div>
          </div>
          <div className="relative z-10 flex items-center lg:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="hidden lg:relative lg:z-10 lg:flex lg:items-center lg:justify-between lg:w-full">
            <nav aria-label="Global" className="flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={item.action}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-blue-600 text-white"
                      : "text-gray-900 hover:bg-blue-500 hover:text-white",
                    "inline-flex items-center rounded-md px-3 py-2 text-sm font-medium"
                  )}
                >
                  {item.name}
                </button>
              ))}
            </nav>
            <div className="flex items-center">
              <Link
                to="/create-itenary"
                className="ml-6 bg-blue-600 text-white inline-flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-500"
              >
                Create Itinerary
              </Link>
            </div>
          </div>
          <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-4 flex-shrink-0">
              <div>
                <MenuButton className="relative flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src={user.imageUrl}
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {userNavigation.map((item) => (
                  <MenuItem key={item.name}>
                    <button
                      onClick={item.action}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      {item.name}
                    </button>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel as="nav" aria-label="Global" className="lg:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {smallScreenNavigation.map((item) => (
            <button
              key={item.name}
              onClick={item.action}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-blue-600 text-white"
                  : "text-gray-900 hover:bg-blue-500 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="border-t border-gray-200 pb-3 pt-4">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <img
                alt=""
                src={user.imageUrl}
                className="h-10 w-10 rounded-full"
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">
                {user.name}
              </div>
              <div className="text-sm font-medium text-gray-500">
                {user.email}
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1 px-2">
            {userNavigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
