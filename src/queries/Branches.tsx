import { useQuery, useMutation } from "react-query";
import { Get, Delete, Put, Post } from './helpers';

const url = process.env.REACT_APP_API_URL

// Mutation variables for the Patch request
type PatchVariables = {
  id: string,
  payload: object
}

// Get all branches
const GetBranches = () => {
  return useQuery(
    "GetBranches",
    async () => {
      return await Get(url + "/branches?company_id=1", {})
    }
  )
}

// Create a new branch
const PostBranch = () => {
  return useMutation(
    async (payload: object) => {
      return await Post(url + '/branch', payload, {})
    }
  )
}

// Edit an existing branch
const EditBranch = () => {
  return useMutation(
    async (variables: PatchVariables) => {
      return await Put(`${url}/branch/${variables.id}`, variables.payload, {})
    }
  )
}

// Delete a single branch
const DeleteBranch = () => {
  return useMutation(
    async (id: string) => {
      return await Delete(`${url}/branch/${id}`, {})
    }
  );
}

export { DeleteBranch, PostBranch, GetBranches, EditBranch };
