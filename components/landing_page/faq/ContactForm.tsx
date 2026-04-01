
export const ContactForm = () => {
    return (
        <section className="py-16 bg-gray-50/50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-blue-800">Contact Us</h2>
                </div>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-500 mb-1">
                                First name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="First name"
                                className="w-full px-4 py-3 rounded-md border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 bg-white placeholder-blue-900/70 text-blue-900 font-medium shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-500 mb-1">
                                Last name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Last name"
                                className="w-full px-4 py-3 rounded-md border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 bg-white placeholder-blue-900/70 text-blue-900 font-medium shadow-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@company.com"
                            className="w-full px-4 py-3 rounded-md border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 bg-white placeholder-blue-900/70 text-blue-900 font-medium shadow-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-500 mb-1">
                            Phone number
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            placeholder="+1 (555) 000-0000"
                            className="w-full px-4 py-3 rounded-md border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 bg-white placeholder-blue-900/70 text-blue-900 font-medium shadow-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-500 mb-1">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows={4}
                            className="w-full px-4 py-3 rounded-md border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 bg-white shadow-sm resize-none"
                        ></textarea>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="privacy-policy"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="privacy-policy" className="ml-2 block text-sm text-gray-900">
                            You agree to our friendly <a href="#" className="font-medium text-blue-800 hover:text-blue-700 underline">privacy policy</a>.
                        </label>
                    </div>

                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 min-w-[200px] justify-center"
                        >
                            Send message
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};
