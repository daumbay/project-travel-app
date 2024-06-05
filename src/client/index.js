import {getCredentials, callWebsite, getCountdown, handleSubmit} from './js/app';

document.querySelector('form').addEventListener('submit', handleSubmit);

function handleClick(event) {
    console.log("I'm clicked!", event.target);
} 

export {getCredentials, callWebsite, getCountdown, handleSubmit, handleClick};

import './styles/styles.scss';
import './styles/layout.scss';