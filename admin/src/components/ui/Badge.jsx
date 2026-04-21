import React from 'react';

const Badge = ({ children, variant = 'gray', className = '' }) => {
  const variants = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200',
    red: 'bg-red-50 text-red-700 border-red-200',
  };

  const statusMap = {
    new: 'blue',
    'in-review': 'amber',
    replied: 'green',
    closed: 'gray',
    active: 'green',
    inactive: 'red',
  };

  const selectedVariant = variants[statusMap[children?.toLowerCase()] || variant] || variants.gray;

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border
        ${selectedVariant} ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
