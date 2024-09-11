"use client"
import React, { useReducer, useEffect } from 'react';
import { Card } from './utilities/blackjack';
import PlayArea from './components/PlayArea';
import BlackJackButtons from './components/BlackjackButtons';
import * as BlackJackUtilities from './utilities/blackjack';

export interface GameState {
  deck: Card[];
  minimumNumber: number;
  dealersHand: Card[];
  playersHand: Card[];
  isTurnEnd: boolean;
  playerTotal: number;
  dealerTotal: number;
  winner: string | null; 
}

type Action = 
  | { type: 'init' }
  | { type: 'hit' }
  | { type: 'stand' }
  | { type: 'check' }
  | { type: 'shuffle' };

const penetration = 0.8;

const initialDeck = BlackJackUtilities.getDeck(3);

function getMinimumNumber(initialDeck: Card[], penetration: number): number {
  return initialDeck.length - Math.floor(initialDeck.length * penetration);
}

const initialState: GameState = {
  deck: initialDeck,
  minimumNumber: getMinimumNumber(initialDeck, penetration),
  dealersHand: [],
  playersHand: [],
  isTurnEnd: false,
  playerTotal: 0,
  dealerTotal: 0,
  winner: null,
};

function deal(deck: Card[], hand: Card[], time: number): [Card[], Card[]] {
  const newDeck = [...deck];
  const newHand = [...hand];
  for (let i = 0; i < time; i++) {
    const index = Math.floor(Math.random() * newDeck.length);
    newHand.push(newDeck[index]);
    newDeck.splice(index, 1);
  }
  return [newDeck, newHand];
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'init': {
      let [newDeck, dealersHand] = deal(state.deck, [], 2);
      const [updatedDeck, playersHand] = deal(newDeck, [], 2);
      const playerTotal = BlackJackUtilities.getTotal(playersHand);
      const dealerTotal = BlackJackUtilities.getTotal(dealersHand);
      return { 
        ...state, 
        deck: updatedDeck, 
        dealersHand, 
        playersHand, 
        playerTotal, 
        dealerTotal, 
        isTurnEnd: false,
        winner: null
      };
    }
    case 'hit': {
      const [hitDeck, hitHand] = deal(state.deck, state.playersHand, 1);
      const playerTotal = BlackJackUtilities.getTotal(hitHand);
      return { 
        ...state, 
        deck: hitDeck, 
        playersHand: hitHand, 
        playerTotal 
      };
    }
    case 'stand': {
      let [standDeck, standHand] = deal(state.deck, state.dealersHand, 1);
      while (BlackJackUtilities.checkDealersScore(standHand)) {
        [standDeck, standHand] = deal(standDeck, standHand, 1);
      }
      const dealerTotal = BlackJackUtilities.getTotal(standHand);
      const playerTotal = BlackJackUtilities.getTotal(state.playersHand);
      let winner: string | null = null;
      if (dealerTotal > 21) {
        winner = 'player';
      } else if (playerTotal > 21) {
        winner = 'dealer';
      } else if (playerTotal > dealerTotal) {
        winner = 'player';
      } else if (dealerTotal > playerTotal) {
        winner = 'dealer';
      } else if (dealerTotal === playerTotal) {
        winner = 'draw';
      }
      return { 
        ...state, 
        deck: standDeck, 
        dealersHand: standHand, 
        dealerTotal, 
        isTurnEnd: true, 
        winner 
      };
    }
    case 'check': {
      return state;
    }
    case 'shuffle': {
      const newDeck = BlackJackUtilities.getDeck(3);
      return { ...state, deck: newDeck };
    }
    default:
      return state;
  }
}

const HomePage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'init' });
  }, []);

  useEffect(() => {
    if (state.deck.length <= state.minimumNumber) {
      dispatch({ type: 'shuffle' });
    }
  }, [state.deck, state.minimumNumber]);

  function handleHit() {
    dispatch({ type: 'hit' });
    dispatch({ type: 'check' });
  }

  function handleStand() {
    dispatch({ type: 'stand' });
  }

  return (
    <div className="p-4 flex flex-col justify-center items-center h-[100vh]">
      <PlayArea
        dealersHand={state.dealersHand}
        playersHand={state.playersHand}
        dealerTotal={state.dealerTotal}
        playerTotal={state.playerTotal}
        isTurnEnd={state.isTurnEnd}
      />
      {!state.isTurnEnd && (
        <BlackJackButtons onClickHit={handleHit} onClickStand={handleStand} />
      )}
      {state.isTurnEnd && (
        <div className="mt-4 text-xl font-bold text-white">
          {state.winner === 'draw' ? 'It\'s a Draw!' : `The ${state.winner} Wins!`}
        </div>
      )}
    </div>
  );
};

export default HomePage;
