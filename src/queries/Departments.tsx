import { Get, Post, Delete } from './helpers';
import { useQuery, useMutation } from "react-query";

const url = process.env.REACT_APP_API_URL

// Get all departments
const GetDepartments = () => {
    return useQuery(
      "GetDepartments",
      async () => {
        return await Get(url + "departments", {})
      }
    )
  }

// Create a new department
const PostDepartment = () => {
  return useMutation(
    async (payload: object) => {
      return await Post(url + 'department', payload, {})
    }
  )
}
// Delete a single department
const DeleteDepartment = () => {
  return useMutation(
    async (id: string) => {
      return await Delete(`${url}department/${id}`, {})
    }
  )
}

export { GetDepartments, PostDepartment, DeleteDepartment };