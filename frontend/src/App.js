import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { Toaster } from "react-hot-toast";
import useUserRoutes from "./components/routes/userRoutes";
import useAdminRoutes from "./components/routes/adminRoutes";
import NoFound from "./components/layout/NoFound";


function App() {
  let userRoutes = useUserRoutes();
  let adminRoutes = useAdminRoutes();
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />

        <Routes>
          {userRoutes}
          {adminRoutes}
          <Route path="*" element={<NoFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
