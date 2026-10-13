-- Prevent non-admins from escalating their own profile.role
CREATE OR REPLACE FUNCTION public.protect_profile_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    -- Service role / SQL editor often has no JWT (auth.uid() is null) — allow those.
    IF auth.uid() IS NOT NULL AND NOT public.is_admin() THEN
      RAISE EXCEPTION 'Only admins can change profile roles';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_protect_role ON public.profiles;
CREATE TRIGGER profiles_protect_role
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_profile_role();

-- Promote these two accounts to admin AFTER they exist in auth.users / profiles.
-- Run scripts/create-admins.mjs first, or create users via signup / Auth dashboard.
UPDATE public.profiles
SET role = 'admin'
WHERE email IN (
  'admin@khairaljewargroup.com',
  'manager@khairaljewargroup.com'
);
