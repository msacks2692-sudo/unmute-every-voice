-- Create early_access_signups table for MVP page
CREATE TABLE public.early_access_signups (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT,
    interest_area TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.early_access_signups ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can sign up without auth)
CREATE POLICY "Anyone can sign up for early access"
ON public.early_access_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow checking if email exists (for duplicate validation)
CREATE POLICY "Anyone can check email existence"
ON public.early_access_signups
FOR SELECT
TO anon, authenticated
USING (true);