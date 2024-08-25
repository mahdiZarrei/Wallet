// This JavaScript object defines the motion variants for the Login component.
// A motion variant is a set of CSS properties and their corresponding values that can be applied to a component
// to create animations or transitions.

// The initial variant defines the initial state of the login form. In this case, the form is positioned slightly off-screen
// upwards (y: -10) and has zero opacity (opacity: 0).
const LoginVariants = {
  initial: {
    // Position the login form slightly off-screen upwards
    y: -10,
    // Set the opacity to zero
    opacity: 0,
  },
  // The animate variant defines the final state of the login form. In this case, the form is positioned on-screen
  // at the center (y: 0) and has full opacity (opacity: 1).
  // The transition property specifies how the form should animate from the initial state to the final state.
  // In this case, the transition duration is set to 0.5 seconds (duration: 0.5), and each child element of the form
  // should stagger their transition by 0.1 seconds (staggerChildern: 0.1).
  animate: {
    y: 0, // Position the login form on-screen at the center
    opacity: 1, // Set the opacity to full
    transition: {
      duration: 0.5, // Set the transition duration to 0.5 seconds
      staggerChildren: 0.1, // Stagger the transition of each child element by 0.1 seconds
    },
  },
  // The logo variant defines an animation for the logo image. In this case, the logo rotates 360 degrees
  // over a duration of 2 seconds, and this animation repeats indefinitely (repeat: Infinity).
  logo: {
    rotate: 360, // Set the rotation of the logo to 360 degrees
    transition: {
      duration: 2, // Set the duration of the rotation animation to 2 seconds
      repeat: Infinity, // Set the animation to repeat indefinitely
    },
  },
};

// Export the LoginVariants object so that it can be used in other parts of the codebase.
export default LoginVariants;
