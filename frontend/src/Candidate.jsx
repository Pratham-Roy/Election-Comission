import './Candidate.css';
import ShaileshKumar from './assets/ShaileshKumar.jpg'; 
import characters from './assets/candi.json'; 
import SanyamGupta from './assets/SanyamGupta.jpg';
import PriyanshSingh from './assets/PriyanshSingh.jpg';
import OjaswaPratapSingh from './assets/Ojaswa.jpg';
import PrakharSingh from './assets/PrakharSingh.jpg';
import axios from 'axios'

const images = {
    "ShaileshKumar.jpg": ShaileshKumar,
    "SanyamGupta.jpg": SanyamGupta,
    "PriyanshSingh.jpg": PriyanshSingh,
    "Ojaswa.jpg": OjaswaPratapSingh,
    "PrakharSingh.jpg": PrakharSingh
};

function Candidate() {
    async function voted( id) {

        try {
            console.log(`Voting for ${id}`); 
            const response = await axios.post("http://localhost:4000/voteUser", {id});
            console.log(response.data); 
            alert(`You have voted for ${id}!`);
        } catch (e) {
            console.log("An error occurred during the voting process:", e);
            alert('There was an error while voting. Please try again.');
        }
    }

    return (
        <div className='candiboard'>
            {characters.map((character) => (
                <div className="umeedwar" key={character.id}>
                    <h2 className='candiname'>{character.name}</h2>
                    
                    <img src={images[character.img]} alt={character.name} className="photo" />
                    <p>{character.slogan}</p>
                    <p>{character.powers}</p>
                    <button className='voting' onClick={()=>voted(character.id)}>Vote Me</button>
                </div>
            ))}
        </div>
    );
}

export default Candidate;
