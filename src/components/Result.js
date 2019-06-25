import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import {
    PieChart, Pie, Cell, Tooltip,
  } from 'recharts';
import {TiTick} from 'react-icons/ti/index'

const Result = (props) => {
    const { authedUser, optionOne, optionTwo } = props
    const data = [
        { name: 'One', value: optionOne.votes.length }, 
        { name: 'Two', value: optionTwo.votes.length }, 
        ];
    const COLORS = ['#0088FE', '#00C49F'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
        const radius = 75 + innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <g>
                <text 
                    x={x}
                    y={y}
                    fill="black"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                >
                    Option {index+1}:{`${(percent * 100).toFixed(0)}%`}
                </text>
            </g>
        );
    };
    // console.log('data:', data)
    return (
        <Fragment>
                <h3>Would you rather...</h3>
                <br />
                <p>
                    1. {optionOne.text} : {optionOne.votes.length}
                </p>
                <p>
                    2. {optionTwo.text} : {optionTwo.votes.length}
                </p>
                <p className='your-vote'>
                    <TiTick /> You have chosen option. 
                    {optionOne.votes.find((user) => user === authedUser) 
                        &&  1
                    }
                    {optionTwo.votes.find((user) => user === authedUser) 
                        &&  2
                    }
                </p>
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

function mapStateToProps ({ authedUser, questions }, props) {
    const question = questions[props.id]
    const {optionOne, optionTwo} = question
    return {
        optionOne,
        optionTwo,
        authedUser
    }
}

export default connect(mapStateToProps)(Result)