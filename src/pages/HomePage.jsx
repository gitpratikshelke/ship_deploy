import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity"
        style={{ backgroundImage: 'url(/bg-shipment.png)' }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950"></div>

      {/* Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <div className="relative z-20">
        {/* Hero Section */}
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <div className="inline-flex items-center space-x-3 rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-semibold leading-6 text-cyan-400 ring-1 ring-inset ring-cyan-500/20 shadow-lg shadow-cyan-500/5">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                
              </div>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Track your shipments with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">absolute precision</span>.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300 max-w-lg">
              The all-in-one logistics management platform designed for modern shipping. Monitor, update, and manage your cargo globally with ease.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              {user ? (
                <Link
                  to="/dashboard"
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 hover:scale-105 active:scale-95"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 hover:scale-105 active:scale-95"
                  >
                    Get Started Free
                  </Link>
                  <Link to="/login" className="text-sm font-semibold leading-6 text-slate-300 hover:text-white transition-colors flex items-center gap-2">
                    Member Sign In <span aria-hidden="true">→</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Hero Visual - Dashboard Preview Mock */}
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="rounded-2xl bg-slate-900/40 p-3 ring-1 ring-inset ring-white/10 backdrop-blur-2xl lg:rounded-3xl shadow-2xl">
                <div className="rounded-xl bg-slate-950/50 shadow-2xl ring-1 ring-white/5 overflow-hidden">
                  {/* Top Bar Mock */}
                  <div className="h-10 bg-slate-900/50 flex items-center px-4 gap-2 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                    </div>
                    <div className="mx-auto w-32 h-2 rounded-full bg-slate-800"></div>
                  </div>
                  {/* Content Mock */}
                  <div className="p-6 space-y-6 min-w-[320px] sm:min-w-[440px]">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="h-5 w-32 rounded bg-white/10"></div>
                        <div className="h-3 w-48 rounded bg-slate-800"></div>
                      </div>
                      <div className="h-10 w-24 rounded-lg bg-cyan-500/20 border border-cyan-500/30"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 rounded-xl bg-slate-900/80 border border-white/5 p-3 flex flex-col justify-between">
                          <div className="h-2 w-10 rounded bg-slate-800"></div>
                          <div className={`h-5 w-12 rounded ${i === 1 ? 'bg-cyan-500' : 'bg-slate-700'} opacity-50`}></div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3 pt-2">
                      <div className="h-32 rounded-xl bg-slate-900/80 border border-white/5 p-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent"></div>
                        <div className="space-y-3 relative">
                          <div className="flex justify-between items-center">
                            <div className="h-3 w-28 rounded bg-slate-800"></div>
                            <div className="h-4 w-12 rounded-full bg-cyan-500/20"></div>
                          </div>
                          <div className="h-3 w-full rounded bg-slate-800"></div>
                          <div className="h-3 w-4/5 rounded bg-slate-800"></div>
                          <div className="h-6 w-full mt-4 flex gap-1">
                            {[1, 2, 3, 4, 5, 6].map(j => (
                              <div key={j} className="flex-1 rounded-sm bg-slate-800 overflow-hidden">
                                {j < 4 && <div className="h-full w-full bg-cyan-500/30 animate-pulse" style={{ animationDelay: `${j * 200}ms` }}></div>}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8 pb-32">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-cyan-400 uppercase tracking-wider">Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Enterprise Logistics, Simplified.
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Powerful tools designed to give you complete control over your shipping operations.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  title: 'Real-time Updates',
                  desc: "Instantly track status changes from 'Pending' to 'Delivered' with our reactive dashboard.",
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
                  color: 'cyan'
                },
                {
                  title: 'Secure Access',
                  desc: 'Your data is protected with industry-standard JWT authentication and secure database encryption.',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
                  color: 'blue'
                },
                {
                  title: 'Advanced Analytics',
                  desc: 'Gain insights with our statistics engine covering total shipments, pending cases, and deliveries.',
                  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
                  color: 'indigo'
                }
              ].map((feature, idx) => (
                <div key={idx} className="flex flex-col group p-6 rounded-2xl bg-slate-900/30 border border-white/5 hover:bg-slate-900/50 hover:border-white/10 transition-all duration-300">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                    <div className={`h-12 w-12 bg-${feature.color}-500/10 rounded-xl flex items-center justify-center text-${feature.color}-400 ring-1 ring-${feature.color}-500/20 group-hover:scale-110 transition-transform`}>
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {feature.icon}
                      </svg>
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                    <p className="flex-auto">{feature.desc}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage