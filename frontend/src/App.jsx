import './App.css'
import Listpage from './components/pages/listpage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import AddPostPage from './components/pages/addpostpage'
import CommunityPage from './components/pages/communtitypage'
import ProfilePage from './components/pages/profilepage'
import CommunityViewPage from './components/pages/communityviewpage'
import SingleQuestionPage from './components/pages/Singlequestionpage'
import { ToastContainer } from 'react-toastify'
import PageLayout from './components/layout/PagelLayout'

const App = () => {
  return (
    <>
    <ToastContainer/>
    <Router>
      <div className="h-screen bg-[#030303] text-white overflow-y-auto">
        <Routes>
          {/* Auth Routes - No Sidebar/Header */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Main App Routes */}
          <Route path="/" element={<PageLayout><Listpage /></PageLayout>} />
          <Route path="/add-post" element={<PageLayout><AddPostPage /></PageLayout>} />
          <Route path="/create-community" element={<PageLayout><CommunityPage /></PageLayout>} />
          <Route path="/profile" element={<PageLayout><ProfilePage /></PageLayout>} />
          <Route path="/profile/:id" element={<PageLayout><ProfilePage /></PageLayout>} />
          <Route path="/community/:id" element={<PageLayout><CommunityViewPage /></PageLayout>} />
          <Route path="/post/:id" element={<PageLayout><SingleQuestionPage /></PageLayout>} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
