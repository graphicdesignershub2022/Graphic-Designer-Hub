import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./designerList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminDesigner,
} from "../../actions/designerAction";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
// import { DELETE_DESIGNER_RESET } from "../../constants/designerConstants";

const DesignerList = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, designers } = useSelector((state) => state.designers);

//   const { error: deleteError, isDeleted } = useSelector(
//     (state) => state.designer
//   );

//   const deleteProductHandler = (id) => {
//     dispatch(deleteDesigner(id));
//   };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    // if (deleteError) {
    //   alert.error(deleteError);
    //   dispatch(clearErrors());
    // }

    // if (isDeleted) {
    //   alert.success("Designer Deleted Successfully");
    //   history.push("/admin/dashboard");
    //   dispatch({ type: DELETE_DESIGNER_RESET });
    // }

    dispatch(getAdminDesigner());
  }, [dispatch, alert, error,  history ]);

  const columns = [
    { field: "id", headerName: "Designer ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "experience",
      headerName: "experience",
      type: "String",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "specialization",
      headerName: "Specialization",
      type: "String",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/designer/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
            //   onClick={() =>
            //     deleteDesignerHandler(params.getValue(params.id, "id"))
            //   }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  designers &&
  designers.forEach((item) => {
      rows.push({
        id: item._id,
        experience: item.experience,
        name: item.name,
        specialization: item.specialization,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL DESIGNERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="designerListContainer">
          <h1 id="designerListHeading">ALL DESIGNERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="designerListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default DesignerList;
