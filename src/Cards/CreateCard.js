import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";

// Function to create a new card and add it to a deck
function CreateCard() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({ front: "", back: "" });

    // load the deck from the db.json file using the readDeck API when the deckId changes
    useEffect(() => {
        const loadDeck = async () => {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
        };
        loadDeck();
        }, [deckId]);

    // handleChange function to update the card state when the input fields change
    const handleChange = (event) => {
        setCard({
        ...card,
        [event.target.name]: event.target.value,
        });
    };

    // handleSubmit function to create a new card and add it to the deck with createCard API
    const handleSubmit = async (event) => {
        event.preventDefault();
        await createCard(deckId, card);
        setCard({ front: "", back: "" });
    };

    // Simple form to take the new card info as form data call the handleChange and 
    // handleSubmit functions to keep the state and submit
    return (
        <div>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deckId}`}>
                            {deck.name}
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">
                        Add Card
                    </li>
                </ol>
            </nav>
        <h2>{`${deck.name}: Add Card`}</h2>
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
                placeholder="Front side of card"
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
                placeholder="Back side of card"
            ></textarea>
            </div>
            <button type="submit" className="btn btn-primary mr-2">
            Save
            </button>
            <Link to={`/decks/${deckId}`} className="btn btn-secondary">
            Done
            </Link>
        </form>
        </div>
    );
}

export default CreateCard;
