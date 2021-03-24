import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import LevelUpModal from '../componentes/LevelUpModal';



interface Challenge {
    type:   'body';
    description: string;
    amount: number;

}


interface ChallengeContextData{
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeModal: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number,
    currentExperience: number,
    challengesCompleted: number
}



export const ChallengesContext = createContext({} as ChallengeContextData);


export function ChallengesProvider({ children, ...rest}: ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengeCompleted] = useState(rest.challengesCompleted ?? 0);
    const [isLevelUpModalOpen, setIsLevelModalOpen] = useState(false);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() =>{
        Notification.requestPermission();
    }, []);


    useEffect(()=>{
        Cookies.set('level', `${level}`);
        Cookies.set('currentExperience', `${currentExperience}`);
        Cookies.set('challengesCompleted', `${challengesCompleted}`);
    }, [level, currentExperience, challengesCompleted])

    function levelUp(){
        setLevel(level + 1);
        setIsLevelModalOpen(true);
    };

    function closeModal(){
        setIsLevelModalOpen(false);
    }

    function startNewChallenge(){
        const randomChallengerIndex = Math.floor(Math.random() * challenges.length);
        const challenge =  challenges[randomChallengerIndex];

        setActiveChallenge(challenge);

        
        if(Notification.permission === 'granted'){
            new Audio('/notificacao.mp3').play();
            new Notification('Novo Desafio ', {
                body: `Valendo ${challenge.amount}xp! `
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if( finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengeCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider value={{ 
            level,
            currentExperience, 
            experienceToNextLevel,
            challengesCompleted, 
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            completeChallenge,
            closeModal,
         }}>
            {children}

            {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    )
}