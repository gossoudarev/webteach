import Rand from 'gossrandom';
import { isProd } from '../../src/shared/util';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
  <div>
    <App />
    <div id="result">
    </div>
    <br/>
  </div>,
  document.querySelector('#root')
);

window.addEventListener('load', () => {
  const r = Rand.interval(0, 255);
  const g = Rand.interval(0, 255);
  const b = Rand.interval(0, 255);
  document.body.style.backgroundColor = `rgb(${r},${g},${b})`;
});
 