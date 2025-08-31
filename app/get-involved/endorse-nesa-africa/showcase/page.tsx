'use client';

import { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Badge,
  Image,
  Flex,
  Divider,
  Button,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Center,
  useColorModeValue,
  Tag,
  TagLabel,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { SearchIcon, StarIcon } from '@/lib/icons';
import Link from 'next/link';

interface Endorsement {
  id: string;
  organization_name: string;
  endorser_category: string;
  country: string;
  endorsement_headline: string;
  endorsement_statement: string;
  logo_file?: string;
  featured: boolean;
  endorsement_type: string;
  endorsement_tier?: string;
}

export default function EndorsementShowcasePage() {
  const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
  const [filteredEndorsements, setFilteredEndorsements] = useState<Endorsement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  useEffect(() => {
    const fetchEndorsements = async () => {
      try {
        const response = await fetch('/api/endorse/showcase');
        const data = await response.json();
        
        if (data.success) {
          setEndorsements(data.endorsements);
          setFilteredEndorsements(data.endorsements);
        } else {
          setError(data.message || 'Failed to load endorsements');
        }
      } catch (error) {
        console.error('Error fetching endorsements:', error);
        setError('An error occurred while loading endorsements. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEndorsements();
  }, []);
  
  useEffect(() => {
    // Apply filters
    let results = [...endorsements];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        e => e.organization_name.toLowerCase().includes(term) || 
             e.endorsement_headline.toLowerCase().includes(term) ||
             e.endorsement_statement.toLowerCase().includes(term)
      );
    }
    
    if (categoryFilter) {
      results = results.filter(e => e.endorser_category === categoryFilter);
    }
    
    if (countryFilter) {
      results = results.filter(e => e.country === countryFilter);
    }
    
    setFilteredEndorsements(results);
  }, [searchTerm, categoryFilter, countryFilter, endorsements]);
  
  // Extract unique categories and countries for filters
  const categories = [...new Set(endorsements.map(e => e.endorser_category))].sort();
  const countries = [...new Set(endorsements.map(e => e.country))].sort();
  
  // Featured endorsements at the top
  const featuredEndorsements = filteredEndorsements.filter(e => e.featured);
  const regularEndorsements = filteredEndorsements.filter(e => !e.featured);
  
  const sortedEndorsements = [...featuredEndorsements, ...regularEndorsements];
  
  if (isLoading) {
    return (
      <Center h="50vh">
        <VStack spacing={4}>
          <Spinner size="xl" color="orange.500" thickness="4px" />
          <Text>Loading endorsements...</Text>
        </VStack>
      </Center>
    );
  }
  
  return (
    <Container maxW="container.xl" py={10}>
      <Box textAlign="center" mb={10}>
        <Heading as="h1" size="xl" mb={4}>
          NESA-Africa 2025 Wall of Endorsers
        </Heading>
        <Text color="gray.600" maxW="container.md" mx="auto">
          These organizations and individuals have endorsed NESA-Africa 2025, 
          supporting our mission to transform education across Africa.
        </Text>
      </Box>
      
      {/* Filters */}
      <Box mb={8} p={4} bg={cardBg} borderRadius="lg" boxShadow="sm" border="1px" borderColor={borderColor}>
        <VStack spacing={4}>
          <Heading as="h3" size="md" alignSelf="flex-start">
            Filter Endorsements
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} width="100%">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search by name or statement"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
            
            <Select 
              placeholder="All Categories" 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            
            <Select 
              placeholder="All Countries" 
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
            >
              {countries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Select>
          </SimpleGrid>
          
          <HStack alignSelf="flex-end">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
                setCountryFilter('');
              }}
            >
              Clear Filters
            </Button>
          </HStack>
        </VStack>
      </Box>
      
      {/* Results count */}
      <Text mb={4} fontWeight="medium">
        Showing {filteredEndorsements.length} of {endorsements.length} endorsements
      </Text>
      
      {error && (
        <Box p={4} bg="red.50" color="red.500" borderRadius="md" mb={6}>
          {error}
        </Box>
      )}
      
      {/* Featured endorsements section */}
      {featuredEndorsements.length > 0 && (
        <Box mb={8}>
          <Heading as="h2" size="lg" mb={4}>
            Featured Endorsers
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {featuredEndorsements.map(endorsement => (
              <EndorsementCard key={endorsement.id} endorsement={endorsement} featured={true} />
            ))}
          </SimpleGrid>
          <Divider my={8} />
        </Box>
      )}
      
      {/* All endorsements */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {regularEndorsements.map(endorsement => (
          <EndorsementCard key={endorsement.id} endorsement={endorsement} featured={false} />
        ))}
      </SimpleGrid>
      
      {filteredEndorsements.length === 0 && (
        <Center h="200px">
          <VStack spacing={4}>
            <Text>No endorsements found matching your filters.</Text>
            <Button 
              colorScheme="orange" 
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
                setCountryFilter('');
              }}
            >
              Clear Filters
            </Button>
          </VStack>
        </Center>
      )}
      
      {/* Call to action */}
      <Box 
        mt={16} 
        p={8} 
        bg="orange.50" 
        borderRadius="lg" 
        textAlign="center"
        border="1px"
        borderColor="orange.200"
      >
        <Heading as="h3" size="lg" mb={4} color="orange.600">
          Join the Movement
        </Heading>
        <Text mb={6} maxW="container.md" mx="auto">
          Add your voice to the growing list of organizations and individuals endorsing NESA-Africa 2025.
          Your support helps us build momentum for transforming education across Africa.
        </Text>
        <Button 
          as={Link} 
          href="/get-involved/endorse-nesa-africa" 
          colorScheme="orange" 
          size="lg"
        >
          Endorse NESA-Africa 2025
        </Button>
      </Box>
    </Container>
  );
}

