-- Track user consent to legal documents (Terms of Service, Privacy Policy)
CREATE TABLE IF NOT EXISTS legal_consent (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL CHECK (document_type IN ('terms', 'privacy')),
  document_version TEXT NOT NULL,
  accepted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one consent record per document type per user (most recent)
  CONSTRAINT unique_user_document UNIQUE (user_id, document_type)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_legal_consent_user_id ON legal_consent(user_id);
CREATE INDEX IF NOT EXISTS idx_legal_consent_document_type ON legal_consent(document_type);
CREATE INDEX IF NOT EXISTS idx_legal_consent_accepted_at ON legal_consent(accepted_at);

-- Enable RLS
ALTER TABLE legal_consent ENABLE ROW LEVEL SECURITY;

-- Users can read their own consent records
CREATE POLICY "Users can view own consent"
  ON legal_consent FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own consent records
CREATE POLICY "Users can insert own consent"
  ON legal_consent FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- System can update consent records (for version updates)
CREATE POLICY "System can update consent"
  ON legal_consent FOR UPDATE
  USING (auth.uid() = user_id);

-- Add comment
COMMENT ON TABLE legal_consent IS 'Tracks user consent to legal documents (Terms of Service, Privacy Policy)';
COMMENT ON COLUMN legal_consent.document_type IS 'Type of legal document: terms or privacy';
COMMENT ON COLUMN legal_consent.document_version IS 'Version identifier for the document (e.g., date or semantic version)';
COMMENT ON COLUMN legal_consent.ip_address IS 'IP address of user at time of consent (for audit trail)';
COMMENT ON COLUMN legal_consent.user_agent IS 'Browser user agent at time of consent (for audit trail)';
