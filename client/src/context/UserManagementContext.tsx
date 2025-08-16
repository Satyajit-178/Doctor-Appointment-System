import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  status: 'active' | 'inactive';
  createdAt: string;
  specialization?: string; // For doctors
  phone?: string;
  timeSlots?: string[]; // Available time slots for doctors
}

interface UserManagementContextType {
  users: User[];
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getDoctors: () => User[];
  getPatients: () => User[];
  getAdmins: () => User[];
  getUserById: (id: string) => User | undefined;
}

const UserManagementContext = createContext<UserManagementContextType | undefined>(undefined);

export const useUserManagement = () => {
  const context = useContext(UserManagementContext);
  if (context === undefined) {
    throw new Error('useUserManagement must be used within a UserManagementProvider');
  }
  return context;
};

export const UserManagementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([
    { 
      id: '1', 
      name: 'Dr. Sarah Johnson', 
      email: 'sarah.johnson@hospital.com', 
      role: 'doctor', 
      status: 'active', 
      createdAt: '2024-01-15',
      specialization: 'Cardiology',
      phone: '+1-555-0101',
      timeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00']
    },
    { 
      id: '2', 
      name: 'Dr. Michael Chen', 
      email: 'michael.chen@hospital.com', 
      role: 'doctor', 
      status: 'active', 
      createdAt: '2024-02-20',
      specialization: 'Pediatrics',
      phone: '+1-555-0102',
      timeSlots: ['09:30', '10:30', '13:00', '14:30', '16:00']
    },
    { 
      id: '3', 
      name: 'Dr. Emily Rodriguez', 
      email: 'emily.rodriguez@hospital.com', 
      role: 'doctor', 
      status: 'active', 
      createdAt: '2024-03-01',
      specialization: 'Neurology',
      phone: '+1-555-0103',
      timeSlots: ['08:00', '09:00', '10:00', '13:30', '15:30']
    },
  ]);

  const addUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...updates } : user
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const getDoctors = () => users.filter(user => user.role === 'doctor');
  const getPatients = () => users.filter(user => user.role === 'patient');
  const getAdmins = () => users.filter(user => user.role === 'admin');
  const getUserById = (id: string) => users.find(user => user.id === id);

  const value: UserManagementContextType = {
    users,
    addUser,
    updateUser,
    deleteUser,
    getDoctors,
    getPatients,
    getAdmins,
    getUserById,
  };

  return (
    <UserManagementContext.Provider value={value}>
      {children}
    </UserManagementContext.Provider>
  );
};