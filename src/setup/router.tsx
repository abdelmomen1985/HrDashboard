import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";

// Components
import Home from "../views/Home";
import Employees from "../views/Employees/Employees";
import Branches from "../views/Branches";
import Departments from "../views/Departments";
import EditEmployee from '../views/Employees/EditEmployee';
import AddEmployee from '../views/Employees/AddEmployee';
import Attendance from '../views/Attendance'

export default function Routes() {
    return (
        <Router>
            <MainLayout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/branches" component={Branches} />
                    <Route path="/add-employee" component={AddEmployee} />
                    <Route path="/employees/edit/:id" component={EditEmployee} />
                    <Route path="/employees" component={Employees} />
                    <Route path="/departments" component={Departments} />
                    <Route path="/attendance" component={Attendance} />
                    <Route component={Home} />
                </Switch>
            </MainLayout>
        </Router>
    )
}