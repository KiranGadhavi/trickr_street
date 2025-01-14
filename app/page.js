// "use client";

// import React, { useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import { useRouter } from "next/navigation";
// import '@fontsource/jolly-lodger';

// // Initialize the Supabase client
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email: email,
//         password: password,
//       });
//       if (error) throw error;
//       // alert("Logged in successfully!");
//       router.push("/map");
//       console.log(data);
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-cover bg-center flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
//          style={{ backgroundImage: "url('/backgrounds/HalloweenBackground.jpg')" }}>
//       <div className="max-w-md w-full space-y-8 bg-opacity-60 bg-gray-900 p-6 rounded-lg shadow-lg">
//         <div>
//           <h2 className="text-center text-5xl font-bold text-white" style={{ fontFamily: 'Jolly Lodger, cursive' }}>Trickr Street</h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleLogin}>
//           <div className="rounded-md shadow-sm space-y-4">
//             <div>
//               <label htmlFor="email-address" className="text-gray-300 block mb-1">
//                 Email
//               </label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-400 text-gray-300 bg-transparent focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
//                 placeholder="email..."
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="text-gray-300 block mb-1">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-400 text-gray-300 bg-transparent focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
//                 placeholder="password..."
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>
//           {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//             >
//               {loading ? "Signing in..." : "Sign in"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import "@fontsource/jolly-lodger";

// Initialize the Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false); // Track sign up vs login

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isSignUp) {
        // Sign up
        const { user, error: signUpError } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (signUpError) throw signUpError;
        alert("Sign up successful! Please check your email for confirmation.");
        setIsSignUp(false); // Switch to login mode
      } else {
        // Login
        const { data, error: signInError } =
          await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
        if (signInError) throw signInError;
        router.push("/map");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/backgrounds/HalloweenBackground.jpg')" }}
    >
      <div className="max-w-md w-full space-y-8 bg-opacity-60 bg-gray-900 p-6 rounded-lg shadow-lg">
        <div>
          <h2
            className="text-center text-5xl font-bold text-white"
            style={{ fontFamily: "Jolly Lodger, cursive" }}
          >
            Trickr Street
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleAuth}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="email-address"
                className="text-gray-300 block mb-1"
              >
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-400 text-gray-300 bg-transparent focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-300 block mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-500 placeholder-gray-400 text-gray-300 bg-transparent focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              {loading
                ? isSignUp
                  ? "Creating account..."
                  : "Signing in..."
                : isSignUp
                ? "Sign up"
                : "Sign in"}
            </button>
          </div>
        </form>
        <div className="text-center text-gray-300">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm hover:underline"
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}
