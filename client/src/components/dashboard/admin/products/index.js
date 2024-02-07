import React, { useEffect, useReducer, useState } from 'react';
import DashboardLayout from 'components/dashboard/dashboardLayout';
import ProductsTable from './productsTables';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { productsByPaginate, productRemove } from 'store/actions/product.actions';

const defaultValues = { keywords: '', products: [], page: 1 };

const AdminProducts = () => {
  const [modalState, setModalState] = useState(false);
  const [toRemove, setToRemove] = useState(null);

  const products = useSelector((state) => state.products);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValues, setSearchValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    defaultValues
  );

  const gotoEdit = (id) => {
    navigate(`/dashboard/admin/edit_products/${id}`);
  };

  const gotoPage = (page) => {
    setSearchValues({ page: page });
  };

  const handleClose = () => {
    setModalState(false);
  };

  const handleModal = (id) => {
    setToRemove(id);
    setModalState(true);
  };

  const handleRemove = () => {
    if (toRemove) {
      dispatch(productRemove(toRemove));
    }
    setModalState(false);
  };

  useEffect(() => {
    dispatch(productsByPaginate(searchValues));
  }, [dispatch, searchValues]);

  useEffect(() => {
    handleClose();
    setToRemove(null);
    if (notifications && notifications.removeItem) {
      dispatch(productsByPaginate(searchValues));
    }
  }, [dispatch, notifications]);

  return (
    <DashboardLayout title="Products">
      <div className="products_table">
        <input
          type="text"
          placeholder="Search..."
          value={searchValues.keywords}
          onChange={(e) => setSearchValues({ keywords: e.target.value, page: 1 })}
        />
        <hr />
        <ProductsTable
          removeModal={modalState}
          prods={products.byPaginate}
          prev={(page) => gotoPage(page)}
          next={(page) => gotoPage(page)}
          gotoEdit={(id) => gotoEdit(id)}
          handleClose={() => handleClose()}
          handleModal={(id) => handleModal(id)}
          handleRemove={() => handleRemove()}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminProducts;
