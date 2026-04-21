import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({ isOpen, onConfirm, onCancel, message, title = 'Confirm Action', loading = false }) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} size="sm">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-red-50 text-danger rounded-full flex items-center justify-center mb-4">
          <AlertTriangle size={32} />
        </div>
        <p className="text-textMain font-medium leading-relaxed">
          {message || 'Are you sure you want to perform this action? This cannot be undone.'}
        </p>
        
        <div className="flex gap-3 mt-8 w-full">
          <Button
            variant="secondary"
            onClick={onCancel}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            loading={loading}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
