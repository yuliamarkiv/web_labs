import React from "react";
import {fireEvent,render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import {
    BrowserRouter as Router
  } from "react-router-dom";
import Ads from "../src/components/public_ads";
import {act} from 'react-dom/test-utils';
import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks();
describe('Ads', () => {
    
    it('renders ads', () => {
        render(<Router><Ads /> </Router>);
    });
    
});