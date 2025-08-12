import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { MedicalCard, MedicalCardContent, MedicalCardDescription, MedicalCardHeader, MedicalCardTitle } from '@/components/ui/medical-card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Users, UserPlus, Activity, Calendar, Shield, LogOut, Search, Plus, Edit, Trash2, BarChart3 } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  status: 'active' | 'inactive';
  createdAt: string;
}

interface SystemStats {
  totalUsers: number;
  totalDoctors: number;
  totalPatients: number;
  totalAppointments: number;
  completedAppointments: number;
  pendingAppointments: number;
}

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'patient' as 'patient' | 'doctor' | 'admin'
  });

  const users: User[] = [
    { id: '1', name: 'Dr. Sarah Johnson', email: 'sarah.johnson@hospital.com', role: 'doctor', status: 'active', createdAt: '2024-01-15' },
    { id: '2', name: 'Dr. Michael Chen', email: 'michael.chen@hospital.com', role: 'doctor', status: 'active', createdAt: '2024-02-20' },
    { id: '3', name: 'John Smith', email: 'john.smith@email.com', role: 'patient', status: 'active', createdAt: '2024-03-10' },
    { id: '4', name: 'Mary Johnson', email: 'mary.johnson@email.com', role: 'patient', status: 'active', createdAt: '2024-03-15' },
    { id: '5', name: 'Admin User', email: 'admin@hospital.com', role: 'admin', status: 'active', createdAt: '2024-01-01' },
  ];

  const systemStats: SystemStats = {
    totalUsers: users.length,
    totalDoctors: users.filter(u => u.role === 'doctor').length,
    totalPatients: users.filter(u => u.role === 'patient').length,
    totalAppointments: 156,
    completedAppointments: 132,
    pendingAppointments: 24,
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "User Added",
      description: `${newUser.name} has been added successfully.`,
    });

    // Reset form
    setNewUser({ name: '', email: '', role: 'patient' });
    setShowAddUser(false);
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    toast({
      title: "User Deleted",
      description: `${userName} has been removed from the system.`,
      variant: "destructive",
    });
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-destructive';
      case 'doctor': return 'bg-primary';
      case 'patient': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-success' : 'bg-muted';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-medical text-white shadow-medical">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Admin Portal</h1>
                <p className="text-white/80">System Administration</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={logout} className="border-white/20 text-white hover:bg-white/10">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* System Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <MedicalCard>
            <MedicalCardContent className="p-6">
              <div className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">{systemStats.totalUsers}</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </div>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard>
            <MedicalCardContent className="p-6">
              <div className="text-center">
                <Activity className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-accent">{systemStats.totalDoctors}</div>
                <div className="text-sm text-muted-foreground">Doctors</div>
              </div>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard>
            <MedicalCardContent className="p-6">
              <div className="text-center">
                <UserPlus className="h-8 w-8 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-success">{systemStats.totalPatients}</div>
                <div className="text-sm text-muted-foreground">Patients</div>
              </div>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard>
            <MedicalCardContent className="p-6">
              <div className="text-center">
                <Calendar className="h-8 w-8 text-warning mx-auto mb-2" />
                <div className="text-2xl font-bold text-warning">{systemStats.totalAppointments}</div>
                <div className="text-sm text-muted-foreground">Total Appointments</div>
              </div>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard>
            <MedicalCardContent className="p-6">
              <div className="text-center">
                <BarChart3 className="h-8 w-8 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-success">{systemStats.completedAppointments}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard>
            <MedicalCardContent className="p-6">
              <div className="text-center">
                <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-primary">{systemStats.pendingAppointments}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* User Management */}
          <div className="lg:col-span-3 space-y-6">
            <MedicalCard>
              <MedicalCardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <MedicalCardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      User Management
                    </MedicalCardTitle>
                    <MedicalCardDescription>
                      Manage system users and their permissions
                    </MedicalCardDescription>
                  </div>
                  <Button onClick={() => setShowAddUser(!showAddUser)} variant="medical">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </MedicalCardHeader>
              <MedicalCardContent>
                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterRole} onValueChange={setFilterRole}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="patient">Patient</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Add User Form */}
                {showAddUser && (
                  <div className="p-4 bg-muted/50 rounded-lg mb-6">
                    <h4 className="font-medium mb-4">Add New User</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={newUser.name}
                          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                          placeholder="Enter full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                          placeholder="Enter email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Select value={newUser.role} onValueChange={(value: 'patient' | 'doctor' | 'admin') => setNewUser({ ...newUser, role: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="patient">Patient</SelectItem>
                            <SelectItem value="doctor">Doctor</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button onClick={handleAddUser} variant="success">Add User</Button>
                      <Button onClick={() => setShowAddUser(false)} variant="outline">Cancel</Button>
                    </div>
                  </div>
                )}

                {/* Users List */}
                <div className="space-y-3">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="p-4 border border-border rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-medical rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">Joined: {user.createdAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleDeleteUser(user.id, user.name)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* System Overview */}
          <div className="space-y-6">
            <MedicalCard>
              <MedicalCardHeader>
                <MedicalCardTitle>System Health</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Server Status</span>
                    <Badge className="bg-success">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <Badge className="bg-success">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Backup Status</span>
                    <Badge className="bg-success">Up to date</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Update</span>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            <MedicalCard>
              <MedicalCardHeader>
                <MedicalCardTitle>Recent Activity</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                    <UserPlus className="h-4 w-4 text-success" />
                    <div className="text-sm">
                      <p className="font-medium">New user registered</p>
                      <p className="text-muted-foreground">Mary Johnson - Patient</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div className="text-sm">
                      <p className="font-medium">Appointment completed</p>
                      <p className="text-muted-foreground">Dr. Sarah Johnson</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                    <Activity className="h-4 w-4 text-accent" />
                    <div className="text-sm">
                      <p className="font-medium">System backup completed</p>
                      <p className="text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;