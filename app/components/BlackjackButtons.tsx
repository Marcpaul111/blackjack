// components/BlackJackButtons.tsx

import React from "react";

interface BlackJackButtonsProps {
  onClickHit: () => void;
  onClickStand: () => void;
}

const BlackJackButtons: React.FC<BlackJackButtonsProps> = ({ onClickHit, onClickStand }) => {
  return (
    <div className="space-x-4">
      <button className="bg-slate-100 font-semibold px-4 py-2 rounded-md" onClick={onClickHit}>Hit</button>
      <button className="bg-slate-100 font-semibold px-4 py-2 rounded-md" onClick={onClickStand}>Stand</button>
    </div>
  );
};

export default BlackJackButtons;
