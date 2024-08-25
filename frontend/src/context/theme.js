// Importing the 'createTheme' function from the '@mui/material/styles' module.
// This function is used to create a theme object, which is used to style MUI components.
import { createTheme } from "@mui/material/styles";

// Creating a theme object for the light mode.
// The theme object specifies the visual style of the components in the light mode.
// In this case, we are specifying that the theme should be in the 'light' mode.
export const lightTheme = createTheme({
  palette: {
    // Setting the mode of the theme to 'light'.
    // This means that the components will be styled for the light mode.
    mode: "light",
  },
});

// Creating a theme object for the dark mode.
// The theme object specifies the visual style of the components in the dark mode.
// In this case, we are specifying that the theme should be in the 'dark' mode.
export const darkTheme = createTheme({
  palette: {
    // Setting the mode of the theme to 'dark'.
    // This means that the components will be styled for the dark mode.
    mode: "dark",
  },
});
