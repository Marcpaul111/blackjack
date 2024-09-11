// utilities/BlackJackUtilities.ts

export type Card = { value: number; suit: string };
export type Hand = Card[];

// Function to generate a deck of cards
export function getDeck(numDecks: number): Card[] {
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // 11 represents Ace
  let deck: Card[] = [];

  for (let i = 0; i < numDecks; i++) {
    for (const suit of suits) {
      for (const value of values) {
        deck.push({ value, suit });
      }
    }
  }

  return deck;
}

export function getTotal(hand: Hand): number {
  let total = 0;
  let aceCount = 0;

  for (const card of hand) {
    if (card.value === 11) {
      aceCount++;
      total += 11;
    } else {
      total += Math.min(card.value, 10);
    }
  }

  // Adjust Ace value from 11 to 1 if total > 21
  while (total > 21 && aceCount > 0) {
    total -= 10;
    aceCount--;
  }

  return total;
}

export function isBlackJack(hand: Hand): boolean {
  return getTotal(hand) === 21 && hand.length === 2;
}

export function checkDealersScore(hand: Hand): boolean {
  return getTotal(hand) < 17;
}
