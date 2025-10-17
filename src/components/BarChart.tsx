import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface BarChartProps {
    title: string;
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string | string[];
            borderColor: string | string[];
            borderWidth: number;
        }[];
    };
}

const BarChart: React.FC<BarChartProps> = ({ title, data }) => {
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
            <Bar options={options} data={data} />
        </div>
    );
};

export default BarChart;
