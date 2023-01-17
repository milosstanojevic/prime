import { Button, Input, Loading, mainPath } from '../../../components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context';
import styles from './Login.module.css';

export const Login: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [loginForm, setLoginForm] = React.useState({ username: '', password: '' });
    const { obtainToken, isAuthenticated, isLoading: isAuthLoading } = useAuthContext();
    const navigate = useNavigate();

    React.useEffect(() => {
        !isAuthLoading && isAuthenticated && navigate(mainPath);
    }, [isAuthenticated, navigate, isAuthLoading]);

    const onSubmit = React.useCallback(
        (e: React.SyntheticEvent) => {
            e.preventDefault();
            if (loginForm.username.length && loginForm.password.length) {
                setIsLoading(true);
                obtainToken(loginForm)
                    .then(() => {
                        setIsLoading(false);
                        navigate(mainPath);
                    })
                    .catch((e) => {
                        console.log(e);
                        setIsLoading(false);
                    });
            }
        },
        [loginForm, navigate, obtainToken]
    );

    const isBtnDisabled = React.useMemo(() => {
        return loginForm.username.length === 0 || loginForm.password.length === 0;
    }, [loginForm]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = e;
        const { name, value } = target;
        setLoginForm((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <form onSubmit={onSubmit} className={styles.wrapper}>
            <Input
                type="text"
                onChange={handleChange}
                name="username"
                value={loginForm.username}
                placeholder="Username"
                className={styles.username}
                disabled={isLoading}
            />
            <Input
                type="password"
                onChange={handleChange}
                name="password"
                value={loginForm.password}
                placeholder="Password"
                className={styles.password}
                disabled={isLoading}
            />
            {isLoading ? (
                <Loading />
            ) : (
                <Button type="submit" disabled={isBtnDisabled} className={styles.submitBtn}>
                    Submit
                </Button>
            )}
        </form>
    );
};
