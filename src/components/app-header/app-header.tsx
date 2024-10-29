import { FC, useEffect, useState } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector((state) => state.userProfile.user?.name);
  return <AppHeaderUI userName={userName ? userName : 'Личный кабинет'} />;
};
