import React from 'react';

const Select = ({ id, label, value, onChange, children, icon: Icon, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative mt-1">
      {Icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`block w-full rounded-md border-gray-300 py-2 ${Icon ? 'pl-10' : 'pl-3'} pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm`}
        {...props}
      >
        {children}
      </select>
    </div>
  </div>
);

export default Select;