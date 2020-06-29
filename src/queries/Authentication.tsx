import { useQuery, useMutation } from 'react-query';
import { Get, Delete, Put, Post } from './helpers';

const url = process.env.REACT_APP_API_URL;

const SignInMutation = async (payload: object) => {
    return await Post(url + '/login', payload, {});
}

const SignUpMutation = async (payload: object) => {
    return await Post(url + '/users', payload, {})
}

export { SignInMutation, SignUpMutation };
