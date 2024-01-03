import React, { useEffect, useState } from "react";
import { listDecks } from "../utils/api"
import Deck from "./Deck";

function DeckList() {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();

        listDecks(abortController.signal).then(setDecks);
    }, []);

    const renderDeckList = decks.map((deck) => <Deck key={deck.id} deck={deck} /> );

    return (
        <main className="container">
            <button className="btn btn-primary">+ Create Deck</button>
            <section className="column">{renderDeckList}</section>
        </main>
      );
}

export default DeckList;
