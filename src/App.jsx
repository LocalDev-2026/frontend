import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Layout from './components/Layout';
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListingDetails from './pages/ListingDetails';
import HostDashboard from './pages/HostDashboard';
import AddListing from './pages/AddListing';
import SubmitContentRequest from './pages/SubmitContentRequest';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import BusinessPage from './pages/BusinessPage';

function App() {
  return (
    <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/listings/:id" element={<ListingDetails />} />
              <Route path="/business/:id" element={<BusinessPage />} />

              {/* Host Routes */}
              <Route path="/host" element={<HostDashboard />} />
              <Route path="/host/add-listing" element={<AddListing />} />
              <Route path="/host/submit-request" element={<SubmitContentRequest />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />

              <Route path="/login" element={<Login />} />
            </Routes>
          </Layout>
        </Router>
    </AuthProvider>
  );
}

export default App;
