// components/GameProgressButton.tsx
import React from 'react';

interface GameProgressButtonProps {
  onClickNext: () => void;
}

const GameProgressButton: React.FC<GameProgressButtonProps> = ({ onClickNext }) => {
  return (
    <button onClick={onClickNext} className="game-progress-button">
      Next
    </button>
  );
};

export default GameProgressButton;
