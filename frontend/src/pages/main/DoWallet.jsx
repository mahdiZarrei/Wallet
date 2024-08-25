/*
This is a functional component written in JavaScript using React. 
It is used to render a link for creating a new wallet if the user does not have one.
*/

// Importing the Grid and NavLink components from the Material-UI library
import { Grid } from "@mui/material";
import { NavLink } from "react-router-dom";

// Defining the DoWallet component as a function
const DoWallet = (props) => {
  // Returning JSX code that will be rendered by React
  return (
    // Rendering a Grid container with a single item
    <Grid container>
      <Grid item>
        {/* Rendering a NavLink component as a link */}
        <NavLink to="/CreateWallet" style={{ color: "#3c80d9" }}>
          {/* Rendering the text "Don't have an wallet?" as the link text */}
          {"Don't have an wallet?"}
        </NavLink>
      </Grid>
    </Grid>
  );
};

// Exporting the DoWallet component so it can be used in other parts of the application
export default DoWallet;
