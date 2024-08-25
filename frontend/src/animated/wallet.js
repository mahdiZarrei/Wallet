// This JavaScript object defines the motion variants for the Wallet component.
// A motion variant is a set of CSS properties and their corresponding values that can be applied to a component
// to create animations or transitions.

// The initial variant defines the initial state of the wallet component. In this case, the wallet is positioned off-screen
// to the left (-500px) and has zero opacity (opacity: 0). The y-coordinate is set to 100px to move the wallet slightly upwards.
const WalletVariants = {
  initial: {
    // Position the wallet off-screen to the left
    x: -500,
    // Set the y-coordinate to move the wallet slightly upwards
    y: 100,
    // Set the opacity to zero
    opacity: 0,
  },
  // The animate variant defines the final state of the wallet component. In this case, the wallet is positioned on-screen
  // at the center (x: 0) and has full opacity (opacity: 1).
  // The transition property specifies how the wallet should animate from the initial state to the final state.
  // In this case, the transition duration is set to 1 second (duration: 1), and each child element of the wallet
  // should stagger their transition by 0.1 seconds (staggerChildern: 0.1).
  animate: {
    // Position the wallet on-screen at the center
    x: 0,
    // Set the y-coordinate to the center
    y: 0,
    // Set the opacity to full
    opacity: 1,
    // Specify the transition properties for the wallet animation
    transition: {
      // Set the duration of the transition to 1 second
      duration: 1,
      // Set the stagger for each child element of the wallet to 0.1 seconds
      staggerChildren: 0.1,
    },
  },
};

// Export the WalletVariants object so that it can be used in other parts of the codebase.
export default WalletVariants;
