import React, { useEffect, useState } from "react";
import PicUpload from "./upload";
import PicViewer from "./picViewer";
import DashboardLayout from "components/dashboard/dashboardLayout";

import { useFormik } from "formik";
import { errorHelper } from "components/utils/tools";
import Loader from "components/utils/loader";
import { validation } from "./formValues";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productAdd } from "store/actions/product.actions";

import { TextField, Button } from "@mui/material";
import { Add } from "@mui/icons-material";

const AddProducts = (props) => {
  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      images: [],
    },
    validationSchema: validation,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    dispatch(productAdd(values));
  };

  const handlePicValue = (pic) => {
    const picArray = formik.values.images || [];
    picArray.push(pic.url);
    formik.setFieldValue("images", picArray);
  };

  const deletePic = (index) => {
    const picArray = formik.values.images || [];
    picArray.splice(index, 1);
    formik.setFieldValue("images", picArray);
  };

  useEffect(() => {
    if (notifications && notifications.success) {
      navigate(`/dashboard/admin/admin_products`);
    }
    if (notifications && notifications.error) {
      setLoading(false);
    }
  }, [notifications, navigate]);

  // useEffect(()=>{
  //     return()=>{
  //         dispatch(clearProductAdd())
  //     }
  // },[dispatch])

  return (
    <DashboardLayout title="Add product">
      {loading ? (
        <Loader />
      ) : (
        <>
          <PicViewer formik={formik} deletePic={(index) => deletePic(index)} />
          <PicUpload picValue={(pic) => handlePicValue(pic)} />
          <br></br>
          <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextField
                style={{ width: "100%", background: 'whitesmoke'  }}
                name="name"
                label="Enter a Product name"
                variant="standard"
                {...formik.getFieldProps("name")}
                {...errorHelper(formik, "name")}
              />
            </div>
            <br></br>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<Add />}
            >
              Add product
            </Button>
          </form>
        </>
      )}
    </DashboardLayout>
  );
};

export default AddProducts;
