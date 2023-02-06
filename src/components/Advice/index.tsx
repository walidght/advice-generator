import classes from './style.module.css';
import diceIcon from '../../assets/icon-dice.svg';
import patternDividerDesktopImg from '../../assets/pattern-divider-desktop.svg';
import patternDividerMobileImg from '../../assets/pattern-divider-mobile.svg';
import { useEffect, useState } from 'react';
import axios from 'axios';

type AdviceType = {
    id: number;
    advice: string;
} | null;

const Advice = () => {
    const [advice, setAdvice] = useState<AdviceType>(null);

    const fetchAdvice = (): void => {
        axios
            .get('https://api.adviceslip.com/advice')
            .then((response) => {
                setAdvice(response.data.slip);
            })
            .catch((error) => console.log(error));
    };

    const handleClick = (): void => {
        fetchAdvice();
    };

    useEffect(() => {
        fetchAdvice();
    }, []);

    return (
        advice && (
            <div className={classes.container}>
                <h1>{`ADVICE #${advice.id}`}</h1>

                <p>
                    {'"'}
                    <span>{`${advice.advice}`}</span>
                    {'"'}
                </p>

                <picture>
                    <source
                        media="(min-width:700px)"
                        srcSet={patternDividerDesktopImg}
                    />
                    <img src={patternDividerMobileImg} alt="" />
                </picture>
                <button onClick={handleClick}>
                    <img src={diceIcon} alt="" />
                </button>
            </div>
        )
    );
};

export default Advice;
