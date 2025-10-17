'use client';

import { useState, useEffect } from 'react';
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
  Chip,

} from '@mui/material';
import {
  Business as BusinessIcon,
  Handshake as HandshakeIcon,
  People as PeopleIcon,
  ArrowForward as ArrowForwardIcon,
  Newspaper as NewspaperIcon,
  Description as DescriptionIcon,
  Groups as GroupsIcon,
  Event as EventIcon
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

  mediaPartners: {
    total: number;
    active: number;
  };
  nrcApplications: {
    total: number;
    pending: number;
    approved: number;
  };
  partners: {
    total: number;
    active: number;
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
  //const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // State variables
  const [stats, setStats] = useState<DashboardStats>({
    sponsors: { total: 0, pending: 0, approved: 0, rejected: 0 },
    endorsers: { total: 0, pending: 0, approved: 0 },
    mediaPartners: { total: 0, active: 0 },
    nrcApplications: { total: 0, pending: 0, approved: 0 },
    partners: { total: 0, active: 0 },

  });
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // No authentication check needed
  useEffect(() => {
    // Allow access to the dashboard without authentication
  }, []);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      // No authentication check needed
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

        // Fetch public nominations stats
        const publicNominationsResponse = await fetch('/api/v1/nrc/admin/public-nominations');
        const publicNominationsData = await publicNominationsResponse.json();

        if (publicNominationsData.success) {
          const stats = publicNominationsData.data.stats;
          const total = publicNominationsData.data.pagination.total;
          const pending = stats.find((s: any) => s._id === 'PUBLIC_NOMINATION')?.count || 0;
          const approved = stats.find((s: any) => s._id === 'VERIFIED')?.count || 0;

          setStats(prev => ({
            ...prev,
            nrcApplications: { total, pending, approved },
          }));
        }

        // Set other stats to 0 or fetch from their respective endpoints
        setStats(prev => ({
          ...prev,
          endorsers: { total: 0, pending: 0, approved: 0 },
          mediaPartners: { total: 0, active: 0 },
          partners: { total: 0, active: 0 },
        }));

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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

  // No authentication checks needed

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
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
                      <Grid size={{ xs: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          Pending
                        </Typography>
                        <Typography variant="h6" color="warning.main">
                          {stats.sponsors.pending}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          Approved
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          {stats.sponsors.approved}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 4 }}>
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
              <Grid size={{ xs: 12, sm: 12, md: 12 }}>
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
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                          Pending
                        </Typography>
                        <Typography variant="h6" color="warning.main">
                          {stats.endorsers.pending}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 6 }}>
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



              {/* Media Partners Card */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                        <NewspaperIcon />
                      </Avatar>
                      <Typography variant="h6">Media Partners</Typography>
                    </Box>

                    <Typography variant="h3" component="div" gutterBottom>
                      {stats.mediaPartners.total}
                    </Typography>

                    <Grid container spacing={1}>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                          Active
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          {stats.mediaPartners.active}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                          Inactive
                        </Typography>
                        <Typography variant="h6">
                          {stats.mediaPartners.total - stats.mediaPartners.active}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      component={Link}
                      href="/admin/media-partners"
                      size="small"
                      endIcon={<ArrowForwardIcon />}
                    >
                      Manage Media Partners
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              {/* Public Nominations Card */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                        <PeopleIcon />
                      </Avatar>
                      <Typography variant="h6">Public Nominations</Typography>
                    </Box>

                    <Typography variant="h3" component="div" gutterBottom>
                      {stats.nrcApplications.total}
                    </Typography>

                    <Grid container spacing={1}>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                          Pending
                        </Typography>
                        <Typography variant="h6" color="warning.main">
                          {stats.nrcApplications.pending}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                          Reviewed
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          {stats.nrcApplications.approved}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      component={Link}
                      href="/admin/public-nominations"
                      size="small"
                      endIcon={<ArrowForwardIcon />}
                    >
                      View Nominations
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