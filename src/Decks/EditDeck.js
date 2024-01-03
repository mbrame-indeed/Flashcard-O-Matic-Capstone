import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

// Function to edit the name and description of an existing deck
function EditDeck() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({ name: "", description: "" });
    const history = useHistory();

    // load the deck from the db.json file using the API listDecks when the deckId changes
    useEffect(() => {
        const loadDeck = async () => {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
        };
        
        loadDeck();
    }, [deckId]);

    // handleChange function to update the deck state when the input fields change
    const handleChange = (event) => {
        setDeck({
        ...deck,
        [event.target.name]: event.target.value,
        });
    };

    // handleSubmit function to update the deck with updateDeck API
    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateDeck(deck);
        history.push(`/decks/${deck.id}`);
    };

    // Simple form to take the edited deck info as form data call the handleChange and
    // handleSubmit functions to keep the state and submit
    // Both Cancel and Submit redirect to the deck's view page
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
                        Edit Deck
                    </li>
                </ol>
            </nav>
            <h2>Edit Deck</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        value={deck.name}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        onChange={handleChange}
                        value={deck.description}
                        required
                    ></textarea>
                </div>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
                    Cancel
                </Link>
                <button type="submit" className="btn btn-primary mr-2">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default EditDeck;
