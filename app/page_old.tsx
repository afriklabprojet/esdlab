"use client";

import { motion } from "framer-motion";

import Link from "next/link";
import { fadeIn, slideUp, staggerContainer } from "@/lib/animations";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Design Élégant */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient Background Animé */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient" style={{ backgroundSize: '200% 200%' }} />
        
        {/* Grille Animée */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        
        {/* Particules Flottantes */}
        <div className="absolute inset-0 floating-particles" />
        
        {/* Glow Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-accent-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }} />
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge Élégant */}
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center gap-2 px-6 py-3 mb-8 bg-white/80 backdrop-blur-lg rounded-full shadow-elegant border border-white/20"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
              </span>
              <span className="text-sm font-medium bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Pionniers de l'affichage dynamique en Afrique
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Ce que vous voulez dire,{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 bg-clip-text text-transparent animate-gradient" style={{ backgroundSize: '200% auto' }}>
                  vu par tous
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 rounded-full" />
              </span>
              {" "}— instantanément
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              <span>DigiLab Corporate : pilotez à distance la diffusion de vos contenus multimédias sur tous vos écrans. </span>
              <span className="font-semibold text-gray-900"> Full web, sans installation, en toute simplicité.</span>
            </motion.p>

            <motion.div
              variants={slideUp}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl overflow-hidden shadow-elegant-lg hover:shadow-glow-lg transition-all duration-500 transform hover:scale-105"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-secondary-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-3">
                  Démarrer un projet
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/services"
                className="group inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-primary-600 bg-white/80 backdrop-blur-lg rounded-2xl border-2 border-primary-600/20 hover:border-primary-600 hover:bg-white shadow-elegant hover:shadow-elegant-lg transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  Découvrir nos services
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </motion.div>

            {/* Stats Badge */}
            <motion.div
              variants={fadeIn}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {[
                { value: "1000+", label: "Clients" },
                { value: "0", label: "Concurrent" },
                { value: "80%", label: "Conversion" },
                { value: "24/7", label: "Support" },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-4">
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator Élégant */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-500 font-medium">Découvrir</span>
            <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* Services Preview Section - Design Élégant */}
      <section className="py-32 relative overflow-hidden">
        {/* Background décoratif */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '3s' }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block px-6 py-2 mb-6 bg-primary-50 rounded-full">
              <span className="text-sm font-semibold text-primary-600">NOS 3 PILIERS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Solutions DigiLab Corporate
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Des solutions sur mesure pour chaque étape de votre transformation digitale
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "INFORMER",
                description: "Diffusion d'informations opérationnelles en temps réel : KPI, sécurité, performances",
                icon: "📊",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                title: "ANNONCER",
                description: "Communication interne et externe ciblée : événements, offres, actualités",
                icon: "📢",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                title: "STIMULER",
                description: "Engagement et implication des collaborateurs : quiz, félicitations, défis",
                icon: "⚡",
                gradient: "from-orange-500 to-red-500",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Card avec effet glassmorphism */}
                <div className="relative h-full p-8 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/20 shadow-elegant hover:shadow-elegant-lg transition-all duration-500 overflow-hidden hover-lift">
                  {/* Gradient Background au hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Icône avec effet de glow */}
                  <div className="relative mb-6">
                    <div className="text-6xl transform group-hover:scale-110 transition-transform duration-500">
                      {service.icon}
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`} />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <Link
                    href="/services"
                    className={`inline-flex items-center gap-2 font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent group-hover:gap-4 transition-all duration-300`}
                  >
                    En savoir plus
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>

                  {/* Effet de brillance au hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ESDLAB Section - Design Élégant */}
      <section className="py-32 relative overflow-hidden">
        {/* Background avec gradient animé et particules */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 animate-gradient bg-[length:200%_200%]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-400/20 rounded-full mix-blend-overlay filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-block px-6 py-2 mb-6 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
              <span className="text-sm font-semibold text-white">LEADERSHIP RÉGIONAL</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Pourquoi ESDLAB ?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Une expertise reconnue au service de votre réussite digitale
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                number: "45 000+", 
                label: "Entreprises cibles à Abidjan",
                icon: "🏢",
                gradient: "from-blue-400 to-cyan-400"
              },
              { 
                number: "0", 
                label: "Concurrent local identifié",
                icon: "🏆",
                gradient: "from-purple-400 to-pink-400"
              },
              { 
                number: "80%+", 
                label: "Taux de conversion post-pilote",
                icon: "📈",
                gradient: "from-green-400 to-emerald-400"
              },
              { 
                number: "1 000+", 
                label: "Clients déjà conquis",
                icon: "⭐",
                gradient: "from-orange-400 to-red-400"
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Card glassmorphique */}
                <div className="relative h-full p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-elegant hover:shadow-glow-lg hover:bg-white/15 transition-all duration-500 overflow-hidden hover-lift">
                  {/* Glow effect au hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Icône */}
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                    {stat.icon}
                  </div>

                  {/* Nombre avec animation de compteur */}
                  <div className={`font-display text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.number}
                  </div>
                  
                  {/* Label */}
                  <div className="text-white/90 text-sm leading-relaxed">
                    {stat.label}
                  </div>

                  {/* Effet de brillance subtil */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Citation ou texte additionnel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-white/80 text-lg max-w-3xl mx-auto italic">
              « Pionniers de l'affichage dynamique en Afrique de l'Ouest, nous transformons la communication de plus de 1 000 entreprises à travers nos solutions innovantes. »
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Design Élégant */}
      <section className="py-32 relative overflow-hidden">
        {/* Background avec gradients et particules */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-primary-50" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-secondary-200 to-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '3s' }} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            {/* Card CTA avec glassmorphism */}
            <div className="relative p-12 lg:p-16 bg-white/70 backdrop-blur-xl rounded-[3rem] border border-white/20 shadow-elegant-lg overflow-hidden">
              {/* Glow orbs décoratifs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-400/20 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
              
              <div className="relative z-10 text-center">
                {/* Badge */}
                <div className="inline-block px-6 py-2 mb-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-full border border-primary-100">
                  <span className="text-sm font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    LANCEZ VOTRE PROJET
                  </span>
                </div>

                {/* Titre avec gradient */}
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  <span>Prêt à transformer </span>
                  <span className="block mt-2 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                    votre vision ?
                  </span>
                </h2>

                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                  Rejoignez les <span className="font-bold text-primary-600">1 000+ entreprises</span> qui ont déjà choisi ESDLAB pour leur transformation digitale
                </p>

                {/* Boutons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {/* Bouton principal avec gradient */}
                  <Link
                    href="/contact"
                    className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl shadow-elegant-lg hover:shadow-glow-lg transition-all duration-500 overflow-hidden hover:scale-105"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Commencer maintenant
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    {/* Gradient au hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>

                  {/* Bouton secondaire glassmorphique */}
                  <Link
                    href="/services"
                    className="group inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-gray-900 bg-white/80 backdrop-blur-lg rounded-2xl border-2 border-gray-200 hover:border-primary-300 hover:shadow-elegant transition-all duration-300 hover:scale-105"
                  >
                    <span className="flex items-center gap-3">
                      Découvrir nos solutions
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </div>

                {/* Points de confiance */}
                <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Installation gratuite</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Support 24/7</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">ROI garanti</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
