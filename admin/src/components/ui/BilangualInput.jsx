import React from 'react';

const BilangualInput = ({
  label,
  nameAr,
  nameEn,
  valueAr,
  valueEn,
  onChange,
  multiline = false,
  rows = 4,
  required = false,
}) => {
  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="block text-sm font-bold text-textMain">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Arabic Input */}
        <div className="space-y-1">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-bold text-textMuted uppercase tracking-wider">Arabic</span>
          </div>
          <InputComponent
            dir="rtl"
            name={nameAr}
            value={valueAr || ''}
            onChange={onChange}
            rows={rows}
            className={`input-field font-cairo !h-auto py-2.5 ${multiline ? 'min-h-[100px]' : ''}`}
            placeholder="أدخل النص هنا..."
          />
        </div>

        {/* English Input */}
        <div className="space-y-1">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-bold text-textMuted uppercase tracking-wider">English</span>
          </div>
          <InputComponent
            dir="ltr"
            name={nameEn}
            value={valueEn || ''}
            onChange={onChange}
            rows={rows}
            className={`input-field !h-auto py-2.5 ${multiline ? 'min-h-[100px]' : ''}`}
            placeholder="Enter text here..."
          />
        </div>
      </div>
    </div>
  );
};

export default BilangualInput;
