import React from "react";
import { Drawer, IconButton, Typography } from "@material-tailwind/react";
import { useApplicationContext } from "../../contexts/ApplicationContext";

export default function AppDrawer({ children = <></>, title }) {
  const { isDrawerOpen, setIsDrawerOpen } = useApplicationContext();
  const closeDrawer = () => setIsDrawerOpen(false);
  return (
    <Drawer
      size={800}
      placement="right"
      open={isDrawerOpen}
      onClose={closeDrawer}
    >
      <div className="flex">
        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
        <Typography
          variant="h3"
          color="xykine-primary"
          className="mb-2 font-medium"
        >
          {title}
        </Typography>
      </div>

      <div className="h-full overflow-y-scroll p-4">{children}</div>
    </Drawer>
  );
}
