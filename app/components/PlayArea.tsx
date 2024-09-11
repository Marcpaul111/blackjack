// components/PlayArea.tsx
import React from 'react';
import Card from './Cards';
import { Hand } from '../utilities/blackjack';

interface PlayAreaProps {
  dealersHand: Hand;
  playersHand: Hand;
  isTurnEnd: boolean;
}

const PlayArea: React.FC<PlayAreaProps> = ({ dealersHand, playersHand, isTurnEnd }) => {
  return (
    <div className="play-area">
      <div className="dealer-hand flex">
        <h2 className='text-white font-semibold' >Dealer's Hand</h2>
        {dealersHand.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
      <div className="player-hand flex">
        <h2 className='text-white font-semibold'>Player's Hand</h2>
        {playersHand.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  );
};

export default PlayArea;
