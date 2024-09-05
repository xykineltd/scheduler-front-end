import React, { useLayoutEffect, useRef, useState } from "react";
import ActionMenu from "./actionMenu";
import SearchBar from "./search-bar";
import { Spinner } from "@material-tailwind/react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Table({
  items,
  isSelectable,
  columnTitles,
  tableActions,
  tableTitle,
  tableMessage,
  handleSearch,
  isLoading,
  onClear,
  searchPlaceholder,
  isExpandable = false,
  ExpandedRowDetail = (item) => <></>,
}) {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedItem.length > 0 && selectedItem.length < items.length;
    setChecked(selectedItem.length === items.length && items.length !== 0);
    setIndeterminate(isIndeterminate);
    if (isSelectable) checkbox.current.indeterminate = isIndeterminate;
  }, [selectedItem]);

  function toggleAll() {
    setSelectedItem(checked || indeterminate ? [] : items);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const toggleRow = (item) => {
    setExpandedRows((prev) =>
      prev.includes(item) ? prev.filter((row) => row !== item) : [...prev, item]
    );
  };

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex justify-between">
        {tableTitle && (
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {tableTitle}
          </h1>
        )}
        {tableMessage && (
          <p className="mt-2 text-sm text-gray-700">{tableMessage}</p>
        )}
        <div>
          {tableActions && tableActions.topActions.length === 1 && (
            <button
              onClick={tableActions.topActions[0].action}
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {tableActions.topActions[0].label}
            </button>
          )}

          {tableActions && tableActions.topActions.length > 1 && (
            <ActionMenu actionItems={tableActions.topActions} />
          )}
        </div>
      </div>

      {/* <div className="my-4 sm:flex sm:items-center"> */}
      {handleSearch && (
        <div className="sm:flex-auto">
          <SearchBar
            placeholder={searchPlaceholder}
            onClear={onClear}
            handleSearch={handleSearch}
          />
        </div>
      )}
      {/* </div> */}
      <div className="mt-1 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-1 align-middle sm:px-6 lg:px-8">
            <div className="relative">
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                  <tr>
                    {isSelectable && (
                      <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          ref={checkbox}
                          checked={checked}
                          onChange={toggleAll}
                        />
                      </th>
                    )}
                    {isExpandable && (
                      <th
                        scope="col"
                        className="relative px-7 sm:w-12 sm:px-6"
                      ></th>
                    )}

                    {columnTitles.map((title, index) => (
                      <th
                        key={title + index}
                        scope="col"
                        className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                      >
                        {title}
                      </th>
                    ))}

                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                {isLoading ? (
                  <Spinner />
                ) : (
                  items?.length !== 0 && (
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {items?.map((item, index) => (
                        <React.Fragment key={index}>
                          <tr
                            className={
                              selectedItem?.includes(item)
                                ? "bg-gray-50"
                                : undefined
                            }
                            // onClick={() => toggleRow(item)}
                          >
                            {isSelectable && (
                              <td className="relative px-7 sm:w-12 sm:px-6">
                                {selectedItem?.includes(item) && (
                                  <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                                )}
                                <input
                                  type="checkbox"
                                  className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  value={item.email}
                                  checked={selectedItem.includes(item)}
                                  onChange={(e) =>
                                    setSelectedItem(
                                      e.target.checked
                                        ? [...selectedItem, item]
                                        : selectedItem.filter((p) => p !== item)
                                    )
                                  }
                                />
                              </td>
                            )}

                            {isExpandable && (
                              <td className="relative px-7 sm:w-12 sm:px-6">
                                <Link>
                                  {!expandedRows.includes(item) ? (
                                    <ChevronRightIcon
                                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      onClick={() => toggleRow(item)}
                                    />
                                  ) : (
                                    <ChevronDownIcon
                                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      onClick={() => toggleRow(item)}
                                    />
                                  )}
                                </Link>
                              </td>
                            )}

                            {Object.values(item).map((itemValue, index) => {
                              return index < columnTitles.length ? (
                                <td
                                  key={index}
                                  className={classNames(
                                    "whitespace-nowrap py-3 pr-3 text-sm font-medium",
                                    selectedItem.includes(item)
                                      ? "text-indigo-600"
                                      : "text-gray-900"
                                  )}
                                >
                                  {itemValue}
                                </td>
                              ) : null;
                            })}
                          </tr>
                          {expandedRows.includes(item) && (
                            <tr>
                              <td
                                colSpan={
                                  isSelectable
                                    ? columnTitles.length + 2
                                    : columnTitles.length + 1
                                }
                              >
                                <div className="px-14">
                                  <ExpandedRowDetail
                                    item={item}
                                    index={index}
                                  />
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  )
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
