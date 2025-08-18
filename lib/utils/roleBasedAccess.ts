// Role-based access control utilities for NESA platform

export type UserRole = 
  | 'FREE_MEMBER'
  | 'STANDARD_MEMBER'
  | 'AMBASSADOR'
  | 'JUDGE'
  | 'VOLUNTEER'
  | 'NRC_VOLUNTEER'
  | 'INTERN'
  | 'NOMINEE'
  | 'SPONSOR'
  | 'CHAPTER_LEADER'
  | 'ADMIN'
  | 'SUPER_ADMIN';

export type AccountType = 
  | 'INDIVIDUAL'
  | 'NGO'
  | 'CORPORATION'
  | 'GOVERNMENT'
  | 'SCHOOL'
  | 'DIASPORA_GROUP';

export type Permission = 
  | 'vote'
  | 'nominate'
  | 'judge_nominations'
  | 'manage_nrc'
  | 'manage_chapter'
  | 'manage_users'
  | 'view_analytics'
  | 'sponsor_events'
  | 'volunteer_tasks'
  | 'admin_access'
  | 'super_admin_access';

export type DashboardFeature = 
  | 'profile'
  | 'notifications'
  | 'help'
  | 'vote'
  | 'nominate'
  | 'events'
  | 'referrals'
  | 'chapter_management'
  | 'training'
  | 'evaluation'
  | 'scoring'
  | 'judge_resources'
  | 'research'
  | 'nominee_submission'
  | 'progress_tracking'
  | 'sponsorship_packages'
  | 'marketing_kit'
  | 'impact_reports'
  | 'task_management'
  | 'team_collaboration'
  | 'time_tracking'
  | 'user_management'
  | 'system_settings'
  | 'analytics_dashboard';

// Role-based permissions mapping
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  'FREE_MEMBER': ['vote', 'nominate'],
  'STANDARD_MEMBER': ['vote', 'nominate'],
  'AMBASSADOR': ['vote', 'nominate', 'manage_chapter'],
  'JUDGE': ['vote', 'nominate', 'judge_nominations'],
  'VOLUNTEER': ['vote', 'nominate', 'volunteer_tasks'],
  'NRC_VOLUNTEER': ['vote', 'nominate', 'manage_nrc'],
  'INTERN': ['vote', 'nominate', 'volunteer_tasks'],
  'NOMINEE': ['vote'],
  'SPONSOR': ['vote', 'nominate', 'sponsor_events'],
  'CHAPTER_LEADER': ['vote', 'nominate', 'manage_chapter'],
  'ADMIN': ['vote', 'nominate', 'admin_access', 'view_analytics', 'manage_users'],
  'SUPER_ADMIN': ['vote', 'nominate', 'admin_access', 'super_admin_access', 'view_analytics', 'manage_users']
};

// Role-based dashboard features mapping
const ROLE_FEATURES: Record<UserRole, DashboardFeature[]> = {
  'FREE_MEMBER': ['profile', 'notifications', 'help', 'vote', 'nominate', 'events'],
  'STANDARD_MEMBER': ['profile', 'notifications', 'help', 'vote', 'nominate', 'events'],
  'AMBASSADOR': ['profile', 'notifications', 'help', 'vote', 'nominate', 'events', 'referrals', 'chapter_management', 'training'],
  'JUDGE': ['profile', 'notifications', 'help', 'vote', 'nominate', 'evaluation', 'scoring', 'judge_resources'],
  'VOLUNTEER': ['profile', 'notifications', 'help', 'vote', 'nominate', 'task_management', 'team_collaboration', 'time_tracking'],
  'NRC_VOLUNTEER': ['profile', 'notifications', 'help', 'vote', 'nominate', 'research', 'nominee_submission', 'progress_tracking'],
  'INTERN': ['profile', 'notifications', 'help', 'vote', 'nominate', 'task_management', 'team_collaboration'],
  'NOMINEE': ['profile', 'notifications', 'help', 'vote'],
  'SPONSOR': ['profile', 'notifications', 'help', 'vote', 'nominate', 'sponsorship_packages', 'marketing_kit', 'impact_reports'],
  'CHAPTER_LEADER': ['profile', 'notifications', 'help', 'vote', 'nominate', 'chapter_management', 'events'],
  'ADMIN': ['profile', 'notifications', 'help', 'user_management', 'analytics_dashboard', 'system_settings'],
  'SUPER_ADMIN': ['profile', 'notifications', 'help', 'user_management', 'analytics_dashboard', 'system_settings']
};

