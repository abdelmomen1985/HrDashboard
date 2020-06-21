import { Get, Post, Put, Delete } from './helpers';
import { useQuery, useMutation } from "react-query";

const url = process.env.REACT_APP_API_URL;

// Mutation variables for the PUT request
type PutVariables = {
  id: string,
  payload: object
}

// Get all employees
const GetEmployees = () => {
  return useQuery("GetEmployees", async () => {
    return await Get(url + '/employees', {})
  })
}

// Get a single employee using its ID
const GetEmployee = (id: number) => {
  return useQuery('GetEmployee', async () => {
    return await Get(`${url}/employee/${id}`, {})
  })
}

// Get an employee's attendance data
const GetAttendance = (id: number) => {
  return useQuery(['attendance', id], async () => {
    return await Get(`${url}/get_emp_inouts?employee_id=${id}`, {})
  })
}

// Add a new employee
const PostEmployee = () => {
  return useMutation(
    async (payload: object) => {
      return await Post(url + '/employee', payload, {})
    }
  );
};

// Edit an existing employee
const PutEmployee = () => {
  return useMutation (
    async (variables: PutVariables) => {
      return await Put(`${url}/employee/${variables.id}`, variables.payload, {})
    }
  );
};

// Delete a single employee
const DeleteEmployee = () => {
  return useMutation (
    async (id: string) => {
      return await Delete(`${url}/employee/${id}`, {})
    }
  );
};



export { GetEmployees, GetEmployee, GetAttendance, PostEmployee, PutEmployee, DeleteEmployee };
