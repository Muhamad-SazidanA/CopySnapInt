import { createBrowserRouter, Navigate } from "react-router-dom";
import Template from "../layout/Template";
import AdminTemplate from "../layout/AdminTemplate";
import RequireAuth from "../components/RequireAuth";
import Dashboard from "../pages/Dashboard";

import Finance from "../pages/users/Solusi/Finance";
import HumanResource from "../pages/users/Solusi/HumanResource";
import Logistic from "../pages/users/Solusi/Logistic";
import AboutUsPage from "../pages/users/AboutUsPage";
import ContactUsPage from "../pages/users/ContactUsPage";
import RequestDemoPage from "../pages/RequestDemoPage";
import BlogPage from "../pages/users/BlogPage";
import CaseStudiesPage from "../pages/users/CaseStudiesPage";
import AdminDashboard from "../pages/admins/AdminDashboard";
import AdminBlog from "../pages/admins/AdminBlog";
import AdminCaseStudy from "../pages/admins/AdminCaseStudy";
import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        children: [
            {
                path: "",
                element: <Dashboard />,
            },
            {
                path: "demo",
                element: <RequestDemoPage />,
            },
            {
                path: "request-demo",
                element: <RequestDemoPage />,
            },
            {
                path: "solusi/finance",
                element: <Finance />,
            },
            {
                path: "finance",
                element: <Finance />,
            },
            {
                path: "solusi/human-resource",
                element: <HumanResource />,
            },
            {
                path: "human-resource",
                element: <HumanResource />,
            },
            {
                path: "solusi/logistic",
                element: <Logistic />,
            },
            {
                path: "logistic",
                element: <Logistic />,
            },
            {
                path: "about",
                element: <AboutUsPage />,
            },
            {
                path: "blog",
                element: <BlogPage />,
            },
            {
                path: "case-studies",
                element: <CaseStudiesPage />,
            },
            {
                path: "contact",
                element: <ContactUsPage />,
            },
            {
                path: "*",
                element: <Navigate to="/" replace />,
            },
        ],
    },
    {
        path: "/admin",
        element: (
            <RequireAuth>
                <AdminTemplate />
            </RequireAuth>
        ),
        children: [
            {
                path: "dashboardadmin",
                element: <AdminDashboard />,
            },
            {
                path: "blog",
                element: <AdminBlog />,
            },
            {
                path: "casestudy",
                element: <AdminCaseStudy />,
            },
        ],
    },
    {
        path: "login",
        element: <LoginPage />,
    },
]);