<template>
  <div class="min-h-screen bg-white font-sans">

    <!-- ═══════════════════════════════════════
         NAVBAR
    ═══════════════════════════════════════ -->
    <header class="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
          <span class="font-bold text-gray-900 text-lg" style="font-family: var(--font-heading)">FuelFlow Pro</span>
        </div>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-8">
          <a href="#features" class="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Features</a>
          <a href="#how-it-works" class="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">How It Works</a>
          <a href="#stats" class="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Why Us</a>
          <a href="#contact" class="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Contact</a>
        </nav>

        <!-- CTA -->
        <div class="flex items-center gap-3">
          <router-link to="/login" class="hidden sm:inline-flex text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Sign In</router-link>
          <router-link to="/login" class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 active:bg-primary-800 transition-all">
            Order Fuel
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </router-link>
        </div>
      </div>
    </header>

    <!-- ═══════════════════════════════════════
         HERO
    ═══════════════════════════════════════ -->
    <section class="pt-16 min-h-screen flex items-center relative overflow-hidden">
      <!-- Background gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50 pointer-events-none"></div>
      <!-- Decorative circles -->
      <div class="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-100/50 blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-blue-100/40 blur-3xl pointer-events-none"></div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left: Text -->
        <div>
          <div class="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 rounded-full px-4 py-1.5 mb-6">
            <span class="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
            <span class="text-xs font-semibold text-primary-700">Maharashtra's #1 Bulk Fuel Delivery Platform</span>
          </div>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6" style="font-family: var(--font-heading)">
            Bulk Fuel Delivery,<br>
            <span class="text-primary-600">At Your Doorstep</span>
          </h1>
          <p class="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
            Schedule diesel and petrol deliveries for your fleet, factory, or construction site. Real-time tracking, digital invoices, and flexible credit — all in one platform.
          </p>
          <div class="flex flex-col sm:flex-row gap-3">
            <router-link to="/login" class="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-200 hover:bg-primary-700 active:bg-primary-800 transition-all">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Order Fuel Now
            </router-link>
            <a href="#how-it-works" class="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-6 py-3.5 text-base font-semibold text-gray-700 hover:border-primary-200 hover:bg-primary-50 transition-all">
              See How It Works
            </a>
          </div>
          <!-- Trust badges -->
          <div class="flex flex-wrap items-center gap-5 mt-10 text-sm text-gray-500">
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
              GST Compliant Invoices
            </div>
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
              Live GPS Tracking
            </div>
            <div class="flex items-center gap-1.5">
              <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
              Flexible Credit Limits
            </div>
          </div>
        </div>

        <!-- Right: Visual card -->
        <div class="hidden lg:flex justify-center">
          <div class="relative w-full max-w-sm">
            <!-- Main card -->
            <div class="bg-white rounded-3xl shadow-2xl shadow-primary-100 border border-gray-100 p-6 space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-xs text-gray-500 font-medium">Active Delivery</p>
                  <p class="text-lg font-bold text-gray-900 mt-0.5">Order #FF-2847</p>
                </div>
                <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700">In Transit</span>
              </div>
              <!-- Fuel type -->
              <div class="flex gap-3">
                <div class="flex-1 bg-primary-50 rounded-2xl p-3 text-center">
                  <p class="text-xs text-gray-500">Fuel Type</p>
                  <p class="font-bold text-primary-700 mt-0.5">HSD Diesel</p>
                </div>
                <div class="flex-1 bg-amber-50 rounded-2xl p-3 text-center">
                  <p class="text-xs text-gray-500">Quantity</p>
                  <p class="font-bold text-amber-700 mt-0.5">10,000 L</p>
                </div>
              </div>
              <!-- Progress -->
              <div>
                <div class="flex justify-between text-xs text-gray-500 mb-2">
                  <span>Delivery Progress</span>
                  <span class="font-semibold text-primary-600">75%</span>
                </div>
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div class="h-full w-3/4 bg-primary-600 rounded-full"></div>
                </div>
              </div>
              <!-- ETA -->
              <div class="flex items-center gap-3 bg-green-50 rounded-xl p-3">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Estimated Arrival</p>
                  <p class="text-sm font-semibold text-gray-900">Today, 3:30 PM</p>
                </div>
              </div>
            </div>
            <!-- Floating stat badge -->
            <div class="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3">
              <p class="text-xs text-gray-500">Credit Available</p>
              <p class="text-lg font-bold text-primary-600">₹4.2L</p>
            </div>
            <!-- Floating invoice badge -->
            <div class="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 flex items-center gap-2">
              <div class="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-xs text-gray-500">Invoice</p>
                <p class="text-sm font-bold text-gray-900">GST Ready</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         STATS
    ═══════════════════════════════════════ -->
    <section id="stats" class="bg-primary-600 py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
          <div v-for="stat in stats" :key="stat.label">
            <p class="text-3xl sm:text-4xl font-bold" style="font-family: var(--font-heading)">{{ stat.value }}</p>
            <p class="text-sm text-primary-200 mt-1 font-medium">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         FEATURES
    ═══════════════════════════════════════ -->
    <section id="features" class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-14">
          <p class="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">Everything You Need</p>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900" style="font-family: var(--font-heading)">Built for B2B Fuel Buyers</h2>
          <p class="text-gray-500 mt-4 max-w-2xl mx-auto">From small factories to large fleets, FuelFlow Pro handles every aspect of your bulk fuel procurement.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="feature in features" :key="feature.title" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-primary-100 transition-all group">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors" :class="feature.iconBg">
              <span class="text-2xl">{{ feature.icon }}</span>
            </div>
            <h3 class="font-bold text-gray-900 text-lg mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HOW IT WORKS
    ═══════════════════════════════════════ -->
    <section id="how-it-works" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-14">
          <p class="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">Simple Process</p>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900" style="font-family: var(--font-heading)">Order in 4 Easy Steps</h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <!-- Connector line (desktop) -->
          <div class="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-primary-100"></div>
          <div v-for="(step, i) in steps" :key="step.title" class="relative flex flex-col items-center text-center">
            <div class="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 relative z-10 shadow-lg shadow-primary-100" :style="{ background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)' }">
              <span class="text-3xl">{{ step.icon }}</span>
            </div>
            <div class="absolute top-0 -right-2 w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center z-20">{{ i + 1 }}</div>
            <h3 class="font-bold text-gray-900 mb-2">{{ step.title }}</h3>
            <p class="text-sm text-gray-500">{{ step.desc }}</p>
          </div>
        </div>
        <div class="text-center mt-12">
          <router-link to="/login" class="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all">
            Get Started — It's Free
          </router-link>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         TESTIMONIALS
    ═══════════════════════════════════════ -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-14">
          <p class="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">Happy Customers</p>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900" style="font-family: var(--font-heading)">Trusted by Businesses Across Maharashtra</h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="t in testimonials" :key="t.name" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div class="flex gap-1 mb-4">
              <svg v-for="n in 5" :key="n" class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
            <p class="text-sm text-gray-600 leading-relaxed mb-5">"{{ t.quote }}"</p>
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-sm shrink-0">{{ t.name[0] }}</div>
              <div>
                <p class="text-sm font-semibold text-gray-900">{{ t.name }}</p>
                <p class="text-xs text-gray-400">{{ t.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         CTA BANNER
    ═══════════════════════════════════════ -->
    <section class="py-20 relative overflow-hidden" style="background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white blur-3xl"></div>
      </div>
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4" style="font-family: var(--font-heading)">Ready to Simplify Your Fuel Procurement?</h2>
        <p class="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">Join 500+ businesses in Maharashtra who trust FuelFlow Pro for their bulk fuel needs.</p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link to="/login" class="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-primary-700 px-8 py-3.5 text-base font-semibold shadow-lg hover:bg-primary-50 transition-all">
            Order Fuel Now
          </router-link>
          <a href="#contact" class="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 text-white px-8 py-3.5 text-base font-semibold hover:border-white hover:bg-white/10 transition-all">
            Talk to Sales
          </a>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         CONTACT US
    ═══════════════════════════════════════ -->
    <section id="contact" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-14">
          <p class="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">Get In Touch</p>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900" style="font-family: var(--font-heading)">Contact Us</h2>
          <p class="text-gray-500 mt-4 max-w-xl mx-auto">Have a question or want to know more about our bulk fuel delivery services? Our team will get back to you within 24 hours.</p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-start">
          <!-- Left: Info -->
          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900">Phone</p>
                <p class="text-gray-500 text-sm mt-0.5">+91 20 1234 5678</p>
                <p class="text-xs text-gray-400 mt-0.5">Mon–Sat, 9:00 AM – 6:00 PM</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900">Email</p>
                <p class="text-gray-500 text-sm mt-0.5">support@fuelflowpro.in</p>
                <p class="text-xs text-gray-400 mt-0.5">We reply within 24 hours</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900">Office</p>
                <p class="text-gray-500 text-sm mt-0.5">IFDS Pvt. Ltd., Pune, Maharashtra</p>
                <p class="text-xs text-gray-400 mt-0.5">Serving all of Maharashtra</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.533 5.837L.057 23.215a.75.75 0 00.928.928l5.378-1.476A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.524-5.188-1.437l-.372-.222-3.853 1.058 1.058-3.853-.222-.372A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </div>
              <div>
                <p class="font-semibold text-gray-900">WhatsApp</p>
                <p class="text-gray-500 text-sm mt-0.5">+91 98765 00000</p>
                <p class="text-xs text-gray-400 mt-0.5">Quick responses on WhatsApp</p>
              </div>
            </div>
          </div>

          <!-- Right: Form -->
          <div class="bg-gray-50 rounded-2xl border border-gray-100 p-6 sm:p-8">
            <h3 class="font-bold text-gray-900 text-lg mb-6">Send us a message</h3>
            <form @submit.prevent="submitContact" class="space-y-4">
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                  <input v-model="contactForm.name" type="text" class="block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition bg-white" placeholder="Rajesh Patil" required />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
                  <input v-model="contactForm.company" type="text" class="block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition bg-white" placeholder="Patil Logistics Pvt. Ltd." />
                </div>
              </div>
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number *</label>
                  <input v-model="contactForm.mobile" type="tel" class="block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition bg-white" placeholder="9876543210" required />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <input v-model="contactForm.email" type="email" class="block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition bg-white" placeholder="rajesh@company.com" />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Inquiry Type</label>
                <select v-model="contactForm.type" class="block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition bg-white">
                  <option value="pricing">Pricing & Credit Limits</option>
                  <option value="onboarding">New Customer Onboarding</option>
                  <option value="bulk">Bulk / Enterprise Orders</option>
                  <option value="support">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Message *</label>
                <textarea v-model="contactForm.message" rows="4" class="block w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition bg-white" placeholder="Tell us about your fuel requirements, monthly volume, locations, etc." required></textarea>
              </div>

              <div v-if="contactSuccess" class="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
                <svg class="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p class="text-sm text-green-700 font-medium">Message sent! We'll get back to you within 24 hours.</p>
              </div>

              <button type="submit" :disabled="contactSubmitting" class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 active:bg-primary-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <svg v-if="contactSubmitting" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                {{ contactSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         FOOTER
    ═══════════════════════════════════════ -->
    <footer class="bg-gray-900 text-gray-400 py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <!-- Brand -->
          <div class="lg:col-span-1">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <span class="font-bold text-white" style="font-family: var(--font-heading)">FuelFlow Pro</span>
            </div>
            <p class="text-sm leading-relaxed mb-4">Maharashtra's trusted bulk fuel delivery platform for businesses of all sizes.</p>
            <div class="space-y-1 text-sm">
              <p>📞 +91 20 1234 5678</p>
              <p>📧 support@fuelflowpro.in</p>
              <p>⏰ Mon–Sat: 9 AM – 6 PM</p>
            </div>
          </div>
          <!-- Quick Links -->
          <div>
            <p class="font-semibold text-white mb-4">Quick Links</p>
            <ul class="space-y-2 text-sm">
              <li><a href="#features" class="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" class="hover:text-white transition-colors">How It Works</a></li>
              <li><router-link to="/login" class="hover:text-white transition-colors">Customer Login</router-link></li>
              <li><router-link to="/register" class="hover:text-white transition-colors">Register</router-link></li>
            </ul>
          </div>
          <!-- Solutions -->
          <div>
            <p class="font-semibold text-white mb-4">Solutions</p>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition-colors">Fleet Fuel Management</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Factory & Industrial</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Construction Sites</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Agriculture Sector</a></li>
            </ul>
          </div>
          <!-- Legal -->
          <div>
            <p class="font-semibold text-white mb-4">Legal</p>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Refund Policy</a></li>
              <li><a href="#" class="hover:text-white transition-colors">GST Information</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 FuelFlow Pro. All rights reserved. IFDS Pvt. Ltd., Pune, Maharashtra.</p>
          <p>PESO Certified · GST Compliant · ISO 9001:2015</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const contactSubmitting = ref(false)
const contactSuccess = ref(false)
const contactForm = reactive({ name: '', company: '', mobile: '', email: '', type: 'pricing', message: '' })

async function submitContact() {
  contactSubmitting.value = true
  // Simulate API call — wire to backend endpoint when available
  await new Promise(r => setTimeout(r, 1000))
  contactSuccess.value = true
  contactSubmitting.value = false
  Object.assign(contactForm, { name: '', company: '', mobile: '', email: '', type: 'pricing', message: '' })
  setTimeout(() => { contactSuccess.value = false }, 5000)
}

const stats = [
  { value: '500+', label: 'Business Customers' },
  { value: '2Cr+', label: 'Litres Delivered' },
  { value: '99.2%', label: 'On-Time Delivery' },
  { value: '₹50Cr+', label: 'Transactions Processed' },
]

const features = [
  {
    icon: '⚡',
    iconBg: 'bg-blue-50',
    title: 'Instant Scheduling',
    desc: 'Place bulk fuel orders in under 60 seconds. Choose quantity, delivery location, and preferred time slot.',
  },
  {
    icon: '📍',
    iconBg: 'bg-green-50',
    title: 'Live GPS Tracking',
    desc: 'Track your tanker in real-time from dispatch to delivery. Get ETA updates on every order.',
  },
  {
    icon: '🧾',
    iconBg: 'bg-amber-50',
    title: 'GST-Ready Invoices',
    desc: 'Automatically generated GST-compliant invoices for every delivery. Export for Tally or your ERP.',
  },
  {
    icon: '💳',
    iconBg: 'bg-purple-50',
    title: 'Flexible Credit',
    desc: 'Enjoy customized credit limits with 7–30 day payment terms. Pay via UPI, NEFT, or card.',
  },
  {
    icon: '📊',
    iconBg: 'bg-rose-50',
    title: 'Consumption Reports',
    desc: 'Track fuel consumption trends across all your delivery locations. Make data-driven decisions.',
  },
  {
    icon: '🔔',
    iconBg: 'bg-teal-50',
    title: 'Smart Notifications',
    desc: 'Get WhatsApp and SMS alerts for order status, invoice generation, and payment reminders.',
  },
]

const steps = [
  { icon: '📋', title: 'Place Order', desc: 'Select fuel type, quantity, and delivery location from the portal.' },
  { icon: '✅', title: 'Confirm & Schedule', desc: 'We confirm your order and assign a tanker for your preferred slot.' },
  { icon: '🚛', title: 'Track Delivery', desc: 'Follow your tanker live on GPS. Get ETA notifications on WhatsApp.' },
  { icon: '🧾', title: 'Invoice & Pay', desc: 'Receive GST invoice instantly. Pay online or use your credit limit.' },
]

const testimonials = [
  {
    name: 'Rajesh Patil',
    role: 'Fleet Manager, Patil Logistics Pvt. Ltd.',
    quote: 'FuelFlow Pro has completely transformed how we manage diesel for our 80-vehicle fleet. Ordering takes seconds and the live tracking is a game-changer.',
  },
  {
    name: 'Sunita Kale',
    role: 'Admin Head, Kale Construction',
    quote: 'The GST invoices are auto-generated and ready for our accountant. We save hours every month on paperwork alone.',
  },
  {
    name: 'Mahesh Deshmukh',
    role: 'Owner, Deshmukh Agro Industries',
    quote: 'Reliable delivery every time. The credit facility has helped us manage cash flow during peak season without any hassle.',
  },
]
</script>
