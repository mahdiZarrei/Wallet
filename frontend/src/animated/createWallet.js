// This JavaScript object defines the motion variants for the CreateWalletButton component.
// A motion variant is a set of CSS properties and their corresponding values that can be applied to a component
// to create animations or transitions.

// The initial variant defines the initial state of the button. In this case, the button is positioned off-screen
// to the left (-500px) and has zero opacity.
const ButtonVariants = {
  initial: {
    // Position the button off-screen to the left
    x: -500,
    // Set the opacity to zero
    opacity: 0,
  },
  // The animate variant defines the final state of the button. In this case, the button is positioned on-screen
  // at the center (x: 0) and has full opacity (opacity: 1).
  // The transition property specifies how the button should animate from the initial state to the final state.
  // In this case, the transition duration is set to 1 second (duration: 1), and each child element of the button
  // should stagger their transition by 0.1 seconds (staggerChildern: 0.1).
  animate: {
    x: 0, // Position the button on-screen at the center
    opacity: 1, // Set the opacity to full
    transition: {
      duration: 1, // Set the transition duration to 1 second
      staggerChildren: 0.1, // Stagger the transition of each child element by 0.1 seconds
    },
  },
};

// Export the ButtonVariants object so that it can be used in other parts of the codebase.
export default ButtonVariants;
