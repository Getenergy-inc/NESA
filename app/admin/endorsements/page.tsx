'use client';

import { useState, useEffect } from 'react';
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
  Refresh as RefreshIcon,
  Star as FeaturedIcon,
  StarBorder as UnfeaturedIcon
} from '@mui/icons-material';
import AdminLayout from '@/components/UI/AdminLayout';

// Define endorsement type
interface Endorsement {
  _id: string;
  organization_name: string;
  contact_person_name: string;
  email: string;
  phone: string;
  country: string;
  endorser_category: string;
  endorsement_type: string;
  endorsement_tier?: string;
  payment_method?: string;
  payment_reference?: string;
  payment_verified: boolean;
  endorsement_headline: string;
  status: string;
  verified: boolean;
  featured: boolean;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
  approved_at?: string;
}

// Define pagination type
interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export default function AdminEndorsementsPage() {
  
  const router = useRouter();

  // State variables
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0
  });

  // Dialog states
  const [selectedEndorsement, setSelectedEndorsement] = useState<Endorsement | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    pending_review: 0,
    pending_payment: 0,
    approved: 0,
    rejected: 0,
    verified: 0,
    featured: 0
  });

   // Check authentication
  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/account/login?callbackUrl=/admin/endorsements');
  //   }
  // }, [session, status, router]);

  // Fetch endorsements
  const fetchEndorsements = async () => {
    try {
      setLoading(true);
      setError('');

      const queryParams = new URLSearchParams({
        status: statusFilter,
        type: typeFilter,
        paymentStatus: paymentFilter,
        search: searchQuery,
        page: pagination.page.toString(),
        limit: pagination.limit.toString()
      });

      const response = await fetch(`/api/admin/endorsements?${queryParams}`);
      const data = await response.json();

      if (data.success) {
        setEndorsements(data.endorsements);
        setPagination(data.pagination);

        // Calculate stats
        const allEndorsements = await fetch('/api/admin/endorsements?limit=1000');
        const allData = await allEndorsements.json();

        if (allData.success) {
          const allItems = allData.endorsements;
          setStats({
            total: allItems.length,
            pending_review: allItems.filter((e: Endorsement) => e.status === 'pending_review').length,
            pending_payment: allItems.filter((e: Endorsement) => e.status === 'pending_payment').length,
            approved: allItems.filter((e: Endorsement) => e.status === 'approved').length,
            rejected: allItems.filter((e: Endorsement) => e.status === 'rejected').length,
            verified: allItems.filter((e: Endorsement) => e.verified).length,
            featured: allItems.filter((e: Endorsement) => e.featured).length
          });
        }
      } else {
        setError(data.error || 'Failed to fetch endorsements');
      }
    } catch (err) {
      setError('An error occurred while fetching endorsements');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load endorsements on component mount
  useEffect(() => {
    fetchEndorsements();
  }, [statusFilter, typeFilter, paymentFilter, pagination.page, pagination.limit]);

  // Handle search
  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchEndorsements();
  };

  // Handle status change
  const handleStatusChange = async () => {
    if (!selectedEndorsement || !newStatus) return;

    try {
      setActionLoading(true);

      const response = await fetch('/api/admin/endorsements', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: selectedEndorsement._id,
          status: newStatus,
          admin_notes: adminNotes
        })
      });

      const data = await response.json();

      if (data.success) {
        // Update the endorsement in the list
        setEndorsements(prev =>
          prev.map(endorsement =>
            endorsement._id === selectedEndorsement._id
              ? { ...endorsement, status: newStatus, admin_notes: adminNotes }
              : endorsement
          )
        );

        // Update stats
        setStats(prev => {
          const oldStatus = selectedEndorsement.status;
          return {
            ...prev,
            [oldStatus]: prev[oldStatus as keyof typeof prev] - 1,
            [newStatus]: prev[newStatus as keyof typeof prev] + 1
          };
        });

        setStatusDialogOpen(false);
      } else {
        setError(data.error || 'Failed to update endorsement status');
      }
    } catch (err) {
      setError('An error occurred while updating endorsement status');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle featured toggle
  const handleFeaturedToggle = async (endorsement: Endorsement) => {
    try {
      const response = await fetch('/api/admin/endorsements', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: endorsement._id,
          featured: !endorsement.featured
        })
      });

      const data = await response.json();

      if (data.success) {
        // Update the endorsement in the list
        setEndorsements(prev =>
          prev.map(e =>
            e._id === endorsement._id
              ? { ...e, featured: !e.featured }
              : e
          )
        );

        // Update stats
        setStats(prev => ({
          ...prev,
          featured: prev.featured + (endorsement.featured ? -1 : 1)
        }));
      } else {
        setError(data.error || 'Failed to update featured status');
      }
    } catch (err) {
      setError('An error occurred while updating featured status');
      console.error(err);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!selectedEndorsement) return;

    try {
      setActionLoading(true);

      const response = await fetch(`/api/admin/endorsements?id=${selectedEndorsement._id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        // Remove the endorsement from the list
        setEndorsements(prev => prev.filter(endorsement => endorsement._id !== selectedEndorsement._id));

        // Update stats
        setStats(prev => {
          const status = selectedEndorsement.status;
          return {
            ...prev,
            total: prev.total - 1,
            [status]: prev[status as keyof typeof prev] - 1
          };
        });

        setDeleteDialogOpen(false);
      } else {
        setError(data.error || 'Failed to delete endorsement');
      }
    } catch (err) {
      setError('An error occurred while deleting endorsement');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  // Open status dialog
  const openStatusDialog = (endorsement: Endorsement, status: string) => {
    setSelectedEndorsement(endorsement);
    setNewStatus(status);
    setAdminNotes(endorsement.admin_notes || '');
    setStatusDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (endorsement: Endorsement) => {
    setSelectedEndorsement(endorsement);
    setDeleteDialogOpen(true);
  };

  // Open details dialog
  const openDetailsDialog = (endorsement: Endorsement) => {
    setSelectedEndorsement(endorsement);
    setDetailsDialogOpen(true);
  };

  // Get status chip color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_review': return 'warning';
      case 'pending_payment': return 'info';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  // Get tier chip color
  const getTierColor = (tier?: string) => {
    switch (tier) {
      case 'bronze': return 'warning';
      case 'silver': return 'secondary';
      case 'gold': return 'primary';
      case 'platinum': return 'info';
      case 'africa_blue_garnet': return 'error';
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Endorsement Management
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size = {{xs: 12, sm: 6, md: 3}}>            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Endorsements
                </Typography>
                <Typography variant="h4">{stats.total}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size ={{xs: 12, sm: 6, md: 3}}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Pending Review
                </Typography>
                <Typography variant="h4" color="warning.main">{stats.pending_review}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{xs: 12, sm: 6, md: 3}}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Pending Payment
                </Typography>
                <Typography variant="h4" color="info.main">{stats.pending_payment}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{xs: 12, sm:6, md: 3}}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Approved
                </Typography>
                <Typography variant="h4" color="success.main">{stats.approved}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid  size={{xs:12, sm:4, md:2}}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="pending_review">Pending Review</MenuItem>
                  <MenuItem value="pending_payment">Pending Payment</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{xs:12, sm:12, md:2}}>
              <FormControl fullWidth size="small">
                <InputLabel>Type</InputLabel>
                <Select
                  value={typeFilter}
                  label="Type"
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="free">Free</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{xs: 12, sm:4, md:2}}>
              <FormControl fullWidth size="small">
                <InputLabel>Payment</InputLabel>
                <Select
                  value={paymentFilter}
                  label="Payment"
                  onChange={(e) => setPaymentFilter(e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="unpaid">Unpaid</MenuItem>
                  <MenuItem value="verified">Verified</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{xs: 12, sm:8, md:4}}>
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
            <Grid size={{xs: 12, md:4}}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchEndorsements}
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

        {/* Endorsements Table */}
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Organization</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Type/Tier</TableCell>
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
                ) : endorsements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1">
                        No endorsements found matching the criteria
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  endorsements.map((endorsement) => (
                    <TableRow key={endorsement._id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="bold">
                          {endorsement.organization_name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {endorsement.endorser_category}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{endorsement.contact_person_name}</Typography>
                        <Typography variant="caption" color="textSecondary">
                          {endorsement.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {endorsement.endorsement_type === 'free' ? 'Free' : 'Paid'}
                        </Typography>
                        {endorsement.endorsement_tier && (
                          <Chip
                            label={endorsement.endorsement_tier}
                            color={getTierColor(endorsement.endorsement_tier) as any}
                            size="small"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {endorsement.endorsement_type === 'paid' ? (
                          <>
                            <Typography variant="body2">{endorsement.payment_method}</Typography>
                            <Typography variant="caption" color="textSecondary">
                              {endorsement.payment_verified ? '✅ Verified' : '⏳ Pending'}
                            </Typography>
                          </>
                        ) : (
                          <Typography variant="caption" color="textSecondary">
                            No payment required
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label={endorsement.status.replace('_', ' ')}
                            color={getStatusColor(endorsement.status) as any}
                            size="small"
                          />
                          {endorsement.featured && (
                            <Tooltip title="Featured">
                              <FeaturedIcon sx={{ color: 'warning.main' }} />
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {formatDate(endorsement.created_at)}
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Tooltip title="View Details">
                            <IconButton
                              size="small"
                              onClick={() => openDetailsDialog(endorsement)}
                            >
                              <ViewIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title={endorsement.featured ? "Unfeature" : "Feature"}>
                            <IconButton
                              size="small"
                              color={endorsement.featured ? "warning" : "default"}
                              onClick={() => handleFeaturedToggle(endorsement)}
                            >
                              {endorsement.featured ? <FeaturedIcon /> : <UnfeaturedIcon />}
                            </IconButton>
                          </Tooltip>

                          {endorsement.status !== 'approved' && (
                            <Tooltip title="Approve">
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => openStatusDialog(endorsement, 'approved')}
                              >
                                <ApproveIcon />
                              </IconButton>
                            </Tooltip>
                          )}

                          {endorsement.status !== 'rejected' && (
                            <Tooltip title="Reject">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => openStatusDialog(endorsement, 'rejected')}
                              >
                                <RejectIcon />
                              </IconButton>
                            </Tooltip>
                          )}

                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => openDeleteDialog(endorsement)}
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
          {newStatus === 'approved' ? 'Approve Endorsement' : 'Reject Endorsement'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {newStatus === 'approved'
              ? 'Are you sure you want to approve this endorsement? It will be displayed on the public showcase.'
              : 'Are you sure you want to reject this endorsement? The submitter will be notified.'}
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
        <DialogTitle>Delete Endorsement</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete this endorsement? This action cannot be undone.
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
      <Dialog open={detailsDialogOpen} onClose={() => setDetailsDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Endorsement Details</DialogTitle>
        <DialogContent>
          {selectedEndorsement && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedEndorsement.organization_name}
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={{xs: 12, md: 6}}>                 <Typography variant="subtitle2" color="textSecondary">Contact Person</Typography>
                  <Typography>{selectedEndorsement.contact_person_name}</Typography>
                </Grid>
                <Grid size={{xs: 12, md: 6}} >
                  <Typography variant="subtitle2" color="textSecondary">Email</Typography>
                  <Typography>{selectedEndorsement.email}</Typography>
                </Grid>
                <Grid size={{xs: 12, md : 6}}>
                  <Typography variant="subtitle2" color="textSecondary">Phone</Typography>
                  <Typography>{selectedEndorsement.phone}</Typography>
                </Grid>
                <Grid size ={{xs: 12, md: 6}}>
                  <Typography variant="subtitle2" color="textSecondary">Country</Typography>
                  <Typography>{selectedEndorsement.country}</Typography>
                </Grid>
                <Grid size={{xs: 12}}>
                  <Typography variant="subtitle2" color="textSecondary">Headline</Typography>
                  <Typography>{selectedEndorsement.endorsement_headline}</Typography>
                </Grid>
                <Grid size={{xs: 12}}>
                  <Typography variant="subtitle2" color="textSecondary">Statement</Typography>
                  <Typography sx={{ whiteSpace: 'pre-wrap' }}>{(selectedEndorsement as any).endorsement_statement}</Typography>
                </Grid>
              </Grid>

              {selectedEndorsement.admin_notes && (
                <>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" color="textSecondary">Admin Notes</Typography>
                  <Typography sx={{ whiteSpace: 'pre-wrap' }}>{selectedEndorsement.admin_notes}</Typography>
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
}