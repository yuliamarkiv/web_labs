import React from "react";
import {fireEvent,render, screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import {
    BrowserRouter as Router
  } from "react-router-dom";
import Login from "../src/components/login";
import {act} from 'react-dom/test-utils';
import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks();
const successResponse = 'logged_in';
describe('Login page', () => {
    
    it('renders login with form', () => {
        render(<Router><Login /> </Router>);
        expect(screen.getAllByRole('form'))
    });

    it('tests user login', async () => {
        await act(async () => {
            fetch.mockReturnValue(Promise.resolve(new Response(successResponse)));
            render(<Router><Login
            /></Router>);
        });
        const submitBtn = screen.getByRole('form')
            .querySelector('button');
        fireEvent.click(submitBtn);

        const headers = new Headers();
        headers.set('content-type', 'application/json');
        expect(fetch)
            .toHaveBeenCalledWith('http://127.0.0.1:5000/api/v1/auth/login', {
                'body': '{"username":"","password":""}',
                'headers': headers,
                'method': 'POST'
            });

        await expect(fetch)
            .toHaveBeenCalledTimes(1);
    });


    
});