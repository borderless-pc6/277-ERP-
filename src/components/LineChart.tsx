import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface LineChartProps {
    title: string;
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            borderColor: string;
            backgroundColor: string;
            tension?: number;
        }[];
    };
}

const LineChart: React.FC<LineChartProps> = ({ title, data }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: '#1e293b',
                    font: {
                        size: 12
                    }
                }
            },
            title: {
                display: true,
                text: title,
                color: '#1e293b',
                font: {
                    size: 16,
                    weight: 'bold' as const
                }
            },
        },
        scales: {
            x: {
                grid: {
                    color: '#e2e8f0',
                },
                ticks: {
                    color: '#64748b',
                }
            },
            y: {
                grid: {
                    color: '#e2e8f0',
                },
                ticks: {
                    color: '#64748b',
                }
            },
        },
    };

    return (
        <div className="chart-container">
            <Line options={options} data={data} />
        </div>
    );
};

export default LineChart;
