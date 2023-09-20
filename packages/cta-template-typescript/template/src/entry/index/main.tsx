import "core-js/stable";
import "regenerator-runtime/runtime";

import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
//@ts-ignore
import App from '@/pages/index';

import '@/assets/styles/index.less';

ReactDOM.render(<App />,document.querySelector('#root'));

