-- CreateEnum
CREATE TYPE "public"."AccountType" AS ENUM ('INDIVIDUAL', 'NGO', 'CORPORATION', 'GOVERNMENT', 'SCHOOL', 'DIASPORA_GROUP');

-- CreateEnum
CREATE TYPE "public"."AdminPermission" AS ENUM ('READ', 'WRITE', 'DELETE', 'MANAGE_USERS', 'MANAGE_PERMISSIONS', 'VIEW_ANALYTICS', 'SYSTEM_CONFIG', 'FULL_ACCESS');

-- CreateEnum
CREATE TYPE "public"."ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW');

-- CreateEnum
CREATE TYPE "public"."ChapterType" AS ENUM ('ONLINE', 'HYBRID', 'PHYSICAL');

-- CreateEnum
CREATE TYPE "public"."Division" AS ENUM ('SOBCD', 'OMBDD', 'TDSD', 'LSC');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "public"."InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'EXPIRED', 'REVOKED');

-- CreateEnum
CREATE TYPE "public"."Language" AS ENUM ('EN', 'FR', 'AR', 'PT');

-- CreateEnum
CREATE TYPE "public"."NomineeStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED', 'SHORTLISTED');

-- CreateEnum
CREATE TYPE "public"."NotificationType" AS ENUM ('APPLICATION_SUBMITTED', 'APPLICATION_APPROVED', 'APPLICATION_REJECTED', 'NOMINEE_SUBMITTED', 'SYSTEM_UPDATE', 'VOTING_OPENED', 'VOTING_CLOSED', 'WALLET_TRANSACTION', 'ADMIN_INVITATION_SENT', 'ADMIN_INVITATION_ACCEPTED');

-- CreateEnum
CREATE TYPE "public"."OtpPurpose" AS ENUM ('LOGIN', 'VERIFY_EMAIL', 'PASSWORD_RESET');

-- CreateEnum
CREATE TYPE "public"."PlatformSection" AS ENUM ('USER_MANAGEMENT', 'NRC_VOLUNTEERS', 'NOMINATIONS', 'JUDGES', 'VOTING_SYSTEM', 'WALLET_MANAGEMENT', 'CHAPTER_MANAGEMENT', 'FILE_MANAGEMENT', 'NOTIFICATIONS', 'ANALYTICS', 'SYSTEM_SETTINGS', 'ALL_SECTIONS');

