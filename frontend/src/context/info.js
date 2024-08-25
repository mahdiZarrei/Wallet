/**
 * This file is responsible for creating a context object for the InfoContext.
 *
 * In React, a context object is used to share data across different components.
 * It allows a parent component to pass data to all its child components without
 * having to pass props down manually at every level.
 *
 * The createContext function is used to create a context object. It takes an object as an argument,
 * which specifies the default value of the context. This default value is optional and can be
 * an object, a function, or any other value.
 *
 * The InfoContext is created using the createContext function.
 *
 * The InfoContext is then exported so that it can be used in other parts of the application.
 */

// Importing the createContext function from the "react" library
import { createContext } from "react";

// Creating a context object using the createContext function
const InfoContext = createContext();

// Exporting the InfoContext so that it can be used in other parts of the application
export default InfoContext;
