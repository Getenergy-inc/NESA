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
import { Person as ContactIcon, Stars as SponsorshipIcon } from '@mui/icons-material';
import { ISponsor } from '@/lib/models/Sponsor';

// Define sponsor type
interface Sponsor extends ISponsor {
  _id: string;
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
          <Grid size ={{xs:12}}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <BusinessIcon sx={{ mr: 1 }} /> Company Information
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid size={{xs:12, sm:6}}>
                  <Typography variant="subtitle2" color="textSecondary">Company Name</Typography>
                  <Typography variant="body1">{sponsor.company_name}</Typography>
                </Grid>
                
                <Grid  size ={{xs:12, sm: 6}}>
                  <Typography variant="subtitle2" color="textSecondary">Industry</Typography>
                  <Typography variant="body1">{sponsor.industry || 'Not specified'}</Typography>
                </Grid>

                <Grid size ={{xs:12, sm: 6}} >
                  <Typography variant="subtitle2" color="textSecondary">Business Reg No</Typography>
                  <Typography variant="body1">{sponsor.Business_reg_no || 'Not specified'}</Typography>
                </Grid>

                <Grid size ={{xs:12, sm: 6}} >
                  <Typography variant="subtitle2" color="textSecondary">Location</Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationIcon fontSize="small" sx={{ mr: 0.5 }} />
                    {'Not specified'}
                  </Typography>
                </Grid>

                <Grid size ={{xs:12, sm: 6}} >
                  <Typography variant="subtitle2" color="textSecondary">Website</Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <WebsiteIcon fontSize="small" sx={{ mr: 0.5 }} />
                    {sponsor.company_website ? ( // This property exists in ISponsor
                      <a href={sponsor.company_website} target="_blank" rel="noopener noreferrer">
                        {sponsor.company_website}
                      </a>
                    ) : (
                      'Not specified'
                    )}
                  </Typography>
                </Grid>

                {sponsor.company_logo && (
                  <Grid size ={{xs:12, sm: 6}} >
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

                {sponsor.additionalNotes && (
                  <Grid size ={{xs:12}}>
                    <Typography variant="subtitle2" color="textSecondary">Description</Typography>
                    <Typography variant="body2">{sponsor.additionalNotes}</Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
          
          {/* Contact Information */}
          <Grid  size ={{xs:12}}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <ContactIcon sx={{ mr: 1 }} /> Contact Information
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid size ={{xs:12, sm: 6}} >
                  <Typography variant="subtitle2" color="textSecondary">Contact Name</Typography>
                  <Typography variant="body1">{sponsor.name}</Typography>
                </Grid>

                <Grid size ={{xs:12, sm: 6}} >
                  <Typography variant="subtitle2" color="textSecondary">Position</Typography>
                  <Typography variant="body1">{'Not specified'}</Typography>
                </Grid>

                <Grid size ={{xs:12, sm: 6}} >
                  <Typography variant="subtitle2" color="textSecondary">Email</Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <a href={`mailto:${sponsor.email}`}>{sponsor.email}</a>
                  </Typography>
                </Grid>

                <Grid size= {{xs:12, sm: 6}} >
                  <Typography variant="subtitle2" color="textSecondary">Phone</Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <PhoneIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <a href={`tel:${sponsor.phone}`}>{sponsor.phone}</a>
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          
          {/* Sponsorship Information */}
          <Grid size = {{xs:12}}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <SponsorshipIcon sx={{ mr: 1 }} /> Sponsorship Information
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid size= {{xs:12, sm: 6}} >
                  <Typography variant="subtitle2" color="textSecondary">Sponsorship Plan</Typography>
                  <Chip 
                    label={sponsor.selectedPlan?.name || sponsor.sponsorshipType || 'N/A'} 
                    color={getPlanColor(sponsor.selectedPlan?.name || '') as any}
                    sx={{ mt: 0.5 }}
                  />
                </Grid>

                <Grid size= {{xs:12, sm: 6}} >
                  <Typography variant="subtitle2" color="textSecondary">Application Date</Typography>
                  <Typography variant="body1">{formatDate(sponsor.created_at)}</Typography>
                </Grid>

                {sponsor.additionalNotes && (
                  <Grid size ={{xs:12}}>
                    <Typography variant="subtitle2" color="textSecondary">Reason for Sponsorship</Typography>
                    <Typography variant="body2">{sponsor.additionalNotes}</Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
          
          {/* Payment Information */}
          <Grid size={{xs:12}}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <PaymentIcon sx={{ mr: 1 }} /> Payment Information
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid size= {{xs:12, sm: 6}} >
                  <Typography variant="subtitle2" color="textSecondary">Payment Method</Typography>
                  <Typography variant="body1">{sponsor.payment_method}</Typography>
                </Grid>

                <Grid size= {{xs:12, sm: 6}} >
                  <Typography variant="subtitle2" color="textSecondary">Payment Reference</Typography>
                  <Typography variant="body1">{sponsor.payment_reference || 'Not generated'}</Typography>
                </Grid>

                <Grid size= {{xs:12, sm: 6}} >
                  <Typography variant="subtitle2" color="textSecondary">Payment Status</Typography>
                  <Typography variant="body1">{sponsor.payment_status || 'Pending'}</Typography>
                </Grid>

                {sponsor.payment_details && (
                  <>
                    {sponsor.payment_details.currencies && (
                      <Grid size ={{xs:12, sm: 6}}>
                        <Typography variant="subtitle2" color="textSecondary">Supported Currencies</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                          {sponsor.payment_details.currencies.map((currency, index) => (
                            <Chip key={index} label={currency} size="small" />
                          ))}
                        </Box>
                      </Grid>
                    )}

                    {sponsor.payment_details.processingTime && (
                      <Grid size ={{xs:12, sm:6}}>
                        <Typography variant="subtitle2" color="textSecondary">Processing Time</Typography>
                        <Typography variant="body1">{sponsor.payment_details.processingTime || 'Not specified'}</Typography>
                      </Grid>
                    )}
                  </>
                )}
              </Grid>
            </Paper>
          </Grid>
          
          {/* Admin Notes */}
          <Grid size ={{xs:12}}>
            <Typography variant="h6" gutterBottom>Admin Notes</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="filled"
              value={(sponsor as any).admin_notes || ''}
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

export default SponsorDetailsDialog;