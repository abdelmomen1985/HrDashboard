import React, { useState } from "react";
import {
  List,
  Box,
  Button,
  LinearProgress
} from "@material-ui/core";
import { GetEmployees, DeleteEmployee } from "../../queries/Employees";

// UI Components
import ListItem from '../../components/ui/ListItem';
import DeleteDialog from '../../components/ui/DeleteDialog';

export default function ListEmployees(props: any) {
  const [deleteDialog, openDeleteDialog] = useState(false);
  const [selectedEmployee, setselectedEmployee] = useState<any>({})

  // HTTP Requests
  const { status, data, error, refetch } = GetEmployees();
  const [mutate, {status: mutationStatus}] = DeleteEmployee();

  // Redirect to the employee edit page on edit button click
  const onEditClick = (id: number) => {
    props.history.push(`/employees/edit/${id}`);
  };

  // Open the delete dialog on delete button click
  const onDeleteClick = (employee: any) => {
    setselectedEmployee(employee);
    openDeleteDialog(true);
  };

  // Delete Employee
  const handleDelete = () => {
    mutate(selectedEmployee.id).then(async () => {
      setselectedEmployee({} as any);
      await refetch();
    });

    openDeleteDialog(false)
  }

  if (status === "loading") return <LinearProgress color="secondary" />;
  if (status === "error") return <div>Error {error} ...</div>;

  return (
    <>
      {mutationStatus === 'loading' && <LinearProgress color="secondary" />}
      <Box component="div" m={2}>
        <List>
          {data &&
            data.map((employee: any, index: any) => (
              <ListItem item={employee} key={index}
              onEditClick={() => onEditClick(employee.id)} 
              onDeleteClick={() => onDeleteClick(employee)}/>
            ))}
        </List>

        <br/>

        {/* New Employee Button */}
        <Button variant="contained" color="primary" onClick={() => props.history.push('/add-employee')}>
          اضافة موطف جديد
        </Button>

        {/* Delete Employee Dialog */}
        <DeleteDialog open={deleteDialog} handleClose={() => openDeleteDialog(false)} handleDelete={handleDelete} />

      </Box>
    </>
  );
}
