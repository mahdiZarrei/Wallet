// Importing the useState hook from the React library
import { useState } from "react";

// Importing the TabPanel, TabContext, and TabList components from the @mui/lab library
import { TabPanel, TabContext, TabList } from "@mui/lab";

// Importing the Tab, Grid, Box, and Paper components from the @mui/material library
import { Tab, Grid, Box, Paper } from "@mui/material";

// Importing the login image from the local image file
import login from "/login.png";

// Importing the Mode component from the ../components/Mode directory
import Mode from "../../components/Mode";

// Importing the Private and Seed components from the ./ directory
import Private from "./PrivateKey";
import Seed from "./Seed";

// Defining the Login component
const Login = () => {
  // Using the useState hook to create a state variable called value and initialize it with the value "1"
  const [value, setValue] = useState("1");

  // Defining a function called handleChange that takes in an event and a newValue as parameters
  const handleChange = (event, newValue) => {
    // Updating the value state variable with the newValue parameter
    setValue(newValue);
  };

  // Returning the JSX code for the Login component
  return (
    // Using the Grid component from the @mui/material library to create a container for the login page
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* Using the Grid item component to create a left side container with an image background */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${login})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Using the Grid item component to create a right side container */}
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {/* Rendering the Mode component */}
        <Mode />

        {/* Using the Box component from the @mui/material library to create a container with flex and column direction */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 5,
            alignItems: "center",
          }}
        >
          {/* Using the TabContext component from the @mui/lab library to create a context for the tabs */}
          <TabContext value={value}>
            {/* Using the Box component from the @mui/material library to create a container for the tab list */}
            <Box>
              {/* Using the TabList component from the @mui/lab library to create the tab list */}
              <TabList onChange={handleChange} centered>
                {/* Using the Tab component from the @mui/material library to create the private key tab */}
                <Tab label="Private Key" value="1" />
                {/* Using the Tab component from the @mui/material library to create the seed tab */}
                <Tab label="Seed" value="2" />
              </TabList>
            </Box>

            {/* Using the TabPanel component from the @mui/lab library to create the private key tab panel */}
            <TabPanel sx={{ width: 310 }} value="1">
              {/* Rendering the Private component */}
              <Private />
            </TabPanel>
            {/* Using the TabPanel component from the @mui/lab library to create the seed tab panel */}
            <TabPanel sx={{ width: { xs: 300, sm: 400 } }} value="2">
              {/* Rendering the Seed component */}
              <Seed />
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </Grid>
  );
};

// Exporting the Login component as the default export

export default Login;
