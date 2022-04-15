import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";

const MyOrders = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 0.5 },

    {
      field: "orderKey" , headerName: "Order Key",
      type: "String",
      minWidth: 50, flex: 0.5
    },

    {
      field: "companyName" , headerName: "Company Name",
      type: "String",
      minWidth: 150, flex: 1
    },

    {
      field: "orderType" , headerName: "Order Type  ",
      type: "String",
      minWidth: 80, flex: 0.5
    },

    {
      field: "orderStatus" , headerName: "Order Status ",
      type: "String",
      minWidth: 60, flex: 0.6,
    },

    {
      field: "advancePayment" , headerName: "Advance Payment ",
      type: "number",
      minWidth: 60, flex: 0.5,
    },

    {
      field: "totalPrice" , headerName: "Total Amount ",
      type: "number",
      minWidth: 60, flex: 0.5
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 100,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    }
  ];

  const rows = [];


  orders && 
  orders.forEach((item, index) =>{
    rows.push({
      id: item._id,
      orderKey: item.orderKey,
      companyName: item.companyName,
      orderType: item.orderType,
      orderStatus: item.orderStatus,
      advancePayment: item.advancePayment,
      totalAmount: item.totalAmount
    });
  });



  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
