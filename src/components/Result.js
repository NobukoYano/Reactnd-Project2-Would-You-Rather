import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    PieChart, Pie, Cell, Tooltip,
  } from 'recharts';

class Result extends Component {
    render() {
        const { optionOne, optionTwo } = this.props
        const data = [
            { name: 'One', value: optionOne.votes.length }, 
            { name: 'Two', value: optionTwo.votes.length }, 
          ];
        const COLORS = ['#0088FE', '#00C49F'];

        const RADIAN = Math.PI / 180;
        const renderCustomizedLabel = ({
            cx, cy, midAngle, innerRadius, outerRadius, percent, index,
        }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
                <g>
                    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                    </text>
                </g>
            );
        };
        // console.log('data:', data)
        return (
            <Fragment>
                    <h3>Would you rather...</h3>
                    <br />
                    <p>1. {optionOne.text} : {optionOne.votes.length}</p>
                    <p>2. {optionTwo.text} : {optionTwo.votes.length}</p>
                    <PieChart width={300} height={300}>
                        <Pie 
                            nameKey="name"
                            dataKey="value"
                            isAnimationActive={false}
                            data={data}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label={renderCustomizedLabel}
                        >
                            {
                                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                    </PieChart>
                    <Tooltip />
            </Fragment>
        )
    }
}

function mapStateToProps ({ questions }, props) {
    const question = questions[props.id]
    const {optionOne, optionTwo} = question
    return {
        optionOne,
        optionTwo,
    }
}

export default connect(mapStateToProps)(Result)