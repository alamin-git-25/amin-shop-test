"use client"
import { motion } from 'framer-motion';
import Container from './Container'; // Ensure this is correctly implemented
import { Mail, MapPin, PhoneCall } from 'lucide-react'; // Ensure 'lucide-react' is installed

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .5, }}
            className="bg-[#1f1f1f] py-10"
        >
            <Container className="my-0 py-20">
                <div className="flex flex-col">
                    <div className="grid grid-cols-1 lg:grid-cols-4">
                        {/* Contact Info Section */}
                        {Array(3).fill(null).map((_, index) => (
                            <ul key={index} className="flex flex-col gap-4">
                                <li className="my-10">
                                    <h4 className="text-4xl text-white">Factal</h4>
                                </li>
                                <li className="flex gap-4 text-slate-300">
                                    <PhoneCall /> (+12)56862-4568
                                </li>
                                <li className="flex gap-4 text-slate-300">
                                    <Mail /> Store@gmail.com
                                </li>
                                <li className="flex gap-4 text-slate-300">
                                    <MapPin /> Dhaka, Bangladesh
                                </li>
                            </ul>
                        ))}

                        {/* Newsletter Section */}
                        <ul>
                            <li className="my-10">
                                <h4 className="text-4xl text-white">Factal</h4>
                            </li>
                            <li className="my-5">
                                <h4 className="text-xl text-slate-300">
                                    Enter your email to get apps, products, and the latest updates.
                                </h4>
                            </li>
                            <form action="#" className="sm:flex sm:gap-4">
                                <div className="sm:flex-1">
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Email address"
                                        className="w-full sub-shad border rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-yellow-400"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-rose-600 px-5 py-3 text-white transition focus:outline-none focus:ring focus:ring-yellow-400 sm:mt-0 sm:w-auto"
                                >
                                    <span className="text-sm font-medium"> Sign Up </span>

                                    <svg
                                        className="size-5 rtl:rotate-180"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </button>
                            </form>
                        </ul>
                    </div>
                </div>
            </Container>
        </motion.footer>
    );
}
