import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
    Navigate,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home.tsx";

import SignIn from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.tsx";
import Journal from "./pages/Journal.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import DocumentPage from "./pages/DocumentPage.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="/" element={<Home />} index={true} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="" element={<PrivateRoute />}>
                <Route path="/journal" element={<Journal />}>
                    <Route path=":id" element={<DocumentPage />} />
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </Provider>
);
