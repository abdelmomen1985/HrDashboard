import { Get, Post, Put, Delete } from './helpers';
import { useQuery, useMutation } from "react-query";

const url = process.env.REACT_APP_API_URL

type PutVariables = {
    id: string,
    payload: object
}

// Get all employee requests
const GetEmpRequests = () => {
    return useQuery(
        "GetEmpRequests",
        async () => {
            return await Get(url + '/emp_requests', {})
        }
    )
}

// Approve or Reject an employee request
const EditEmpRequest = () => {
    return useMutation(
        async (variables: PutVariables) => {
            return await Put(`${url}/emp_request/${variables.id}`, variables.payload, {})
        }
    )
};

export { GetEmpRequests, EditEmpRequest };