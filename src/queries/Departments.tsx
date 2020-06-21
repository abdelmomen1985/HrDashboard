import { Get, Post, Put, Delete } from './helpers';
import { useQuery, useMutation } from "react-query";

const url = process.env.REACT_APP_API_URL

// Mutation variables for the PUT request
type PutVariables = {
  id: string,
  payload: object
}

// Get all departments
const GetDepartments = () => {
    return useQuery(
      "GetDepartments",
      async () => {
        return await Get(url + "/departments", {})
      }
    )
  }

// Create a new department
const PostDepartment = () => {
  return useMutation(
    async (payload: object) => {
      return await Post(url + '/department', payload, {})
    }
  )
}

// Edit an existing department
const EditDepartment = () => {
  return useMutation(
    async (variables: PutVariables) => {
      return await Put(`${url}/department/${variables.id}`, variables.payload, {})
    }
  )
}

// Delete a single department
const DeleteDepartment = () => {
  return useMutation(
    async (id: string) => {
      return await Delete(`${url}/department/${id}`, {})
    }
  )
}

export { GetDepartments, PostDepartment, EditDepartment, DeleteDepartment };