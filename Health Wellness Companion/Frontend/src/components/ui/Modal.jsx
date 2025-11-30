import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    // Backdrop - Added padding 'p-4' for mobile spacing
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity p-4">
      {/* Modal Panel - Added 'max-h-[90vh]' (90% of viewport height) and 'flex flex-col' */}
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        {/* Header - Added 'flex-shrink-0' to prevent it from scrolling */}
        <div className="flex items-start justify-between flex-shrink-0">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            type="button"
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        {/* Content - Added 'flex-1 overflow-y-auto' to make this part scrollable */}
        <div className="mt-4 flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;