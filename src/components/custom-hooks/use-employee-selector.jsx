import React, { useEffect, useState } from "react";
import { Checkbox } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { getQueryMethod } from "../common/api-helper";
import Table from "../shared/table";
import Pagination from "../shared/pagination";

const getIsSelectedListed = (selectedData, employeeResponse) => {
  if (selectedData.length === 0) return false;
  for (const empResponse of employeeResponse) {
    const indexFound = selectedData.findIndex(
      ({ employeeID }) => employeeID === empResponse.employeeID
    );
    if (indexFound === -1) {
      return false;
    }
  }
  return true;
};

export const useEmployeeSelector = () => {
  const companyCode = JSON.parse(localStorage.getItem("companyCode"));
  const [selectedData, setSelectedData] = useState([]);
  const [totalEmployeeCount, setTotalEmployeeCount] = useState(0);
  const [employeeCountPerPage, setEmployeeCountPerPage] = useState(20);
  const [currentEmployeePage, setCurrentEmployeePage] = useState(1);
  const [searchParam, setEmployeeSearchParams] = useState("");
  const [tableItems, setTableItems] = useState([]);
  const [isSelectedListed, setIsSelectedListed] = useState(false);
  const [selectAllEmployee, setSelectAllEmployee] = useState(true);

  const {
    data: employees = [],
    isFetching: isFetchingEmployee,
    isLoading: loadingEmployees,
    refetch: refetchEmployees,
  } = useQuery({
    queryKey: [
      "employees",
      companyCode,
      currentEmployeePage,
      employeeCountPerPage,
      searchParam,
    ],
    queryFn: () =>
      getQueryMethod(
        `employee/companyCode/${companyCode}?page=${
          currentEmployeePage - 1
        }&size=${employeeCountPerPage}&lastName=${searchParam}&firstName=${searchParam}`
      ),
    enabled: !!companyCode,
  });

  const {
    data: allEmployee,
    isFetching: isFetchingAllEmployee,
    isLoading: loadingAllEmployees,
    refetch: refetchAllEmployees,
  } = useQuery({
    queryKey: [
      "allEmployees",
      companyCode,
      currentEmployeePage,
      employeeCountPerPage,
      searchParam,
    ],
    queryFn: () => getQueryMethod(`employee/companyCode/${companyCode}`),
    enabled: !!companyCode && !!selectAllEmployee,
  });

  useEffect(() => {
    setTotalEmployeeCount(employees?.totalItems || 0);
  }, [employees]);

  useEffect(() => {
    refetchEmployees();
  }, [searchParam]);

  useEffect(() => {
    const selectedEmployeeIDs = selectedData.map((selEmp) => selEmp.employeeID);
    const filteredEmployee = employees?.employeeResponse?.filter(
      (emp) => !selectedEmployeeIDs.includes(emp.employeeID)
    );

    const tableItemsHolder = filteredEmployee?.map(
      ({ firstName, lastName, employeeID }) => [
        <Checkbox
          key={employeeID}
          color="blue"
          checked={
            selectedData.some((emp) => emp.employeeID === employeeID) ||
            selectAllEmployee
          }
          onChange={() => handleCheckboxChange(employeeID)}
          className="m-1"
        />,
        `${firstName} ${lastName}`,
      ]
    );

    setTableItems(tableItemsHolder);

    if (employees?.employeeResponse.length > 0)
      setIsSelectedListed(
        getIsSelectedListed(selectedData, employees?.employeeResponse)
      );
  }, [employees, selectedData, selectAllEmployee]);

  const getEmployeeNameById = (emp) => `${emp?.firstName} ${emp?.lastName}`;

  const handleDeleteByID = (employeeID) => {
    const selectedDataHolder = selectedData.filter(
      (employee) => employee.employeeID !== employeeID
    );
    setSelectedData(selectedDataHolder);
  };

  const handleSearch = (searchParam) => {
    setEmployeeSearchParams(searchParam);
    setCurrentEmployeePage(1);
  };

  const handleCheckboxChange = (employeeID) => {
    if (selectedData.some((emp) => emp.employeeID === employeeID)) {
      handleDeleteByID(employeeID);
    } else {
      const selectedEmployee = employees?.employeeResponse?.find(
        (emp) => emp.employeeID === employeeID
      );
      setSelectedData([...selectedData, selectedEmployee]);
    }
  };

  const handleSelectListed = () => {
    if (isSelectedListed) {
      const currentSelection = [...selectedData];
      employees?.employeeResponse.forEach((empResponse) => {
        const indexFound = currentSelection.findIndex(
          ({ employeeID }) => employeeID === empResponse.employeeID
        );
        currentSelection.splice(indexFound, 1);
      });

      setSelectedData(currentSelection);
    } else {
      setSelectedData((previous) => [
        ...previous,
        ...employees?.employeeResponse,
      ]);
    }
  };

  const selectionDisplay = () => (
    <div className="flex flex-wrap">
      {selectAllEmployee ? (
        <div className="flex w-full justify-center m-1 rounded-md px-2 pb-2 pt-3 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
          All employee has been selected{" "}
        </div>
      ) : (
        selectedData?.map((data) => (
          <div
            key={data.employeeID}
            className="relative m-1 rounded-md px-2 pb-2 pt-3 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 flex items-center justify-between"
          >
            <label htmlFor="name" className="text-sm font-medium text-gray-900">
              {getEmployeeNameById(data)}
            </label>

            <MinusCircleIcon
              onClick={() => handleDeleteByID(data.employeeID)}
              className="h-7 w-7 ml-3"
              aria-hidden="true"
            />
          </div>
        ))
      )}
    </div>
  );

  const itemList = () => (
    <>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Checkbox
            key="selectAll"
            color="blue"
            checked={selectAllEmployee}
            onChange={() => setSelectAllEmployee(!selectAllEmployee)}
          />
          <span>All employee</span>
        </div>
        <div className="flex items-center">
          <Checkbox
            key="selectListed"
            color="blue"
            checked={isSelectedListed}
            onChange={handleSelectListed}
          />
          <span>Add listed employee</span>
        </div>
      </div>

      <Table
        isLoading={isFetchingEmployee || loadingEmployees}
        handleSearch={handleSearch}
        tableTitle={"Employee"}
        items={tableItems ? tableItems : []}
        columnTitles={["Select", "Name"]}
        onClear={() => handleSearch("")}
        searchPlaceholder="Search to add employee"
      />
    </>
  );

  const pagination = () =>
    totalEmployeeCount !== 0 && (
      <Pagination
        itemsPerPage={employeeCountPerPage}
        totalItems={totalEmployeeCount}
        paginate={(pageNumber) => setCurrentEmployeePage(parseInt(pageNumber))}
        currentPage={currentEmployeePage}
      />
    );

  return {
    selectionDisplay,
    itemList,
    pagination,
    selectedData: selectAllEmployee
      ? allEmployee?.employeeResponse
      : selectedData,
    setSelectedData,
    setSelectAllEmployee,
  };
};
