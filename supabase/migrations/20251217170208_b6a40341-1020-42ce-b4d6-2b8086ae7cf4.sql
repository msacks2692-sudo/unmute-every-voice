-- Drop the existing SELECT policy that exposes all emails publicly
DROP POLICY IF EXISTS "Anyone can check email existence" ON public.early_access_signups;

-- The INSERT policy already exists and allows public inserts, which is correct for the signup form