import { useQuery, useMutation } from "react-query";
import { Get, Delete, Post } from './helpers';

const url = process.env.REACT_APP_API_URL

// Get all branches
const GetBranches = () => {
  return useQuery(
    "GetBranches",
    async () => {
      return await Get(url + "branches?company_id=1", {})
    }
  )
}

// Create a new branch
const PostBranch = () => {
  return useMutation(
    async (payload: object) => {
      return await Post(url + 'branch', payload, {})
    }
  )
}

// Delete a single branch
const DeleteBranch = () => {
  return useMutation(
    async (id: string) => {
      return await Delete(`${url}branch/${id}`, {})
    }
  );
}

export { DeleteBranch, PostBranch, GetBranches };
