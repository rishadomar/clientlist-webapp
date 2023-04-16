import React from 'react';
import { User } from 'firebase/auth';
import FirebaseAuthService from './FirebaseAuthService';

interface LoginFormProps {
    existingUser: User | null;
}

const LoginForm: React.FunctionComponent<LoginFormProps> = ({ existingUser }) => {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await FirebaseAuthService.registerUser(userName, password);
            setUserName('');
            setPassword('');
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        setErrorMessage('');
        event.preventDefault();
        try {
            await FirebaseAuthService.loginUser(userName, password);
            setUserName('');
            setPassword('');
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    const handleLogout = async () => {
        setErrorMessage('');
        await FirebaseAuthService.logoutUser();
    };

    const handleResetPassword = async () => {
        if (!userName) {
            return;
        }
        setErrorMessage('');
        try {
            await FirebaseAuthService.resetPassword(userName);
            alert('Password reset email sent. Please check your inbox.');
            setUserName('');
            setPassword('');
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    const handleLoginWithGoogle = async () => {
        setErrorMessage('');
        try {
            await FirebaseAuthService.loginWithGoogle();
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <div className='login-form-container'>
                {errorMessage && <div className='error-message'>{errorMessage}</div>}
                {existingUser ? (
                    <div className='row'>
                        <h3>Welcome, {existingUser.email}</h3>
                        <button type='button' onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleLogin} className='login-form'>
                        <label className='input-label login-label'>
                            Username (email):
                            <input
                                type='email'
                                className='input-text'
                                required
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </label>

                        <label className='input-label login-label'>
                            Password:
                            <input
                                type='password'
                                className='input-text'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>

                        <div className='button-box'>
                            <button className='primary-button'>Login</button>
                            <button type='button' onClick={handleResetPassword}>
                                Reset Password
                            </button>
                            <button type='button' onClick={handleLoginWithGoogle}>
                                Login with Google
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
};

export default LoginForm;
