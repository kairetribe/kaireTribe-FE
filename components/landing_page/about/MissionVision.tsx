import { BracketText } from './BracketText';
import missionImage from '../../../../assets/images/about-mission.png';

export const MissionVision = () => {
    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="w-full h-48 md:h-64 overflow-hidden mb-12">
                <img
                    src={missionImage}
                    alt="School supplies flatlay"
                    className="w-full h-full object-cover opacity-90"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-primary">
                        Our <BracketText text="Mission & Vision" />
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            To bridge opportunity gaps for Nigerian students, regardless of background or income by connecting them to global scholarships and opportunities, while making the process as seamless as possible.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <p className="text-lg text-gray-700 leading-relaxed">
                            To build a <strong>Nigeria where every young person</strong> — regardless of income or location — has equal access to education, mentorship, and meaningful growth opportunities.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
