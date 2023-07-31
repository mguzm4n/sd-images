import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import ECommerce from './pages/Dashboard/Body';
import Loader from './common/Loader';

const Map = lazy(() => import('./pages/Map'));
const Chart = lazy(() => import('./pages/Chart'));
const Tables = lazy(() => import('./pages/Tables'));
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<ECommerce />} />
          <Route
            path="/map"
            element={
              <Suspense fallback={<Loader />}>
                <Map/>
              </Suspense>
            }
          />
          <Route
            path="/last-events"
            element={
              <Suspense fallback={<Loader />}>
                <Tables />
              </Suspense>
            }
          />
          <Route
            path="/alerts"
            element={
              <Suspense fallback={<Loader />}>
                <Chart />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
