export default function ScholarshipCard({ data }: { data: any }) {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
            <div className="aspect-[4/3] bg-gray-50 relative">
                <img
                    src={data.image.src}
                    alt={data.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-5">
                <h4 className="font-bold text-gray-900 text-lg mb-2">{data.title}</h4>
                <p className="text-gray-500 text-xs text-justify mb-4 leading-relaxed">
                    {data.description}
                </p>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-semibold text-yellow-600">
                        Closes {data.closes}
                    </span>
                    <button className="bg-[#1a1b80] text-white text-xs font-semibold px-6 py-2 rounded-full hover:bg-blue-900 transition-colors">
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};
