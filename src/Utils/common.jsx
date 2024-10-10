// import * as XLSX from "xlsx";
// import { getUser } from "../auth/helpers/auth_helper.js";
// import { Typography } from "@material-tailwind/react";
// import ValueDisplay from "./value-display.jsx";
import moment from "moment";

export const selectOptionInit = [
  {
    value: "",
    label: "Select - one",
  },
];

// export function generateCompanyCode(legalEntityName, companyCount) {
//   return `${legalEntityName.substring(0, 3)}_${companyCount
//     .toString()
//     .padStart(4, "0")}`;
// }
//
// export function generateBusinessUnitCode(
//   legalEntityName,
//   companyName,
//   businessUnitCount
// ) {
//   return `${legalEntityName.substring(0, 1)}${companyName.substring(
//     0,
//     1
//   )}-BU${businessUnitCount.toString().padStart(1, "0")}`;
// }
//
// export function generateEmployeeCode(initial1, initial2, companyEmployeeCount) {
//   return `${initial1}${initial2}${(companyEmployeeCount + 1)
//     .toString()
//     .padStart(3, "0")}`;
// }

// export function generageBasicSalarySettingCode(groupName, groupCount) {
//   return `${groupName.substring(0, 2)}-${(groupCount + 1)
//     .toString()
//     .padStart(1, "0")}`;
// }

// export default function getUniqueKey() {
//   const key = Date.now() + Math.random();
//   return key;
// }

// export function generateDepartmentCode(
//   legalEntityName,
//   companyName,
//   departmentCount
// ) {
//   return `${legalEntityName.substring(0, 1)}${companyName.substring(
//     0,
//     1
//   )}-DT${departmentCount.toString().padStart(2, "0")}`;
// }
//
// export function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export const baseUrls = {
  scheduler: "http://localhost:9005/api/",
  // compute: "http://localhost:9002/compute/",
};

const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + JSON.parse(token),
  };
};

export const getQueryMethod = async (urlPath, service = "scheduler") => {
  const headers = getHeader();
  const response = await fetch(`${baseUrls[service]}${urlPath}`, {
    method: "GET",
    headers,
  });
  return await response.json();
};

export const getMutationMethod = async (
  method,
  urlPath,
  body,
  service = "scheduler"
) => {
  const headers = getHeader();
  const response = await fetch(`${baseUrls[service]}${urlPath}`, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  return await response.json();
};
