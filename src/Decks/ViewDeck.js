import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";

// Brings up the view of an individual deck and the cards

function ViewDeck() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const history = useHistory();

    // load the deck from the db.json file using the API listDecks when the deckId changes
    useEffect(() => {
        const loadDeck = async () => {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
        };
        loadDeck();
    }, [deckId]);

    // when the delete button for the deck is clicked we open a confirmation window
    // if the user confirms the delete, we delete the deck from the db.json file and redirect to the home page
    const handleDeleteDeck = async () => {
        const confirmDelete = window.confirm(
        "Delete this deck? You will not be able to recover it."
        );
        if (confirmDelete) {
            await deleteDeck(deckId);
            history.push("/");
        }
    };

    // when the delete button for the card is clicked we open a confirmation window
    // if the user confirms the delete, we delete the card from the db.json file
    const handleDeleteCard = async (cardId) => {
        const confirmDelete = window.confirm(
        "Delete this card? You will not be able to recover it."
        );
        if (confirmDelete) {
        await deleteCard(cardId);
        setDeck((prevDeck) => ({
            ...prevDeck,
            cards: prevDeck.cards.filter((card) => card.id !== cardId),
        }));
        }
    };

    // render the deck and cards to the screen using map on the deck state object
    // the breadcrumbs are bootstrap-style breadcrumbs
    // the buttons are react-router-dom links and formatted via Bootstrap classNames
    return (
        <div>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">
                        {deck.name}
                    </li>
                </ol>
            </nav>
            <h2>{deck.name}</h2>
            <p>{deck.description}</p>
            <div>
                <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2 mb-2">
                Edit
                </Link>
                <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2 mb-2">
                Study
                </Link>
                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mr-2 mb-2">
                Add Cards
                </Link>
                <button className="btn btn-danger mb-2" onClick={handleDeleteDeck}>
                Delete
                </button>
            </div>
            <h3>Cards</h3>
            <ul className="list-group">
                {deck.cards && deck.cards.map((card) => (
                    <li className="list-group-item" key={card.id}>
                        <div className="d-flex justify-content-between">
                            <div>
                                <p>{card.front}</p>
                                <p>{card.back}</p>
                            </div>
                            <div>
                                <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary mr-2">
                                    Edit
                                </Link>
                                <button className="btn btn-danger" onClick={() => handleDeleteCard(card.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ViewDeck;
