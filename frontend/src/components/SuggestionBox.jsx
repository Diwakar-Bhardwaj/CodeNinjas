import React from "react";
import { FaCheckCircle, FaLightbulb, FaInfoCircle, FaGift, FaHandshake } from "react-icons/fa";

const icons = {
  TIP: <FaLightbulb className="text-blue-500" />,
  INFO: <FaInfoCircle className="text-blue-500" />,
  LEND: <FaGift className="text-green-500" />,
  BORROW: <FaHandshake className="text-purple-500" />,
  SUCCESS: <FaCheckCircle className="text-green-500" />,
};

const colors = {
  TIP: "bg-blue-50 border-blue-300 text-blue-800",
  INFO: "bg-blue-50 border-blue-300 text-blue-800",
  LEND: "bg-green-50 border-green-300 text-green-800",
  BORROW: "bg-purple-50 border-purple-300 text-purple-800",
  SUCCESS: "bg-green-50 border-green-300 text-green-800",
};

const SuggestionBox = ({ type = "INFO", title, text }) => {
  return (
    <div className={`border-l-4 p-4 rounded-md ${colors[type]}`}>
      <div className="flex items-center">
        <div className="text-2xl mr-3">{icons[type] || icons.INFO}</div>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default SuggestionBox;
