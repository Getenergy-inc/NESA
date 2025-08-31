-- CreateTable
CREATE TABLE "Endorsement" (
  "id" TEXT NOT NULL,
  "organization_name" TEXT NOT NULL,
  "contact_person_name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "country" TEXT NOT NULL,
  "website" TEXT,
  "endorser_category" TEXT NOT NULL,
  "endorsement_type" TEXT NOT NULL,
  "endorsement_tier" TEXT,
  "payment_method" TEXT,
  "payment_reference" TEXT,
  "payment_verified" BOOLEAN NOT NULL DEFAULT false,
  "endorsement_headline" TEXT NOT NULL,
  "endorsement_statement" TEXT NOT NULL,
  "logo_file" TEXT,
  "video_file" TEXT,
  "video_link" TEXT,
  "consent_to_publish" BOOLEAN NOT NULL,
  "authorized_to_submit" BOOLEAN NOT NULL,
  "digital_signature" TEXT NOT NULL,
  "user_id" TEXT,
  "submitted_by" TEXT,
  "status" TEXT NOT NULL DEFAULT 'pending_verification',
  "verified" BOOLEAN NOT NULL DEFAULT false,
  "rejection_reason" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  "approved_at" TIMESTAMP(3),
  "certificate_generated" BOOLEAN NOT NULL DEFAULT false,
  "featured" BOOLEAN NOT NULL DEFAULT false,

  CONSTRAINT "Endorsement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Endorsement_email_key" ON "Endorsement"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_type_key" ON "VerificationToken"("identifier", "type");

-- CreateIndex
CREATE INDEX "VerificationToken_token_idx" ON "VerificationToken"("token");