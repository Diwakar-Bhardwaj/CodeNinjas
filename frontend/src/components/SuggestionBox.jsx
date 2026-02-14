import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaClock } from 'react-icons/fa';

const icons = {
  BUY: <FaCheckCircle className="text-green-500" />,
  WAIT: <FaClock className="text-yellow-500" />,
  SKIP: <FaExclamationTriangle className="text-red-500" />,
};

const colors = {
  BUY: 'bg-green-100 border-green-400 text-green-800',
  WAIT: 'bg-yellow-100 border-yellow-400 text-yellow-800',
  SKIP: 'bg-red-100 border-red-400 text-red-800',
};

const SuggestionBox = ({ type, title, text }) => {
  return (
    <div className={`border-l-4 p-4 rounded-md ${colors[type]}`}>
      <div className="flex items-center">
        <div className="text-2xl mr-3">{icons[type]}</div>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default SuggestionBox;