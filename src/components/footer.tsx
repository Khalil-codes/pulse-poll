import React from "react";

const Footer = () => {
  return (
    <footer className="my-8 text-center text-sm text-gray-500">
      <p>
        Created by{" "}
        <a className="underline" href="https://github.com/khalil-codes">
          Khalil
        </a>{" "}
        | © {new Date().getFullYear()} PulseVote
      </p>
    </footer>
  );
};

export default Footer;
