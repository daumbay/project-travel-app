import {getCredentials, getCountdown, handleSubmit} from './js/app.js';
import { callWebsite } from './js/callWebsite.js';

document.querySelector('form').addEventListener('submit', handleSubmit);

function handleClick(event) {
    console.log("I'm clicked!", event.target);
} 

export {getCredentials, callWebsite, getCountdown, handleSubmit, handleClick};

import './styles/styles.scss';
import './styles/layout.scss';