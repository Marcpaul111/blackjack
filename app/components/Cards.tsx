// components/Card.tsx
import React from "react";

interface CardProps {
  card: {
    value: number;
    suit: string;
  };
}

const suitSymbols: { [key: string]: string } = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠",
};

const Card: React.FC<CardProps> = ({ card }) => {
  const { value, suit } = card;

  // Map card values to face cards if needed
  const faceValue =
    value === 11
      ? "A"
      : value === 10
      ? "10"
      : value === 10
      ? "J"
      : value === 11
      ? "Q"
      : value === 12
      ? "K"
      : value;

      const cardColorClass = suit === 'hearts' || suit === 'diamonds' ? 'text-red-500' : 'text-black';

  return (
    <div
      className={`card ${suit} w-[100px] h-[140px] rounded-[8px] text-center relative rounded-1 bg-[#ffff] m-3 ${cardColorClass}`}
    >
      <div className="card-header absolute top-[5px] left-[5px] w-full text-[1rem] font-semibold text-start">
        {faceValue}
      </div>
      <div className="card-body flex justify-center items-center h-full">
        <div className="suit text-[24px]">{suitSymbols[suit]}</div>
      </div>
      <div className="card-footer absolute bottom-2 right-2 ">{faceValue}</div>
    </div>
  );
};

export default Card;
