import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// Minimal auth gate: checks for a token in localStorage.
export default function RequireAuth({ children }) {
    let isAuthed = false;
    try {
        isAuthed = Boolean(localStorage.getItem("token"));
    } catch {
        isAuthed = false;
    }
    const location = useLocation();

    if (!isAuthed) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return children;
}