-- CreateEnum
CREATE TYPE "public"."UserIntent" AS ENUM ('VOTE_OR_NOMINATE', 'APPLY_FOR_EDUAID_SCHOLARSHIP', 'BECOME_AMBASSADOR', 'JOIN_WEBINAR_EXPO', 'SPONSOR_OR_CSR_PARTNER', 'APPLY_AS_JUDGE', 'JOIN_LOCAL_CHAPTER', 'JOIN_NESA_TEAM', 'GET_GALA_TICKET', 'DONATE', 'APPLY_AS_NRC_VOLUNTEER');

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('FREE_MEMBER', 'STANDARD_MEMBER', 'AMBASSADOR', 'JUDGE', 'VOLUNTEER', 'NRC_VOLUNTEER', 'INTERN', 'NOMINEE', 'SPONSOR', 'CHAPTER_LEADER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "public"."VolunteerStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "public"."WalletTransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."WalletTransactionType" AS ENUM ('CREDIT', 'DEBIT');

-- CreateTable
CREATE TABLE "public"."admin_invitations" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "invitationToken" TEXT NOT NULL,
    "sections" "public"."PlatformSection"[],
    "permissions" "public"."AdminPermission"[],
    "status" "public"."InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "invitedBy" TEXT NOT NULL,
    "invitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "admin_invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."admin_sections" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "section" "public"."PlatformSection" NOT NULL,
    "permissions" "public"."AdminPermission"[],
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "admin_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."audit_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "resourceId" TEXT,
    "details" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chapter_memberships" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chapterId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chapter_memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chapters" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "type" "public"."ChapterType" NOT NULL DEFAULT 'ONLINE',
    "leaderId" TEXT,
    "memberCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."dashboard_configs" (
    "id" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL,
    "layout" TEXT NOT NULL,
    "widgets" JSONB NOT NULL,
    "navigation" JSONB NOT NULL,
    "theme" JSONB,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dashboard_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."judge_applications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "documentsUrl" TEXT,
    "profileImageUrl" TEXT,
    "status" "public"."ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "verificationToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "judge_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."nominations" (
    "id" TEXT NOT NULL,
    "nominatorId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "organizationName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "website" TEXT,
    "linkedinProfile" TEXT,
    "awardCategory" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "achievementSummary" TEXT NOT NULL,
    "impactMetrics" TEXT NOT NULL,
    "beneficiariesCount" TEXT,
    "yearsOfImpact" TEXT,
    "sdgAlignment" TEXT[],
    "agendaAlignment" TEXT,
    "esgAlignment" TEXT,
    "verificationLinks" TEXT,
    "mediaLinks" TEXT,
    "additionalNotes" TEXT,
    "supportingDocuments" TEXT[],
    "profileImageUrl" TEXT,
    "status" "public"."NomineeStatus" NOT NULL DEFAULT 'DRAFT',
    "completionScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nominations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."nominee_profiles" (
    "id" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "organizationName" TEXT,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "website" TEXT,
    "linkedinProfile" TEXT,
    "awardCategory" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "achievementSummary" TEXT NOT NULL,
    "impactMetrics" TEXT NOT NULL,
    "beneficiariesCount" TEXT,
    "yearsOfImpact" TEXT,
    "sdgAlignment" TEXT[],
    "agendaAlignment" TEXT NOT NULL,
    "esgAlignment" TEXT NOT NULL,
    "verificationLinks" TEXT,
    "mediaLinks" TEXT,
    "additionalNotes" TEXT,
    "supportingDocuments" TEXT[],
    "profileImageUrl" TEXT,
    "status" "public"."NomineeStatus" NOT NULL DEFAULT 'DRAFT',
    "completionScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nominee_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "public"."NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "actionUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."nrc_applications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "motivation" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "skills" TEXT[],
    "commitment" BOOLEAN NOT NULL DEFAULT false,
    "terms" BOOLEAN NOT NULL DEFAULT false,
    "cvUrl" TEXT,
    "status" "public"."ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "reviewedBy" TEXT,
    "reviewDate" TIMESTAMP(3),
    "reviewNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nrc_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."nrc_volunteers" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "approvalDate" TIMESTAMP(3) NOT NULL,
    "nomineesUploaded" INTEGER NOT NULL DEFAULT 0,
    "targetNominees" INTEGER NOT NULL DEFAULT 10,
    "completionRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."VolunteerStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "nrc_volunteers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."role_permissions" (
    "id" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL,
    "resource" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "conditions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_permissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "granted" BOOLEAN NOT NULL DEFAULT true,
    "conditions" JSONB,
    "grantedBy" TEXT,
    "grantedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'FREE_MEMBER',
    "accountType" "public"."AccountType" NOT NULL DEFAULT 'INDIVIDUAL',
    "firstName" TEXT,
    "lastName" TEXT,
    "fullName" TEXT,
    "phone" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" "public"."Gender",
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "address" TEXT,
    "organizationName" TEXT,
    "organizationType" TEXT,
    "organizationRole" TEXT,
    "profileImage" TEXT,
    "bio" TEXT,
    "website" TEXT,
    "linkedinProfile" TEXT,
    "preferredLanguage" "public"."Language" NOT NULL DEFAULT 'EN',
    "intents" "public"."UserIntent"[],
    "division" "public"."Division",
    "functions" TEXT[],
    "referrerId" TEXT,
    "referralCode" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "emailVerifiedAt" TIMESTAMP(3),
    "lastLoginAt" TIMESTAMP(3),
    "passwordResetToken" TEXT,
    "passwordResetExpires" TIMESTAMP(3),
    "emailVerificationToken" TEXT,
    "emailVerificationExpires" TIMESTAMP(3),
    "refreshToken" TEXT,
    "refreshTokenExpires" TIMESTAMP(3),
    "loginAttempts" INTEGER NOT NULL DEFAULT 0,
    "lockUntil" TIMESTAMP(3),
    "otpCode" TEXT,
    "otpExpires" TIMESTAMP(3),
    "otpPurpose" "public"."OtpPurpose",
    "invitedBy" TEXT,
    "invitedAt" TIMESTAMP(3),
    "lastDashboardAccess" TIMESTAMP(3),
    "dashboardPreferences" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."votes" (
    "id" TEXT NOT NULL,
    "voterId" TEXT NOT NULL,
    "nominationId" TEXT NOT NULL,
    "agcAmount" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."wallet_transactions" (
    "id" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "type" "public"."WalletTransactionType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "reason" TEXT NOT NULL,
    "description" TEXT,
    "referenceId" TEXT,
    "status" "public"."WalletTransactionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wallet_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."wallets" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "agcWithdrawableBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "agcLockedBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "currencyEquivalentBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_invitations_invitationToken_key" ON "public"."admin_invitations"("invitationToken");

-- CreateIndex
CREATE UNIQUE INDEX "admin_sections_userId_section_key" ON "public"."admin_sections"("userId", "section");

-- CreateIndex
CREATE UNIQUE INDEX "chapter_memberships_userId_key" ON "public"."chapter_memberships"("userId");

-- CreateIndex
CREATE INDEX "dashboard_configs_layout_idx" ON "public"."dashboard_configs"("layout");

-- CreateIndex
CREATE INDEX "dashboard_configs_role_idx" ON "public"."dashboard_configs"("role");

-- CreateIndex
CREATE UNIQUE INDEX "dashboard_configs_role_layout_key" ON "public"."dashboard_configs"("role", "layout");

-- CreateIndex
CREATE UNIQUE INDEX "judge_applications_userId_key" ON "public"."judge_applications"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "nrc_applications_userId_key" ON "public"."nrc_applications"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "nrc_volunteers_applicationId_key" ON "public"."nrc_volunteers"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "nrc_volunteers_userId_key" ON "public"."nrc_volunteers"("userId");

-- CreateIndex
CREATE INDEX "role_permissions_resource_action_idx" ON "public"."role_permissions"("resource", "action");

-- CreateIndex
CREATE INDEX "role_permissions_role_idx" ON "public"."role_permissions"("role");

-- CreateIndex
CREATE UNIQUE INDEX "role_permissions_role_resource_action_key" ON "public"."role_permissions"("role", "resource", "action");

-- CreateIndex
CREATE INDEX "user_permissions_expiresAt_idx" ON "public"."user_permissions"("expiresAt");

-- CreateIndex
CREATE INDEX "user_permissions_resource_action_idx" ON "public"."user_permissions"("resource", "action");

-- CreateIndex
CREATE INDEX "user_permissions_userId_idx" ON "public"."user_permissions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_permissions_userId_resource_action_key" ON "public"."user_permissions"("userId", "resource", "action");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "votes_voterId_nominationId_key" ON "public"."votes"("voterId", "nominationId");

-- CreateIndex
CREATE UNIQUE INDEX "wallets_userId_key" ON "public"."wallets"("userId");

-- AddForeignKey
ALTER TABLE "public"."admin_invitations" ADD CONSTRAINT "admin_invitations_invitedBy_fkey" FOREIGN KEY ("invitedBy") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."admin_invitations" ADD CONSTRAINT "admin_invitations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."admin_sections" ADD CONSTRAINT "admin_sections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."audit_logs" ADD CONSTRAINT "audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chapter_memberships" ADD CONSTRAINT "chapter_memberships_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "public"."chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chapter_memberships" ADD CONSTRAINT "chapter_memberships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."judge_applications" ADD CONSTRAINT "judge_applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."nominations" ADD CONSTRAINT "nominations_nominatorId_fkey" FOREIGN KEY ("nominatorId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."nominee_profiles" ADD CONSTRAINT "nominee_profiles_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "public"."nrc_volunteers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."nrc_applications" ADD CONSTRAINT "nrc_applications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."nrc_volunteers" ADD CONSTRAINT "nrc_volunteers_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "public"."nrc_applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."nrc_volunteers" ADD CONSTRAINT "nrc_volunteers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_permissions" ADD CONSTRAINT "user_permissions_grantedBy_fkey" FOREIGN KEY ("grantedBy") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_permissions" ADD CONSTRAINT "user_permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."votes" ADD CONSTRAINT "votes_nominationId_fkey" FOREIGN KEY ("nominationId") REFERENCES "public"."nominations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."votes" ADD CONSTRAINT "votes_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."wallet_transactions" ADD CONSTRAINT "wallet_transactions_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "public"."wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."wallets" ADD CONSTRAINT "wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
