import React from "react";
import {fireEvent,render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import {
    BrowserRouter as Router
  } from "react-router-dom";
import Main from "../src/components/main";

describe('Main page', () => {
    it('renders main', () => {
        render(<Router><Main /> </Router>);
        expect(screen.getAllByRole('button'))
    });
})