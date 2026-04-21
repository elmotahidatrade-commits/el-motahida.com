import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`w-full ${sizes[size] || sizes.md} bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200`}
      >
        <div className="px-6 py-4 border-b border-borderC flex items-center justify-between bg-background/30">
          <h3 className="text-lg font-bold text-textMain">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-background transition-colors text-textMuted hover:text-textMain"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh] scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
