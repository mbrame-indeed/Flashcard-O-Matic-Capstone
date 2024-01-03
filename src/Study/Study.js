import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

// Brings up the study functionality of a deck, allowing you to flip each card
// and move to the next card.
// At the end of the deck, you get the option to restart the deck or go to the home page

function Study() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [cardIndex, setCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const history = useHistory();

    // Load the deck and its cards using the readDeck API call
    useEffect(() => {
        const loadDeck = async () => {
            const loadedDeck = await readDeck(deckId);
            setDeck(loadedDeck);
            setCards(loadedDeck.cards);
        };

        loadDeck();
    }, [deckId]);

    // Handle the flipping of the card, just toggles the isFlipped state
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    // Handle the next card, if the current card is the last card,
    // then ask the user if they want to restart the deck or go to the home page
    // If not the last card, increment the card index and reset the isFlipped state
    const handleNext = () => {
        if (cardIndex === cards.length - 1) {
            const confirmRestart = window.confirm(
                "Restart cards? Click 'cancel' to return to the home page."
            );
        
            if (confirmRestart) {
                // Restart the deck (go back to the first card)
                setCardIndex(0);
                setIsFlipped(false);
            } else {
                // Redirect to the deck home
                history.push("/");
            } 
        } else {
                // Increment the card index and reset the isFlipped state
                setCardIndex((prevCardIndex) => prevCardIndex + 1);
                setIsFlipped(false);
        };
    }

    // If the deck has less than 3 cards, display a message and a button to add cards
    if (cards.length < 3) {
        // Display a "Not enough cards" message and a button to add cards
        return (
            <div>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={`/decks/${deck.id}`}>
                                {deck.name}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active">
                            Study
                        </li>
                    </ol>
                </nav>
                <h2>Not enough cards</h2>
                <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
                    Add Cards
                </Link>
            </div>
        );
    }

    // Grab the current card for display
    const currentCard = cards[cardIndex];

    // Render the study page, showing one side of the current card at a time
    // The Next button only appears when a card has been flipped
    return (
        <div>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deck.id}`}>
                            {deck.name}
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">
                        Study
                    </li>
                </ol>
            </nav>
            <h2>{deck.name}: Study</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Card {cardIndex + 1} of {cards.length}</h5>
                    <p className="card-text">{isFlipped ? currentCard.back : currentCard.front}</p>
                    <button className="btn btn-secondary" onClick={handleFlip}>
                        Flip
                    </button>
                    {isFlipped && (
                        <button className="btn btn-primary ml-2" onClick={handleNext}>
                            Next
                        </button>
                    )}
                </div>
          </div>
        </div>
    );
}

export default Study;
