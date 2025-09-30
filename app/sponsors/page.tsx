'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import BusinessIcon from '@mui/icons-material/Business';

// Define sponsor type
interface Sponsor {
  _id: string;
  company_name: string;
  company_logo?: string;
  company_website?: string;
  industry?: string;
  sponsorship_plan: string;
  status: string;
}

export default function SponsorsWall() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/sponsors');
        const data = await response.json();
        
        if (data.success) {
          setSponsors(data.sponsors);
        } else {
          setError(data.error || 'Failed to fetch sponsors');
        }
      } catch (err) {
        console.error('Error fetching sponsors:', err);
        setError('An error occurred while fetching sponsors');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSponsors();
  }, []);
  
  // Filter sponsors by plan/tier
  const filteredSponsors = filter === 'all' 
    ? sponsors 
    : sponsors.filter(sponsor => sponsor.sponsorship_plan === filter);
  
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
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Our Sponsors
        </Typography>
        
        <Typography variant="h6" component="p" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
          Organizations supporting NESA Africa's mission to empower tech talent and recognize excellence in education across Africa
        </Typography>
        
        <Divider sx={{ mb: 6 }} />
      </Box>
      
      {/* Filter controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="plan-filter-label">Filter by Tier</InputLabel>
          <Select
            labelId="plan-filter-label"
            value={filter}
            label="Filter by Tier"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="all">All Sponsors</MenuItem>
            <MenuItem value="platinum">Platinum</MenuItem>
            <MenuItem value="gold">Gold</MenuItem>
            <MenuItem value="silver">Silver</MenuItem>
            <MenuItem value="bronze">Bronze</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
          <Typography>
            Please try again later or contact us for more information.
          </Typography>
        </Paper>
      ) : filteredSponsors.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            No sponsors found in this category.
          </Typography>
          {filter !== 'all' && (
            <Button onClick={() => setFilter('all')}>
              View All Sponsors
            </Button>
          )}
        </Paper>
      ) : (
        <>
          {/* Platinum Sponsors (larger cards) */}
          {filter === 'all' && sponsors.some(s => s.sponsorship_plan === 'platinum') && (
            <Box sx={{ mb: 8 }}>
              <Typography variant="h4" component="h2" align="center" gutterBottom>
                Platinum Sponsors
              </Typography>
              <Divider sx={{ mb: 4 }} />
              
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4, justifyItems: 'center' }}>
                {sponsors
                  .filter(sponsor => sponsor.sponsorship_plan === 'platinum')
                  .map((sponsor) => (
                    <Box key={sponsor._id} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
                      <Card 
                        sx={{ 
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                          },
                          border: '1px solid #f0f0f0'
                        }}
                        elevation={2}
                      >
                        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 180 }}>
                          {sponsor.company_logo ? (
                            <Image
                              src={sponsor.company_logo}
                              alt={`${sponsor.company_name} logo`}
                              width={200}
                              height={150}
                              style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }}
                            />
                          ) : (
                            <Box sx={{ 
                              height: 150, 
                              width: 150, 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              bgcolor: '#f5f5f5',
                              borderRadius: '50%'
                            }}>
                              <Typography variant="h3">{sponsor.company_name.charAt(0)}</Typography>
                            </Box>
                          )}
                        </Box>
                        
                        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                          <Typography variant="h5" component="h3" gutterBottom>
                            {sponsor.company_name}
                          </Typography>
                          
                          <Chip 
                            label={sponsor.sponsorship_plan} 
                            color={getPlanColor(sponsor.sponsorship_plan) as any}
                            sx={{ mb: 2 }}
                          />
                          
                          {sponsor.industry && (
                            <Typography variant="body2" color="text.secondary">
                              {sponsor.industry}
                            </Typography>
                          )}
                        </CardContent>
                        
                        {sponsor.company_website && (
                          <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                            <Button 
                              href={sponsor.company_website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              variant="outlined"
                              size="small"
                            >
                              Visit Website
                            </Button>
                          </CardActions>
                        )}
                      </Card>
                    </Box>
                  ))}
              </Box>
            </Box>
          )}
          
          {/* Gold Sponsors */}
          {filter === 'all' && sponsors.some(s => s.sponsorship_plan === 'gold') && (
            <Box sx={{ mb: 8 }}>
              <Typography variant="h4" component="h2" align="center" gutterBottom>
                Gold Sponsors
              </Typography>
              <Divider sx={{ mb: 4 }} />
              
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
                {sponsors
                  .filter(sponsor => sponsor.sponsorship_plan === 'gold')
                  .map((sponsor) => (
                    <Box key={sponsor._id} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
                      <Card 
                        sx={{ 
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-5px)'
                          }
                        }}
                      >
                        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 140 }}>
                          {sponsor.company_logo ? (
                            <Image
                              src={sponsor.company_logo}
                              alt={`${sponsor.company_name} logo`}
                              width={150}
                              height={100}
                              style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }}
                            />
                          ) : (
                            <Box sx={{ 
                              height: 100, 
                              width: 100, 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              bgcolor: '#f5f5f5',
                              borderRadius: '50%'
                            }}>
                              <Typography variant="h4">{sponsor.company_name.charAt(0)}</Typography>
                            </Box>
                          )}
                        </Box>
                        
                        <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                          <Typography variant="h6" component="h3" gutterBottom>
                            {sponsor.company_name}
                          </Typography>
                          
                          <Chip 
                            label={sponsor.sponsorship_plan} 
                            color={getPlanColor(sponsor.sponsorship_plan) as any}
                            size="small"
                            sx={{ mb: 1 }}
                          />
                          
                          {sponsor.industry && (
                            <Typography variant="body2" color="text.secondary">
                              {sponsor.industry}
                            </Typography>
                          )}
                        </CardContent>
                        
                        {sponsor.company_website && (
                          <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                            <Button 
                              href={sponsor.company_website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              size="small"
                            >
                              Visit Website
                            </Button>
                          </CardActions>
                        )}
                      </Card>
                    </Box>
                  ))}
              </Box>
            </Box>
          )}
          
          {/* Silver & Bronze Sponsors */}
          {filter === 'all' && (
            sponsors.some(s => s.sponsorship_plan === 'silver' || s.sponsorship_plan === 'bronze')
          ) && (
            <Box>
              <Typography variant="h4" component="h2" align="center" gutterBottom>
                Silver & Bronze Sponsors
              </Typography>
              <Divider sx={{ mb: 4 }} />
              
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
                {sponsors
                  .filter(sponsor => 
                    sponsor.sponsorship_plan === 'silver' || 
                    sponsor.sponsorship_plan === 'bronze'
                  )
                  .map((sponsor) => (
                    <Box key={sponsor._id} sx={{ gridColumn: { xs: 'span 6', sm: 'span 4', md: 'span 3', lg: 'span 2' } }}>
                      <Card 
                        sx={{ 
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-5px)'
                          }
                        }}
                      >
                        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 100 }}>
                          {sponsor.company_logo ? (
                            <Image
                              src={sponsor.company_logo}
                              alt={`${sponsor.company_name} logo`}
                              width={100}
                              height={80}
                              style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }}
                            />
                          ) : (
                            <Box sx={{ 
                              height: 60, 
                              width: 60, 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              bgcolor: '#f5f5f5',
                              borderRadius: '50%'
                            }}>
                              <Typography variant="h5">{sponsor.company_name.charAt(0)}</Typography>
                            </Box>
                          )}
                        </Box>
                        
                        <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 1 }}>
                          <Typography variant="subtitle1" component="h3" gutterBottom>
                            {sponsor.company_name}
                          </Typography>
                          
                          <Chip 
                            label={sponsor.sponsorship_plan} 
                            color={getPlanColor(sponsor.sponsorship_plan) as any}
                            size="small"
                          />
                        </CardContent>
                      </Card>
                    </Box>
                  ))}
              </Box>
            </Box>
          )}
          
          {/* Filtered view (when filter is not 'all') */}
          {filter !== 'all' && (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4 }}>
              {filteredSponsors.map((sponsor) => (
                <Box key={sponsor._id} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                      }
                    }}
                    elevation={2}
                  >
                    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: 160 }}>
                      {sponsor.company_logo ? (
                        <Image
                          src={sponsor.company_logo}
                          alt={`${sponsor.company_name} logo`}
                          width={180}
                          height={120}
                          style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }}
                        />
                      ) : (
                        <Box sx={{ 
                          height: 120, 
                          width: 120, 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          bgcolor: '#f5f5f5',
                          borderRadius: '50%'
                        }}>
                          <Typography variant="h3">{sponsor.company_name.charAt(0)}</Typography>
                        </Box>
                      )}
                    </Box>
                    
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {sponsor.company_name}
                      </Typography>
                      
                      <Chip 
                        label={sponsor.sponsorship_plan} 
                        color={getPlanColor(sponsor.sponsorship_plan) as any}
                        sx={{ mb: 2 }}
                      />
                      
                      {sponsor.industry && (
                        <Typography variant="body2" color="text.secondary">
                          {sponsor.industry}
                        </Typography>
                      )}
                    </CardContent>
                    
                    {sponsor.company_website && (
                      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                        <Button 
                          href={sponsor.company_website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          variant="outlined"
                          size="small"
                        >
                          Visit Website
                        </Button>
                      </CardActions>
                    )}
                  </Card>
                </Box>
              ))}
            </Box>
          )}
        </>
      )}
      
      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', mt: 10, p: 5, bgcolor: '#f9f9f9', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Become a Sponsor
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: 700, mx: 'auto' }}>
          Join these organizations in supporting NESA Africa's mission to recognize and celebrate excellence in education across Africa.
        </Typography>
        <Button 
          component={Link}
          href="/sponsor"
          variant="contained" 
          color="primary"
          size="large"
          startIcon={<BusinessIcon />}
        >
          Apply to become a sponsor
        </Button>
      </Box>
    </Container>
  );
}