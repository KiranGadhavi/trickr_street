// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://chochcltgjnjgwzvmepd.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY

// export const supabase = createClient(supabaseUrl, supabaseKey)




import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key:", supabaseAnonKey);
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    fetch: (...args) => fetch(...args, { mode: "cors" }),
  },
});






