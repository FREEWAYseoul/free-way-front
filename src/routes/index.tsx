import { Navigate, Route, Routes as ReactRouters } from 'react-router-dom';

import SearchPage from '../pages/SearchPage';
import ResultPage from '../pages/ResultPage';
import Layout from '../components/layout/Layout';
import HomePage from '../pages/HomePage';
import SafetyAlertPage from '../pages/SafetyAlertPage';
import SettingPage from '../pages/SettingPage';
import SettingTabList from '../components/domain/setting/SettingTabList';
import IframeView from '../components/domain/setting/IframeView';

const Routes = () => {
  return (
    <ReactRouters>
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/result' element={<ResultPage />} />
        <Route path='/safetyAlert' element={<SafetyAlertPage />} />
        <Route path='/setting' element={<SettingPage />}>
          <Route index element={<SettingTabList />} />
          <Route path=':tabname' element={<IframeView />} />
        </Route>
        <Route path='*' element={<Navigate replace to='/' />} />
      </Route>
    </ReactRouters>
  );
};

export default Routes;
