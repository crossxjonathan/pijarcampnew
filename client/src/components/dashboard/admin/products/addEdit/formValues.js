import * as Yup from "yup";

export const formValues = {
  name: "",
  images: [],
};

export const getValuesToEdit = (product) => {
  return {
    name: product.name,
    images: product.images,
  };
};

export const validation = () =>
  Yup.object({
    name: Yup.string().required("Sorry, the name is required"),
  });
