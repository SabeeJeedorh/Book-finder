"use client";
import { User, Lock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  
  const router = useRouter();

  const validCredentials = {
    username: "admin",
    password: "123456789"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      const isUsernameCorrect = formData.username === validCredentials.username;
      const isPasswordCorrect = formData.password === validCredentials.password;

      if (isUsernameCorrect && isPasswordCorrect) {
        router.push("/Sections");
      } else if (!isUsernameCorrect && !isPasswordCorrect) {
        setError("Incorrect username and password");
      } else if (!isUsernameCorrect) {
        setError("Incorrect username");
      } else if (!isPasswordCorrect) {
        setError("Incorrect password");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-pink-500 to-purple-700 p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-300/10 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-w-4xl w-full transform hover:scale-[1.01] transition-all duration-300 z-10">
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 relative items-center justify-center overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-400/30 to-orange-300/30 rounded-br-[150px] animate-pulse"></div>
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/30 rounded-full animate-spin" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/20 transform rotate-45 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 h-32 border-4 border-white/40 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 border-2 border-white/60 rounded-full animate-ping"></div>
          </div>
          <div className="relative z-10 text-center text-white animate-fadeInUp">
            <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-xl opacity-90">Sign in to continue your journey</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center animate-fadeInRight">
          <div className="text-center md:text-left mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 animate-fadeInUp">User Login</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto md:mx-0 animate-widthExpand"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 animate-fadeInUp">
                <AlertCircle size={18} />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <div className={`relative transform transition-all duration-300 ${focusedField === 'username' ? 'scale-105' : ''}`}>
              <div className={`flex items-center bg-gray-50 rounded-xl px-4 py-4 border-2 transition-all duration-300 relative z-10 ${
                focusedField === 'username'
                  ? 'border-pink-500 bg-pink-50 shadow-lg shadow-pink-500/20'
                  : error ? 'border-red-300' : 'border-transparent hover:border-gray-300'
              }`}>
                <User className={`mr-3 transition-all duration-300 ${focusedField === 'username' ? 'text-pink-500 scale-110' : 'text-gray-400'}`} size={18} />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400 relative z-10"
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>
            </div>

            <div className={`relative transform transition-all duration-300 ${focusedField === 'password' ? 'scale-105' : ''}`}>
              <div className={`flex items-center bg-gray-50 rounded-xl px-4 py-4 border-2 transition-all duration-300 relative z-10 ${
                focusedField === 'password'
                  ? 'border-purple-500 bg-purple-50 shadow-lg shadow-purple-500/20'
                  : error ? 'border-red-300' : 'border-transparent hover:border-gray-300'
              }`}>
                <Lock className={`mr-3 transition-all duration-300 ${focusedField === 'password' ? 'text-purple-500 scale-110' : 'text-gray-400'}`} size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400 relative z-10"
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white font-semibold py-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {!isLoading ? "LOGIN" : (
                <div className="flex justify-center">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </button>

            <div className="flex justify-between items-center text-sm text-gray-500 mt-6">
              <a href="#" className="hover:text-pink-500 transition-colors duration-300 transform hover:scale-105">
                Forgot Password?
              </a>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-pink-500 hover:text-purple-600 font-semibold cursor-pointer hover:scale-90">
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
