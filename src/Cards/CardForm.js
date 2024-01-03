import React, { useState } from "react";
import { Link } from "react-router-dom";

// Shared form to handle input for CreateCard and EditCard components
// onSubmit is returned since it behaves differently for CreateCard and EditCard
function CardForm({ onSubmit, deckId, initialValues }) {
    const [card, setCard] = useState(initialValues);

    // handleChange function to update the card state when the input fields change
    const handleChange = (event) => {
        setCard({
            ...card,
            [event.target.name]: event.target.value,
        });
    };

    // handleSubmit function to pass the card back to the parent component
    // and reset the card state
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(card);
        setCard({ front: "", back: "" });
    };

    // Input form for CreateCard and EditCard components
    // The Done button will return to the deck screen
    // The Save button will trigger a Submit
    // CreateCard will allow additional cards to be added on Submit
    // EditCard will return to the deck screen on Submit
    return (
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
            <Link to={`/decks/${deckId}`} className="btn btn-secondary">
                Done
            </Link>
            <button type="submit" className="btn btn-primary mr-2">
                Save
            </button>
        </form>
    );
}

export default CardForm;
