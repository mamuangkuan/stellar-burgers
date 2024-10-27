import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
  useLocation
} from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { OrderInfo, IngredientDetails, Modal } from '@components';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/ingredientsSlice';
import { checkUserAuthentication } from '../../services/userProfileSlice';

const ProtectedRoute: React.FC<{ redirectPath?: string }> = ({
  redirectPath = '/login'
}) => {
  const { user } = useSelector((state) => state.userProfile);
  return user ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

const PublicRoute: React.FC<{ redirectPath?: string }> = ({
  redirectPath = '/'
}) => {
  const { user } = useSelector((state) => state.userProfile);
  return user ? <Navigate to={redirectPath} replace /> : <Outlet />;
};

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.ingredients);
  const { isAuthChecked } = useSelector((state) => state.userProfile);
  const order = useSelector((state) => state.orders.selectedOrder);

  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(checkUserAuthentication());
    }
  }, [dispatch, isAuthChecked]);

  useEffect(() => {
    if (!items.length && !isLoading) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, items.length, isLoading]);

  const backgroundLocation = location.state?.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        <Route element={<PublicRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
        </Route>

        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${order?.number || ''}`}
                onClose={handleModalClose}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path='/profile/orders/:number'
              element={
                <Modal
                  title={`#${order?.number || ''}`}
                  onClose={handleModalClose}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          </Route>
        </Routes>
      )}
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
