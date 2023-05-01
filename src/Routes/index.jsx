import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// LAYOUTS
const BasicLayout = lazy(() => import('../Pages/BasicLayout'));

// MAIN PAGES
const LandingPage = lazy(() => import('../Pages/LandingPage'));
const MainPage = lazy(() => import('../Pages/MainPage'));

import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<></>}>
      <PublicRoutes>
        <LandingPage />
      </PublicRoutes>
    </Suspense>,
  },
  {
    path: "/main",
    element: (
      <Suspense fallback={<>Loading</>}>
        <PrivateRoutes>
          <BasicLayout />
        </PrivateRoutes>
      </Suspense>
    ),
    children: [
      {
        path: "/main",
        element: <Suspense fallback={<></>}><MainPage /></Suspense>,
      }
    ]
  },
  {
    path: "*",
    element: <Suspense fallback={<></>}><LandingPage /></Suspense>
  }
]
);

export default router;