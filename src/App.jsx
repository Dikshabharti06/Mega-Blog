import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import authService from "./appwrite/auth";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { login, logout } from "./store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

useEffect(() => {
  authService.getCurrentUser()
    .then((userData) => {
      if (userData) dispatch(login({ userData }));
      else dispatch(logout());
    })
    .finally(() => setLoading(false));
}, [dispatch]);


  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
