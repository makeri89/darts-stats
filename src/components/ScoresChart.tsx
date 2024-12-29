import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ScoreData } from '../types/dart';
import { useState, useEffect } from 'react';

type Props = {
  data: ScoreData[];
  onBarClick: (data: ScoreData) => void;
};

export function ScoresChart({ data, onBarClick }: Props) {
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="rounded-lg bg-dart-white p-6 shadow-sm dark:bg-dart-dark-white lg:col-span-3">
      <h3 className="mb-4 font-display text-xl text-dart-black dark:text-dart-white">
        Distribution of scores
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#444' : '#ccc'} />
          <XAxis dataKey="score" stroke={isDark ? '#F8F8F8' : '#1A1A1A'} allowDecimals={false} />
          <YAxis stroke={isDark ? '#F8F8F8' : '#1A1A1A'} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#2A2A2A' : '#F8F8F8',
              border: isDark ? '1px solid #F8F8F8' : '1px solid #1A1A1A',
              color: isDark ? '#F8F8F8' : '#1A1A1A',
            }}
          />
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
