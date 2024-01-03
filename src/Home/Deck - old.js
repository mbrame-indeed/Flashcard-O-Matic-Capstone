import React from "react";
import { useRouteMatch, Route, Switch } from "react-router-dom";
import ViewDeck from "../Decks/ViewDeck";

// export const Deck = ({ deck }) => (
function Deck({ deck }) {
    let { url } = useRouteMatch();

    const handleViewClick = (event) => {
        event.preventDefault();
        console.log(`View clicked ${url}`);
        window.location.href = `/decks/${deck.id}`;
    };

    return (
        <article className="align-self-stretch">
            <div className="border p-4 h-100 d-flex flex-column">
                <h2 className="font-weight-lighter flex-fill">
                    {deck.name}
                </h2>
                <h4 className="font-weight-lighter flex-fill">
                    {deck.cards.length} cards
                </h4>
                <p>
                    {deck.description}
                </p>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-secondary" onClick={handleViewClick} >View</button>
                    <button type="button" className="btn btn-secondary">Study</button>
                    <button type="button" className="btn btn-secondary">Delete</button>
                </div>
            </div>
            <Switch>
                <Route path={`${url}/decks/:deckId`}>
                    <ViewDeck deck={deck} />
                </Route>
            </Switch>
        </article>

    )
};

export default Deck;