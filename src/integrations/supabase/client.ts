// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tntmmglaswefmbwuewbt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRudG1tZ2xhc3dlZm1id3Vld2J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4NjIxNTAsImV4cCI6MjA1NTQzODE1MH0.NZMrX0u8jPLBpNcjmoF1VZbkonicxTSph-D1tiQ7o-Y";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);