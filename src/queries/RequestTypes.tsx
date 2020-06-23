import { Get, Post, Put, Delete } from './helpers';
import { useQuery, useMutation } from "react-query";


const url = process.env.REACT_APP_API_URL;

type PutVariables = {
    id: string,
    payload: object
}

const GetTypes = () => {
    return useQuery(
        'GetTypes',
        async () => {
            return await Get(url + '/request_types', {})
        }
    )
};

const PostType = () => {
    return useMutation(
        async (payload: object) => {
            return await Post(url + '/request_type', payload, {})
        }
    )
};

const EditType = () => {
    return useMutation(
        async (variables: PutVariables) => {
            return await Put(`${url}/request_type/${variables.id}`, variables.payload, {})
        }
    )
}

export { GetTypes, PostType, EditType };