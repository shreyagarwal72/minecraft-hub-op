import { useLocation } from 'react-router-dom';
import './LoadingSpinner.css';

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/shaders': 'Shaders',
  '/worlds': 'Worlds',
  '/worlds/bulky-star': 'Bulky Star',
  '/modpacks': 'Modpacks',
  '/downloads': 'Downloads',
  '/faq': 'FAQ',
  '/patch': 'Convert',
};

interface LoadingSpinnerProps {
  pageName?: string;
}

const LoadingSpinner = ({ pageName }: LoadingSpinnerProps) => {
  const location = useLocation();
  
  // Get page name from prop, route, or default
  const currentPage = pageName || routeLabels[location.pathname] || 'Page';
  
  // Get all unique words for animation, putting current page first
  const allWords = Object.values(routeLabels);
  const words = [currentPage, ...allWords.filter(w => w !== currentPage)].slice(0, 5);

  return (
    <div className="loading-card">
      <div className="loading-loader">
        <p>loading</p>
        <div className="loading-words">
          {words.map((word, index) => (
            <span key={index} className="loading-word">{word}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
