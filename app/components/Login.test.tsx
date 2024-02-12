import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {AuthContext} from '@contexts/AuthContext';
import Login from '@components/Login';

describe('Login', () => {
    it('calls the login function with the correct username and password', async () => {
        const mockLogin = jest.fn();
        mockLogin.mockResolvedValue(true);
        const mockLogout = jest.fn();
        const mockUser = null;
        const mockAuthContext = {
            login: mockLogin,
            logout: mockLogout,
            user: mockUser
        };

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <Login/>
            </AuthContext.Provider>
        );

        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByText('Login');

        await userEvent.type(usernameInput, 'testuser');
        await userEvent.type(passwordInput, 'testpassword');
        await userEvent.click(loginButton);

        expect(mockLogin).toHaveBeenCalledWith({
            username: 'testuser',
            password: 'testpassword',
        });
        expect(screen.queryByText('Login Failed')).not.toBeInTheDocument();
    });

    it('show error message if login fails', async () => {
        const mockLogin = jest.fn();
        mockLogin.mockResolvedValue(false);
        const mockLogout = jest.fn();
        const mockUser = null;
        const mockAuthContext = {
            login: mockLogin,
            logout: mockLogout,
            user: mockUser
        };

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <Login/>
            </AuthContext.Provider>
        );

        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByText('Login');

        await userEvent.type(usernameInput, 'testuser');
        await userEvent.type(passwordInput, 'testpassword');
        await userEvent.click(loginButton);

        expect(mockLogin).toHaveBeenCalledWith({
            username: 'testuser',
            password: 'testpassword',
        });
        expect(screen.getByText('Login Failed')).toBeInTheDocument();
    });

    it('should call login when the enter key is pressed', async () => {
        const mockLogin = jest.fn();
        mockLogin.mockResolvedValue(true);
        const mockLogout = jest.fn();
        const mockUser = null;
        const mockAuthContext = {
            login: mockLogin,
            logout: mockLogout,
            user: mockUser
        };

        render(
            <AuthContext.Provider value={mockAuthContext}>
                <Login/>
            </AuthContext.Provider>
        );

        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');

        await userEvent.type(usernameInput, 'testuser');
        await userEvent.type(passwordInput, 'testpassword');
        await userEvent.type(passwordInput, '{enter}');

        expect(mockLogin).toHaveBeenCalledWith({
            username: 'testuser',
            password: 'testpassword',
        });
        expect(screen.queryByText('Login Failed')).not.toBeInTheDocument();
    });
});
