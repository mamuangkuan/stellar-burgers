import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

// Защищенный маршрут для авторизованных пользователей
const ProtectedRoute: React.FC<{ redirectPath?: string }> = ({
  redirectPath = '/login'
}) => {
  const { user } = useSelector((state) => state.userProfile);
  return user ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

// Публичный маршрут для неавторизованных пользователей
const PublicRoute: React.FC<{ redirectPath?: string }> = ({
  redirectPath = '/'
}) => {
  const { user } = useSelector((state) => state.userProfile);
  return user ? <Navigate to={redirectPath} replace /> : <Outlet />;
};

// Компонент для страницы ингредиента с заголовком
const IngredientPage: React.FC = () => (
  <div className={styles.detailPageWrap}>
    <h1 className={`${styles.detailHeader} ${styles.headerIngredient}`}>
      Детали ингредиента
    </h1>
    <IngredientDetails />
  </div>
);

// Компонент для страницы заказа с заголовком
const OrderInfoPage: React.FC = () => {
  const { number } = useParams<{ number: string }>();

  return (
    <div className={styles.detailPageWrap}>
      <h1 className={`${styles.detailHeader} ${styles.headerOrder}`}>
        #{number}
      </h1>
      <OrderInfo />
    </div>
  );
};

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.ingredients);
  const { isAuthChecked } = useSelector((state) => state.userProfile);
  const order = useSelector((state) => state.orders.selectedOrder);

  // Проверка аутентификации пользователя
  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(checkUserAuthentication());
    }
  }, [dispatch, isAuthChecked]);

  // Загрузка ингредиентов
  useEffect(() => {
    if (!items.length && !isLoading) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, items.length, isLoading]);

  // Проверка наличия фонового расположения для модального окна
  const backgroundLocation = location.state?.background;

  // Обработчик закрытия модального окна
  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfoPage />} />
        <Route path='/ingredients/:id' element={<IngredientPage />} />

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
              <Modal
                title='Детали ингредиента'
                titleClassName={styles.headerIngredient}
                onClose={handleModalClose}
              >
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${order?.number || ''}`}
                titleClassName={styles.headerOrder}
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
                  titleClassName={styles.headerOrder}
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
