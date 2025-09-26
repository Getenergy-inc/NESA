'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  Grid,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import AdminLayout from '@/components/UI/AdminLayout';
import SponsorDetailsDialog from '@/components/UI/Admin/SponsorDetailsDialog';

// Use the ISponsor interface from the model and add _id
import { ISponsor } from '@/lib/models/Sponsor';

interface Sponsor extends ISponsor {
  _id: string;
  admin_notes?: string;
}

// Define pagination type
interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export default function AdminSponsorsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // State variables
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0
  });
  
  // Dialog states
  const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  
  // Stats
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });
  
  // No authentication check needed
  
  // Fetch sponsors
  const fetchSponsors = async () => {
    try {
      setLoading(true);
      setError('');
      
      const queryParams = new URLSearchParams({
        status: statusFilter,
        plan: planFilter,
        search: searchQuery,
        page: pagination.page.toString(),
        limit: pagination.limit.toString()
      });
      
      const response = await fetch(`/api/admin/sponsors?${queryParams}`);
      const data = await response.json();
      
      if (data.success) {
        setSponsors(data.sponsors);
        setPagination(data.pagination);
        
        // Calculate stats
        const allSponsors = await fetch('/api/admin/sponsors?limit=1000');
        const allData = await allSponsors.json();
        
        if (allData.success) {
          const allItems = allData.sponsors;
          setStats({
            total: allItems.length,
            pending: allItems.filter((s: Sponsor) => s.status === 'pending').length,
            approved: allItems.filter((s: Sponsor) => s.status === 'approved').length,
            rejected: allItems.filter((s: Sponsor) => s.status === 'rejected').length
          });
        }
      } else {
        setError(data.error || 'Failed to fetch sponsors');
      }
    } catch (err) {
      setError('An error occurred while fetching sponsors');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (session?.user?.isAdmin) {
      fetchSponsors();
    }
  }, [session, statusFilter, planFilter, pagination.page, pagination.limit]);
  
  // Handle search
  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchSponsors();
  };
  
  // Handle status change
  const handleStatusChange = async () => {
    if (!selectedSponsor || !newStatus) return;
    
    try {
      setActionLoading(true);
      
      const response = await fetch('/api/admin/sponsors', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: selectedSponsor._id,
          status: newStatus,
          adminNotes
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update the sponsor in the list
        setSponsors(prev => 
          prev.map(sponsor => 
            sponsor._id === selectedSponsor._id 
              ? ({ ...sponsor, status: newStatus, admin_notes: adminNotes } as Sponsor)
              : sponsor
          )
        );
        
        // Update stats
        setStats(prev => {
          const oldStatus = selectedSponsor.status;
          return {
            ...prev,
            [oldStatus]: prev[oldStatus as keyof typeof prev] - 1,
            [newStatus]: prev[newStatus as keyof typeof prev] + 1
          };
        });
        
        setStatusDialogOpen(false);
      } else {
        setError(data.error || 'Failed to update sponsor status');
      }
    } catch (err) {
      setError('An error occurred while updating sponsor status');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };
  
  // Handle delete
  const handleDelete = async () => {
    if (!selectedSponsor) return;
    
    try {
      setActionLoading(true);
      
      const response = await fetch(`/api/admin/sponsors?id=${selectedSponsor._id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Remove the sponsor from the list
        setSponsors(prev => prev.filter(sponsor => sponsor._id !== selectedSponsor._id));
        
        // Update stats
        setStats(prev => {
          const status = selectedSponsor.status;
          return {
            ...prev,
            total: prev.total - 1,
            [status]: prev[status as keyof typeof prev] - 1
          };
        });
        
        setDeleteDialogOpen(false);
      } else {
        setError(data.error || 'Failed to delete sponsor');
      }
    } catch (err) {
      setError('An error occurred while deleting sponsor');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };
  
  // Open status dialog
  const openStatusDialog = (sponsor: Sponsor, status: string) => {
    setSelectedSponsor(sponsor);
    setNewStatus(status);
    setAdminNotes(sponsor.admin_notes || '');
    setStatusDialogOpen(true);
  };
  
  // Open delete dialog
  const openDeleteDialog = (sponsor: Sponsor) => {
    setSelectedSponsor(sponsor);
    setDeleteDialogOpen(true);
  };
  
  // Open details dialog
  const openDetailsDialog = (sponsor: Sponsor) => {
    setSelectedSponsor(sponsor);
    setDetailsDialogOpen(true);
  };
  
  // Get status chip color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };
  
  // Get plan chip color
  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'platinum': return 'primary';
      case 'gold': return 'warning';
      case 'silver': return 'secondary';
      case 'bronze': return 'default';
      default: return 'default';
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // No authentication checks needed
  
  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Sponsor Management
        </Typography>
        
        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{xs: 12, sm:6, md:3}} >
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Sponsors
                </Typography>
                <Typography variant="h4">{stats.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{xs: 12, sm:6, md:3}} >
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Pending
                </Typography>
                <Typography variant="h4" color="warning.main">{stats.pending}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{xs: 12, sm:6, md:3}} >
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Approved
                </Typography>
                <Typography variant="h4" color="success.main">{stats.approved}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{xs: 12, sm:6, md:3}} >
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Rejected
                </Typography>
                <Typography variant="h4" color="error.main">{stats.rejected}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{xs: 12, sm:4, md:3}}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{xs: 12, sm:4, md:3}}>
              <FormControl fullWidth size="small">
                <InputLabel>Plan</InputLabel>
                <Select
                  value={planFilter}
                  label="Plan"
                  onChange={(e) => setPlanFilter(e.target.value)}
                >
                  <MenuItem value="all">All Plans</MenuItem>
                  <MenuItem value="platinum">Platinum</MenuItem>
                  <MenuItem value="gold">Gold</MenuItem>
                  <MenuItem value="silver">Silver</MenuItem>
                  <MenuItem value="bronze">Bronze</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{xs: 12, sm:4, md:4}}>
              <TextField
                fullWidth
                size="small"
                label="Search"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                InputProps={{
                  endAdornment: (
                    <IconButton size="small" onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  )
                }}
              />
            </Grid>
            <Grid size={{xs: 12, md:2}}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchSponsors}
              >
                Refresh
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Error message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {/* Sponsors Table */}
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Company</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Plan</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                      <CircularProgress size={40} />
                    </TableCell>
                  </TableRow>
                ) : sponsors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1">
                        No sponsors found matching the criteria
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  sponsors.map((sponsor) => (
                    <TableRow key={sponsor._id} hover>
                      <TableCell>{sponsor.company_name}</TableCell>
                      <TableCell>
                        <Typography variant="body2">{sponsor.name}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {sponsor.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={sponsor.selectedPlan?.name || sponsor.sponsorshipType || 'N/A'} 
                          color={getPlanColor(sponsor.selectedPlan?.name || '') as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{sponsor.payment_method}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          Ref: {sponsor.payment_reference || 'N/A'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={sponsor.status} 
                          color={getStatusColor(sponsor.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {formatDate(sponsor.created_at)}
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Tooltip title="View Details">
                            <IconButton 
                              size="small" 
                              onClick={() => openDetailsDialog(sponsor)}
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>
                          
                          {sponsor.status !== 'approved' && (
                            <Tooltip title="Approve">
                              <IconButton 
                                size="small" 
                                color="success"
                                onClick={() => openStatusDialog(sponsor, 'approved')}
                              >
                                <ApproveIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          
                          {sponsor.status !== 'rejected' && (
                            <Tooltip title="Reject">
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => openStatusDialog(sponsor, 'rejected')}
                              >
                                <RejectIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          
                          <Tooltip title="Delete">
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => openDeleteDialog(sponsor)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <Pagination 
              count={pagination.pages} 
              page={pagination.page}
              onChange={(_, page) => setPagination(prev => ({ ...prev, page }))}
              color="primary"
            />
          </Box>
        </Paper>
      </Box>
      
      {/* Status Change Dialog */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)}>
        <DialogTitle>
          {newStatus === 'approved' ? 'Approve Sponsor' : 'Reject Sponsor'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {newStatus === 'approved'
              ? 'Are you sure you want to approve this sponsor? This will send an approval notification email to the sponsor.'
              : 'Are you sure you want to reject this sponsor? This will send a rejection notification email to the sponsor.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Admin Notes"
            fullWidth
            multiline
            rows={4}
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)} disabled={actionLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleStatusChange} 
            color={newStatus === 'approved' ? 'success' : 'error'}
            disabled={actionLoading}
            startIcon={actionLoading ? <CircularProgress size={20} /> : null}
          >
            {newStatus === 'approved' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Sponsor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete this sponsor? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={actionLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleDelete} 
            color="error"
            disabled={actionLoading}
            startIcon={actionLoading ? <CircularProgress size={20} /> : null}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Details Dialog */}
      {selectedSponsor && (
        <SponsorDetailsDialog
          open={detailsDialogOpen}
          onClose={() => setDetailsDialogOpen(false)}
          sponsor={selectedSponsor}
          onStatusChange={(status) => {
            setDetailsDialogOpen(false);
            openStatusDialog(selectedSponsor, status);
          }}
        />
      )}
    </AdminLayout>
  );
}