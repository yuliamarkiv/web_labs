import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import EditUser from '../src/components/edit_user';
import { act } from 'react-dom/test-utils';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();


describe('edit user page', () => {

    let token = { 'logged_in_user': 'dGVzdDp0ZXN0' };

    const studentData = {
        name: 'test_s',
        username: 'test',
        email: 'test',
        locationId: 'test',
        password: 'test',
        confirm_password: 'test'
    };

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

    it('renders Profile with form', () => {
        fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(studentData) }));
        render(<Router><EditUser/></Router>);
        expect(screen.getByRole('form'))
            .toBeInTheDocument();
        expect(fetch)
            .toHaveBeenCalledTimes(1);
    });

    it('tests', async () => {
        await fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve(studentData) }));
        await act(async () => {
            render(<Router><EditUser
            /></Router>);
        });

        const submitBtn = screen.getByRole('button' ,{ name: 'Submit' });
        fireEvent.click(submitBtn);
        const deleteBtn = screen.getByRole('button', {name: 'Delete account'});
        fireEvent.click(deleteBtn);
        await expect(fetch)
            .toHaveBeenCalledTimes(4);
    });
});