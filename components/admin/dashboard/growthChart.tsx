import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Filter, X } from 'lucide-react';

const smoothData = [
    { name: 'Jan 01', value: 1500 },
    { name: 'Jan 08', value: 2200 },
    { name: 'Jan 15', value: 2400 },
    { name: 'Jan 22', value: 2000 },
    { name: 'Jan 29', value: 1800 },
    { name: 'Feb 01', value: 2100 },
    { name: 'Feb 08', value: 2300 },
    { name: 'Feb 15', value: 2500 },
    { name: 'Feb 22', value: 2200 },
    { name: 'Mar 01', value: 2800 },
    { name: 'Mar 08', value: 3200 },
    { name: 'Mar 15', value: 4500 },
];


export const GrowthChart = () => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6 flex-shrink-0">
                <h3 className="text-gray-900 font-semibold">User Growth</h3>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-indigo-100 text-indigo-600 rounded-md text-xs font-medium bg-indigo-50/50 hover:bg-indigo-50 transition-colors">
                        <Filter className="w-3 h-3" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-indigo-100 text-indigo-600 rounded-md text-xs font-medium bg-indigo-50/50 hover:bg-indigo-50 transition-colors">
                        2026
                        <X className="w-3 h-3 ml-1" />
                    </button>
                </div>
            </div>

            <div className="h-[250px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={smoothData}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={true} horizontal={false} stroke="#f0f0f0" strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={true}
                            tick={{ fill: '#9CA3AF', fontSize: 10 }}
                            tickMargin={10}
                            interval={2}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                fontSize: '12px'
                            }}
                            cursor={{ stroke: '#3B82F6', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#60A5FA"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
