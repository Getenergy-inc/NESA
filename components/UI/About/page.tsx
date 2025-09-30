'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
} from '@mui/material';
import { Eye, Pencil, Trash } from 'lucide-react';
import { ISponsor } from '@/lib/models/Sponsor';
import { debounce } from 'lodash';

type SponsorWithId = ISponsor & { _id: string };

export default function AdminSponsorsPage() {
  const [sponsors, setSponsors] = useState<SponsorWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const fetchSponsors = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (page + 1).toString(),
        limit: rowsPerPage.toString(),
        status,
        search,
      });

      const response = await fetch(`/api/admin/sponsors?${params.toString()}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch sponsors');
      }

      const data = await response.json();
      setSponsors(data.sponsors);
      setTotal(data.pagination.total);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, status, search]);

  useEffect(() => {
    fetchSponsors();
  }, [fetchSponsors]);

  const debouncedFetch = useCallback(debounce(fetchSponsors, 500), [fetchSponsors]);

  useEffect(() => {
    debouncedFetch();
    return debouncedFetch.cancel;
  }, [search, debouncedFetch]);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const handleStatusChange = (event: any) => {
    setStatus(event.target.value);
    setPage(0);
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/sponsors', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      fetchSponsors(); // Refresh data
    } catch (err) {
      setError('Failed to update status. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this sponsor application?')) {
      try {
        const response = await fetch(`/api/admin/sponsors?id=${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete sponsor');
        fetchSponsors(); // Refresh data
      } catch (err) {
        setError('Failed to delete sponsor. Please try again.');
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sponsor Management
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label="Search by Company or Email"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            fullWidth
          />
          <FormControl variant="outlined" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={handleStatusChange} label="Status">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>Contact Person</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Plan</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sponsors.map((sponsor) => (
                <TableRow key={sponsor._id}>
                  <TableCell>{sponsor.company_name}</TableCell>
                  <TableCell>{sponsor.name}</TableCell>
                  <TableCell>{sponsor.email}</TableCell>
                  <TableCell>{sponsor.selectedPlan?.name || sponsor.sponsorshipType || 'N/A'}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: sponsor.status === 'approved' ? 'green' : sponsor.status === 'rejected' ? 'red' : 'orange',
                        fontWeight: 'bold',
                      }}
                    >
                      {sponsor.status}
                    </Typography>
                  </TableCell>
                  <TableCell>{new Date(sponsor.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => alert(`Viewing details for ${sponsor.company_name}`)}><Eye /></IconButton>
                    {sponsor.status === 'pending' && (
                      <>
                        <Button size="small" onClick={() => handleUpdateStatus(sponsor._id, 'approved')}>Approve</Button>
                        <Button size="small" color="warning" onClick={() => handleUpdateStatus(sponsor._id, 'rejected')}>Reject</Button>
                      </>
                    )}
                    <IconButton size="small" color="error" onClick={() => handleDelete(sponsor._id)}><Trash /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </TableContainer>
      )}
    </Box>
  );
}
