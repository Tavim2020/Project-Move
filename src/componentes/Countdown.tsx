import { useState, useEffect, useContext} from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Countdown.module.css';
import { CountdownContext } from '../contexts/CountdownContext';



export default function Countdown(){

    const { minutes, 
            secounds, 
            hasFinished, 
            isActive, 
            resetCountdown, 
            startCountdown 
        } = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secoundLeft, secoundRight] = String(secounds).padStart(2, '0').split('');

    
  

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secoundLeft}</span>
                    <span>{secoundRight}</span>
                </div>
            </div>


            { hasFinished ? (
                <button 
                disabled
                type='button' 
                // onClick={resetCountdown}>
                className={styles.countdownButton}
                style={{ borderBottom: 'var(--green) 0.2rem solid' }}>
                    Ciclo Encerrado
                    <img src="icons/confirme.png" alt="Confirm" style={{ width: '1rem', marginLeft: '1rem' }}/>
                </button>
            ) : (
                <>
                        { isActive ? (
                    <button 
                    type='button' 
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                    onClick={resetCountdown}>
                        Abandonar Ciclo
                    </button>
            ) : (
                    <button 
                    type='button' 
                    className={styles.countdownButton}
                    onClick={startCountdown}>
                        Iniciar um Ciclo
                    </button>

                )}

                </>
            )}

            
        </div>
    );
}