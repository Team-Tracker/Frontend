"use client";

// import React from "react";
// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Button,
// } from "@nextui-org/react";

// const Calender = () => {
//   const [selectedKeys, setSelectedKeys] = React.useState(new Set(["month"]));

//   const selectedValue = React.useMemo(
//     () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
//     [selectedKeys]
//   );

//   return (
//     <div className="w-screen h-full p-8 flex items-start justify-center">
//       <Dropdown>
//         <DropdownTrigger>
//           <Button variant="bordered" className="capitalize">
//             {selectedValue}
//           </Button>
//         </DropdownTrigger>
//         <DropdownMenu
//           aria-label="Single selection example"
//           variant="flat"
//           disallowEmptySelection
//           selectionMode="single"
//           selectedKeys={selectedKeys}
//           onSelectionChange={setSelectedKeys}
//         >
//           <DropdownItem key="month">Month</DropdownItem>
//           <DropdownItem key="week">Week</DropdownItem>
//         </DropdownMenu>
//       </Dropdown>

//     </div>


//   );
// };

// export default Calender;

// /app/calendar/page.js
import Calendar from '../components/Calender/Calendar';

export default function CalendarPage() {
  return <Calendar />;
}

