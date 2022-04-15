import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAdminDesigner } from "../../actions/designerAction.js";


const Dashboard = () => {

    const dispatch = useDispatch();
    const { designers } = useSelector((state) => state.designers);

    useEffect(() => {
        dispatch(getAdminDesigner());
      }, [dispatch]);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Summary <br /> 
            </p>
          </div>

          <div className="dashboardSummaryBox2">
            <Link to="/admin/designers">
              <p>Designers</p>
              <p>{designers && designers.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>4</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
             <p>2</p>
            </Link>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Dashboard;
