import React from 'react';

const ToggleSwitch = ({ id, label, enabled, setEnabled }) => (
  <div className="flex items-center justify-between">
    <label htmlFor={id} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <button
      id={id}
      type="button"
      className={`${
        enabled ? 'bg-green-600' : 'bg-gray-200' // <-- THEME UPDATE
      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
      role="switch"
      aria-checked={enabled}
      onClick={() => setEnabled(!enabled)}
    >
      <span
        aria-hidden="true"
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-0'
        } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  </div>
);

export default ToggleSwitch;