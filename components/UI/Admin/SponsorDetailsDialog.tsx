import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Chip,
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as WebsiteIcon,
  Payment as PaymentIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

// Define sponsor type
interface Sponsor {
  _id: string;
  company_name: string;
  company_website?: string;
  company_logo?: string;
  company_description?: string;
  industry?: string;
  company_size?: string;
  company_location?: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  contact_position?: string;
  sponsorship_plan: string;
  sponsorship_reason?: string;
  payment_method: string;
  payment_reference?: string;
  payment_status?: string;
  payment_details?: {
    currencies?: string[];
    processing_time?: string;
  };
  status: string;
  admin_notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface SponsorDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  sponsor: Sponsor;
  onStatusChange: (status: string) => void;
}

const SponsorDetailsDialog: React.FC<SponsorDetailsDialogProps> = ({
  open,
  onClose,
  sponsor,
  onStatusChange
}) => {
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Sponsor Details
          </Typography>
          <Chip 
            label={sponsor.status} 
            color={getStatusColor(sponsor.status) as any}
          />
        </Box>
      </DialogTitle>
      
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Company Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <BusinessIcon sx={{ mr: 1 }} /> Company Information
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Company Name</Typography>
                  <Typography variant="body1">{sponsor.company_name}</Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Industry</Typography>
                  <Typography variant="body1">{sponsor.industry || 'Not specified'}</Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Company Size</Typography>
                  <Typography variant="body1">{sponsor.company_size || 'Not specified'}</Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Location</Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationIcon fontSize="small" sx={{ mr: 0.5 }} />
                    {sponsor.company_location || 'Not specified'}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Website</Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <WebsiteIcon fontSize="small" sx={{ mr: 0.5 }} />
                    {sponsor.company_website ? (
                      <a href={sponsor.company_website} target="_blank" rel="noopener noreferrer">
                        {sponsor.company_website}
                      </a>
                    ) : (
                      'Not specified'
                    )}
                  </Typography>
                </Grid>
                
                {sponsor.company_logo && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="textSecondary">Logo</Typography>
                    <Box sx={{ mt: 1 }}>
                      <img 
                        src={sponsor.company_logo} 
                        alt={`${sponsor.company_name} logo`} 
                        style={{ maxHeight: '60px', maxWidth: '100%' }}
                      />
                    </Box>
                  </Grid>
                )}
                
                {sponsor.company_description && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textSecondary">Description</Typography>
                    <Typography variant="body2">{sponsor.company_description}</Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
          
          {/* Contact Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <ContactIcon sx={{ mr: 1 }} /> Contact Information
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Contact Name</Typography>
                  <Typography variant="body1">{sponsor.contact_name}</Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Position</Typography>
                  <Typography variant="body1">{sponsor.contact_position || 'Not specified'}</Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Email</Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <a href={`mailto:${sponsor.contact_email}`}>{sponsor.contact_email}</a>
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Phone</Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <a href={`tel:${sponsor.contact_phone}`}>{sponsor.contact_phone}</a>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
          {/* Sponsorship Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <SponsorshipIcon sx={{ mr: 1 }} /> Sponsorship Information
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Sponsorship Plan</Typography>
                  <Chip 
                    label={sponsor.sponsorship_plan} 
                    color={getPlanColor(sponsor.sponsorship_plan) as any}
                    sx={{ mt: 0.5 }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Application Date</Typography>
                  <Typography variant="body1">{formatDate(sponsor.createdAt)}</Typography>
                </Grid>
                
                {sponsor.sponsorship_reason && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="textSecondary">Reason for Sponsorship</Typography>
                    <Typography variant="body2">{sponsor.sponsorship_reason}</Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
          
          {/* Payment Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <PaymentIcon sx={{ mr: 1 }} /> Payment Information
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Payment Method</Typography>
                  <Typography variant="body1">{sponsor.payment_method}</Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Payment Reference</Typography>
                  <Typography variant="body1">{sponsor.payment_reference || 'Not generated'}</Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">Payment Status</Typography>
                  <Typography variant="body1">{sponsor.payment_status || 'Pending'}</Typography>
                </Grid>
                
                {sponsor.payment_details && (
                  <>
                    {sponsor.payment_details.currencies && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="textSecondary">Supported Currencies</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                          {sponsor.payment_details.currencies.map((currency, index) => (
                            <Chip key={index} label={currency} size="small" />
                          ))}
                        </Box>
                      </Grid>
                    )}
                    
                    {sponsor.payment_details.processing_time && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="textSecondary">Processing Time</Typography>
                        <Typography variant="body1">{sponsor.payment_details.processing_time}</Typography>
                      </Grid>
                    )}
                  </>
                )}
              </Grid>
            </Paper>
          </Grid>
          
          {/* Admin Notes */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Admin Notes</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={sponsor.admin_notes || ''}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', px: 2 }}>
          <Box>
            {sponsor.status !== 'approved' && (
              <Button
                startIcon={<ApproveIcon />}
                color="success"
                variant="contained"
                onClick={() => onStatusChange('approved')}
                sx={{ mr: 1 }}
              >
                Approve
              </Button>
            )}
            
            {sponsor.status !== 'rejected' && (
              <Button
                startIcon={<RejectIcon />}
                color="error"
                variant="contained"
                onClick={() => onStatusChange('rejected')}
              >
                Reject
              </Button>
            )}
          </Box>
          
          <Button onClick={onClose}>Close</Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

// Custom icons
const ContactIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg>;

const SponsorshipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m438-440 162-162-28-28-134 134-54-54-28 28 82 82ZM240-240h480v-80H240v80Zm0 80q-33 0-56.5-23.5T160-240v-480q0-33 23.5-56.5T240-800h480q33 0 56.5 23.5T800-720v480q0 33-23.5 56.5T720-160H240Zm0-80v0 0Z"/></svg>;

export default SponsorDetailsDialog;