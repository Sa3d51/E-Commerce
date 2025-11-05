import React, { _useEffect, useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    console.log("component did mount");
    return () => {
      console.log("comp unmount ");
      setInterval(() => {
        console.log("Sa3d");
      }, 1000);
    };
  }, []);
  return (
    <>
      <h1>Contact</h1>
    </>
  );
}
