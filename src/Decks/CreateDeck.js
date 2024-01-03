import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

// Function to create a new deck
function CreateDeck() {
  const [deck, setDeck] = useState({ name: "", description: "" });
  const history = useHistory();

  // handleChange function to update the state as the input changes
  const handleChange = (event) => {
    setDeck({
      ...deck,
      [event.target.name]: event.target.value,
    });
  };

  // handleSubmit function to create a new deck and redirect to the new deck's page
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = await createDeck(deck);
    history.push(`/decks/${newDeck.id}`);
  };

  // Render the create deck form. Both name and description fields are required
  // Cancel returns to the homepage, Submit creates the new deck and redirects to the new deck's page
  return (
    <div>
      <nav>
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">
                Create Deck
            </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
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
            placeholder="Deck Name"
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
            placeholder="Brief description of the deck"
          ></textarea>
        </div>
        <button
          className="btn btn-secondary mr-2"
          onClick={() => history.push("/")}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
