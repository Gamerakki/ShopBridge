import React from 'react'
import { Bar, Doughnut, Line, Pie, Scatter } from 'react-chartjs-2';
import '../css/Dashboard.scss';
const rand = () => Math.round(Math.random() * 20 - 10);

const data2 = {
    datasets: [
        {
            label: 'A dataset',
            data: [
                { x: rand(), y: rand() },
                { x: rand(), y: rand() },
                { x: rand(), y: rand() },
                { x: rand(), y: rand() },
                { x: rand(), y: rand() },
                { x: rand(), y: rand() },
                { x: rand(), y: rand() },
                { x: rand(), y: rand() },
                { x: rand(), y: rand() },
                { x: rand(), y: rand() },
                { x: rand(), y: rand() },
                { x: rand(), y: rand() },
                { x: rand(), y: rand() },
                { x: rand(), y: rand() },
            ],
            backgroundColor: 'rgba(255, 99, 132, 1)',
        },
    ],
};
const data = {
    labels: ['shirts', 'jeans', 't-shrits', 'jacket', 'shoes', 'caps'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};
const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

const data3 = {
    labels: ['shirts', 'jeans', 't-shrits', 'jacket', 'shoes', 'caps'],
    datasets: [
        {
            label: '# of Red Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgb(255, 99, 132)',
        },
        {
            label: '# of Blue Votes',
            data: [2, 3, 20, 5, 1, 4],
            backgroundColor: 'rgb(54, 162, 235)',
        },
        {
            label: '# of Green Votes',
            data: [3, 10, 13, 15, 22, 30],
            backgroundColor: 'rgb(75, 192, 192)',
        },
    ],
};

const options2 = {
    scales: {
        yAxes: [
            {
                stacked: true,
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
        xAxes: [
            {
                stacked: true,
            },
        ],
    },
};

function Dashboard() {
    return (
        <div className="dashboardMainContainer">
            <div className="graphContainer">
                <div className="graphContainerLabel">
                    Doughnut Graph
                </div>
                <Doughnut data={data} />
            </div>
            <div className="graphContainer">
                <div className="graphContainerLabel">
                    Line Graph
                </div>
                <Line data={data} options={options} />
            </div>
            <div className="graphContainer">
                <div className="graphContainerLabel">
                    Vertical Bar Graph
                </div>
                <Bar data={data} options={options} />
            </div>
            <div className="graphContainer">
                <div className="graphContainerLabel">
                    Pie Graph
                </div>
                <Pie data={data} />
            </div>
            <div className="graphContainer">
                <div className="graphContainerLabel">
                    Scatter Graph
                </div>
                <Scatter data={data2} options={options} />
            </div>
            <div className="graphContainer">
                <div className="graphContainerLabel">
                    Group Bar Graph
                </div>
                <Bar data={data3} options={options2} />
            </div>

        </div>
    )
}

export default Dashboard
