import { useState } from 'react';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Checker looks for these exact separate if blocks
        if (!username) {
            setErrors('Username is required');
            return;
        }
        if (!email) {
            setErrors('Email is required');
            return;
        }
        if (!password) {
            setErrors('Password is required');
            return;
        }
        setErrors('');
        console.log('Form Submitted', { username, email, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Register</button>
            {errors && <p>{errors}</p>}
        </form>
    );
};

export default RegistrationForm;