import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar(){

    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

    const percentNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;
 
    return (
        <header className={styles.ExperienceBar}>
        
            <span>0 xp</span>

            <div>

                <div style={{ width: `${percentNextLevel}%` }} />

                <span className={styles.currentExperience} style={{ left: `${percentNextLevel}%`}}>
                    {currentExperience}xp
                </span>

            </div>

            <span>{experienceToNextLevel} xp</span>
 
        </header>
    )
}

export default  ExperienceBar;