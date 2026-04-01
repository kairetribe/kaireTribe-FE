import { useState } from 'react';
import { MinusCircle, PlusCircle } from 'lucide-react';

/* 
  Using 'lucide-react' for icons as it's in package.json.
  The image shows a filled blue circle with a white symbol.
*/

const FAQS = [
    { question: "Lorem Ipsum itsa dolor lemin goko", answer: "Lorem Ipsum itsa dolor lemin goko" },
    { question: "Lorem Ipsum itsa dolor lemin goko", answer: "Lorem Ipsum itsa dolor lemin goko" },
    { question: "Lorem Ipsum itsa dolor lemin goko", answer: "Lorem Ipsum itsa dolor lemin goko" },
    { question: "Lorem Ipsum itsa dolor lemin goko", answer: "Lorem Ipsum itsa dolor lemin goko" },
    { question: "Lorem Ipsum itsa dolor lemin goko", answer: "Lorem Ipsum itsa dolor lemin goko" },
    { question: "Lorem Ipsum itsa dolor lemin goko", answer: "Lorem Ipsum itsa dolor lemin goko" },
    { question: "Lorem Ipsum itsa dolor lemin goko", answer: "Lorem Ipsum itsa dolor lemin goko" },
    { question: "Lorem Ipsum itsa dolor lemin goko", answer: "Lorem Ipsum itsa dolor lemin goko" },
];

export const FAQList = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="pb-16 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-4">
                    {FAQS.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="border-b border-gray-100 py-4 cursor-pointer group"
                                onClick={() => toggle(index)}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className={`text-lg font-medium ${isOpen ? 'text-gray-900' : 'text-gray-700'}`}>
                                            {faq.question}
                                        </h3>
                                        <div
                                            className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                                                }`}
                                        >
                                            <div className="overflow-hidden">
                                                <p className="text-gray-500">{faq.answer}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-shrink-0 ml-4">
                                        {isOpen ? (
                                            <MinusCircle className="w-6 h-6 text-blue-800 fill-blue-800 text-white" />
                                        ) : (
                                            <PlusCircle className="w-6 h-6 text-blue-800 fill-blue-800 text-white" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
