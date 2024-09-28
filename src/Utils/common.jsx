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
  scheduler: "http://localhost:9005/events/",
  // compute: "http://localhost:9002/compute/",

  // admin: "http://xykinehrs.com/admin/",
  // compute: "http://xykinehrs.com/compute/",
};

// const BASE_URL = "http://xykinehrs.com/admin/";
// const BASE_URL = "http://localhost:9001/admin/";
// const url = `${BASE_URL}`;
// const headers = { "Content-Type": "application/json" };

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
  service = "admin"
) => {
  const headers = getHeader();
  const response = await fetch(`${baseUrls[service]}${urlPath}`, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  return await response.json();
};

// export function consolidateCategories(originalCategories) {
//   const grouped = {
//     ALLOWANCE_ANNUAL: [],
//     DEDUCTION_MONTHLY: [],
//     REQUIRED: [],
//   };
//
//   Object.keys(originalCategories).forEach((category) => {
//     if (category === "ALLOWANCE_ANNUAL") {
//       grouped.ALLOWANCE_ANNUAL = grouped.ALLOWANCE_ANNUAL.concat(
//         originalCategories[category]
//       );
//     } else if (category === "DEDUCTION_MONTHLY") {
//       grouped.DEDUCTION_MONTHLY = grouped.DEDUCTION_MONTHLY.concat(
//         originalCategories[category]
//       );
//     } else {
//       // For any other category, we add the items to the 'REQUIRED' group
//       grouped.REQUIRED = grouped.REQUIRED.concat(
//         originalCategories[category].map((item) => ({
//           ...item,
//           type: "REQUIRED",
//           isItemSaved: true,
//         }))
//       );
//     }
//   });
//
//   return grouped;
// }
//
// export function consolidateWageStructure(wageStructures) {
//   const grouped = {
//     ALLOWANCE_ANNUAL: [],
//     DEDUCTION_MONTHLY: [],
//     REQUIRED: [],
//   };
//
//   wageStructures.forEach((wageStructure) => {
//     if (wageStructure.type === "ALLOWANCE_ANNUAL") {
//       grouped.ALLOWANCE_ANNUAL.push(wageStructure);
//     } else if (wageStructure.type === "DEDUCTION_MONTHLY") {
//       grouped.DEDUCTION_MONTHLY.push(wageStructure);
//     } else {
//       grouped.REQUIRED.push(wageStructure);
//     }
//   });
//
//   return grouped;
// }
//
// export function consolidateBasicSalarySetting(basicSalarySettings) {
//   let grouped = {};
//
//   basicSalarySettings.forEach((wageStructure) => {});
//
//   return grouped;
// }
//
// export const timestamp = () => new Date().valueOf();
//
// export const getReverseType = {
//   "Basic Salary": "BASIC_SALARY_ANNUAL",
//   "Transport Allowance": "ALLOWANCE_ANNUAL_TRANSPORT",
//   "Housing Allowance": "ALLOWANCE_ANNUAL_HOUSING",
// };
//
// export const getSentenceCase = (word) => {
//   return word.charAt(0).toUpperCase() + word.slice(1);
// };
//
// export const formatDateTime = (dateString) => {
//   const date = new Date(dateString);
//
//   // Format the date components
//   const year = date.getFullYear();
//   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
//   const day = date.getDate().toString().padStart(2, "0");
//   const hours = date.getHours() % 12 || 12; // Convert 24-hour format to 12-hour format
//   const minutes = date.getMinutes().toString().padStart(2, "0");
//   const period = date.getHours() < 12 ? "AM" : "PM";
//
//   // Create the formatted date string
//   return `${year}-${month}-${day} ${hours}:${minutes} ${period}`;
// };
//
// export function convertTimestampToYMD(timestamp) {
//   // Convert timestamp to milliseconds
//   const milliseconds = timestamp * 1000;
//
//   // Create a new Date object with the milliseconds
//   const dateObject = new Date(milliseconds);
//
//   // Extract year, month, and day
//   const year = dateObject.getFullYear();
//
//   // Month is zero-based, so add 1
//   const month = dateObject.getMonth() + 1;
//
//   const day = dateObject.getDate();
//
//   // Return an object with year, month, and day
//   return { year, month, day };
// }
//
// export const getFormatedDate = (dateValue) => {
//   const { year, month, day } = convertTimestampToYMD(dateValue);
//   return `${day}/${month}/${year}`;
// };
//
// export function formatToTwoDecimalPlaces(number) {
//   const fixedNumber = parseFloat(number).toFixed(2);
//   const parts = fixedNumber.split(".");
//   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   return parts.join(".");
// }
//
// export const fomatAndAppendCurrency = (currency, value) => {
//   return `${newCurrencySymbol[currency]}${formatToTwoDecimalPlaces(value)}`;
// };
//
// export const currencySymbol = {
//   Naira: "₦",
//   Dollar: "$",
//   Euro: "€",
//   Pounds: "£",
//   Yuan: "¥",
// };
//
// export const newCurrencySymbol = {
//   NGN: "₦",
//   USD: "$",
//   EUR: "€",
//   GBP: "£",
//   CNY: "¥",
// };
//
// export const getCurrencySymbol = (currencyName) => {
//   return currencySymbol[
//     currencyName.charAt(0).toUpperCase() + currencyName.slice(1).toLowerCase()
//   ];
// };
//
// export const CurrencyEnum = {
//   NGN: "NGN",
//   USD: "USD",
//   CNY: "CNY",
//   JPY: "JPY",
//   GBP: "GBP",
//   EUR: "EUR",
//   CEDI: "CEDI",
//   RAND: "RAND",
//   CFA: "CFA",
// };
//
// export const getCurrencyLabel = (currencyValue) =>
//   getCurrencyOptions().find((c) => c.value === currencyValue)?.label;
//
// export const countryOptions = [
//   {
//     value: "",
//     label: "Select-one",
//   },
//   { label: "Nigeria", value: "Nigeria" },
//   { label: "USA", value: "USA" },
//   { label: "Kenya", value: "Kenya" },
//   { label: "Ghana", value: "Ghana" },
//   { label: "Niger", value: "Niger" },
//   { label: "Britain", value: "Britain" },
//   { label: "Canada", value: "Canada" },
//   { label: "China", value: "China" },
// ];
//
// export const getCurrencyOptions = () => {
//   return [
//     {
//       value: "",
//       label: "Select-currency",
//     },
//     {
//       value: CurrencyEnum.NGN,
//       label: "Naira(₦)",
//     },
//     {
//       value: CurrencyEnum.USD,
//       label: "Dollar($)",
//     },
//     {
//       value: CurrencyEnum.EUR,
//       label: "Euro(€)",
//     },
//     {
//       value: CurrencyEnum.GBP,
//       label: "Pounds(£)",
//     },
//     {
//       value: CurrencyEnum.CNY,
//       label: "Yuan(¥)",
//     },
//   ];
// };
//
// export const PaymentFrequencyEnum = {
//   MONTHLY: "MONTHLY",
//   WEEKLY: "WEEKLY",
//   BI_WEEKLY: "BI_WEEKLY",
//   DAILY: "DAILY",
//   SEMI_MONTHLY: "SEMI_MONTHLY",
//   YEARLY: "YEARLY",
// };
//
// export const UserRole = {
//   ADMIN: "ADMIN",
//   VENDOR: "VENDOR",
//   EMPLOYEE: "EMPLOYEE",
//   CUSTOMER_MANAGER: "CUSTOMER_MANAGER",
//   CUSTOMER: "CUSTOMER",
// };
//
// export const paymentFrequencyOptions = [
//   {
//     value: "",
//     label: "Select-one",
//   },
//   {
//     value: PaymentFrequencyEnum.WEEKLY,
//     label: "Weekly",
//   },
//   {
//     value: PaymentFrequencyEnum.BI_WEEKLY,
//     label: "Bi-weekly",
//   },
//   {
//     value: PaymentFrequencyEnum.MONTHLY,
//     label: "Monthly",
//   },
// ];
//
// export const months = [
//   "Jan",
//   "Feb",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "Aug.",
//   "Sept.",
//   "Oct.",
//   "Nov.",
//   "Dec.",
// ];
//
// export const monthOptions = months.map((month, index) => ({
//   value: (index + 1).toString().padStart(2, "0"),
//   label: month,
// }));
//
// export const yearOptions = () => {
//   let years = [];
//   let yearNow = new Date().getFullYear();
//
//   for (let x = 0; x < 100; x++) {
//     years.push({ value: yearNow, label: yearNow });
//     yearNow--;
//   }
//
//   return years;
// };
//
// export const downloadDataExcel = (rawData, fileName) => {
//   // Create a new workbook
//   const wb = XLSX.utils.book_new();
//
//   // Create worksheets from the data
//   Object.values(rawData).forEach(({ sheetName, data }) => {
//     const ws = XLSX.utils.aoa_to_sheet(data);
//
//     // Set styles for the header row
//     const headerStyle = {
//       font: { bold: true },
//       fill: { fgColor: { rgb: "A9A9A9" } }, // Light gray background
//     };
//
//     // Apply header styles and adjust column widths
//     const cols = [];
//     Object.keys(data[0]).forEach((_, colIdx) => {
//       const col = XLSX.utils.encode_col(colIdx);
//       const cellRef = `${col}1`; // First row is the header
//       if (ws[cellRef]) {
//         ws[cellRef].s = headerStyle;
//       }
//
//       // Define a column width, e.g., 20 characters wide
//       cols.push({ wch: 20 });
//     });
//
//     ws["!cols"] = cols;
//
//     // Append the worksheet to the workbook
//     XLSX.utils.book_append_sheet(wb, ws, sheetName);
//   });
//
//   // Generate XLSX file from workbook
//   const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });
//
//   // Create a Blob from the XLSX file
//   const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
//
//   // Helper function to convert the string to an ArrayBuffer
//   function s2ab(s) {
//     const buf = new ArrayBuffer(s.length);
//     const view = new Uint8Array(buf);
//     for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
//     return buf;
//   }
//
//   // Create blob URL
//   const url = window.URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.setAttribute("download", fileName);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };
//
// export const roleMapper = {
//   ADMIN: "Admin",
//   VENDOR: "Super user",
//   CUSTOMER: "End user",
//   EMPLOYEE: "Employee",
//   CUSTOMER_MANAGER: "Employee manager",
// };
//
// export function clearLocalStorage() {
//   localStorage.removeItem("token");
//   localStorage.removeItem("companyCode");
// }
//
// export const getDisplay = (field, label, state) => {
//   return (
//     <div className="mt-3">
//       <Typography
//         variant="small"
//         color="xykine-primary"
//         className="mb-2 font-medium"
//       >
//         {label}
//       </Typography>
//       <ValueDisplay value={state[field]} />
//     </div>
//   );
// };
//
// export function getFormatedDateForApiCall(date) {
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1; // getMonth() is zero-based, so add 1
//   const lastDate = new Date(year, month, 0); // Passing 0 as the day gives the last day of the previous month
//
//   return lastDate.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
// }
//
// export function getLastDatesOfLast12Months(date) {
//   const lastDates = [];
//
//   for (let i = 0; i < 12; i++) {
//     const lastDateOfMonth = moment(date)
//       .subtract(i, "months")
//       .endOf("month")
//       .format("YYYY-MM-DD");
//     lastDates.push(lastDateOfMonth);
//   }
//
//   return lastDates.join(","); // Reverse to get them in chronological order
// }
//
// export function convertDateToMonthAbbreviation(data) {
//   const monthNames = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];
//
//   return data.map((item) => {
//     const [year, month] = item.date.split("-");
//     const monthAbbreviation = monthNames[parseInt(month, 10) - 1]; // Convert month number to abbreviation
//     return {
//       ...item,
//       date: `${monthAbbreviation}`, // Format date as "Month-Year"
//     };
//   });
// }
