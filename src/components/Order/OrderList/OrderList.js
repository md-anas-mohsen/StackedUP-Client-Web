import React, { useState, useEffect, useContext, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import MetaData from "../../Layout/MetaData/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../../actions/orderActions";
import { AppContext } from "../../../context/AppContext";
import { TableBody, TableRow, TableCell, Typography } from "@material-ui/core";
import DataTable from "../../Misc/DataTable/DataTable";
import InfoIcon from "@material-ui/icons/Info";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import {
  Info,
  MaximumRed,
  Orange,
  Success,
  Warning,
} from "../../Misc/Colors/Colors";
import { Skeleton } from "@material-ui/lab";
import {
  DELIVERED,
  IN_TRANSIT,
  PROCESSING,
} from "../../../constants/orderConstants";

export const Status = ({ status, size }) => {
  const Icon = () => {
    if (status === PROCESSING)
      return (
        <InfoIcon
          fontSize="small"
          style={size && { fontSize: size === "large" && "25px" }}
        />
      );
    if (status === DELIVERED)
      return (
        <CheckCircleIcon
          fontSize="small"
          style={size && { fontSize: size === "large" && "25px" }}
        />
      );
    if (status === IN_TRANSIT)
      return (
        <LocalShippingIcon
          fontSize="small"
          style={size && { fontSize: size === "large" && "25px" }}
        />
      );
  };
  return (
    <div
      style={{
        backgroundColor:
          status === PROCESSING
            ? Info
            : status === DELIVERED
            ? Success
            : status === IN_TRANSIT && Orange,
        color: "white",
        display: "flex",
        padding: "5px",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "5px",
      }}
    >
      {Icon()}
      <Typography variant={size === "large" && "h5"}>{status}</Typography>
    </div>
  );
};

const OrderList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [tableData, setTableData] = useState([]);
  const { alertState } = useContext(AppContext);
  const [, setAlert] = alertState;

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  const headCells = [
    { id: "id", label: "Order ID" },
    { id: "date", label: "Placed On" },
    { id: "cost", label: "Total Cost" },
    { id: "items", label: "Total Items" },
    { id: "status", label: "Status" },
  ];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    DataTable(tableData, headCells);

  useEffect(() => {
    if (!loading && orders) {
      setTableData(
        orders.map((order) => ({
          id: order._id,
          date: order.createdAt,
          cost: Number(order.totalPrice),
          status: order.orderStatus,
          items: Number(
            order.orderItems.reduce(
              (acc, item) => acc + Number(item.quantity),
              0
            )
          ),
        }))
      );
    }
  }, [orders, loading]);

  useEffect(() => {
    dispatch(myOrders());
    if (error) {
      setAlert({ type: "error", message: error });
      dispatch(clearErrors());
    }
  }, [dispatch, error, setAlert]);

  return (
    <div>
      {!loading && orders ? (
        <Fragment>
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => history.push(`/order/${item.id}`)}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{String(item.date).substring(0, 10)}</TableCell>
                  <TableCell>${item.cost.toFixed(2)}</TableCell>
                  <TableCell size="small">{item.items}</TableCell>
                  <TableCell>{<Status status={item.status} />}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
          <TblPagination />
        </Fragment>
      ) : (
        <Skeleton variant="rect" animation="wave" height={400} />
      )}
    </div>
  );
};

export default OrderList;
