import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
    title: string;
    data: {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string[];
            borderColor: string[];
            borderWidth: number;
        }[];
    };
}

const PieChart: React.FC<PieChartProps> = ({ title, data }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
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
    };

    return (
        <div className="chart-container">
            <Pie options={options} data={data} />
        </div>
    );
};

export default PieChart;
