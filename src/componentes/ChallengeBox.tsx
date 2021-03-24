import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export const ChallengeBox = () => {

    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeSucceeded(){
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }   

    return (
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}> 
                    <header>Ganhe {activeChallenge.amount}xp</header>

                    <main>
                        <img src="icons/forca.png" alt="Rumo Next Level" style={{ width: '7rem'}}/>
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>

                        <button 
                        type='button'
                        className={styles.challengeFailedButton}
                        onClick={ handleChallengeFailed }
                        >
                            Falhei
                        </button>

                        <button 
                        type='button'
                        className={styles.challengeSucceedeButton}
                        onClick={handleChallengeSucceeded}>
                            Completei
                        </button>

                    </footer>
                </div>
            ) : (
            <div className={styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/signal-level.svg" alt="Level Up"/>
                    Avance de level completando desafios.
                </p>
            </div>
            )}
        </div>
    )
}
