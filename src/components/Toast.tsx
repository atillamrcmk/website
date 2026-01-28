import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, duration = 2000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-dark-surface px-6 py-3 text-sm font-medium text-light-text backdrop-blur-md transition-all ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  );
}




