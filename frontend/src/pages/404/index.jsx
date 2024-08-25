// This is a functional component that renders a 404 page

// Importing necessary components from @mui/material
import { Typography, Box, Button } from "@mui/material";

// Importing navigate function from react-router-dom
import { useNavigate } from "react-router-dom";

// Declaring the Page_404 component
const Page_404 = () => {
  // Using the useNavigate hook to get the navigate function
  const navigate = useNavigate();

  // Returning the JSX that represents the 404 page
  return (
    // Box component for the main container
    <Box
      // Setting the width and height of the container
      width="100%"
      height="97vh"
      // Using the sx prop to apply inline styles
      sx={{
        // Aligning the items in the center
        alignItems: "center",
        // Aligning the text in the center
        textAlign: "center",
        // Removing margin and padding
        m: 0,
        p: 0,
      }}
    >
      <Typography
        // Setting the variant of the Typography component
        variant="h2"
        // Setting the component prop to "div"
        component="div"
        // Using the sx prop to apply inline styles
        sx={{
          // Setting the flexGrow property
          flexGrow: 1,
          // Setting the font size
          fontSize: "100px",
          // Setting the left padding
          pl: "5vw",
          // Setting the top padding
          pt: "4vw",
        }}
        // Setting the color of the text to "secondary"
        color="secondary"
      >
        404
        {/* Another Typography component for the subtitle */}
        <Typography
          // Setting the variant of the Typography component
          variant="p"
          // Setting the color of the text to "primary"
          color="primary"
          // Setting the component prop to "div"
          component="div"
          // Using the sx prop to apply inline styles
          sx={{
            // Setting the flexGrow property
            flexGrow: 1,
            // Setting the font size based on the screen size
            fontSize: { md: "5vw", sm: "7vw", xs: "10vw" },
          }}
        >
          {/* The text to be displayed */}
          Page is not defined ...
        </Typography>
      </Typography>
      {/* Button component for the back home button */}
      <Button
        // Setting the variant of the button to "contained"
        variant="contained"
        // Setting the onClick handler for the button
        onClick={() => navigate("/")}
        // Using the sx prop to apply inline styles
        sx={{
          // Setting the top margin
          mt: 5,
        }}
      >
        {/* The text to be displayed on the button */}
        back home
      </Button>
    </Box>
  );
};

// Exporting the Page_404 component
export default Page_404;
