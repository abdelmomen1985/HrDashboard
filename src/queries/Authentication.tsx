import { useQuery, useMutation } from 'react-query';
import { Get, Post } from './helpers';

const url = process.env.REACT_APP_API_URL;


const SignInMutation = async (payload: object) => {
    return await Post(url + '/login', payload, {});
}

const SignUpMutation = async (payload: object) => {
    return await Post(url + '/users', payload, {})
}

const CheckAuth = async () => {
    let token = localStorage.getItem('auth');

    const headers = {
        accept: 'application/json',
        authorization: `Bearer ${token}`
    };
    return await Get(url + '/checkauth', { headers: headers })
}

export { SignInMutation, SignUpMutation, CheckAuth };
