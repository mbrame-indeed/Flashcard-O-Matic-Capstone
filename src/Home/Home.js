import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";

// Loads the deck list on the home page

function Home() {
    const [decks, setDecks] = useState([]);

    // load the decks from the db.json file using the API listDecks once, on page render
    useEffect(() => {
        const loadDecks = async () => {
            const loadedDecks = await listDecks();
            setDecks(loadedDecks);
        };
        
        loadDecks();
    }, []);

    // when the delete button is clicked we open a confirmation window
    // if the user confirms the delete, we delete the deck from the db.json file
    const handleDeleteDeck = async (deckId) => {
        const confirmDelete = window.confirm(
            "Delete this deck? You will not be able to recover it."
        );
        if (confirmDelete) {
            await deleteDeck(deckId);
            setDecks((prevDecks) =>
                prevDecks.filter((deck) => deck.id !== deckId)
            );
        }
    };

    // render the decks to the screen using map on the decks state object
    // the buttons are react-router-dom links and formatted via Bootstrap classNames
    return (
        <div>
            <Link to="/decks/new" className="btn btn-primary mb-3">
                Create Deck
            </Link>
            <div className="card-deck">
                {decks.map((deck) => (
                    <div className="card" key={deck.id}>
                        <div className="card-body">
                            <div>
                                <h5 className="card-title">{deck.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{deck.cards.length} cards</h6>
                            </div>
                            <p className="card-text">{deck.description}</p>
                            <div>
                            <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
                                View
                            </Link>
                            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">
                                Study
                            </Link>
                            <button className="btn btn-danger" onClick={() => handleDeleteDeck(deck.id)}>
                                Delete
                            </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
