import React from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";

// Components
import Home from "../views/Home";
import SignIn from '../views/Authentication/SignIn';
import SignUp from '../views/Authentication/SignUp';
import Employees from "../views/Employees/Employees";
import Branches from "../views/Branches";
import Departments from "../views/Departments";
import EditEmployee from '../views/Employees/EditEmployee';
import AddEmployee from '../views/Employees/AddEmployee';
import Attendance from '../views/Attendance';
import Requests from '../views/Requests';
import RequestsTypes from '../views/RequestTypes';

export default function Routes() {
    return (
        <Router>
            <MainLayout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/signup' component={SignUp} />
                    <Route path="/branches" component={Branches} />
                    <Route path="/add-employee" component={AddEmployee} />
                    <Route path="/employees/edit/:id" component={EditEmployee} />
                    <Route path="/employees" component={Employees} />
                    <Route path="/departments" component={Departments} />
                    <Route path="/attendance" component={Attendance} />
                    <Route path="/requests/types" component={RequestsTypes} />
                    <Route path="/requests" component={Requests} />
                    <Route component={Home} />
                </Switch>
            </MainLayout>
        </Router>
    )
}