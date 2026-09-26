import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Shield,
  Briefcase,
  User as UserIcon,
  MapPin,
  Eye,
  EyeOff,
  Building,
  Check,
  Phone,
  Mail,
  Lock,
  Compass,
  AlertCircle
} from 'lucide-react';
import { MALETE_AREA_GROUPS, POPULAR_MALETE_LOCATIONS } from '../data/mockData';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onSuccess }) => {
  const { login, register, showToast, currentLocation, setCurrentLocation } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(currentLocation);
  const [hostelAddress, setHostelAddress] = useState('');
  const [accountType, setAccountType] = useState<'customer' | 'provider'>('customer');
  const [rememberMe, setRememberMe] = useState(true);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      if (!email.trim()) {
        showToast('Please enter your email or username', 'warning');
        return;
      }
      if (!password) {
        showToast('Please enter your password', 'warning');
        return;
      }
      login(email.trim(), password, false, selectedLocation);
      onSuccess();
    } else {
      if (!fullName.trim()) {
        showToast('Please enter your full name', 'warning');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        showToast('Please provide a valid email address', 'warning');
        return;
      }
      if (password.length < 4) {
        showToast('Password should be at least 4 characters', 'warning');
        return;
      }

      register({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || '+234 800 000 0000',
        location: selectedLocation,
        hostelAddress: hostelAddress.trim(),
        accountType
      });
      onSuccess();
    }
  };

  // Demo accounts for fast testing
  const handleQuickDemo = (role: 'customer' | 'provider' | 'admin') => {
    if (role === 'admin') {
      login('okunolaridwan284@gmail.com', '@Adekunle01', true, 'Malete - Tipper Garage');
    } else if (role === 'provider') {
      login('barber@bigridz.ng', 'demo', false, 'Malete - Tipper Garage');
    } else {
      login('ridwan@kwasu.edu.ng', 'demo', false, 'Malete - Safari Area');
    }
    onSuccess();
  };

  const handleSendReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      showToast('Please enter your registered email', 'warning');
      return;
    }
    showToast(`Password reset link sent to ${forgotEmail}. Check your inbox!`, 'success');
    setIsForgotPasswordOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto animate-in zoom-in-95 duration-150">
      <div className="bg-[#141416] border border-[#29292D] rounded-2xl w-full max-w-md p-5 sm:p-6 shadow-2xl space-y-4 my-auto max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#29292D]">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#F5F5F5] text-[#0B0B0D] font-bold text-xs flex items-center justify-center">
                B
              </div>
              <h3 className="font-heading font-semibold text-base text-[#F5F5F5]">
                {mode === 'login' ? 'Welcome Back to Bigridz' : 'Join Bigridz Malete'}
              </h3>
            </div>
            <p className="text-xs text-[#A1A1AA] mt-1">
              {mode === 'login'
                ? 'Sign in to discover local services, order food & book appointments'
                : 'Connect with verified campus vendors, artisans & student food stalls'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#19191C] transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Demo Selector */}
        <div className="p-3 rounded-xl bg-[#19191C] border border-[#29292D] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#A1A1AA] font-semibold uppercase tracking-wider">
              Quick One-Click Demo
            </span>
            <span className="text-[10px] text-[#D99A24] font-medium">Instant Test</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickDemo('customer')}
              className="py-2 px-2.5 rounded-lg bg-[#141416] hover:bg-[#222226] border border-[#29292D] text-[#F5F5F5] font-medium text-center text-[11px] transition-colors flex flex-col items-center gap-1"
            >
              <UserIcon className="w-3.5 h-3.5 text-[#D99A24]" />
              <span>Student / User</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('provider')}
              className="py-2 px-2.5 rounded-lg bg-[#141416] hover:bg-[#222226] border border-[#29292D] text-[#F5F5F5] font-medium text-center text-[11px] transition-colors flex flex-col items-center gap-1"
            >
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
              <span>Vendor Hub</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="py-2 px-2.5 rounded-lg bg-[#141416] hover:bg-[#222226] border border-[#29292D] text-[#F5F5F5] font-medium text-center text-[11px] transition-colors flex flex-col items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Super Admin</span>
            </button>
          </div>
        </div>

        {/* Mode Segment */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-[#19191C] border border-[#29292D] text-xs">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2 rounded-lg font-medium transition-all ${
              mode === 'login'
                ? 'bg-[#141416] text-[#F5F5F5] shadow-xs'
                : 'text-[#A1A1AA] hover:text-[#F5F5F5]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-2 rounded-lg font-medium transition-all ${
              mode === 'register'
                ? 'bg-[#141416] text-[#F5F5F5] shadow-xs'
                : 'text-[#A1A1AA] hover:text-[#F5F5F5]'
            }`}
          >
            Create New Account
          </button>
        </div>

        {/* Forgot Password Modal view */}
        {isForgotPasswordOpen ? (
          <form onSubmit={handleSendReset} className="space-y-3 text-xs pt-1">
            <div className="p-3 rounded-lg bg-[#19191C] border border-[#29292D] space-y-1">
              <h4 className="font-medium text-[#F5F5F5] text-xs">Reset Your Password</h4>
              <p className="text-[11px] text-[#A1A1AA]">
                Enter the email linked to your Bigridz account to receive recovery instructions.
              </p>
            </div>
            <div>
              <label className="text-[#A1A1AA] block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-[#A1A1AA] absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="e.g. okunolaridwan284@gmail.com"
                  className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46] outline-hidden"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 h-9 rounded-lg bg-[#F5F5F5] text-[#0B0B0D] font-medium text-xs hover:bg-white"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={() => setIsForgotPasswordOpen(false)}
                className="px-3 h-9 rounded-lg bg-[#19191C] text-[#A1A1AA] hover:text-[#F5F5F5] border border-[#29292D] text-xs"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {mode === 'register' && (
              <div>
                <label className="text-[#A1A1AA] block mb-1 font-medium">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-3.5 h-3.5 text-[#A1A1AA] absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ridwan Okunola"
                    className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46] outline-hidden"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[#A1A1AA] block mb-1 font-medium">
                {mode === 'login' ? 'Email Address or Username' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-[#A1A1AA] absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. student@kwasu.edu.ng"
                  className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46] outline-hidden"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[#A1A1AA] font-medium">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setIsForgotPasswordOpen(true)}
                    className="text-[11px] text-[#D99A24] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-[#A1A1AA] absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-10 pl-9 pr-10 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46] outline-hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-[#A1A1AA] hover:text-[#F5F5F5]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="text-[#A1A1AA] block mb-1 font-medium">
                  Phone Number (Calls & WhatsApp)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-[#A1A1AA] font-medium flex items-center gap-1">
                    <span>🇳🇬</span> +234
                  </span>
                  <input
                    type="tel"
                    value={phone.replace(/^\+234\s?/, '')}
                    onChange={(e) => setPhone('+234 ' + e.target.value.replace(/^\+234\s?/, ''))}
                    placeholder="803 123 4567"
                    className="w-full h-10 pl-19 pr-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46] outline-hidden"
                  />
                </div>
              </div>
            )}

            {/* Comprehensive Malete Area Selector - in BOTH Login and Register */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-[#A1A1AA] font-medium flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#D99A24]" />
                  <span>
                    {mode === 'login' ? 'Deliver & Serve Around' : 'Malete Area / Zone'}
                  </span>
                </label>
                <span className="text-[10px] text-[#A1A1AA]">40+ Malete Locations</span>
              </div>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full h-10 px-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46] outline-hidden cursor-pointer"
              >
                {MALETE_AREA_GROUPS.map((group) => (
                  <optgroup
                    key={group.category}
                    label={`${group.icon} ${group.category}`}
                    className="bg-[#19191C] font-semibold text-[#D99A24]"
                  >
                    {group.areas.map((area) => (
                      <option
                        key={area.id}
                        value={area.name}
                        className="bg-[#141416] text-[#F5F5F5] font-normal py-1"
                      >
                        {area.shortName} - {area.landmark}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>

              {/* Quick location suggestion pills */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[10px] text-[#A1A1AA]">Popular:</span>
                {POPULAR_MALETE_LOCATIONS.slice(0, 4).map((loc) => {
                  const label = loc.replace('Malete - ', '').split('/')[0].trim();
                  const isSelected = selectedLocation === loc;
                  return (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setSelectedLocation(loc)}
                      className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors ${
                        isSelected
                          ? 'bg-[#D99A24]/15 border-[#D99A24] text-[#D99A24] font-medium'
                          : 'bg-[#19191C] border-[#29292D] text-[#A1A1AA] hover:text-[#F5F5F5]'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* In Register Mode: Specific Hostel or Room details */}
            {mode === 'register' && (
              <div>
                <label className="text-[#A1A1AA] block mb-1 font-medium">
                  Hostel / Lodge Name & Room (Optional)
                </label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 text-[#A1A1AA] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={hostelAddress}
                    onChange={(e) => setHostelAddress(e.target.value)}
                    placeholder="e.g. Safari Phase 2, Room 14, Second Floor"
                    className="w-full h-10 pl-9 pr-3 rounded-lg bg-[#0B0B0D] border border-[#29292D] text-xs text-[#F5F5F5] focus:border-[#3F3F46] outline-hidden"
                  />
                </div>
                <p className="text-[10px] text-[#A1A1AA] mt-1">
                  Enables swift dispatch & room delivery straight to your doorstep.
                </p>
              </div>
            )}

            {mode === 'register' && (
              <div className="space-y-1.5 pt-1">
                <label className="text-[#A1A1AA] block font-medium">I am registering as:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAccountType('customer')}
                    className={`py-2.5 px-3 rounded-xl border text-left transition-all ${
                      accountType === 'customer'
                        ? 'bg-[#19191C] border-[#D99A24] text-[#F5F5F5]'
                        : 'bg-[#0B0B0D] border-[#29292D] text-[#A1A1AA] hover:border-[#3F3F46]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs">Customer</span>
                      {accountType === 'customer' && (
                        <Check className="w-3.5 h-3.5 text-[#D99A24]" />
                      )}
                    </div>
                    <span className="text-[10px] text-[#A1A1AA] block mt-0.5">
                      Order food, hair cuts, laundry & home errands
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType('provider')}
                    className={`py-2.5 px-3 rounded-xl border text-left transition-all ${
                      accountType === 'provider'
                        ? 'bg-[#19191C] border-[#D99A24] text-[#F5F5F5]'
                        : 'bg-[#0B0B0D] border-[#29292D] text-[#A1A1AA] hover:border-[#3F3F46]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs">Service Provider</span>
                      {accountType === 'provider' && (
                        <Check className="w-3.5 h-3.5 text-[#D99A24]" />
                      )}
                    </div>
                    <span className="text-[10px] text-[#A1A1AA] block mt-0.5">
                      List business, accept bookings & sell products
                    </span>
                  </button>
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[#A1A1AA] hover:text-[#F5F5F5]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded-sm bg-[#0B0B0D] border-[#29292D] text-[#D99A24] focus:ring-0"
                  />
                  <span>Keep me signed in on this device</span>
                </label>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full h-10 rounded-xl bg-[#F5F5F5] hover:bg-white text-[#0B0B0D] font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{mode === 'login' ? 'Sign In to Account' : 'Create Bigridz Account'}</span>
              </button>
            </div>

            <div className="pt-1 text-center">
              <p className="text-[11px] text-[#A1A1AA]">
                By continuing, you agree to Bigridz Local terms & Malete student safety standards.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

