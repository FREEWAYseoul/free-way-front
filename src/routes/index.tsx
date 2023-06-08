import { Navigate, Route, Routes as ReactRouters } from 'react-router-dom';

import SearchPage from '../pages/SearchPage';
import Result from '../pages/Result';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';

const Routes = () => {
  return (
    <ReactRouters>
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/result' element={<Result />} />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Route>
    </ReactRouters>
  );
};

export default Routes;
