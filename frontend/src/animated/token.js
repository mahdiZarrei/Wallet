// This JavaScript object defines the motion variants for the Token component.
// A motion variant is a set of CSS properties and their corresponding values that can be applied to a component
// to create animations or transitions.

// The TokenVariants object is exported as the default export of this module.
// This means that other parts of the codebase can import this module and access the TokenVariants object.

// The TokenVariants object contains a single variant named "rotate".
// This variant defines an animation that rotates the Token component from 0 degrees to 360 degrees.

// The "rotate" property of the "rotate" variant is an array with two values:
// The first value is 0, which represents the starting rotation angle of the component.
// The second value is 360, which represents the ending rotation angle of the component.

// The "transition" property of the "rotate" variant is an object that defines the transition animation.
// The "repeat" property is set to Infinity, which means the animation will repeat indefinitely.
// The "duration" property is set to 2, which means the animation will take 2 seconds to complete one cycle.
// The "ease" property is set to "linear", which means the animation will progress at a constant speed.

const TokenVariants = {
  // Defines an animation that rotates the Token component from 0 degrees to 360 degrees.
  rotate: {
    // Defines the rotation angle of the component.
    // The first value is 0, which represents the starting rotation angle of the component.
    // The second value is 360, which represents the ending rotation angle of the component.
    rotate: [0, 360],
    // Defines the transition animation properties.
    // The repeat property is set to Infinity, which means the animation will repeat indefinitely.
    // The duration property is set to 2, which means the animation will take 2 seconds to complete one cycle.
    // The ease property is set to "linear", which means the animation will progress at a constant speed.
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "linear",
    },
  },
};
export default TokenVariants;
