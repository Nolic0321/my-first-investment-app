import React from 'react';
import {act, render} from '@testing-library/react';
import {AuthProvider, useAuth} from '@contexts/AuthContext'; // Update with the actual path
import {ClientContext} from './ClientContext';

// Mock user and login data
const mockUser = { _id: '123', username: 'testUser' };
const mockLoginData = { username: 'testUser', password: 'password' };

// Mock implementation for ClientContext
const mockClientContext = {
    auth: jest.fn(),
    getUser: jest.fn(),
    getUsers: jest.fn(),
    addUser: jest.fn(),
    addChildUser: jest.fn(),
    updateChildAccount: jest.fn(),
    deleteChildAccount: jest.fn(),
    getChildAccount: jest.fn(),
    getChildAccounts: jest.fn(),
    sendRequest: jest.fn(),
    getPendingRequestsForChild: jest.fn(),
    getPendingRequestsForParent: jest.fn(),
    approveRequest: jest.fn(),
    rejectRequest: jest.fn()
};

// Helper component to use the AuthContext
const ConsumerComponent = () => {
    const { user, login, logout } = useAuth()!;
    return (
        <div>
            {user ? <div data-testid="user">{user.username}</div> : <div data-testid="no-user">No User</div>}
            <button data-testid="login-button" onClick={() => login(mockLoginData)}>Login</button>
            <button data-testid="logout-button" onClick={() => logout()}>Logout</button>
        </div>
    );
};

describe('AuthProvider', () => {
    beforeEach(() => {
        // Mock localStorage
        Storage.prototype.setItem = jest.fn();
        Storage.prototype.getItem = jest.fn((key) =>{
            if(key === 'user') return mockUser;
            return null;
        });
        Storage.prototype.removeItem = jest.fn();

        localStorage.clear();
        jest.resetAllMocks(); // Reset mock functions before each test
    });

    it('logs in and sets user correctly', async () => {
        mockClientContext.auth.mockResolvedValue(mockUser);

        const { getByTestId, findByTestId } = render(
            <ClientContext.Provider value={mockClientContext}>
                <AuthProvider>
                    <ConsumerComponent />
                </AuthProvider>
            </ClientContext.Provider>
        );

        const loginButton = getByTestId('login-button');
        act(() => {
            loginButton.click();
        });

        const userDiv = await findByTestId('user');
        expect(userDiv).toHaveTextContent(mockUser.username);

        // Ensure the correct key is being used and mock is checked
        expect(localStorage.setItem).toHaveBeenCalledWith('user', JSON.stringify(mockUser));
    });

    it('handles login failure correctly', async () => {
        mockClientContext.auth.mockResolvedValue(null);

        const { getByTestId, findByTestId } = render(
            <ClientContext.Provider value={mockClientContext}>
                <AuthProvider>
                    <ConsumerComponent />
                </AuthProvider>
            </ClientContext.Provider>
        );

        const loginButton = getByTestId('login-button');
        act(() => {
            loginButton.click();
        });

        const noUserDiv = await findByTestId('no-user');
        expect(noUserDiv).toHaveTextContent('No User');
    });

    it('clears user on logout', async () => {
        // Pre-set the user to simulate a logged-in state
        mockClientContext.auth.mockResolvedValue(mockUser);

        const { getByTestId, findByTestId } = render(
            <ClientContext.Provider value={mockClientContext}>
                <AuthProvider>
                    <ConsumerComponent />
                </AuthProvider>
            </ClientContext.Provider>
        );

        // Log in the user
        const loginButton = getByTestId('login-button');
        act(() => {
            loginButton.click();
        });

        await findByTestId('user'); // Wait for the user to be set

        // Log out the user
        const logoutButton = getByTestId('logout-button');
        act(() => {
            logoutButton.click();
        });

        const noUserDiv = await findByTestId('no-user');
        expect(noUserDiv).toHaveTextContent('No User');
        expect(localStorage.removeItem).toHaveBeenCalledWith('user');
    });
});
