import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#1a1b80] text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <img src="/logo.svg" alt="KaireTribe" className="h-8 w-auto" />
                            <span className="text-2xl font-bold">KaireTribe</span>
                        </div>
                        <div className="space-y-2 text-xs text-gray-300 font-light">
                            <p>Address</p>
                            <p>Lorem ipsum</p>
                            <p className="pt-2">Email</p>
                            <p>company@example.com</p>
                            <p className="pt-2">Phone Number</p>
                            <p>+231 435 6 309</p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-white">Menu</h3>
                        <ul className="space-y-3 text-xs text-gray-300">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/scholarships" className="hover:text-white transition-colors">Scholarships</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-white">Quick links</h3>
                        <ul className="space-y-3 text-xs text-gray-300">
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms and conditions</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy policy</Link></li>
                            <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold mb-4 text-white">Let's Stay In Touch</h3>
                        <div className="bg-white rounded-full p-1 pl-4 flex items-center shadow-lg max-w-xs mb-8">
                            <input
                                type="email"
                                placeholder="Enter Your Email Address"
                                className="flex-1 outline-none text-gray-900 text-xs bg-transparent min-w-0"
                            />
                            <button className="bg-[#1a1b80] text-white px-4 py-2 rounded-full text-xs font-medium hover:opacity-90 transition-opacity">
                                Subscribe
                            </button>
                        </div>

                        <h3 className="text-sm font-semibold mb-4 text-white">Follow our Social</h3>
                        {/* <div className="flex space-x-4">
                            <a href="#" className="p-1 bg-white rounded-full text-[#1a1b80] hover:bg-gray-200 transition-colors">
                                <Facebook size={16} />
                            </a>
                            <a href="#" className="p-1 bg-white rounded-full text-[#1a1b80] hover:bg-gray-200 transition-colors">
                                <Linkedin size={16} />
                            </a>
                            <a href="#" className="p-1 bg-white rounded-full text-[#1a1b80] hover:bg-gray-200 transition-colors">
                                <Mail size={16} />
                            </a>
                        </div> */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
