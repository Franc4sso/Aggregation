import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-slate-900/[0.04] -z-1" />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-100/30 to-transparent -z-1" />

                <main className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16 max-w-4xl"
                    >
                        <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl md:text-7xl mb-8 bg-clip-text">
                            Sistema di Aggregazione
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Gestisci e analizza le attività del tuo team in modo
                            efficiente. Aggrega i dati per progetto, dipendente
                            o data per ottenere insights preziosi.
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href={route("activities.show")}
                                className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform transition-all duration-200 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Vai alle Attività
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 ml-2 animate-pulse"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </Link>
                        </motion.div>
                    </motion.div>
                </main>
            </div>
        </>
    );
}
