// src/components/SpinnerOverlay/SpinnerOverlay.tsx
import './spinner.scss';

const SpinnerOverlay = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default SpinnerOverlay;
