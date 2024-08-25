/**
 * This file is responsible for exporting the animation variants for various components in the application.
 * The variants are exported as named exports from this file.
 *
 * Each variant is exported from a separate file located in the "animated" directory.
 * The names of the variants match the names of the components they are associated with.
 *
 * For example, the "ButtonVariants" variant is exported from the "createWallet" file in the "animated" directory.
 * This means that the "ButtonVariants" variant is associated with the "Button" component in the "createWallet" file.
 *
 * The "ButtonVariants" variant is exported using the "export { default as ButtonVariants }" syntax.
 * This syntax assigns the default export of the "createWallet" file to the "ButtonVariants" identifier.
 *
 * In summary, this file exports animation variants for various components in the application,
 * and the variants are associated with the components based on their names.
 */

// Export the "ButtonVariants" variant from the "createWallet" file
export { default as ButtonVariants } from "./createWallet";

// Export the "LoginVariants" variant from the "login" file
export { default as LoginVariants } from "./login";

// Export the "WalletVariants" variant from the "wallet" file
export { default as WalletVariants } from "./wallet";

// Export the "TokenVariants" variant from the "token" file
export { default as TokenVariants } from "./token";
