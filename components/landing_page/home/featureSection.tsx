interface FeatureSectionProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    bgClass: string;
    imageOnLeft?: boolean;
    buttonText?: string;
    hasButton?: boolean
}

export const FeatureSection = ({
    title,
    description,
    imageSrc,
    imageAlt,
    bgClass,
    imageOnLeft,
    buttonText = "Get Started",
    hasButton
}: FeatureSectionProps) => {
    return (
        <div className={`py-8 md:my-12 ${bgClass}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div className={`flex flex-col ${imageOnLeft ? 'lg:order-2' : 'lg:order-1'}`}>
                        <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${ imageOnLeft ? 'text-[#131DBA]' : 'text-[#2A7E40]' } mb-6 leading-tight`}>
                            {title}
                        </h3>
                        <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed max-w-lg">
                            {description}
                        </p>
                        {   hasButton &&               
                            <div>
                                <button className={`inline-flex items-center justify-center px-8 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-primary-blue hover:bg-primary-blue/80 transition-opacity shadow-sm`}>
                                    {buttonText}
                                </button>
                            </div>
                        }
                    </div>
                    <div className={`${imageOnLeft ? 'lg:order-1' : 'lg:order-2'} w-full flex justify-center`}>
                        <div className="relative rounded-[20px] overflow-hidden aspect-[4/5] h-[600px] w-full max-w-md">
                            <img
                                src={imageSrc}
                                alt={imageAlt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
