import { Navigate, Route, Routes as ReactRouters } from 'react-router-dom';

import SearchPage from '../pages/SearchPage';
import ResultPage from '../pages/ResultPage';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';

const Routes = () => {
  return (
    <ReactRouters>
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/result' element={<ResultPage />} />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Route>
    </ReactRouters>
  );
};

export default Routes;
