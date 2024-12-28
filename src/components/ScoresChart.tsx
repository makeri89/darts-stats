import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ScoreData } from '../types/dart';

type Props = {
  data: ScoreData[];
  onBarClick: (data: ScoreData) => void;
};

export function ScoresChart({ data, onBarClick }: Props) {
  return (
    <div className="rounded-lg bg-dart-white p-6 shadow-sm lg:col-span-3">
      <h3 className="mb-4 font-display text-xl text-dart-black">Distribution of scores</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="score" stroke="#1A1A1A" />
          <YAxis stroke="#1A1A1A" />
          <Tooltip contentStyle={{ backgroundColor: '#F8F8F8', border: '1px solid #1A1A1A' }} />
          <Bar
            dataKey="combinations"
            fill="#E21C1C"
            onClick={onBarClick}
            cursor="pointer"
            className="hover:opacity-80"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
