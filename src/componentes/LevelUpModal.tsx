import React, { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/LevelUpModal.module.css';

export const LevelUpModal = () => {
    const { level, closeModal } = useContext(ChallengesContext);

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>Você alcançou um novo level.</p>

                <button type='button' onClick={closeModal}>
                    Fechar
                </button>
            </div>
        </div>
    )
}

export default LevelUpModal;