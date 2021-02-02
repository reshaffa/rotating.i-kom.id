import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Dashboard from "./views/Dashboard";
//import Users from "./views/Users";
import Reports from "./views/Reports";
//import Locations from "./views/Locations";
//import Login from "./views/Login"

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/reports" />
  },
  /*
  {
    path: "/login",
    layout: false,
    component: Login
  },
  {
    path: "/dashboard",
    layout: DefaultLayout,
    component: Dashboard
  },
  */
  {
    path: "/reports",
    layout: DefaultLayout,
    component: Reports
  },
  /*
  {
    path: "/users",
    layout: DefaultLayout,
    component: Users
  },
  {
    path: "/locations",
    layout: DefaultLayout,
    component: Locations
  }
  */
];