// Dashboard route mapping
const ROLE_DASHBOARD_ROUTES: Record<UserRole, string> = {
  'FREE_MEMBER': '/member/dashboard',
  'STANDARD_MEMBER': '/member/dashboard',
  'AMBASSADOR': '/ambassador/dashboard',
  'JUDGE': '/judge/dashboard',
  'VOLUNTEER': '/volunteer/dashboard',
  'NRC_VOLUNTEER': '/get-involved/nrc-volunteer/dashboard',
  'INTERN': '/volunteer/dashboard',
  'NOMINEE': '/member/dashboard',
  'SPONSOR': '/sponsor/dashboard',
  'CHAPTER_LEADER': '/chapter/dashboard',
  'ADMIN': '/admin/dashboard',
  'SUPER_ADMIN': '/admin/dashboard'
};

// Account type specific features
const ACCOUNT_TYPE_FEATURES: Record<AccountType, DashboardFeature[]> = {
  'INDIVIDUAL': ['profile'],
  'NGO': ['profile', 'impact_reports'],
  'CORPORATION': ['profile', 'sponsorship_packages', 'marketing_kit'],
  'GOVERNMENT': ['profile', 'analytics_dashboard'],
  'SCHOOL': ['profile', 'events'],
  'DIASPORA_GROUP': ['profile', 'chapter_management']
};

/**
 * Check if a user has a specific permission
 */
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
  return rolePermissions.includes(permission);
}

/**
 * Get all permissions for a user role
 */
export function getUserPermissions(userRole: UserRole): Permission[] {
  return ROLE_PERMISSIONS[userRole] || [];
}

/**
 * Get dashboard features available to a user based on role and account type
 */
export function getDashboardFeatures(userRole: UserRole, accountType?: AccountType): DashboardFeature[] {
  const baseFeatures: DashboardFeature[] = ['profile', 'notifications', 'help'];
  const roleFeatures = ROLE_FEATURES[userRole] || [];
  const accountFeatures = accountType ? ACCOUNT_TYPE_FEATURES[accountType] || [] : [];

  // Combine and deduplicate features
  const allFeatures = [...new Set([...baseFeatures, ...roleFeatures, ...accountFeatures])];
  return allFeatures as DashboardFeature[];
}

/**
 * Get the appropriate dashboard route for a user role
 */
export function getDashboardRoute(userRole: UserRole): string {
  return ROLE_DASHBOARD_ROUTES[userRole] || '/member/dashboard';
}

/**
 * Check if a user can access a specific dashboard feature
 */
export function canAccessFeature(userRole: UserRole, feature: DashboardFeature, accountType?: AccountType): boolean {
  const availableFeatures = getDashboardFeatures(userRole, accountType);
  return availableFeatures.includes(feature);
}

/**
 * Get role hierarchy level (higher number = more permissions)
 */
export function getRoleLevel(userRole: UserRole): number {
  const roleLevels: Record<UserRole, number> = {
    'FREE_MEMBER': 1,
    'STANDARD_MEMBER': 2,
    'NOMINEE': 2,
    'INTERN': 3,
    'VOLUNTEER': 4,
    'AMBASSADOR': 5,
    'JUDGE': 6,
    'NRC_VOLUNTEER': 6,
    'CHAPTER_LEADER': 7,
    'SPONSOR': 7,
    'ADMIN': 8,
    'SUPER_ADMIN': 9
  };
  
  return roleLevels[userRole] || 1;
}

