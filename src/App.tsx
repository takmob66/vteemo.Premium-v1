import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { VideoProvider } from './contexts/VideoContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import AdminLayout from './components/admin/AdminLayout';

// Pages
import Home from './pages/Home';
import Watch from './pages/Watch';
import Upload from './pages/Upload';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Premium from './pages/Premium';
import Rewards from './pages/Rewards';
import ConnectionTest from './pages/ConnectionTest';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminVideos from './pages/admin/Videos';
import AdminAnalytics from './pages/admin/Analytics';

function App() {
  const location = useLocation();
  
  // Debug current route
  React.useEffect(() => {
    console.log('🔄 Route changed to:', location.pathname);
  }, [location]);

  return (
    <LanguageProvider>
      <AuthProvider>
        <VideoProvider>
          <div className="min-h-screen bg-gray-900 text-white">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/test" element={<ConnectionTest />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              } />
              <Route path="/admin/users" element={
                <AdminLayout>
                  <AdminUsers />
                </AdminLayout>
              } />
              <Route path="/admin/videos" element={
                <AdminLayout>
                  <AdminVideos />
                </AdminLayout>
              } />
              <Route path="/admin/analytics" element={
                <AdminLayout>
                  <AdminAnalytics />
                </AdminLayout>
              } />
              
              {/* Main App Routes */}
              <Route path="/" element={
                <Layout>
                  <Home />
                </Layout>
              } />
              
              <Route path="/watch/:id" element={
                <Layout>
                  <Watch />
                </Layout>
              } />
              
              <Route path="/upload" element={
                <Layout>
                  <Upload />
                </Layout>
              } />
              
              <Route path="/profile/:id" element={
                <Layout>
                  <Profile />
                </Layout>
              } />
              
              <Route path="/premium" element={
                <Layout>
                  <Premium />
                </Layout>
              } />
              
              <Route path="/rewards" element={
                <Layout>
                  <Rewards />
                </Layout>
              } />
              
              {/* Catch all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </VideoProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;