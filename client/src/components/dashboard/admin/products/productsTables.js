import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Button,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { LinkContainer } from "react-router-bootstrap";
import Moment from "react-moment";
import Loading from "components/utils/loader";

const ProductsTable = ({
  prods,
  prev,
  next,
  gotoEdit,
  removeModal,
  handleClose,
  handleModal,
  handleRemove,
}) => {
  const goToPrevPage = () => {
    prev(prods.prevPage);
  };

  const goToNextPage = () => {
    next(prods.nextPage);
  };

  const calculateTimeDifference = (date) => {
    const currentDate = new Date();
    const postDate = new Date(date);
    const timeDifference = Math.floor((currentDate - postDate) / 1000); // in seconds

    if (timeDifference < 60) {
      return `${timeDifference} seconds ago`;
    } else if (timeDifference < 3600) {
      return `${Math.floor(timeDifference / 60)} minutes ago`;
    } else if (timeDifference < 86400) {
      return `${Math.floor(timeDifference / 3600)} hours ago`;
    } else {
      return <Moment format="MMMM DD, YYYY HH:mm">{date}</Moment>;
    }
  };

  return (
    <>
      {prods && prods.docs ? (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Created</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Remove</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prods.docs.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{calculateTimeDifference(item.date)}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell
                      className="action_btn remove_btn"
                      onClick={() => handleModal(item._id)}
                    >
                      Remove
                    </TableCell>
                    <TableCell
                      className="action_btn edit_btn"
                      onClick={() => gotoEdit(item._id)}
                    >
                      Edit
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={prods.totalPages}
            page={prods.page}
            onChange={(event, value) => next(value)}
            sx={{
              "& .MuiPaginationItem-root": {
                "&:hover": { backgroundColor: "#e0e0e0" },
              },
            }}
          />
          <hr />
          <LinkContainer to="/dashboard/admin/add_products">
            <Button variant="contained">Add products</Button>
          </LinkContainer>
        </>
      ) : (
        <Loading />
      )}
      <Dialog open={removeModal} onClose={handleClose}>
        <DialogTitle>
          Are you really sure?
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>There is data will be removed.</DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => handleClose()}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleRemove()}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductsTable;
