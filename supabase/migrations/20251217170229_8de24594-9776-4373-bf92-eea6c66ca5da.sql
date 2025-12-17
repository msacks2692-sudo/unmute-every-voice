-- Add unique constraint on email if not already exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'early_access_signups_email_key'
  ) THEN
    ALTER TABLE public.early_access_signups ADD CONSTRAINT early_access_signups_email_key UNIQUE (email);
  END IF;
END $$;