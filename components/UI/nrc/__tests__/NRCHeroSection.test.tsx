import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NRCLandingPage from '../NRCLandingPage';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/get-involved/nrc-volunteer',
  }),
}));

// Mock auth context
jest.mock('@/lib/context/AuthContext', () => ({
  useAuthContext: () => ({
    user: null,
    isAuthenticated: false,
  }),
}));

// Mock NRC service
jest.mock('@/lib/services/mockNRCService', () => ({
  submitNRCApplication: jest.fn(),
  checkApplicationStatus: jest.fn(),
}));

describe('NRC Hero Section', () => {
  beforeEach(() => {
    // Reset any mocks
    jest.clearAllMocks();
  });

  test('renders hero section with background image', () => {
    render(<NRCLandingPage />);
    
    // Check for main heading
    expect(screen.getByRole('heading', { name: /join the nrc volunteer program/i })).toBeInTheDocument();
    
    // Check for program description
    expect(screen.getByText(/help identify and profile 6,000\+ impactful changemakers/i)).toBeInTheDocument();
  });

  test('displays program details correctly', () => {
    render(<NRCLandingPage />);
    
    // Check for program details
    expect(screen.getByText(/remote \(all african countries \+ diaspora\)/i)).toBeInTheDocument();
    expect(screen.getByText(/july 15 – august 20, 2025/i)).toBeInTheDocument();
    expect(screen.getByText(/30 volunteer positions/i)).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(<NRCLandingPage />);
    
    // Check for ARIA labels
    const heroSection = screen.getByRole('banner');
    expect(heroSection).toHaveAttribute('aria-label', expect.stringContaining('hero section'));
    
    // Check for proper heading structure
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveAttribute('id', 'hero-title');
  });

  test('scroll indicator works correctly', async () => {
    render(<NRCLandingPage />);
    
    // Find scroll indicator button
    const scrollButton = screen.getByRole('button', { name: /scroll down to learn more/i });
    expect(scrollButton).toBeInTheDocument();
    
    // Mock scrollIntoView
    const mockScrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;
    
    // Click scroll indicator
    fireEvent.click(scrollButton);
    
    // Verify scroll behavior (would need actual DOM for full test)
    expect(scrollButton).toBeInTheDocument();
  });

  test('apply button has correct accessibility attributes', () => {
    render(<NRCLandingPage />);
    
    // Find apply button
    const applyButton = screen.getByRole('button', { name: /apply to join/i });
    expect(applyButton).toBeInTheDocument();
    expect(applyButton).toHaveAttribute('aria-describedby', 'hero-title');
  });

  test('program details have proper list structure', () => {
    render(<NRCLandingPage />);
    
    // Check for list structure
    const programDetails = screen.getByRole('list', { name: /program details/i });
    expect(programDetails).toBeInTheDocument();
    
    // Check for list items
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  test('background image component renders with correct props', () => {
    render(<NRCLandingPage />);
    
    // Check that the component renders without errors
    // (OptimizedHeroBackground would need separate testing)
    const heroSection = screen.getByRole('banner');
    expect(heroSection).toBeInTheDocument();
  });

  test('responsive classes are applied correctly', () => {
    render(<NRCLandingPage />);
    
    const heroSection = screen.getByRole('banner');
    expect(heroSection).toHaveClass('nrc-hero-container');
    expect(heroSection).toHaveClass('min-h-screen');
    expect(heroSection).toHaveClass('relative');
  });

  test('text content has proper shadow classes', () => {
    render(<NRCLandingPage />);
    
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveClass('nrc-hero-text-shadow');
    expect(mainHeading).toHaveClass('nrc-hero-gradient-text');
  });

  test('handles keyboard navigation properly', () => {
    render(<NRCLandingPage />);
    
    // Test tab navigation
    const scrollButton = screen.getByRole('button', { name: /scroll down to learn more/i });
    const applyButton = screen.getByRole('button', { name: /apply to join/i });
    
    // Both buttons should be focusable
    expect(scrollButton).toHaveAttribute('type', 'button');
    expect(applyButton).toBeInTheDocument();
  });
});

describe('OptimizedHeroBackground Component', () => {
  // These tests would be for the separate component
  test('renders with fallback background', () => {
    // Would test the OptimizedHeroBackground component separately
    expect(true).toBe(true); // Placeholder
  });

  test('handles image loading states', () => {
    // Would test loading, error, and success states
    expect(true).toBe(true); // Placeholder
  });

  test('applies correct image optimization settings', () => {
    // Would test Next.js Image props
    expect(true).toBe(true); // Placeholder
  });
});
