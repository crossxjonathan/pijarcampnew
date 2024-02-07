import React, { useEffect, useState } from "react";
import PicUpload from "./upload";
import PicViewer from "./picViewer";
import DashboardLayout from "components/dashboard/dashboardLayout";
import { useFormik } from "formik";
import { errorHelper } from "components/utils/tools";
import Loader from "components/utils/loader";
import { validation, formValues, getValuesToEdit } from "./formValues";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { productEdit, productsById } from "store/actions/product.actions";
import { TextField, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { clearCurrentProduct } from "store/actions";

const EditProducts = () => {
  const [loading, setLoading] = useState(false);
  const products = useSelector((state) => state.products);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  console.log(param)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formValues,
    validationSchema: validation(),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    dispatch(productEdit(values,param.id));
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
    if (notifications) {
      setLoading(false);
    }
  }, [notifications, navigate]);

  useEffect(() => {
    const productId = param.id;
    dispatch(productsById(productId));
  }, [dispatch, param.id]);

  const productById = useSelector((state) => state.products.byId);

  useEffect(() => {
    if (productById) {
      formik.setValues(getValuesToEdit(productById));
    }
  }, [productById, formik.setValues]);

  useEffect(()=> {
    return()=> {
      dispatch(clearCurrentProduct())
    }
  },[dispatch])

  return (
    <DashboardLayout title="Edit product">
      {loading ? (
        <Loader />
      ) : (
        <>
          <PicViewer
            formik={formik}
            deletePic={(index) => deletePic(index)}
          />
          <PicUpload picValue={(pic) => handlePicValue(pic)} />
          <br></br>
          <form
            className="mt-3 article_form"
            onSubmit={formik.handleSubmit}
          >
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
              Edit product
            </Button>
          </form>
        </>
      )}
    </DashboardLayout>
  );
};

export default EditProducts;
