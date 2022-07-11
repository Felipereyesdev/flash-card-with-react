import {listDecks,deleteDeck} from "./utils/api";
import { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";

const Home = () =>{
const history = useHistory();
const [decks,setDecks] = useState([]);
useEffect(() =>{
    
    async function loudDecks(){
        const response = listDecks();
        const decksFomApi = await response;
        setDecks(decksFomApi);

    }
    loudDecks();


},[])

const handleDelete = (deckId) =>{
    if(window.confirm("delete this deck? You won't be able to recover it" )){
        deleteDeck(deckId);
        history.go(0);
    }
}

return (
    <div className="decks">
        <div><button className="btn-secondary mb-3" onClick ={() => history.push("/decks/new")}>Create Deck</button></div>
        {decks.map((deck) => (
            <div className="card px-5 py-3 mb-3" key={deck.id}>
                <h2>{deck.name}</h2>
                <p className="card-length">{deck.cards.length} cards</p>
                <p>{deck.description}</p>
                <div className="row">
                <button className="btn btn-secondary pl-1 mr-1" onClick={() => history.push(`/decks/${deck.id}`)}>view</button>
                <button className="btn btn-primary mr-1" onClick= {() => history.push(`/decks/${deck.id}/study`)}>study</button>
                <button className= "btn btn-danger px-2 ml-auto"onClick={() =>handleDelete(deck.id)} >delete</button>
                </div>
            </div>
        ))}
        

        </div>
    
);
}

export default Home;