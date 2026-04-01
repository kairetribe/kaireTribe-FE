import { BracketText } from './BracketText';
import problemImage from '../../../../assets/images/about-problem.png';

export const TheProblem = () => {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
                    <div className="order-2 lg:order-1">
                        <div className="aspect-square w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl relative">
                            <img
                                src={problemImage}
                                alt="Stressed student"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8">
                            The <BracketText text="Problem" />
                        </h2>
                        <p className="text-xl text-gray-700 leading-relaxed font-medium">
                            Many Nigerian students miss out on scholarships because information is scattered, confusing, or not tailored to their background.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
