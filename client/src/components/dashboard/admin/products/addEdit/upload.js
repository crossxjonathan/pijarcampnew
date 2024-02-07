import React, { useState, useRef } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { getTokenCookie } from "components/utils/tools";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/system";


const StyledButton = styled(Button)({
  marginTop: "16px",
});

const HiddenInput = styled("input")({
  display: "none",
});

const SpacedButtonContainer = styled("div")({
  marginTop: "16px",
});

const PicUpload = ({picValue}) => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const formikImg = useFormik({
    initialValues: { pic: "" },
    validationSchema: Yup.object({
      pic: Yup.mixed().required("A file is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      let formData = new FormData();
      formData.append("file", values.pic);

      axios.post(`/api/products/upload`,formData,{
        headers:{
            "Content-Type":"multipart/form-data",
            'Authorization':`Bearer ${getTokenCookie()}`
        }
      }).then( response => {
        picValue(response.data);
      }).catch(error => {
        console.log(error.response.data)
      }).finally(()=>{
        setLoading(false)
      });
    }
  })

  const handleButtonClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={formikImg.handleSubmit}>
          <HiddenInput
            id="file"
            name="file"
            type="file"
            onChange={(event) => {
              formikImg.setFieldValue("pic", event.target.files[0]);
            }}
            ref={fileInputRef}
          />
          {formikImg.errors.pic && formikImg.touched.pic ? (
            <div>Error</div>
          ) : null}

          <SpacedButtonContainer>
            <StyledButton
              variant="outlined"
              color="primary"
              startIcon={<CloudUploadIcon />}
              onClick={handleButtonClick}
            >
              Choose File
            </StyledButton>
          </SpacedButtonContainer>

          <StyledButton
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            type="submit"
          >
            Upload
          </StyledButton>
        </form>
      )}
    </>
  );
};

export default PicUpload;
