import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import logoSteth from '../images/logoSteth.png';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

// ✅ Field is defined OUTSIDE Register so React never remounts it on re-render
function Field({ id, label, name, type, placeholder, icon: Icon, showToggle, show, onToggle, customIndex, form, errors, handleChange }) {
  return (
    <motion.div className="mb-5" variants={fadeUp} custom={customIndex}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          id={id}
          name={name}
          type={showToggle ? (show ? 'text' : 'password') : type}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full pl-9 ${showToggle ? 'pr-10' : 'pr-4'} py-2.5 border rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${errors[name] ? 'border-red-400' : 'border-gray-300'}`}
        />
        {showToggle && (
          <button type="button" onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </motion.div>
  );
}

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors]           = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name = 'Full name is required.';
    if (!form.email)              e.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.password)           e.password = 'Password is required.';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    if (!form.confirmPassword)    e.confirmPassword = 'Please confirm your password.';
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match.';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    // TODO: connect to backend
    alert('Registration submitted!');
  };

  const fieldProps = { form, errors, handleChange };

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
              <User size={24} className="text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Create an account</h1>
            <p className="text-gray-500 text-sm mt-1">Join Haldummulla Veterinary Services</p>
          </motion.div>

          <form onSubmit={handleSubmit} noValidate>

            {/* Full Name */}
            <Field
              id="reg-name"
              label="Full Name"
              name="name"
              type="text"
              placeholder="John Perera"
              icon={User}
              showToggle={false}
              customIndex={2}
              {...fieldProps}
            />

            {/* Email */}
            <Field
              id="reg-email"
              label="Email Address"
              name="email"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              showToggle={false}
              customIndex={3}
              {...fieldProps}
            />

            {/* Password */}
            <Field
              id="reg-password"
              label="Password"
              name="password"
              type="password"
              placeholder="Min. 6 characters"
              icon={Lock}
              showToggle
              show={showPass}
              onToggle={() => setShowPass(!showPass)}
              customIndex={4}
              {...fieldProps}
            />

            {/* Confirm Password */}
            <Field
              id="reg-confirm"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              icon={Lock}
              showToggle
              show={showConfirm}
              onToggle={() => setShowConfirm(!showConfirm)}
              customIndex={5}
              {...fieldProps}
            />

            {/* Submit */}
            <motion.button
              type="submit"
              className="w-full mt-1 py-2.5 rounded-lg text-white font-semibold text-sm tracking-wide transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #0d9488, #14b8a6)' }}
              variants={fadeUp}
              custom={6}
            >
              Create Account
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div className="my-6 flex items-center gap-3" variants={fadeUp} custom={7}>
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </motion.div>

          {/* Login link */}
          <motion.p className="text-center text-sm text-gray-500" variants={fadeUp} custom={8}>
            Already have an account?{' '}
            <a href="/login" className="text-teal-600 font-semibold hover:underline">
              Sign in
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
