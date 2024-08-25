// Importing React and other necessary modules from the 'react' library
import * as React from "react";

// Importing the 'useContext' hook from the 'react' library
import { useContext } from "react";

// Importing the necessary components from the '@mui/material' library
import { IconButton, Box, Tooltip, useTheme } from "@mui/material";

// Importing the 'MainContext' from the '../context/index' module
import MainContext from "../context/index";

// Importing the necessary icons from the '@mui/icons-material' library
import { WbSunnyRounded, ModeNightRounded } from "@mui/icons-material";

// Defining the 'Mode' component
const Mode = () => {
  // Using the 'useTheme' hook to get the current theme
  const theme = useTheme();

  // Using the 'useContext' hook to get the 'handleTheme' function from the 'MainContext'
  const { handleTheme } = useContext(MainContext);

  // Returning the JSX for the 'Mode' component
  return (
    // Wrapping the 'Mode' component in a 'Box' component with a specific style
    <Box sx={{ display: "flex", justifyContent: "end" }}>
      {/* Wrapping the 'IconButton' component in a 'Tooltip' component with a specific title */}
      <Tooltip
        title={
          // Checking if the current theme is 'dark' and displaying the corresponding title
          theme.palette.mode === "dark" ? "LightMode" : "DarkMode"
        }
        arrow // Adding an arrow to the tooltip
      >
        {/* Rendering the 'IconButton' component */}
        <IconButton
          onClick={handleTheme} // Adding an 'onClick' event handler to the 'IconButton'
          sx={{
            width: 55, // Setting the width of the 'IconButton' to 55 pixels
          }}
          color="primary" // Setting the color of the 'IconButton' to 'primary'
        >
          {/* Rendering the appropriate icon based on the current theme */}
          {theme.palette.mode === "dark" ? (
            <WbSunnyRounded />
          ) : (
            <ModeNightRounded />
          )}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

// Exporting the 'Mode' component as the default export
export default Mode;
