import React from 'react';
import { ResponsiveContainer, ComposedChart, Line, Bar, Scatter, XAxis, YAxis, ReferenceLine, Tooltip, Cell } from 'recharts';
import { MOCK_DATA } from '../constants';

const CustomXAxisTick = ({ x, y, payload }: any) => {
  // Mock logic: Every 3rd day is a "Moon Phase"
  const isMoonPhase = ['Wed', 'Fri'].includes(payload.value); 
  
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={10} textAnchor="middle" fill="#a8a29e" fontSize={10}>
        {payload.value}
      </text>
      {isMoonPhase && (
        <text x={0} y={0} dy={22} textAnchor="middle" fill="#fb7185" fontSize={8}>
          ●
        </text>
      )}
    </g>
  );
};

const PatternChart: React.FC = () => {
  return (
    <div className="h-80 w-full bg-white rounded-3xl p-6 shadow-sm border border-stone-100 flex flex-col">
      <div className="flex justify-between items-baseline mb-6">
         <h3 className="text-xs font-bold text-stone-400 tracking-widest uppercase">多维波动模式</h3>
         <div className="flex gap-3 text-[10px]">
             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-stone-500"></div><span className="text-stone-400">情绪</span></div>
             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-indigo-100"></div><span className="text-stone-400">睡眠</span></div>
         </div>
      </div>
      
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={MOCK_DATA} margin={{ bottom: 20 }}>
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={<CustomXAxisTick />}
              interval={0}
            />
            {/* Left Axis: Mood (-3 to 3) */}
            <YAxis 
              yAxisId="mood"
              hide 
              domain={[-3, 4]} 
            />
            {/* Right Axis: Sleep (0 to 14) */}
            <YAxis 
              yAxisId="sleep" 
              orientation="right" 
              hide 
              domain={[0, 14]} 
            />
            
            <ReferenceLine yAxisId="mood" y={0} stroke="#e7e5e4" strokeDasharray="3 3" />
            
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelStyle={{ color: '#78716c', fontWeight: 'bold' }}
              itemStyle={{ fontSize: '12px' }}
            />

            {/* Sleep Bars */}
            <Bar yAxisId="sleep" dataKey="sleep" barSize={16} radius={[4, 4, 0, 0]}>
               {MOCK_DATA.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill="#e0e7ff" fillOpacity={0.6} />
               ))}
            </Bar>

            {/* Mood Line */}
            <Line 
              yAxisId="mood"
              type="monotone" 
              dataKey="value" 
              stroke="#57534e" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#fff', stroke: '#57534e', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center">
         <p className="text-[9px] text-stone-300">● 标记代表月相/生理周期关键节点</p>
      </div>
    </div>
  );
};

export default PatternChart;