function Modal({
    open,
    onClose,
    title,
    children,
  }: {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }) {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl w-full max-w-lg p-6 text-gray-800 relative">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <div>{children}</div>
        </div>
      </div>
    );
  }
  