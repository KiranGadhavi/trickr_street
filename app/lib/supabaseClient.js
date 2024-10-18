// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Use the correct environment variables for Supabase URL and Anon Key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log(data, error);
