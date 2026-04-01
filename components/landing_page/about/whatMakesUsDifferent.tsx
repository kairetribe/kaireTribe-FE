import { BracketText } from './bracketText';
import differentImage from '@/public/images/about-different.png';

export const WhatMakesUsDifferent = () => {
    return (
        <section className="py-16 md:py-24 bg-indigo-50/50 rounded-[3rem] mx-4 md:mx-8 my-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                            <img
                                src={differentImage.src}
                                alt="Happy student with green folder"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8">
                            What <BracketText text="Makes Us Different" />
                        </h2>
                        <ul className="space-y-6">
                            {[
                                "Student-first approach",
                                "Personalized recommendations",
                                "Focus on Nigerian education pathways",
                                "Clarity over complexity"
                            ].map((item, index) => (
                                <li key={index} className="flex items-center text-xl text-gray-800 font-medium">
                                    <span className="w-2 h-2 bg-gray-800 rounded-full mr-4"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-10">
                            <button className="bg-blue-800 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-900 transition-colors shadow-lg">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
