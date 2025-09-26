'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import {
  Business as BusinessIcon,
  Handshake as HandshakeIcon,
  People as PeopleIcon,
  Event as EventIcon,
  School as SchoolIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import AdminLayout from '@/components/UI/AdminLayout';
import Link from 'next/link';

// Define types
interface DashboardStats {
  sponsors: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  };
  endorsers: {
    total: number;
    pending: number;
    approved: number;
  };
  students: {
    total: number;
    active: number;
  };
  programs: {
    total: number;
    active: number;
  };
  events: {
    total: number;
    upcoming: number;
  };
}

interface RecentItem {
  _id: string;
  name: string;
  type: string;
  status: string;
  date: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // State variables
  const [stats, setStats] = useState<DashboardStats>({
    sponsors: { total: 0, pending: 0, approved: 0, rejected: 0 },
    endorsers: { total: 0, pending: 0, approved: 0 },
    students: { total: 0, active: 0 },
    programs: { total: 0, active: 0 },
    events: { total: 0, upcoming: 0 }
  });
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Check authentication
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/account/login?callbackUrl=/admin/dashboard');
    } else if (status === 'authenticated' && !(session?.user as any)?.isAdmin) {
      // If user is logged in but not an admin
      router.push('/');
    }
  }, [session, status, router]);
  
  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (status !== 'authenticated' || !session?.user?.isAdmin) return;
      
      try {
        setLoading(true);
        
        // Fetch sponsors stats
        const sponsorsResponse = await fetch('/api/admin/sponsors?limit=1000');
        const sponsorsData = await sponsorsResponse.json();
        
        if (sponsorsData.success) {
          const sponsors = sponsorsData.sponsors;
          setStats(prev => ({
            ...prev,
            sponsors: {
              total: sponsors.length,
              pending: sponsors.filter((s: any) => s.status === 'pending').length,
              approved: sponsors.filter((s: any) => s.status === 'approved').length,
              rejected: sponsors.filter((s: any) => s.status === 'rejected').length
            }
          }));
          
          // Add recent sponsors to the list
          const recentSponsors = sponsors
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 5)
            .map((sponsor: any) => ({
              _id: sponsor._id,
              name: sponsor.company_name,
              type: 'sponsor',
              status: sponsor.status,
              date: sponsor.createdAt
            }));
          
          setRecentItems(recentSponsors);
        }
        
        // In a real implementation, you would fetch other stats here
        // For now, we'll use dummy data for other sections
        
        setStats(prev => ({
          ...prev,
          endorsers: { total: 24, pending: 5, approved: 19 },
          students: { total: 156, active: 132 },
          programs: { total: 8, active: 5 },
          events: { total: 12, upcoming: 3 }
        }));
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [session, status]);
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };
  
  if (status === 'loading' || (status === 'authenticated' && !session?.user?.isAdmin)) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (status === 'unauthenticated') {
    return null; // Redirect handled by useEffect
  }
  
  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {/* Sponsors Card */}
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <BusinessIcon />
                      </Avatar>
                      <Typography variant="h6">Sponsors</Typography>
                    </Box>
                    
                    <Typography variant="h3" component="div" gutterBottom>
                      {stats.sponsors.total}
                    </Typography>
                    
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <Typography variant="body2" color="text.secondary">
                          Pending
                        </Typography>
                        <Typography variant="h6" color="warning.main">
                          {stats.sponsors.pending}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2" color="text.secondary">
                          Approved
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          {stats.sponsors.approved}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2" color="text.secondary">
                          Rejected
                        </Typography>
                        <Typography variant="h6" color="error.main">
                          {stats.sponsors.rejected}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button 
                      component={Link}
                      href="/admin/sponsors"
                      size="small" 
                      endIcon={<ArrowForwardIcon />}
                    >
                      Manage Sponsors
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              
              {/* Endorsers Card */}
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                        <HandshakeIcon />
                      </Avatar>
                      <Typography variant="h6">Endorsers</Typography>
                    </Box>
                    
                    <Typography variant="h3" component="div" gutterBottom>
                      {stats.endorsers.total}
                    </Typography>
                    
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Pending
                        </Typography>
                        <Typography variant="h6" color="warning.main">
                          {stats.endorsers.pending}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Approved
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          {stats.endorsers.approved}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button 
                      component={Link}
                      href="/admin/endorsements"
                      size="small" 
                      endIcon={<ArrowForwardIcon />}
                    >
                      Manage Endorsers
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              
              {/* Students Card */}
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                        <PeopleIcon />
                      </Avatar>
                      <Typography variant="h6">Students</Typography>
                    </Box>
                    
                    <Typography variant="h3" component="div" gutterBottom>
                      {stats.students.total}
                    </Typography>
                    
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Active
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          {stats.students.active}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Inactive
                        </Typography>
                        <Typography variant="h6">
                          {stats.students.total - stats.students.active}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button 
                      component={Link}
                      href="/admin/students"
                      size="small" 
                      endIcon={<ArrowForwardIcon />}
                    >
                      Manage Students
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              
              {/* Programs Card */}
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                        <SchoolIcon />
                      </Avatar>
                      <Typography variant="h6">Programs</Typography>
                    </Box>
                    
                    <Typography variant="h3" component="div" gutterBottom>
                      {stats.programs.total}
                    </Typography>
                    
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Active
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          {stats.programs.active}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Inactive
                        </Typography>
                        <Typography variant="h6">
                          {stats.programs.total - stats.programs.active}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button 
                      component={Link}
                      href="/admin/programs"
                      size="small" 
                      endIcon={<ArrowForwardIcon />}
                    >
                      Manage Programs
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              
              {/* Events Card */}
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                        <EventIcon />
                      </Avatar>
                      <Typography variant="h6">Events</Typography>
                    </Box>
                    
                    <Typography variant="h3" component="div" gutterBottom>
                      {stats.events.total}
                    </Typography>
                    
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Upcoming
                        </Typography>
                        <Typography variant="h6" color="primary.main">
                          {stats.events.upcoming}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Past
                        </Typography>
                        <Typography variant="h6">
                          {stats.events.total - stats.events.upcoming}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button 
                      component={Link}
                      href="/admin/events"
                      size="small" 
                      endIcon={<ArrowForwardIcon />}
                    >
                      Manage Events
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
            
            {/* Recent Activity */}
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              
              {recentItems.length > 0 ? (
                <List>
                  {recentItems.map((item) => (
                    <ListItem key={item._id} divider>
                      <ListItemAvatar>
                        <Avatar>
                          {item.type === 'sponsor' ? <BusinessIcon /> : <HandshakeIcon />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={`${item.type.charAt(0).toUpperCase() + item.type.slice(1)} - ${formatDate(item.date)}`}
                      />
                      <Chip 
                        label={item.status} 
                        color={getStatusColor(item.status) as any}
                        size="small"
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body1" sx={{ py: 2 }}>
                  No recent activity found.
                </Typography>
              )}
            </Paper>
          </>
        )}
      </Box>
    </AdminLayout>
  );
}