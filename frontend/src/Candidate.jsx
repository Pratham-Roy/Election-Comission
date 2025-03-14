import './Candidate.css';
import shaileshKumar from './assets/ShaileshKumar.jpg'; 
import characters from './assets/candi.json'; 

function Candidate() {
    return (
        <div className='candiboard'>
            {characters.map((character) => (
                <div className="umeedwar" key={character.id}>
                    <h2 className='candiname'>{character.name}</h2>
                    <img src={character.img || shaileshKumar} alt={character.name} className="photo" />
                    <p>{character.slogan}</p>
                    <p>{character.powers}</p>
                    <button className='voting'>Vote Me</button>
                </div>
            ))}
        </div>
    );
}

export default Candidate;
