// This line imports the `createContext` function from the "react" library.
// The `createContext` function is used to create a context object.
// A context object is used to share data across different components in a React application.
import { createContext } from "react";

// We are creating a context object by calling the `createContext` function.
// The `createContext` function takes an optional initial value as an argument.
// In this case, the initial value is undefined.
// The context object is wrapped in curly braces to make it a block statement.
const WalletContext = createContext();

// We are exporting the `WalletContext` so that it can be used in other parts of the application.
// The `export default` statement specifies that the `WalletContext` is the default export of this module.
// This means that when this module is imported in another module, the default export of this module will be used.
// For example, `import WalletContext from "./WalletContext";` will import the `WalletContext` created above.
export default WalletContext;
