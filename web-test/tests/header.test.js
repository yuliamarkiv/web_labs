
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../src/components/header';
import { act } from 'react-dom/test-utils';

let token = { 'logged_in_user': 'eXVsaWEyOjEyMzQ' };

describe('Header page', () => {

    beforeAll(() => {
        global.Storage.prototype.setItem = jest.fn((key, value) => {
            token[key] = value;
        });
        global.Storage.prototype.getItem = jest.fn((key) => token[key]);
    });

    afterAll(() => {
        global.Storage.prototype.setItem.mockReset();
        global.Storage.prototype.getItem.mockReset();
    });

    it('renders Login page with links', async () => {

        await act(async () => {
            render(<Router><Header/></Router>);
        });
        expect(screen.getAllByRole('link')).toHaveLength(7);

    });

    it('tests user logout', async () => {

        await act(async () => {
            render(<Router><Header/></Router>);
        });

        const logoutLink = screen.getByText("Logout");
        fireEvent.click(logoutLink);

    });

});