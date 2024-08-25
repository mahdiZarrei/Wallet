import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import Wallet from "../pages/wallet";
import Main from "../pages/main";
import Not from "../pages/404";
import CreateWallet from "../pages/createWallet";
import Analysis from "../pages/Analysis";
export const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Main />
      </Suspense>
    ),
  },
  {
    path: "Wallet",

    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Wallet />
      </Suspense>
    ),
  },
  {
    path: "CreateWallet",

    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <CreateWallet />
      </Suspense>
    ),
  },
  {
    path: "analysis",

    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Analysis />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Not />
      </Suspense>
    ),
  },
]);
