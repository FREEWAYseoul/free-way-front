import { Navigate, Route, Routes as ReactRouters } from 'react-router-dom';

import Search from '../pages/Search';
import Result from '../pages/Result';
import Layout from '../components/layout/Layout';

const Routes = () => {
  return (
    <ReactRouters>
      <Route element={<Layout />}>
        <Route path='/' element={<Search />} />
        <Route path='/result' element={<Result />} />
        <Route path='*' element={<Navigate replace to='/' />} />
      </Route>
    </ReactRouters>
  );
};

export default Routes;
