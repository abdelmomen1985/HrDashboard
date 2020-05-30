import React, { useState } from "react";
import { List, ListItem, ListItemText, Button, Box } from "@material-ui/core";
import { LocationOn } from "@material-ui/icons";
import AddBranchModal from "../components/branches/AddBranchModal";
import { useMyFetch } from "../utils/useMyFetch";

export default function Branches() {
  const [open, setOpen] = useState(false);

  const { loading, data } = useMyFetch(
    "http://13.90.214.197:8000/api/Company/Branches?company=1",
    {}
  );
  if (loading) return <div>Loading ...</div>;
  data && data.length && console.log(data);
  return (
    <>
      <Box component="div" m={2}>
        {/** Show List of Branches */}

        <List>
          {data &&
            data.map((branch: any, index) => (
              <ListItem button key={index}>
                <LocationOn />
                <ListItemText primary={branch.branchNameAr} />
              </ListItem>
            ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add New Branch
        </Button>
        <AddBranchModal
          open={open}
          handelClose={() => {
            setOpen(false);
          }}
        />
      </Box>
    </>
  );
}
