import { useState } from "react";

export default function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleToggle}>
        Open Modal
      </button>

      {isOpen && (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center">
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-gray-800 opacity-50"></div>

          <div className="bg-white rounded-lg p-6 z-10">
            <h2 className="text-lg font-bold mb-4">Modal Title</h2>
            <p className="mb-4">Modal content goes here.</p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleToggle}>
              Close Modal
            </button>
          </div>
        </div>
      )}
    </>
  );
}
