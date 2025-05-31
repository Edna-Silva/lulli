import {
    IonButton
} from "@ionic/react";
import { isEqual } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Area, AreaChart, ResponsiveContainer, XAxis } from 'recharts';
import storage from "../../redux/store";
import { useGetStatisticsQuery } from "../../services/backend";
import { setStatistics, setCurrentStatistic } from "../../services/statistic/statistic.slice";
import "./styles.scss";

import moment from "moment";



const ChartComponent: React.FC = () => {
    const dispatch = useDispatch()
    const [currentExpenditure, setCurrentExpenditure] = useState(0)
    const { currentStatistic } = useSelector((state: any) => state.statistic)
    const [selectedStatistic, setSelectedStatistic] = useState([])
    const { data: statistics = [] } = useGetStatisticsQuery()
    const [chartType, setChartType] = useState('EXPENSE')
    useEffect(() => {
        const storeStatistics = async () => {
            const existingStatistics = await storage.get('statistics');

            const statisticsChanged = !isEqual(statistics, existingStatistics);
            if (statisticsChanged && statistics) {
                try {
                    await storage.set('statistics', statistics);
                    dispatch(setStatistics(statistics))

                } catch (err) {
                    console.error("Error storing statistics:", err);
                }
            }
        }
        storeStatistics()

    }, [statistics])


    useEffect(() => {
        const retrieveStatistics = async () => {
            try {
                const storedStatistics = await storage.get('statistics');
                if (storedStatistics) {
                    const stats: any = storedStatistics.filter(function (stat: any) {
                        return stat.week === moment().week() && stat.month === moment().month() && stat.year === moment().year() && stat.type === chartType
                    })
                    dispatch(setCurrentStatistic(stats))
                    setSelectedStatistic(stats)

                }
            } catch (err) {
                console.error("Error retrieving wallets:", err);
            }
        }



        retrieveStatistics()
    }, [])


    const [typeSelect, setTypeSelect] = useState('EXPENSE')
    const [typeSelectTime, setTypeSelectTime] = useState('day')
    const filterByType = async (type: string) => {
        const storedStatistics = await storage.get('statistics');
        setChartType(type)
        const filteredStats = storedStatistics.filter((stat: any) => {
            return stat.week === moment().week() && stat.month === moment().month() && stat.year === moment().year() && stat.type === type
        });

        dispatch(setCurrentStatistic(filteredStats));
        setSelectedStatistic(filteredStats);
        setTypeSelect(type)
    };

    const filterByTime = async (time: string) => {
        const storedStatistics = await storage.get('statistics');
        const filteredStats = storedStatistics.filter((stat: any) => {
            if (time === 'day') {
                return stat.day === moment().date() && stat.type === chartType
            } if (time === 'week') {
                return stat.week === moment().week() && stat.type === chartType
            } if (time === 'month') {
                return stat.month === moment().month() && stat.type === chartType
            } if (time === 'year') {
                return stat.year === moment().year() && stat.type === chartType
            }
        });
        
        dispatch(setCurrentStatistic(filteredStats));
        setSelectedStatistic(filteredStats);
        setTypeSelectTime(time)
    };

    const getCurrentExpense = async () => {
        const transactions = await storage.get('transactions')
        let totalExpenditure = 0
        for (const [index, item] of transactions.entries()) {
            if(item.expense){
              totalExpenditure += item.expense.amount
              
            }
        }
    
        setCurrentExpenditure(totalExpenditure)
      }
    
    
    
      useEffect(() => {
        getCurrentExpense()
      }, [])

    return (
        <div className="chart">
            <div className="chart-info">
                <div className="transaction-type-filters">
                    <IonButton className={typeSelect === "EXPENSE" ? "":  "unselected"} onClick={() => { filterByType('EXPENSE') }}>
                        Expense
                    </IonButton >
                    <IonButton className={typeSelect === "INCOME" ? "":  "unselected"} onClick={() => { filterByType('INCOME') }}>
                        Income
                    </IonButton>
                </div>
                <div className="expenditure">
                    <span><span>Current Expenditure</span> <br /><span className="amount-spent">N$ {currentExpenditure}</span></span>
                </div>
                <div className="time-type-filters">
                    <IonButton className={typeSelectTime !== 'day'? 'unselected': ''}  onClick={() => { filterByTime('day') }}>
                        Day
                    </IonButton >
                    <IonButton className={typeSelectTime !== 'week'? 'unselected': ''} onClick={() => { filterByTime('week') }}>
                        Week
                    </IonButton>
                    <IonButton className={typeSelectTime !== 'month'? 'unselected': ''} onClick={() => { filterByTime('month') }}>
                        Month
                    </IonButton>
                    <IonButton className={typeSelectTime !== 'year'? 'unselected': ''}onClick={() => { filterByTime('year') }}>
                        Year
                    </IonButton>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="50%" className={"actual-chart"}>

                <AreaChart
                    data={selectedStatistic}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#7165E3" stopOpacity={1} />
                            <stop offset="100%" stopColor="#7165E3" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="natural"
                        dataKey="amount"
                        stroke="none"
                        fillOpacity={1}
                        fill="url(#fillGradient)"

                    />
                </AreaChart>
            </ResponsiveContainer>

        </div>
    );
};

export default ChartComponent;


