import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";

// Function to create a new card and add it to a deck
function CreateCard() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});

    // load the deck from the db.json file using the readDeck API when the deckId changes
    useEffect(() => {
        const loadDeck = async () => {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
        };
        loadDeck();
        }, [deckId]);


    // handleSubmit function to create a new card and add it to the deck with createCard API
    const handleSubmit = async (event) => {
        await createCard(deckId, event);
    };

    // Breadcrumbs for navigation are provided here
    // The form to handle the input is in CardForm.js
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
        <CardForm onSubmit={handleSubmit} deckId={deckId} initialValues={{ front: "", back: "" }} />
        </div>
    );
}

export default CreateCard;
