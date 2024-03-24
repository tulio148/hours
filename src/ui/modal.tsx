import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black/50 z-10 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="flex justify-center items-center h-full">
        <div
          className="p-8 mx-auto rounded-lg shadow-md bg-white"
          ref={modalRef}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
