// Importing the Typography and Link components from the @mui/material package
import { Typography, Link } from "@mui/material";

// Defining a functional component called Copyright
// This component is used to display copyright information
const Copyright = (props) => {
  // Returning JSX code that represents the copyright information
  return (
    // Using the Typography component from @mui/material to display the copyright information
    // The Typography component is used for text display
    <Typography
      // Setting the variant of the Typography component to "body2" which is a smaller text size
      variant="body2"
      // Setting the color of the Typography component to "text.secondary" which is a secondary color
      color="text.secondary"
      // Setting the alignment of the Typography component to "center"
      align="center"
      // Spreading the props object into the Typography component, which allows additional props to be passed to the component
      {...props}
    >
      {/* Displaying the word "Copyright" followed by a space */}
      {"Copyright © "}
      {/* Using the Link component from @mui/material to create a clickable link */}
      <Link
        // Setting the color of the Link component to "inherit" which makes the link color the same as the parent component
        color="inherit"
      >
        {/* Displaying the word "rakmans" */}
        MeT
      </Link>
      {/* Displaying the current year */}
      {new Date().getFullYear()}
      {/* Displaying a period */}
      {"."}
    </Typography>
  );
};

// Exporting the Copyright component as the default export of the module
export default Copyright;
