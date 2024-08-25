// We are using the createContext function from the "react" library.
// This function is used to create a context object.
// A context object is used to share data across different components in a React application.
import { createContext } from "react";

// We are creating a context object by calling the createContext function.
// The createContext function takes an object as an argument, which specifies the default value of the context.
// In this case, the default value of the context is an object with a single property: handleTheme.
// The handleTheme property is a function that is currently set to an empty function.
// It will be used to handle theme changes in the application.
export default createContext({
  handleTheme: () => {}, // This is the handleTheme function. It is currently set to an empty function.
});
