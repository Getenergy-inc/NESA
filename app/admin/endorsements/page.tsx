'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Badge,
  Spinner,
  Textarea,
  useDisclosure,
  HStack,
  VStack,
  Link as ChakraLink
} from '@chakra-ui/react';

// Create custom Alert component
const Alert = (props: any) => {
  const { status = "info", children, ...rest } = props;
  const bgColor = status === 'success' ? 'green.100' : status === 'error' ? 'red.100' : 'blue.100';
  const textColor = status === 'success' ? 'green.800' : status === 'error' ? 'red.800' : 'blue.800';
  
  return (
    <Box 
      p={4} 
      borderRadius="md" 
      bg={bgColor} 
      color={textColor}
      position="relative"
      {...rest}
    >
      {children}
    </Box>
  );
};

// Create custom CloseButton component
const CloseButton = (props: any) => (
  <Button 
    size="sm" 
    variant="ghost" 
    position="absolute" 
    right="8px" 
    top="8px"
    minWidth="auto"
    height="auto"
    p={1}
    {...props}
  >
    ✕
  </Button>
);

// Create custom table components
const TableRoot = (props: any) => <Box as="table" width="100%" {...props} />;
const TableHeader = (props: any) => <Box as="thead" {...props} />;
const TableBody = (props: any) => <Box as="tbody" {...props} />;
const TableRow = (props: any) => <Box as="tr" {...props} />;
const TableHeaderCell = (props: any) => <Box as="th" p={3} fontWeight="bold" textAlign="left" {...props} />;
const TableCell = (props: any) => <Box as="td" p={3} borderTopWidth="1px" {...props} />;

// Create custom modal components
const Modal = {
  // Root respects isOpen and renders children only when open
  Root: ({ isOpen, children, ...rest }: any) => {
    if (!isOpen) return null;
    return (
      <Box as="div" position="fixed" top="0" left="0" width="100%" height="100%" zIndex="1000" {...rest}>
        {children}
      </Box>
    );
  },
  // Overlay can accept onClick to close
  Overlay: (props: any) => <Box as="div" position="fixed" top="0" left="0" width="100%" height="100%" bg="blackAlpha.600" {...props} />,
  // Stop propagation so clicks inside content don't close via overlay
  Content: ({ onClick, ...props }: any) => (
    <Box
      as="div"
      position="relative"
      bg="white"
      maxWidth="500px"
      margin="3.75rem auto"
      borderRadius="md"
      boxShadow="lg"
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) onClick(e);
      }}
      {...props}
    />
  ),
  Header: (props: any) => <Box as="div" p={4} fontWeight="bold" borderBottomWidth="1px" {...props} />,
  // CloseButton should call provided onClick (typically onClose)
  CloseButton: (props: any) => <Button position="absolute" top={2} right={2} size="sm" variant="ghost" {...props}>×</Button>,
  Body: (props: any) => <Box as="div" p={4} {...props} />,
  Footer: (props: any) => <Box as="div" p={4} borderTopWidth="1px" display="flex" justifyContent="flex-end" {...props} />
};

// Define endorsement types
interface Endorsement {
  id: string;
  organization_name: string;
  contact_person_name: string;
  email: string;
  country: string;
  endorser_category: string;
  endorsement_type: string;
  endorsement_tier?: string;
  endorsement_headline: string;
  endorsement_statement: string;
  logo_file?: string;
  video_link?: string;
  website?: string;
  status: 'pending_verification' | 'pending_review' | 'approved' | 'rejected';
  verified: boolean;
  created_at: string;
  approved_at?: string;
  updated_at?: string;
  featured?: boolean;
  rejection_reason?: string;
}

interface StatusCounts {
  pending_verification: number;
  pending_review: number;
  approved: number;
  rejected: number;
}

