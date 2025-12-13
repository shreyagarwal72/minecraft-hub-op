import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-card">
      <div className="loading-loader">
        <p>loading</p>
        <div className="loading-words">
          <span className="loading-word">Shaders</span>
          <span className="loading-word">Worlds</span>
          <span className="loading-word">Modpacks</span>
          <span className="loading-word">FAQ AI</span>
          <span className="loading-word">Shaders</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
