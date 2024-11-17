import React from "react";

const info = [
  "Turn off your phone's notification.",
  "Place a glass of water.",
  "Charge your laptop.",
  "Wear a headphone.",
  "Play the focus music.",
];

const Info = () => {
  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <span className="font-bold">Points To Be Noted.</span>
      <ul className="list-disc px-4 py-2">
        {info.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Info;