/**
 * Check if user role has higher or equal level than required role
 */
export function hasRoleLevel(userRole: UserRole, requiredRole: UserRole): boolean {
  return getRoleLevel(userRole) >= getRoleLevel(requiredRole);
}

/**
 * Get navigation menu items based on user role and permissions
 */
export function getNavigationItems(userRole: UserRole, accountType?: AccountType) {
  const features = getDashboardFeatures(userRole, accountType);
  
  const navigationMap: Record<DashboardFeature, { label: string; href: string; icon?: string }> = {
    'profile': { label: 'Profile', href: '/profile', icon: 'User' },
    'notifications': { label: 'Notifications', href: '/notifications', icon: 'Bell' },
    'help': { label: 'Help', href: '/help', icon: 'HelpCircle' },
    'vote': { label: 'Vote', href: '/vote', icon: 'Vote' },
    'nominate': { label: 'Nominate', href: '/nominate', icon: 'Award' },
    'events': { label: 'Events', href: '/events', icon: 'Calendar' },
    'referrals': { label: 'Referrals', href: '/ambassador/referrals', icon: 'UserPlus' },
    'chapter_management': { label: 'Chapter', href: '/chapter', icon: 'Users' },
    'training': { label: 'Training', href: '/training', icon: 'BookOpen' },
    'evaluation': { label: 'Evaluation', href: '/judge/evaluation', icon: 'ClipboardCheck' },
    'scoring': { label: 'Scoring', href: '/judge/scoring', icon: 'Star' },
    'judge_resources': { label: 'Resources', href: '/judge/resources', icon: 'FileText' },
    'research': { label: 'Research', href: '/nrc/research', icon: 'Search' },
    'nominee_submission': { label: 'Submissions', href: '/nrc/submissions', icon: 'Upload' },
    'progress_tracking': { label: 'Progress', href: '/nrc/progress', icon: 'TrendingUp' },
    'sponsorship_packages': { label: 'Packages', href: '/sponsor/packages', icon: 'Package' },
    'marketing_kit': { label: 'Marketing', href: '/sponsor/marketing', icon: 'Megaphone' },
    'impact_reports': { label: 'Impact', href: '/sponsor/impact', icon: 'BarChart' },
    'task_management': { label: 'Tasks', href: '/volunteer/tasks', icon: 'CheckSquare' },
    'team_collaboration': { label: 'Team', href: '/volunteer/team', icon: 'Users' },
    'time_tracking': { label: 'Time', href: '/volunteer/time', icon: 'Clock' },
    'user_management': { label: 'Users', href: '/admin/users', icon: 'UserCog' },
    'system_settings': { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
    'analytics_dashboard': { label: 'Analytics', href: '/admin/analytics', icon: 'BarChart3' }
  };
  
  return features
    .filter(feature => navigationMap[feature])
    .map(feature => navigationMap[feature]);
}

/**
 * Determine if a user needs role upgrade based on their intents
 */
export function suggestRoleUpgrade(currentRole: UserRole, userIntents: string[]): UserRole | null {
  const intentRoleMapping: Record<string, UserRole> = {
    'BECOME_AMBASSADOR': 'AMBASSADOR',
    'APPLY_AS_JUDGE': 'JUDGE',
    'APPLY_AS_NRC_VOLUNTEER': 'NRC_VOLUNTEER',
    'JOIN_NESA_TEAM': 'VOLUNTEER',
    'SPONSOR_OR_CSR_PARTNER': 'SPONSOR'
  };
  
  for (const intent of userIntents) {
    const suggestedRole = intentRoleMapping[intent];
    if (suggestedRole && getRoleLevel(suggestedRole) > getRoleLevel(currentRole)) {
      return suggestedRole;
    }
  }
  
  return null;
}
