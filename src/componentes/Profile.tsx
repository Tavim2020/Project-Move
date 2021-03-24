import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

export default function Profile(){
    const { level } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/Tavim2020.png" alt="Otávio"/>


            <div>
                <strong>Otávio dos Santos Lopes</strong>

                <p >
                    <img src="icons/signal-level.svg" alt="Sinal de Level"/>
                    level { level }
                </p>
            </div>

        </div>
    );
}