function EndorsementCard({ endorsement, featured }: { endorsement: Endorsement, featured: boolean }) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Box 
      p={6} 
      bg={cardBg} 
      borderRadius="lg" 
      boxShadow="md"
      border="1px"
      borderColor={borderColor}
      position="relative"
      transition="transform 0.2s"
      _hover={{ transform: 'translateY(-5px)' }}
    >
      {featured && (
        <Tag 
          position="absolute" 
          top={-3} 
          right={4} 
          colorScheme="yellow" 
          borderRadius="full"
          boxShadow="sm"
        >
          <StarIcon mr={1} />
          <TagLabel>Featured</TagLabel>
        </Tag>
      )}
      
      <VStack spacing={4} align="stretch">
        <Flex justify="space-between" align="center">
          <VStack align="start" spacing={1}>
            <Heading as="h3" size="md" noOfLines={2}>
              {endorsement.organization_name}
            </Heading>
            <HStack>
              <Badge colorScheme="blue">{endorsement.endorser_category}</Badge>
              <Badge colorScheme="green">{endorsement.country}</Badge>
            </HStack>
          </VStack>
          
          {endorsement.logo_file && (
            <Box 
              w="60px" 
              h="60px" 
              borderRadius="md" 
              overflow="hidden"
              border="1px"
              borderColor={borderColor}
            >
              <Image 
                src={endorsement.logo_file} 
                alt={`${endorsement.organization_name} logo`}
                objectFit="contain"
                w="100%"
                h="100%"
                fallbackSrc="https://via.placeholder.com/60?text=Logo"
              />
            </Box>
          )}
        </Flex>
        
        <Divider />
        
        <Text fontWeight="bold" noOfLines={2}>
          {endorsement.endorsement_headline}
        </Text>
        
        <Text noOfLines={3} fontSize="sm" color="gray.600">
          {endorsement.endorsement_statement}
        </Text>
        
        {endorsement.endorsement_type === 'paid' && endorsement.endorsement_tier && (
          <Wrap spacing={2} mt={2}>
            <WrapItem>
              <Badge colorScheme="purple" variant="solid" px={2}>
                {endorsement.endorsement_tier} Tier
              </Badge>
            </WrapItem>
          </Wrap>
        )}
      </VStack>
    </Box>
  );
}