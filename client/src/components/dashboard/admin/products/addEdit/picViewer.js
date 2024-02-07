import React, { useState } from "react";
import {
  Modal,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const PicViewer = ({ formik, deletePic }) => {
  const [idToDelete, setIdToDelete] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (index) => {
    setIdToDelete(index);
    setShow(true);
  };

  const confirmDelete = () => {
    deletePic(idToDelete);
    handleClose();
    setIdToDelete(null);
  };

  return (
    <>
      {formik.values && formik.values.images
        ? formik.values.images.map((item, i) => (
            <div
              key={item}
              className="pic_block"
              onClick={() => handleShow(i)}
              style={{
                background: `url(${item})`,
                marginRight: "10px",
              }}
            ></div>
          ))
        : null}

      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>
          Are you sure want to delete it?
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
        <DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={() => handleClose()}
              color="primary"
            >
              Close
            </Button>
            <Button
              variant="contained"
              onClick={() => confirmDelete()}
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PicViewer;
