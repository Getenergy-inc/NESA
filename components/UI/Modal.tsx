import React from 'react';
import { useModal } from '@/lib/store/modal';

const Modal: React.FC = () => {
  const { visible, content, hideModal } = useModal();

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 relative">
        <button
          onClick={hideModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        {content}
      </div>
    </div>
  );
};

export default Modal;