import { useState } from 'react';
import './MinecraftButton.css';

const MinecraftButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="minecraft-button-wrapper">
      <input 
        id="minecraft-toggle" 
        type="checkbox" 
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <label className="boton-minecraft" htmlFor="minecraft-toggle">
        <svg
          viewBox="0 0 32 32"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M30 2H2v28h28z" fill="#dc2626"></path>
          <path
            d="M24.4 13.2h-5.6v.47h5.6zm-5.6 8.4h-5.6v.47h5.6zm2.8 2.8h-2.8v.47h2.8zm-8.4 0h-2.8v.47h2.8zm0-11.2H7.6v.47h5.6z"
            fill="#f87171"
          ></path>
          <path
            d="M24.4 13.2V7.6h-5.6v5.6h-5.6V16h-2.8v8.4h2.8v-2.8h5.6v2.8h2.8V16h-2.8v-2.8zM13.2 7.6H7.6v5.6h5.6z"
          ></path>
          <path
            d="M24.4 7.6h-5.6v.47h5.6zm-5.6 5.6h-5.6v.47h5.6zm-5.6-5.6H7.6v.47h5.6zm0 8.4h-2.8v.47h2.8zm8.4 0h-2.8v.47h2.8z"
            fill="#991b1b"
          ></path>
        </svg>

        <div className="texto-boton">
          <span>MINECRAFT</span>
          <span>I LOVE MC</span>
          <span>CREEPERS</span>
        </div>
      </label>
    </div>
  );
};

export default MinecraftButton;
