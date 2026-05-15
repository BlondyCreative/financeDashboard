import React from "react";
// Asegúrate de importar los iconos que usas
import { ChevronRight, Target, Trophy } from "lucide-react";

const App = () => {
  // Asumiendo que tienes estos estados y datos definidos arriba
  const [activeTab, setActiveTab] = React.useState("Home");
  const navItems = ["Home", "About", "Services", "Contact"];

  return (
    /* Aplicamos la fuente secundaria (Arimo) como base a todo el sitio */
    <div
      className="min-h-screen bg-[#080707] text-white selection:bg-orange-400 selection:text-black"
      style={{ fontFamily: "var(--font-secondary)" }}
    >
      {/* --- NAVIGATION --- */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        {/* Contenedor del Logo: Imagen + Texto con Oswald */}
        <div className="flex items-center gap-3">
          <img
            src="../src/assets/quantix.png"
            alt="Quantix Logo"
            className="w-10 h-10 object-contain"
          />
          <span
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            Quantix
          </span>
        </div>

        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-6 py-2 gap-8 text-sm text-gray-300">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setActiveTab(item)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === item
                  ? "bg-neutral-800 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        <button className="bg-white text-black px-6 py-2.5 rounded-full font-medium text-sm hover:bg-gray-200 transition-all">
          Get Started
        </button>
      </nav>

      {/* --- HERO SECTION --- */}
      <header
        id="home"
        className="pt-20 pb-12 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <span className="bg-[#f97316] text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Fastest Way
            </span>
            <span className="text-sm text-gray-300">
              Manage Your Finances 💸
            </span>
          </div>

          {/* Título Principal con Oswald */}
          <h1
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1]"
            style={{ fontFamily: "var(--font-secondary)" }}
          >
            Powerful Tools for Easy <br /> Money Management
          </h1>

          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
            Simple, modern, and designed to put you in control of your future.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-[#f97316] text-black px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform">
              Start a free trial
            </button>
            <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
              Learn More <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN DASHBOARD PREVIEW --- */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="bg-[#0b1220] rounded-[32px] p-4 shadow-2xl border border-white/10 overflow-hidden">
          <div className="bg-black/90 rounded-[28px] h-[500px] md:h-[700px] flex items-center justify-center overflow-hidden">
            <img
              src="../src/assets/dashboard.png"
              alt="Dashboard"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section
        id="about"
        className="py-24 relative overflow-hidden bg-[#080707]"
      >
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#f97316] opacity-5 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-[#f97316] font-bold tracking-widest uppercase text-sm mb-4">
              The Power Behind BullFinance
            </h2>
            {/* Subtítulo con Oswald */}
            <h3
              className="text-4xl md:text-6xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              Driven by Ambition. <br /> Built for{" "}
              <span className="text-gray-500">Excellence.</span>
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#f97316]">
                  <Target size={24} />
                </div>
                <div>
                  <h4
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    Our Mission
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    To redefine financial freedom by providing secure,
                    borderless payment solutions. We empower users to move money
                    with absolute confidence through intuitive, high-performance
                    technology.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[#f97316]">
                  <Trophy size={24} />
                </div>
                <div>
                  <h4
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    Our Standard
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    Security isn't just a feature; it's our foundation. We
                    maintain uncompromising standards for transaction speed and
                    data protection, ensuring your capital is always safe and
                    reachable.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] relative">
              <div className="absolute -top-4 -right-4 bg-[#f97316] text-black text-xs font-black px-4 py-2 rounded-full rotate-12">
                STARTUP TEAM
              </div>
              <p className="text-gray-400 mb-8 italic text-lg">
                "We designed a financial command center where security meets
                simplicity. In a world that never sleeps, we ensure your global
                transfers are executed in seconds, with every cent tracked in
                real-time."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-tr from-[#f97316] to-orange-300 rounded-full" />
                <div>
                  <div
                    className="font-bold"
                    style={{ fontFamily: "var(--font-secondary)" }}
                  >
                    BullFinance Leadership
                  </div>
                  <div className="text-sm text-gray-500">
                    Innovating since 2024
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRUSTED LOGOS --- */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-gray-500 font-medium mb-10 text-lg">
            Trusted by world top companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale">
            {[
              "PictelAI",
              "Leapyear",
              "Magnolia",
              "Peregrin",
              "StackEd Lab",
            ].map((logo) => (
              <span
                key={logo}
                className="text-2xl font-bold text-gray-800"
                style={{ fontFamily: "var(--font-secondary)" }}
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="services" className="py-24 bg-gray-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-secondary)" }}
            >
              Our Powerful Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take control with our all-in-one platform designed for speed,
              security, and clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Service 1 */}
            <div className="order-4">
              <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-orange-600 bg-orange-100 rounded-full">
                Total Control
              </div>
              <h3 className="text-3xl font-bold mb-6">
                Real-time Income Tracking
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Monitor movements with detailed analytics and manage multiple
                cards effortlessly.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-700">
                  <div className="w-5 h-5 mr-3 bg-orange-500 rounded-full flex items-center justify-center text-white text-[10px]">
                    ✓
                  </div>
                  Visualized Income Trackers
                </li>
              </ul>
            </div>

            <div className="order-1 md:order-2">
              <img
                src="../src/assets/dashboard2.png"
                alt="Dashboard"
                className="rounded-2xl shadow-2xl border border-gray-200"
              />
            </div>

            {/* Service 2 */}
            <div className="order-3">
              <img
                src="../src/assets/dashb3.png"
                alt="Dashboard"
                className="rounded-2xl shadow-2xl border border-gray-200"
              />
            </div>
            <div className="order-2 md:order-1">
              <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                Fast & Secure
              </div>
              <h3 className="text-3xl font-bold mb-6">
                Money Transfers in Seconds
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                Send funds globally with just an email or Wallet ID. Our
                interface is designed for clarity.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-gray-700">
                  <div className="w-5 h-5 mr-3 bg-green-500 rounded-full flex items-center justify-center text-white text-[10px]">
                    ✓
                  </div>
                  Encrypted End-to-End Transactions
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER/CTA --- */}
      <section className="bg-[#f9fbff] py-24 text-gray-900">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-8">
              Track every expense in real-time
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed">
              Gain instant insights into your spending patterns.
            </p>
          </div>
          <div className="bg-white rounded-[32px] shadow-xl p-8 border border-gray-100">
            {/* Replaced CSS bars with a clean, responsive image */}
            <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-gray-50">
              <img
                src="../src/assets/example.png"
                alt="Financial growth analytics chart"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
