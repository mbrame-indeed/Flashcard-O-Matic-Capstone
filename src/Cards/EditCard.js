import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";

// Function to edit an existing card in the deck
function EditCard() {
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({ front: "", back: "" });
    const history = useHistory();

    // Loads the deck and card from the database using the readDeck and readCard API calls
    useEffect(() => {
        const loadDeckAndCard = async () => {
        const loadedDeck = await readDeck(deckId);
        const loadedCard = await readCard(cardId);
        setDeck(loadedDeck);
        setCard(loadedCard);
        };

        loadDeckAndCard();
    }, [deckId, cardId]);

    // handleChange function to update the card state when the input fields change
    const handleChange = (event) => {
        setCard({
        ...card,
        [event.target.name]: event.target.value,
        });
    };

    // handleSubmit function to update the card in the deck with updateCard API
    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateCard(card);
        history.push(`/decks/${deck.id}`);
    };

    // Simple form to take the edited card info as form data call the handleChange and
    // handleSubmit functions to keep the state and submit
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Card {cardId}
                    </li>
                </ol>
            </nav>
            <h2>Edit Card</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label htmlFor="front" className="form-label">
                    Front
                </label>
                <textarea
                    className="form-control"
                    id="front"
                    name="front"
                    rows="3"
                    onChange={handleChange}
                    value={card.front}
                    required
                ></textarea>
                </div>
                <div className="mb-3">
                <label htmlFor="back" className="form-label">
                    Back
                </label>
                <textarea
                    className="form-control"
                    id="back"
                    name="back"
                    rows="3"
                    onChange={handleChange}
                    value={card.back}
                    required
                ></textarea>
                </div>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
                    Cancel
                </Link>
                <button type="submit" className="btn btn-primary mr-2">
                    Save
                </button>
            </form>
        </div>
    );
}

export default EditCard;
