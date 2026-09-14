import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useContext(AuthContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (currState === 'Sign up' && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return;
    }

    setIsLoading(true);
    try {
      await login(currState === "Sign up" ? 'signup' : 'login', { fullName, email, password, bio });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative'>
      <div className='w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
        
        {/* Left column: App Showcase & Developer Branding */}
        <div className='flex flex-col items-center md:items-start text-center md:text-left space-y-6'>
          <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-medium tracking-wide'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
            Real-Time Chat Engine
          </div>

          <div className='flex items-center gap-3'>
            <img src={assets.logo_big || assets.logo} alt="QuickChat Logo" className='w-12 h-12 object-contain filter drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]' />
            <h1 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-white'>
              Quick<span className='text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300'>Chat</span>
            </h1>
          </div>

          <p className='text-slate-400 text-sm sm:text-base leading-relaxed max-w-sm'>
            Fast, secure, and modern instant messaging platform with live presence and end-to-end event synchronization.
          </p>

          <div className='p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md w-full max-w-sm space-y-2'>
            <div className='flex items-center justify-between text-xs text-slate-400'>
              <span className='font-semibold text-slate-300'>Engineered By</span>
              <span className='text-violet-400 font-medium'>IIIT Ranchi</span>
            </div>
            <p className='text-xs font-semibold text-white tracking-wide'>Gulshan Kumar</p>
            <p className='text-[11px] text-slate-500'>Full-Stack Real-Time Communication Architecture</p>
          </div>
        </div>

        {/* Right column: Glass Authentication Card */}
        <div className='glass-panel rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto'>
          <div className='flex items-center justify-between pb-6 border-b border-slate-800 mb-6'>
            <div>
              <h2 className='text-xl font-bold text-white tracking-tight'>
                {currState === "Sign up" ? "Create an Account" : "Welcome Back"}
              </h2>
              <p className='text-xs text-slate-400 mt-1'>
                {currState === "Sign up" 
                  ? (isDataSubmitted ? "Step 2 of 2: Profile Bio" : "Step 1 of 2: Basic Details") 
                  : "Enter your credentials to continue"}
              </p>
            </div>

            {isDataSubmitted && (
              <button 
                type="button" 
                onClick={() => setIsDataSubmitted(false)} 
                className='text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 cursor-pointer transition'
              >
                <img src={assets.arrow_icon} alt="Back" className='w-4 rotate-180 brightness-200' />
                Back
              </button>
            )}
          </div>

          <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>
            {currState === "Sign up" && !isDataSubmitted && (
              <div>
                <label className='block text-xs font-medium text-slate-300 mb-1.5'>Full Name</label>
                <input 
                  onChange={(e) => setFullName(e.target.value)} 
                  value={fullName}
                  type="text" 
                  className='w-full glass-input px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none' 
                  placeholder="e.g. John Doe" 
                  required
                />
              </div>
            )}

            {!isDataSubmitted && (
              <>
                <div>
                  <label className='block text-xs font-medium text-slate-300 mb-1.5'>Email Address</label>
                  <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email}
                    type="email" 
                    placeholder='you@example.com' 
                    required 
                    className='w-full glass-input px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none'
                  />
                </div>
                <div>
                  <label className='block text-xs font-medium text-slate-300 mb-1.5'>Password</label>
                  <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password}
                    type="password" 
                    placeholder='••••••••' 
                    required 
                    className='w-full glass-input px-3.5 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 outline-none'
                  />
                </div>
              </>
            )}

            {currState === "Sign up" && isDataSubmitted && (
              <div>
                <label className='block text-xs font-medium text-slate-300 mb-1.5'>Bio</label>
                <textarea 
                  onChange={(e) => setBio(e.target.value)} 
                  value={bio}
                  rows={4} 
                  className='w-full glass-input p-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none resize-none' 
                  placeholder='Tell others a little about yourself...' 
                  required
                ></textarea>
              </div>
            )}

            <button 
              type='submit' 
              disabled={isLoading}
              className='mt-2 w-full py-3 rounded-xl gradient-btn text-white font-medium text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                currState === "Sign up" 
                  ? (isDataSubmitted ? "Complete Sign Up" : "Next Step") 
                  : "Sign In"
              )}
            </button>

            <div className='flex items-center gap-2 mt-1 text-xs text-slate-400'>
              <input type="checkbox" required defaultChecked className='rounded accent-violet-500' />
              <span>I agree to the Terms of Service & Privacy Policy</span>
            </div>

            <div className='pt-3 border-t border-slate-800/80 text-center'>
              {currState === "Sign up" ? (
                <p className='text-xs text-slate-400'>
                  Already have an account?{' '}
                  <span 
                    onClick={() => { setCurrState("Login"); setIsDataSubmitted(false) }} 
                    className='font-semibold text-violet-400 hover:text-violet-300 cursor-pointer transition'
                  >
                    Sign in here
                  </span>
                </p>
              ) : (
                <p className='text-xs text-slate-400'>
                  Don't have an account yet?{' '}
                  <span 
                    onClick={() => setCurrState("Sign up")} 
                    className='font-semibold text-violet-400 hover:text-violet-300 cursor-pointer transition'
                  >
                    Create one now
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default LoginPage
