import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import Welcome from './components/Welcome';
import ProfileForm from './components/ProfileForm';
import ProjectList from './components/ProjectList';
import ProjectForm from './components/ProjectForm';
import ProfilePreview from './components/ProfilePreview';
import { Code } from 'lucide-react';

const App: React.FC = () => {
  return (
    <ProfileProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <div className="flex items-center">
                  <Code size={28} className="text-blue-600" />
                  <h1 className="ml-2 text-xl font-bold text-gray-900">Builder Portfolio</h1>
                </div>
              </div>
            </div>
          </header>
          
          <main className="py-10">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/profile" element={<ProfileForm />} />
              <Route path="/projects" element={<ProjectList />} />
              <Route path="/projects/new" element={<ProjectForm />} />
              <Route path="/projects/edit/:projectId" element={<ProjectForm />} />
              <Route path="/preview" element={<ProfilePreview />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <footer className="bg-white border-t border-gray-200 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Builder Portfolio - Built with ChatAndBuild
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </ProfileProvider>
  );
};

export default App;
