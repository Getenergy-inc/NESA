import React from 'react';
import {
  Info,
  Eye,
  Award,
  Building2,
  Target,
  Trophy,
  Crown,
  Medal,
  Star,
  Scale,
  Users,
  Heart,
  Gift,
  UserPlus,
  UserCheck,
  Play,
  Tv,
  Radio,
  ChevronDown,
  Hand,
  UserRound,
  Globe,
  Languages,
} from 'lucide-react';

// Icon mapping for navigation items
const iconMap = {
  Info,
  Eye,
  Award,
  Building2,
  Target,
  Trophy,
  Crown,
  Medal,
  Star,
  Scale,
  Users,
  HandHeart: Hand, // Using Hand icon as alternative
  Heart,
  Handshake: UserRound, // Using UserRound icon as alternative for partnership
  Gift,
  UserPlus,
  UserCheck,
  Play,
  Tv,
  Radio,
  ChevronDown,
  // Language icons (using Globe as alternative for country flags)
  EN: Globe, // English
  FR: Globe, // French
  AR: Globe, // Arabic/Swahili (using AR as icon name)
  PT: Globe, // Portuguese
  Languages, // For the main Language menu item
};

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
}

export const renderIcon = ({ name, size = 18, className = '', color }: IconProps): React.ReactElement | null => {
  const IconComponent = iconMap[name as keyof typeof iconMap];
  
  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent 
      size={size} 
      className={className}
      style={color ? { color } : undefined}
    />
  );
};

export default renderIcon;
