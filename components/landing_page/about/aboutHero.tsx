import { BracketText } from './bracketText';
import heroImage from '@/public/images/about-hero.png';

export const AboutHero = () => {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                            About <BracketText text="Kaire Tribe" />
                        </h1>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Kaire Tribe is a platform focused on helping Nigerian graduates and undergraduates access and apply for local and international scholarships through a personalized recommendation system.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            The name Kaire combines an Igbo phrase "Ka ire" meaning "more than effective" with the Tribe term "Ohan" meaning "an opportune moment" to mean that now is the perfect time to access opportunities, and we present you a most effective way.
                        </p>
                    </div>
                    <div className="relative">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src={heroImage.src}
                                alt="Students graduating"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
