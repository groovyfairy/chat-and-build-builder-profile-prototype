import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, Project } from '../types';

interface ProfileContextType {
  profile: Profile | null;
  updateProfile: (profile: Profile) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const defaultProfile: Profile = {
  id: '1',
  name: '',
  title: '',
  bio: '',
  avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
  location: '',
  email: '',
  skills: [],
  projects: []
};

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // Load profile from localStorage on component mount
    const savedProfile = localStorage.getItem('builderProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      setProfile(defaultProfile);
    }
  }, []);

  useEffect(() => {
    // Save profile to localStorage whenever it changes
    if (profile) {
      localStorage.setItem('builderProfile', JSON.stringify(profile));
    }
  }, [profile]);

  const updateProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
  };

  const addProject = (project: Project) => {
    if (!profile) return;
    
    setProfile({
      ...profile,
      projects: [...profile.projects, project]
    });
  };

  const updateProject = (updatedProject: Project) => {
    if (!profile) return;
    
    setProfile({
      ...profile,
      projects: profile.projects.map(project => 
        project.id === updatedProject.id ? updatedProject : project
      )
    });
  };

  const deleteProject = (projectId: string) => {
    if (!profile) return;
    
    setProfile({
      ...profile,
      projects: profile.projects.filter(project => project.id !== projectId)
    });
  };

  return (
    <ProfileContext.Provider value={{ 
      profile, 
      updateProfile, 
      addProject, 
      updateProject, 
      deleteProject 
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
