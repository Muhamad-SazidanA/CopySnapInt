import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // navigation helpers
  const navigate = useNavigate();
  const location = useLocation();

  // simple demo auth (preserve original behavior)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.username === "admin" && form.password === "admin123") {
      try { localStorage.setItem('token', 'dummy-admin-token'); } catch { }
      const dest = location.state?.from?.pathname || '/admin/dashboardadmin';
      navigate(dest, { replace: true });
    } else {
      setError("Username atau password salah.");
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen min-h-[100dvh] w-full bg-white flex items-center justify-center px-4 py-10 overflow-hidden">
      {/* subtle premium background accents */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_600px_at_80%_-20%,_rgba(2,63,200,0.06),_transparent_60%),radial-gradient(1000px_500px_at_-10%_110%,_rgba(0,27,102,0.06),_transparent_60%)]"></div>

      <div className="relative w-full max-w-md">
        {/* gradient ring card */}
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-blue-200/60 via-blue-100 to-blue-50 shadow-[0_10px_30px_-10px_rgba(2,63,200,0.25)]">
          <div className="rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200 p-7 sm:p-9">
            <div className="flex flex-col items-center text-center mb-6">
              {/* logo block with subtle glow accent (no outline) */}
              <div className="relative inline-flex items-center justify-center mb-3">
                <span className="pointer-events-none absolute inset-0 -z-10 scale-110 blur-xl opacity-70"
                  style={{
                    background:
                      "radial-gradient(120px 40px at 50% 60%, rgba(2,63,200,0.18), transparent 70%)",
                  }}
                />
                <img
                  src="/images/SnapInt.png"
                  alt="Snapint"
                  className="max-h-10 w-auto object-contain select-none"
                  draggable={false}
                />
              </div>
              <h1 className="text-[22px] sm:text-2xl font-bold tracking-tight text-slate-800">Masuk ke Admin</h1>
              <p className="text-gray-500 text-sm mt-1">Gunakan kredensial admin Anda</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center text-slate-400">
                    {/* user icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Zm0 2c-4.418 0-8 2.239-8 5v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1c0-2.761-3.582-5-8-5Z" /></svg>
                  </span>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-300 bg-white/95 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition placeholder:text-slate-400"
                    placeholder="Masukkan username"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 inline-flex items-center text-slate-400">
                    {/* lock icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17 9V7a5 5 0 1 0-10 0v2H5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1h-2Zm-8 0V7a3 3 0 1 1 6 0v2H9Zm3 5a2 2 0 1 0 0.001 3.999A2 2 0 0 0 12 14Z" /></svg>
                  </span>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-300 bg-white/95 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition placeholder:text-slate-400"
                    placeholder="Masukkan password"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm py-2.5 px-3 text-center">{error}</div>
              )}

              <button
                type="submit"
                className="group w-full h-11 rounded-xl bg-gradient-to-r from-[#023FC8] to-[#001B66] text-white font-semibold shadow-md hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <span className="inline-flex items-center justify-center gap-2">
                  {loading && (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  )}
                  {loading ? "Memproses..." : "Login"}
                </span>
              </button>
            </form>

            <div className="mt-6 text-center text-[11px] text-gray-500">
              © {new Date().getFullYear()} Snapint. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}