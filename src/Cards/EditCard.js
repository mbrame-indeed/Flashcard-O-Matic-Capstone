import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import CardForm from "./CardForm";

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

    // handleSubmit function to update the card in the deck with updateCard API
    const handleSubmit = async (event) => {
        await updateCard(event);
        history.push(`/decks/${deck.id}`);
    };

    // Breadcrumbs for navigation are provided here
    // The form to handle the input is in CardForm.js
    // The card.front && card.back check is to prevent the form from showing before the card is loaded
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
            {card.front && card.back ? (
                <CardForm onSubmit={handleSubmit} deckId={deckId} initialValues={card} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default EditCard;
