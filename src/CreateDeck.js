import { useState } from "react";
import { useHistory, Link} from "react-router-dom";
import { createDeck } from "./utils/api";
const CreateDeck = () => {
  const history = useHistory();
  const formData = {
    name: "",
    description: "",
  };
  const [newDeck, setNewDeck] = useState(formData);
  const { name, description } = newDeck;

  const handleChange = (event) => {
    const { target } = event;
    const value = target.value;
    setNewDeck({ ...newDeck, [target.name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const responseDeck = await createDeck(newDeck);
    history.push(`/decks/${responseDeck.id}`);
  };

  return (
    <div>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">{"create"}</li>
        </ol>
      </nav>
      
      <h2>Create Deck</h2>
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <div>
        <input
          name="name"
          placeholder="Deck name"
          type="text"
          id="name"
          value={name}
          onChange={handleChange}
          required
        />
      </div>

      <label>Description:</label>
      <div>
        <textarea
          name="description"
          placeholder="Brief description of the deck"
          type="textarea"
          id="description"
          value={description}
          onChange={handleChange}
          required
        />
      </div>
      <button className="btn btn-secondary mr-1" onClick={() => history.push("/")} type="button">
        cancel
      </button>
      <button className="btn btn-primary mr-1" type="submit">submit</button>
    </form>
    </div>
  );
};

export default CreateDeck;
