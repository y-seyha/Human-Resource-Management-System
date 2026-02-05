import React, { useState, useRef, useEffect } from "react";
import { FaEllipsisV, FaEdit, FaTrash } from "react-icons/fa";

const ActionDropdown = ({ onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      {/* Ellipsis Button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-100 transition duration-200"
      >
        <FaEllipsisV className="text-gray-600" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 w-full px-4 py-2 text-left text-blue-600 hover:bg-blue-50 transition duration-150"
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition duration-150"
          >
            <FaTrash /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;
