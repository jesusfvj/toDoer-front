import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";

const Header = lazy(() => import('../Components/Base/Header'));
const Menu = lazy(() => import('../Components/Base/Menu'));


export default function BasicLayout() {

  return (
    <div className=''>
      <Suspense fallback={<></>}>
        <Header />
        <div className="h-[95vh] w-screen flex">
          <Menu />
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
}