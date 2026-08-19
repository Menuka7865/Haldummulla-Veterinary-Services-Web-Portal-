import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import logoSteth from '../images/logoSteth.png';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors]     = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email)    e.email    = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email.';
    if (!password) e.password = 'Password is required.';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setApiError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        if (data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      } else {
        setApiError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      setApiError('Server error, please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #d1fae5 0%, #f0fdfa 40%, #e0f2fe 100%)' }}>

      {/* Minimal top bar */}
      <div className="bg-white shadow-sm px-6 py-3 flex items-center gap-2">
        <img src={logoSteth} alt="logo" className="h-7 w-7" />
        <a href="/home" className="text-teal-600 font-semibold text-lg tracking-tight">
          Haldummulla Vet
        </a>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/60 p-8 md:p-10"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {/* Header */}
          <motion.div className="mb-8 text-center" variants={fadeUp} custom={1}>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
                 style={{ background: 'linear-gradient(135deg, #0d9488, #14b8a6)' }}>
              <Lock size={24} className="text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
          </motion.div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <motion.div className="mb-5" variants={fadeUp} custom={2}>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full pl-9 pr-4 py-2.5 border rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </motion.div>

            {/* Password */}
            <motion.div className="mb-2" variants={fadeUp} custom={3}>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full pl-9 pr-10 py-2.5 border rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </motion.div>

            {/* Forgot password */}
            <motion.div className="flex justify-end mb-6" variants={fadeUp} custom={4}>
              <a href="#" className="text-xs text-teal-600 hover:underline">Forgot password?</a>
            </motion.div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full mt-1 py-2.5 rounded-lg text-white font-semibold text-sm tracking-wide transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg, #0d9488, #14b8a6)' }}
              variants={fadeUp}
              custom={4}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </motion.button>
            {apiError && <p className="text-red-500 text-sm mt-3 text-center">{apiError}</p>}
          </form>

          {/* Divider */}
          <motion.div className="my-6 flex items-center gap-3" variants={fadeUp} custom={6}>
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </motion.div>

          {/* Register link */}
          <motion.p className="text-center text-sm text-gray-500" variants={fadeUp} custom={7}>
            Don't have an account?{' '}
            <a href="/register" className="text-teal-600 font-semibold hover:underline">
              Create one
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
