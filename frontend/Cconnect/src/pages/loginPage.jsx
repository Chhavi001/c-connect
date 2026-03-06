
import { useState } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

function LoginPage(){
  const [formData, setFormData]=useState({email:"",password:""});
  const {login,isLoggingIn}=useAuthStore();
  const handleSubmit=(e)=>{
    e.preventDefault();
      login(formData);
    };
   return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            {/* form column - left side */}
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-gray-600/30">
              <div className="w-full max-w-md">
                {/* header */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">Welcome Back</h2>
                  <p className="text-slate-400">Login to access to your  account</p>
                </div>
                {/* form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="auth-input-label">Full Name</label>
                    <div className="relative">
                      <UserIcon className="auth-input-icon" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="input"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  {/* email */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  {/* password */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                  {/* submit button */}
                  <div className="auth-btn">
                    <
                      type="submit"
                      disabled={isLoggingIn}
                      className={`w-full flex items-center justify-center bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded ${isLoggingIn ? "cursor-not-allowed opacity-70" : ""}`}
                    >
                      <butto clsdsName="auth-btn" type="submit" disabled={isLoggingIn}></butto
                      {isLoggingIn ? (
                        <>
                          <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                          Logging In...
                        </>
                      ) : (
                        "Log In"
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <link to="/signup" className="text-cyan-400 hover:text-cyan-300">
                    Don't have an account? Sign up
                  </link>
                </div>
              </div>
            </div>

            {/* right side - illustration */}
            <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <img src="/signup.png" alt="Signup Illustration" className="w-full max-w-sm h-auto object-contain" />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-medium text-cyan-400">Connect anytime,anywhere</h3>
                <div className="mt-4 flex justify-center gap-4">
                  <span className="auth-badge">Free</span>
                  <span className="auth-badge">Easy setup</span>
                  <span className="auth-badge">Secure</span>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}
export default LoginPage;