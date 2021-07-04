/* eslint-disable no-underscore-dangle */
import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/bundle.scss';


async function bootstrap() {
    render(
        <div>
            <Router>
                <App/>
            </Router>
        </div>,
        document.querySelector('.react-root')
    );
}

bootstrap();