export default function AdminEndorsementsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    pending_verification: 0,
    pending_review: 0,
    approved: 0,
    rejected: 0
  });
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedEndorsement, setSelectedEndorsement] = useState<Endorsement | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [modalAction, setModalAction] = useState<'approve' | 'reject' | 'feature' | 'unfeature'>('approve');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Chakra UI modal controls
  const modalDisclosure = useDisclosure();
  const detailModalDisclosure = useDisclosure();
  
  // Create variables for easier access
  const isModalOpen = modalDisclosure.open;
  const openModalState = modalDisclosure.onOpen;
  const closeModalState = modalDisclosure.onClose;
  
  const isDetailModalOpen = detailModalDisclosure.open;
  const openDetailModal = detailModalDisclosure.onOpen;
  const closeDetailModal = detailModalDisclosure.onClose;

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    setIsAuthenticated(true);
    fetchEndorsements();
  }, [router]);

  // Fetch endorsements based on selected status
  const fetchEndorsements = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const url = selectedStatus === 'all' 
        ? '/api/admin/endorsements' 
        : `/api/admin/endorsements?status=${selectedStatus}`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch endorsements');
      }
      
      const data = await response.json();
      setEndorsements(data.endorsements);
      setStatusCounts(data.statuses);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching endorsements:', error);
      setMessage({ type: 'error', text: 'Failed to load endorsements. Please try again.' });
      setIsLoading(false);
    }
  };

  // Handle status filter change
  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    fetchEndorsements();
  };

  // Open modal for endorsement action
  const openModal = (endorsement: Endorsement, action: 'approve' | 'reject' | 'feature' | 'unfeature') => {
    setSelectedEndorsement(endorsement);
    setModalAction(action);
    setRejectionReason('');
    openModalState();
  };

  // Close modal
  const closeModal = () => {
    closeModalState();
    setSelectedEndorsement(null);
  };
  
  // View endorsement details
  const viewEndorsementDetails = (endorsement: Endorsement) => {
    setSelectedEndorsement(endorsement);
    openDetailModal();
  };

  // Handle endorsement action (approve, reject, feature, unfeature)
  const handleEndorsementAction = async () => {
    if (!selectedEndorsement) return;
    
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/endorsements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: selectedEndorsement.id,
          action: modalAction,
          reason: modalAction === 'reject' ? rejectionReason : undefined
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update endorsement');
      }
      
      const data = await response.json();
      
      // Update the endorsement in the list
      setEndorsements(prevEndorsements => 
        prevEndorsements.map(e => 
          e.id === selectedEndorsement.id ? data.endorsement : e
        )
      );
      
      // Show success message
      setMessage({ 
        type: 'success', 
        text: `Endorsement ${modalAction}d successfully.` 
      });
      
      // Close modal and refresh data
      closeModal();
      fetchEndorsements();
    } catch (error) {
      console.error(`Error ${modalAction}ing endorsement:`, error);
      setMessage({ 
        type: 'error', 
        text: `Failed to ${modalAction} endorsement. ${error instanceof Error ? error.message : ''}` 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge colors
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'pending_verification':
        return 'yellow.100';
      case 'pending_review':
        return 'blue.100';
      case 'approved':
        return 'green.100';
      case 'rejected':
        return 'red.100';
      default:
        return 'gray.100';
    }
  };
  
  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'pending_verification':
        return 'yellow.800';
      case 'pending_review':
        return 'blue.800';
      case 'approved':
        return 'green.800';
      case 'rejected':
        return 'red.800';
      default:
        return 'gray.800';
    }
  };

  // Get formatted status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending_verification':
        return 'Pending Verification';
      case 'pending_review':
        return 'Pending Review';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  if (!isAuthenticated) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="lg" color="orange.500" mr={3} />
        <Text>Redirecting to login...</Text>
      </Flex>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading as="h1" size="xl" color="gray.800">Endorsement Management</Heading>
        <Link href="/admin/dashboard" passHref>
          <ChakraLink color="orange.500" _hover={{ color: 'orange.700' }}>
            Back to Dashboard
          </ChakraLink>
        </Link>
      </Flex>

      {/* Status message */}
      {message.text && (
        <Alert 
          status={message.type === 'success' ? 'success' : 'error'} 
          mb={4} 
          borderRadius="md"
        >
          {message.text}
          <CloseButton 
            position="absolute" 
            right="8px" 
            top="8px" 
            onClick={() => setMessage({ type: '', text: '' })}
          />
        </Alert>
      )}

      {/* Status filters */}
      <Box bg="white" shadow="md" borderRadius="lg" p={4} mb={6}>
        <Heading as="h2" size="md" mb={4}>Filter by Status</Heading>
        <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }} gap={4}>
          <Button
            p={3}
            variant={selectedStatus === 'all' ? 'solid' : 'outline'}
            bg={selectedStatus === 'all' ? "orange.500" : "white"}
            color={selectedStatus === 'all' ? "white" : "orange.500"}
            borderColor="orange.500"
            _hover={{ bg: selectedStatus === 'all' ? "orange.600" : "orange.50" }}
            onClick={() => handleStatusChange('all')}
            display="flex"
            flexDirection="column"
            height="auto"
          >
            <Text>All</Text>
            <Text fontSize="xl" fontWeight="bold">{Object.values(statusCounts).reduce((a, b) => a + b, 0)}</Text>
          </Button>
          <Button
            p={3}
            variant={selectedStatus === 'pending_verification' ? 'solid' : 'outline'}
            bg={selectedStatus === 'pending_verification' ? "yellow.500" : "white"}
            color={selectedStatus === 'pending_verification' ? "white" : "yellow.500"}
            borderColor="yellow.500"
            _hover={{ bg: selectedStatus === 'pending_verification' ? "yellow.600" : "yellow.50" }}
            onClick={() => handleStatusChange('pending_verification')}
            display="flex"
            flexDirection="column"
            height="auto"
          >
            <Text>Pending Verification</Text>
            <Text fontSize="xl" fontWeight="bold">{statusCounts.pending_verification}</Text>
          </Button>
          <Button
            p={3}
            variant={selectedStatus === 'pending_review' ? 'solid' : 'outline'}
            colorScheme="blue"
            onClick={() => handleStatusChange('pending_review')}
            display="flex"
            flexDirection="column"
            height="auto"
          >
            <Text>Pending Review</Text>
            <Text fontSize="xl" fontWeight="bold">{statusCounts.pending_review}</Text>
          </Button>
          <Button
            p={3}
            variant={selectedStatus === 'approved' ? 'solid' : 'outline'}
            bg={selectedStatus === 'approved' ? "green.500" : "white"}
            color={selectedStatus === 'approved' ? "white" : "green.500"}
            borderColor="green.500"
            _hover={{ bg: selectedStatus === 'approved' ? "green.600" : "green.50" }}
            onClick={() => handleStatusChange('approved')}
            display="flex"
            flexDirection="column"
            height="auto"
          >
            <Text>Approved</Text>
            <Text fontSize="xl" fontWeight="bold">{statusCounts.approved}</Text>
          </Button>
          <Button
            p={3}
            variant={selectedStatus === 'rejected' ? 'solid' : 'outline'}
            bg={selectedStatus === 'rejected' ? "red.500" : "white"}
            color={selectedStatus === 'rejected' ? "white" : "red.500"}
            borderColor="red.500"
            _hover={{ bg: selectedStatus === 'rejected' ? "red.600" : "red.50" }}
            onClick={() => handleStatusChange('rejected')}
            display="flex"
            flexDirection="column"
            height="auto"
          >
            <Text>Rejected</Text>
            <Text fontSize="xl" fontWeight="bold">{statusCounts.rejected}</Text>
          </Button>
        </Grid>
      </Box>

      {/* Endorsements list */}
      <Box bg="white" shadow="md" borderRadius="lg" overflow="hidden">
        <Box p={4} borderBottomWidth="1px">
          <Heading as="h2" size="md">Endorsements</Heading>
        </Box>
        
        {isLoading ? (
          <Flex direction="column" align="center" justify="center" p={8}>
            <Spinner size="lg" color="orange.500" />
            <Text mt={2} color="gray.600">Loading endorsements...</Text>
          </Flex>
        ) : endorsements.length === 0 ? (
          <Box p={8} textAlign="center" color="gray.500">
            No endorsements found for the selected status.
          </Box>
        ) : (
          <Box overflowX="auto">
            <Box overflowX="auto" width="100%">
              <TableRoot>
                <TableHeader bg="gray.50">
                  <TableRow>
                    <TableHeaderCell>Organization</TableHeaderCell>
                    <TableHeaderCell>Contact</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Date</TableHeaderCell>
                    <TableHeaderCell>Actions</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {endorsements.map((endorsement) => (
                    <TableRow key={endorsement.id} _hover={{ bg: 'gray.50' }}>
                      <TableCell>
                        <Flex align="center">
                          {endorsement.logo_file && (
                            <Box flexShrink={0} mr={3} width="40px" height="40px" position="relative">
                              <Image 
                                src={endorsement.logo_file} 
                                alt={`${endorsement.organization_name} logo`}
                                width={40}
                                height={40}
                                style={{ objectFit: 'contain' }}
                              />
                            </Box>
                          )}
                          <Box>
                            <Text fontWeight="medium">{endorsement.organization_name}</Text>
                            <Text fontSize="sm" color="gray.500">{endorsement.country}</Text>
                            {endorsement.featured && (
                              <Badge bg="purple.100" color="purple.800" fontSize="xs">
                                Featured
                              </Badge>
                            )}
                          </Box>
                        </Flex>
                      </TableCell>
                      <TableCell>
                        <Text>{endorsement.contact_person_name}</Text>
                        <Text fontSize="sm" color="gray.500">{endorsement.email}</Text>
                        <Text fontSize="xs" color={endorsement.verified ? "green.500" : "red.500"}>
                          {endorsement.verified ? '✓ Verified' : '✗ Not Verified'}
                        </Text>
                      </TableCell>
                      <TableCell>
                        <Badge bg={getStatusBgColor(endorsement.status)} color={getStatusTextColor(endorsement.status)}>
                          {getStatusText(endorsement.status)}
                        </Badge>
                        <Text fontSize="xs" color="gray.500" mt={1}>
                          {endorsement.endorsement_type} / {endorsement.endorsement_tier || 'N/A'}
                        </Text>
                      </TableCell>
                      <TableCell fontSize="sm" color="gray.500">
                        <Text>Created: {formatDate(endorsement.created_at)}</Text>
                        {endorsement.approved_at && (
                          <Text>Approved: {formatDate(endorsement.approved_at)}</Text>
                        )}
                      </TableCell>
                      <TableCell>
                        <HStack gap={2}>
                          <Button 
                            size="sm" 
                            bg="blue.500"
                            color="white"
                            _hover={{ bg: "blue.600" }}
                            variant="ghost"
                            onClick={() => viewEndorsementDetails(endorsement)}
                          >
                            View
                          </Button>
                          
                          {endorsement.status === 'pending_review' && endorsement.verified && (
                            <Button 
                              size="sm" 
                              bg="green.500"
                              color="white"
                              _hover={{ bg: "green.600" }}
                              variant="ghost"
                              onClick={() => openModal(endorsement, 'approve')}
                            >
                              Approve
                            </Button>
                          )}
                          
                          {['pending_verification', 'pending_review'].includes(endorsement.status) && (
                            <Button 
                              size="sm" 
                              bg="red.500"
                              color="white"
                              _hover={{ bg: "red.600" }}
                              variant="ghost"
                              onClick={() => openModal(endorsement, 'reject')}
                            >
                              Reject
                            </Button>
                          )}
                          
                          {endorsement.status === 'approved' && !endorsement.featured && (
                            <Button 
                              size="sm" 
                              bg="purple.500"
                              color="white"
                              _hover={{ bg: "purple.600" }}
                              variant="ghost"
                              onClick={() => openModal(endorsement, 'feature')}
                            >
                              Feature
                            </Button>
                          )}
                          
                          {endorsement.status === 'approved' && endorsement.featured && (
                            <Button 
                              size="sm" 
                              bg="gray.500"
                              color="white"
                              _hover={{ bg: "gray.600" }}
                              variant="ghost"
                              onClick={() => openModal(endorsement, 'unfeature')}
                            >
                              Unfeature
                            </Button>
                          )}
                        </HStack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableRoot>
            </Box>
          </Box>
        )}
      </Box>

      {/* Endorsement detail modal */}
      <Modal.Root isOpen={isDetailModalOpen}>
        <Modal.Overlay onClick={closeDetailModal} />
        <Modal.Content>
          <Modal.Header>Endorsement Details</Modal.Header>
          <Modal.CloseButton onClick={closeDetailModal} />
          <Modal.Body>
            {selectedEndorsement && (
              <>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} mb={6}>
                  <Box>
                    <Heading as="h3" size="sm" mb={2}>Organization Information</Heading>
                    <VStack align="start" gap={2}>
                      <Text><Text as="span" fontWeight="medium">Name:</Text> {selectedEndorsement.organization_name}</Text>
                      <Text><Text as="span" fontWeight="medium">Country:</Text> {selectedEndorsement.country}</Text>
                      <Text><Text as="span" fontWeight="medium">Category:</Text> {selectedEndorsement.endorser_category.replace('_', ' ')}</Text>
                      <Text><Text as="span" fontWeight="medium">Website:</Text> {selectedEndorsement.website || 'Not provided'}</Text>
                    </VStack>
                  </Box>
                  
                  <Box>
                    <Heading as="h3" size="sm" mb={2}>Contact Information</Heading>
                    <VStack align="start" gap={2}>
                      <Text><Text as="span" fontWeight="medium">Name:</Text> {selectedEndorsement.contact_person_name}</Text>
                      <Text><Text as="span" fontWeight="medium">Email:</Text> {selectedEndorsement.email}</Text>
                      <Text>
                        <Text as="span" fontWeight="medium">Verification:</Text> 
                        <Text as="span" color={selectedEndorsement.verified ? "green.500" : "red.500"} ml={1}>
                          {selectedEndorsement.verified ? '✓ Verified' : '✗ Not Verified'}
                        </Text>
                      </Text>
                    </VStack>
                  </Box>
                </Grid>
                
                <Box mb={6}>
                  <Heading as="h3" size="sm" mb={2}>Endorsement Information</Heading>
                  <VStack align="start" gap={4} width="100%">
                    <Box width="100%">
                      <Text fontWeight="medium">Type & Tier:</Text>
                      <Text>{selectedEndorsement.endorsement_type} / {selectedEndorsement.endorsement_tier || 'N/A'}</Text>
                    </Box>
                    
                    <Box width="100%">
                      <Text fontWeight="medium">Headline:</Text>
                      <Text color="gray.700">{selectedEndorsement.endorsement_headline}</Text>
                    </Box>
                    
                    <Box width="100%">
                      <Text fontWeight="medium">Statement:</Text>
                      <Text color="gray.700">{selectedEndorsement.endorsement_statement}</Text>
                    </Box>
                    
                    {selectedEndorsement.logo_file && (
                      <Box width="100%">
                        <Text fontWeight="medium">Logo:</Text>
                        <Box mt={2} width="128px" height="128px" position="relative">
                          <Image 
                            src={selectedEndorsement.logo_file} 
                            alt={`${selectedEndorsement.organization_name} logo`}
                            width={128}
                            height={128}
                            style={{ objectFit: 'contain' }}
                          />
                        </Box>
                      </Box>
                    )}
                    
                    {selectedEndorsement.video_link && (
                      <Box width="100%">
                        <Text fontWeight="medium">Video Link:</Text>
                        <a 
                          href={selectedEndorsement.video_link} 
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: 'var(--chakra-colors-blue-500)',
                            textDecoration: 'underline'
                          }}
                        >
                          {selectedEndorsement.video_link}
                        </a>
                      </Box>
                    )}
                  </VStack>
                </Box>
                
                <Box mb={6}>
                  <Heading as="h3" size="sm" mb={2}>Status Information</Heading>
                  <VStack align="start" gap={2}>
                    <Flex align="center">
                      <Text fontWeight="medium" mr={2}>Current Status:</Text> 
                      <Badge bg={getStatusBgColor(selectedEndorsement.status)} color={getStatusTextColor(selectedEndorsement.status)}>
                        {getStatusText(selectedEndorsement.status)}
                      </Badge>
                    </Flex>
                    <Text><Text as="span" fontWeight="medium">Created:</Text> {formatDate(selectedEndorsement.created_at)}</Text>
                    {selectedEndorsement.approved_at && (
                      <Text><Text as="span" fontWeight="medium">Approved:</Text> {formatDate(selectedEndorsement.approved_at)}</Text>
                    )}
                    {selectedEndorsement.rejection_reason && (
                      <Box width="100%">
                        <Text fontWeight="medium">Rejection Reason:</Text>
                        <Text color="red.500">{selectedEndorsement.rejection_reason}</Text>
                      </Box>
                    )}
                  </VStack>
                </Box>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <HStack gap={3}>
              <Button variant="outline" onClick={closeDetailModal}>
                Close
              </Button>
              
              {selectedEndorsement && selectedEndorsement.status === 'pending_review' && selectedEndorsement.verified && (
                <Button
                  bg="green.500"
                  color="white"
                  _hover={{ bg: "green.600" }}
                  onClick={() => {
                    closeDetailModal();
                    openModal(selectedEndorsement, 'approve');
                  }}
                >
                  Approve
                </Button>
              )}
              
              {selectedEndorsement && ['pending_verification', 'pending_review'].includes(selectedEndorsement.status) && (
                <Button
                  bg="red.500"
                  color="white"
                  _hover={{ bg: "red.600" }}
                  onClick={() => {
                    closeDetailModal();
                    openModal(selectedEndorsement, 'reject');
                  }}
                >
                  Reject
                </Button>
              )}
              
              {selectedEndorsement && selectedEndorsement.status === 'approved' && !selectedEndorsement.featured && (
                <Button
                  bg="purple.500"
                  color="white"
                  _hover={{ bg: "purple.600" }}
                  onClick={() => {
                    closeDetailModal();
                    openModal(selectedEndorsement, 'feature');
                  }}
                >
                  Feature
                </Button>
              )}
              
              {selectedEndorsement && selectedEndorsement.status === 'approved' && selectedEndorsement.featured && (
                <Button
                  bg="gray.500"
                  color="white"
                  _hover={{ bg: "gray.600" }}
                  onClick={() => {
                    closeDetailModal();
                    openModal(selectedEndorsement, 'unfeature');
                  }}
                >
                  Unfeature
                </Button>
              )}
            </HStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>

      {/* Action confirmation modal */}
      <Modal.Root isOpen={isModalOpen}>
        <Modal.Overlay onClick={closeModal} />
        <Modal.Content>
            <Modal.Header>
              {modalAction === 'approve' && 'Approve Endorsement'}
              {modalAction === 'reject' && 'Reject Endorsement'}
              {modalAction === 'feature' && 'Feature Endorsement'}
              {modalAction === 'unfeature' && 'Unfeature Endorsement'}
            </Modal.Header>
            <Modal.CloseButton onClick={closeModal} />
            <Modal.Body>
              {selectedEndorsement && (
                <>
                  <Text color="gray.600" mb={4}>
                    {modalAction === 'approve' && 'Are you sure you want to approve this endorsement? This will make it visible on the Wall of Endorsers.'}
                    {modalAction === 'reject' && 'Are you sure you want to reject this endorsement? Please provide a reason for the rejection.'}
                    {modalAction === 'feature' && 'Are you sure you want to feature this endorsement? Featured endorsements will be highlighted on the Wall of Endorsers.'}
                    {modalAction === 'unfeature' && 'Are you sure you want to remove this endorsement from featured? It will still be visible but not highlighted.'}
                  </Text>
                  
                  <Box mt={2}>
                    <Text fontWeight="medium">{selectedEndorsement.organization_name}</Text>
                    {modalAction === 'approve' && (
                      <Text fontSize="sm" color="gray.500">This will send an approval email to {selectedEndorsement.email}</Text>
                    )}
                    {modalAction === 'reject' && (
                      <Text fontSize="sm" color="gray.500">This will send a rejection email to {selectedEndorsement.email}</Text>
                    )}
                  </Box>
                  
                  {modalAction === 'reject' && (
                    <Box mt={4}>
                      <Text fontSize="sm" fontWeight="medium" mb={1} display="block">
                        Rejection Reason
                      </Text>
                      <Textarea
                        id="rejectionReason"
                        rows={3}
                        placeholder="Please provide a reason for rejection"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        required
                        borderColor="orange.500"
                        _focus={{ borderColor: "orange.500" }}
                      />
                    </Box>
                  )}
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button 
                variant="outline" 
                mr={3} 
                onClick={closeModal}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              
              <Button
                bg={
                  modalAction === 'approve' ? 'green.500' :
                  modalAction === 'reject' ? 'red.500' :
                  modalAction === 'feature' ? 'purple.500' :
                  'gray.500'
                }
                color="white"
                _hover={{
                  bg: modalAction === 'approve' ? 'green.600' :
                      modalAction === 'reject' ? 'red.600' :
                      modalAction === 'feature' ? 'purple.600' :
                      'gray.600'
                }}
                onClick={handleEndorsementAction}
                disabled={isSubmitting || (modalAction === 'reject' && !rejectionReason)}
                _disabled={{ opacity: 0.6, cursor: 'not-allowed' }}
              >
                {modalAction === 'approve' && 'Approve'}
                {modalAction === 'reject' && 'Reject'}
                {modalAction === 'feature' && 'Feature'}
                {modalAction === 'unfeature' && 'Unfeature'}
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Root>
    </Container>
  );
}