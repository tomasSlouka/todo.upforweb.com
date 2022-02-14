// plugins/disablelogs.js

export function disablelogs() {
    console.log = () => {};
    // or you can override any other stuff you want
  }
  
  process.env.NODE_ENV === "production" ? disablelogs() : null;
  