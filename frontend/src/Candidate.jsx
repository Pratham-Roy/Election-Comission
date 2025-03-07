import './Candidate.css';
import shaileshKumar from './assets/ShaileshKumar.jpg';

function Candidate() {
    return (
        <div className='candiboard'>
            <div className="umeedwar">
                <h2 className='candiname'>Shailesh Kumar</h2>
                <img src={shaileshKumar} alt="Shailesh Kumar"  className="photo"/>
                <p>Jab Shailesh bhai honge charche me. Russian peloge bin kharche me.</p>
                <button className='voting'>Vote Me</button>
            </div>
        </div>
    );
}

export default Candidate;
