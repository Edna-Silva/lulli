import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonGrid, IonCol, IonCardHeader, IonCard, IonCardSubtitle, IonCardContent, IonCardTitle, IonText, IonModal, IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import './styles.scss';
import StatisticReportCard from '../StatisticReportCard';
import { apertureOutline, arrowDownOutline, arrowUpOutline, bagHandle, bagHandleOutline, carSportOutline, cashOutline, closeCircle, fastFoodOutline, giftOutline, videocamOutline } from 'ionicons/icons';
import storage from '../../redux/store';
import moment from 'moment';
import Chart from '../Chart';

const StatisticReportCards: React.FC = () => {

    const reportsModal = useRef<HTMLIonModalElement>(null);
    const [isReportsModalOpen, setReportsModalOpen] = useState(false)
    const [reports, setReports] = useState<any>([])
    const [selectedReport, setSelectedReport] = useState<any>({})
    const [selectedReportExpenses, setSelectedReportExpenses] = useState<any>(0)
    const [selectedReportIncome, setSelectedReportIncome] = useState<any>(0)
    const [selectedReportTransactions, setSelectedReportTransactions] = useState<any>([])


    const getReportTotal = async (report: any) => {
        let expenseTotal = 0
        let incomeTotal = 0
        const existingStatistics = await storage.get('statistics');
        if (existingStatistics) {
            existingStatistics.forEach((item: any) => {
                if (item.type === "EXPENSE" && item.month === report.month && item.year === report.year) {
                    expenseTotal += item.amount
                }
                if (item.type === "INCOME" && item.month === report.month && item.year === report.year) {
                    incomeTotal += item.amount
                }
            })
        }

        setSelectedReportExpenses(expenseTotal)
        setSelectedReportIncome(incomeTotal)
    }

    // const getReportTransactions = async (report: any) => {
    //     const existingTransactions = await storage.get('transactions');
    //     let filteredTransactions: any = []
    //     if (existingTransactions) {
    //         existingTransactions.forEach((transaction: any) => {
    //             console.log(transaction);

    //             if (transaction.expense) {


    //                 const createdOnDate = new Date(transaction.expense.created_on);

    //                 if (
    //                     createdOnDate.getMonth() === report.month + 1 && // Months are 0-indexed
    //                     createdOnDate.getFullYear() === report.year
    //                 ) {
    //                     console.log(transaction.expense);

    //                     filteredTransactions.push(transaction.expense);
    //                 }

    //             }
    //             if (transaction.income) {
    //                 const createdOnDate = new Date(transaction.income.created_on);

    //                 if (
    //                     createdOnDate.getMonth() === report.month + 1 && // Months are 0-indexed
    //                     createdOnDate.getFullYear() === report.year
    //                 ) {
    //                     filteredTransactions.push(transaction.income);
    //                 }

    //             }
    //         })

    //     }


    //     setSelectedReportTransactions(filteredTransactions)

    // }

    const getReportTransactions = async (report: any) => {
        const existingTransactions = await storage.get('transactions');

        if (existingTransactions) {
            const filteredTransactions = existingTransactions.filter(
                (transaction: any) => {
                    const transactionDate = new Date(
                        transaction.income?.created_on || transaction.expense?.created_on
                    );
                    return (
                        transactionDate.getMonth() === report.month &&
                        transactionDate.getFullYear() === report.year
                    );
                }
            );
            setSelectedReportTransactions(filteredTransactions.reverse());
        } else {
            setSelectedReportTransactions([]);
        }
    };


    useEffect(() => {
        const getTransactions = async () => {
            const existingStatistics = await storage.get('statistics');
            if (existingStatistics) {
                try {

                    const uniqueMonthYearPairs: any = [];
                    const seenPairs = new Set();

                    existingStatistics.forEach((item: any) => {
                        const key = `${item.month}-${item.year}`;
                        if (!seenPairs.has(key)) {
                            uniqueMonthYearPairs.push({ month: item.month, year: item.year });
                            seenPairs.add(key);
                        }
                    });
                    setReports(uniqueMonthYearPairs);
                } catch (err) {
                    console.error("Error storing transactions:", err);
                }
            }
        };

        getTransactions()
    }, [])

    const categories = [
        { name: fastFoodOutline, categoryName: 'Food and Drinks', class: 'food', id: 1 },
        { name: carSportOutline, categoryName: 'Transport', class: 'transport', id: 2 },
        { name: giftOutline, categoryName: 'Gifts', class: 'gift', id: 3 },
        { name: cashOutline, categoryName: 'Bills and Subscriptions', class: 'bills', id: 4 },
        { name: apertureOutline, categoryName: 'Miscellaneous', class: 'miscellaneous', id: 5 },
        { name: videocamOutline, categoryName: 'Entertainment', class: 'entertainment', id: 6 },
        { name: bagHandleOutline, categoryName: 'Groceries', class: 'groceries', id: 7 },

    ]

    const handleOpenReportsModal = (report: any) => {

        setSelectedReport(report)
        getReportTotal(report)
        getReportTransactions(report)
        setReportsModalOpen(true)
    }

    const formatDate = (inputDate: Date) => {
        const today = moment();
        const date = moment(inputDate);

        if (date.isSame(today, 'day')) {
            return "Today, " + date.format("h:mm A");
        } else {
            return date.format("D MMM YYYY, h:mm A");
        }
    }

    const getCategory = (categoryId: string) => {
        const category = categories.filter((cat: any) => {
            return cat.id === categoryId
        })

        return category
    }
    return (
        <div className='reports-component'>
            <div className="header">
                <IonText>Reports</IonText>
                <span>View All</span>
            </div>
            <IonRow className='reports-cards'>
                {reports.map((report: any) => (
                    <IonCol size='12' onClick={() => {

                        handleOpenReportsModal(report)

                    }
                    } key={`${report.month} - ${report.year}`}>
                        <StatisticReportCard report={report} />
                    </IonCol>
                ))}

            </IonRow>

            <IonModal isOpen={isReportsModalOpen} ref={reportsModal} className="confirm-deposit">
                <IonHeader className='reports-header'>
                    <IonToolbar className='selected-category-header'>
                        <div className="tool-bar-title"><IonIcon icon={closeCircle} aria-hidden={true} onClick={() => { setReportsModalOpen(false) }} /><IonTitle>{moment(selectedReport.month + 1, 'M').format('MMMM')} {selectedReport.year}</IonTitle></div>

                        <div className="report-expenses-income"><span className="expenses"><IonIcon aria-hidden={true} icon={arrowUpOutline} />  Expenses: N$ {selectedReportExpenses}</span> <span>&#9679;</span> <span className="income"><IonIcon aria-hidden={true} icon={arrowDownOutline} /> Income: N$ {selectedReportIncome}</span></div>

                    </IonToolbar>
                </IonHeader>

                <IonContent className='all-transactions'>
                    {selectedReportTransactions.map((transaction: any) => (
                        <IonCol size='12'>
                            <div className="receipt-card" key={transaction.id}>
                                <div className="left-side">
                                    <IonIcon icon={bagHandle} aria-hidden="true" />
                                    <div><span>{transaction.type === "INCOME" ? transaction.income.name : transaction.type === "EXPENSE" ? transaction.expense.name : transaction.name}</span><span>{transaction.type === "INCOME" ? formatDate(transaction.income.created_on) : transaction.type === "EXPENSE" ? formatDate(transaction.expense.created_on) : <></>}</span></div>
                                </div>

                                <div className="right-side">
                                    <span>{transaction.type === "INCOME" ? <>+ N$ {transaction.income.amount}</> : transaction.type === "EXPENSE" ? <>- N$ {transaction.expense.amount}</> : null}</span>
                                    <span>{transaction.type === "INCOME" ? getCategory(transaction.income.category)[0].categoryName : transaction.type === "EXPENSE" ? getCategory(transaction.expense.category)[0].categoryName : <>Transfer</>}</span>
                                </div>
                            </div>
                        </IonCol>)
                    )}

                </IonContent>
            </IonModal>
        </div>
    );
};

export default StatisticReportCards