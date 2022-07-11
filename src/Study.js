import { useParams, useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { readDeck } from "./utils/api";
const Study = () => {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState([]);
  const [flip, setFlip] = useState(false);
  const [index, setIndex] = useState(0);
  const history = useHistory();

  useEffect(() => {
    async function loadDecksWithCards() {
      const response = readDeck(deckId);
      const DeckFomApi = await response;
      setDeck(DeckFomApi);
      setCards(DeckFomApi.cards);
    }
    loadDecksWithCards();
  }, [deckId]);

  if (cards.length <= 2) {
    return (
      <div>
        <div>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
              </li>
              <li className="breadcrumb-item active">{"study"}</li>
            </ol>
          </nav>
        </div>

        <div className="card">
          <h2>{deck.name}: Study</h2>
          <h3>Not enough cards</h3>

          <h3>{`You only have ${cards.length}.You need at least 3`}</h3>
          <div>
          <button className="btn btn-primary ml-2" onClick={() => history.push(`/decks/${deckId}/cards/new`)}>
            create card
          </button>
          </div>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (index === cards.length - 1) {
      if (window.confirm("You sure want reset the deck?")) {
        setFlip(false);
        setIndex(0);
      } else {
        history.push("/");
      }
    } else {
      setIndex(() => index + 1);
      setFlip(false);
    }
  };

  return (
    <div>
      <div>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active">{"study"}</li>
          </ol>
        </nav>
      </div>

      <div className="card">
        <h2>{deck.name}: Study</h2>
        <div >
        <h4>
          card {index + 1} of {cards.length}
        </h4>
        <h4>{flip ? cards[index].back : cards[index].front}</h4>
        <button className="btn btn-secondary ml-4" onClick={() => setFlip(!flip)}>flip</button>
        
        {flip && <button className="btn btn-primary ml-2" onClick={handleNext}>next</button>}
        
        </div>
        {/* {cards.map((card,index) => (
        <div key={card.id} className="card-information">
          <h2>{deck.name}</h2>
            <div>Card {index}of {cards.length}</div>
          <div>{card.front}</div>
          <button>Flip</button>
        </div>
      ))} */}
      </div>
    </div>
  );
};
export default Study;
