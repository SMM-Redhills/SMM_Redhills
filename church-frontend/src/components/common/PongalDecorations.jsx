import React from 'react';
import './PongalDecorations.css';

// Importing the final transparent assets
import potImg from '../../assets/pongal_pot.png';
import sugarCaneImg from '../../assets/pongal_sugarcane_v2.png';
import kolamImg from '../../assets/pongal_kolam_final.png';

const PongalDecorations = () => {
  return (
    <div className="pongal-decor-container">
      {/* Top-Left: Pot */}
      <div className="pongal-element pongal-pot-container">
        <img src={potImg} alt="" className="pongal-image pongal-pot-img" />
      </div>

      {/* Right Side: Sugarcane */}
      <div className="pongal-element pongal-sugarcane-container">
        <img src={sugarCaneImg} alt="" className="pongal-image pongal-sugarcane-img" />
      </div>

      {/* Bottom Left: Kolam */}
      <div className="pongal-element pongal-kolam-container">
        <img src={kolamImg} alt="" className="pongal-image pongal-kolam-img" />
      </div>
    </div>
  );
};

export default PongalDecorations;
