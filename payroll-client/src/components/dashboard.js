import React, {useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {CalendarCheck, InfoCircle, ThreeDots, CurrencyRupee, FiletypeXlsx, FiletypePdf} from 'react-bootstrap-icons';
import Pagination from 'react-bootstrap/Pagination';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
import AppModal from './modal';
import { modalTypeEnum } from '../constValue';
import PayrollContext from '../context/payrollContext';
import './css/dashboard.css';

const Dashboard = () => {
    const context = useContext(PayrollContext);
    const { setModalShow, setModalType, setModalData} = context;
    const salaryList = [
        {
        "_id": "65bcbcbc025ee6dfbe394212",
        "company": "659e4da6c62e0d0c9d717de6",
        "workingYear": "2023-24",
        "month": 12,
        "year": 2023,
        "salaryDetails": [
          {
            "employee": "HK2015-01",
            "employeeId": "65b4b4703295f68bef8b023a",
            "totalWorkingDays": 24,
            "totalOverTimePeriod": 9,
            "OverTimeSalary": 556.875,
            "totalAdvanceSalary": 2500,
            "totalOtherExpenseByCompany": 120,
            "totalTravelAllowance": 2640,
            "finalSalary": 8496.875,
            "advanceList": [
              {
                "date": "20-12-2023",
                "amount": 2000,
                "_id": "65b73dd1180d00264e5cb22a"
              },
              {
                "date": "25-12-2023",
                "amount": 500,
                "_id": "65b73dde180d00264e5cb230"
              }
            ],
            "absent": [
              "03-12-2023",
              "08-12-2023",
              "14-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394254"
          },
          {
            "employee": "HK2015-02",
            "employeeId": "65b4b49d3295f68bef8b023e",
            "totalWorkingDays": 25,
            "totalOverTimePeriod": 9,
            "OverTimeSalary": 379.6875,
            "totalAdvanceSalary": 1500,
            "totalOtherExpenseByCompany": 125,
            "totalTravelAllowance": 2500,
            "finalSalary": 6879.6875,
            "advanceList": [
              {
                "date": "18-12-2023",
                "amount": 1500,
                "_id": "65b73cdd180d00264e5cb208"
              }
            ],
            "absent": [
              "08-12-2023",
              "14-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394257"
          },
          {
            "employee": "HK2015-03",
            "employeeId": "65b4b4c03295f68bef8b0242",
            "totalWorkingDays": 21,
            "totalOverTimePeriod": 8.5,
            "OverTimeSalary": 334.6875,
            "totalAdvanceSalary": 1000,
            "totalOtherExpenseByCompany": 105,
            "totalTravelAllowance": 1575,
            "finalSalary": 5214.6875,
            "advanceList": [
              {
                "date": "20-12-2023",
                "amount": 1000,
                "_id": "65b73db8180d00264e5cb224"
              }
            ],
            "absent": [
              "08-12-2023",
              "09-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "15-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394259"
          },
          {
            "employee": "HK2015-04",
            "employeeId": "65b4b4e23295f68bef8b0246",
            "totalWorkingDays": 19,
            "totalOverTimePeriod": 2,
            "OverTimeSalary": 90,
            "totalAdvanceSalary": 4000,
            "totalOtherExpenseByCompany": 95,
            "totalTravelAllowance": 1900,
            "finalSalary": 2455,
            "advanceList": [
              {
                "date": "17-12-2023",
                "amount": 1000,
                "_id": "65b73c924c0f25301d9671f9"
              },
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73cb6180d00264e5cb1fc"
              },
              {
                "date": "27-12-2023",
                "amount": 1000,
                "_id": "65b73cc1180d00264e5cb202"
              }
            ],
            "absent": [
              "07-12-2023",
              "11-12-2023",
              "14-12-2023",
              "20-12-2023",
              "25-12-2023",
              "28-12-2023",
              "29-12-2023",
              "30-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe39425b"
          },
          {
            "employee": "HK2015-05",
            "employeeId": "65b4b5113295f68bef8b024a",
            "totalWorkingDays": 12,
            "totalAdvanceSalary": 1000,
            "totalOtherExpenseByCompany": 60,
            "totalTravelAllowance": 900,
            "finalSalary": 2240,
            "advanceList": [
              {
                "date": "21-12-2023",
                "amount": 1000,
                "_id": "65b73da3180d00264e5cb21e"
              }
            ],
            "absent": [
              "03-12-2023",
              "04-12-2023",
              "07-12-2023",
              "08-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "20-12-2023",
              "24-12-2023",
              "27-12-2023",
              "28-12-2023",
              "29-12-2023",
              "30-12-2023",
              "31-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe39425f"
          },
          {
            "employee": "HK2015-06",
            "employeeId": "65b4b5353295f68bef8b024e",
            "totalWorkingDays": 10,
            "totalAdvanceSalary": 2500,
            "totalOtherExpenseByCompany": 50,
            "totalTravelAllowance": 900,
            "finalSalary": 1350,
            "advanceList": [
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73dfa180d00264e5cb236"
              },
              {
                "date": "22-12-2023",
                "amount": 500,
                "_id": "65b73e03180d00264e5cb23c"
              }
            ],
            "absent": [
              "02-12-2023",
              "03-12-2023",
              "04-12-2023",
              "06-12-2023",
              "08-12-2023",
              "09-12-2023",
              "10-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "15-12-2023",
              "16-12-2023",
              "17-12-2023",
              "18-12-2023",
              "23-12-2023",
              "24-12-2023",
              "25-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394261"
          },
          {
            "employee": "HK2015-07",
            "employeeId": "65b4b5533295f68bef8b0252",
            "totalWorkingDays": 18,
            "totalAdvanceSalary": 3000,
            "totalOtherExpenseByCompany": 90,
            "totalTravelAllowance": 2160,
            "finalSalary": 5010,
            "advanceList": [
              {
                "date": "13-12-2023",
                "amount": 1000,
                "_id": "65b73d70180d00264e5cb212"
              },
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73d87180d00264e5cb218"
              }
            ],
            "absent": [
              "01-12-2023",
              "06-12-2023",
              "07-12-2023",
              "10-12-2023",
              "11-12-2023",
              "20-12-2023",
              "30-12-2023",
              "31-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394264"
          }
        ],
        "isDeleted": false,
        "createdOn": "2024-02-02T09:58:20.469Z",
        "updatedOn": "2024-02-02T09:58:20.469Z",
        "__v": 0
        }, 
        {
        "_id": "65bcbcbc025ee6dfbe394211",
        "company": "659e4da6c62e0d0c9d717de6",
        "workingYear": "2023-24",
        "month": 11,
        "year": 2023,
        "salaryDetails": [
          {
            "employee": "HK2015-01",
            "employeeId": "65b4b4703295f68bef8b023a",
            "totalWorkingDays": 24,
            "totalOverTimePeriod": 9,
            "OverTimeSalary": 556.875,
            "totalAdvanceSalary": 2500,
            "totalOtherExpenseByCompany": 120,
            "totalTravelAllowance": 2640,
            "finalSalary": 9653.23,
            "advanceList": [
              {
                "date": "20-12-2023",
                "amount": 2000,
                "_id": "65b73dd1180d00264e5cb22a"
              },
              {
                "date": "25-12-2023",
                "amount": 500,
                "_id": "65b73dde180d00264e5cb230"
              }
            ],
            "absent": [
              "03-12-2023",
              "08-12-2023",
              "14-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394254"
          },
          {
            "employee": "HK2015-02",
            "employeeId": "65b4b49d3295f68bef8b023e",
            "totalWorkingDays": 25,
            "totalOverTimePeriod": 9,
            "OverTimeSalary": 379.6875,
            "totalAdvanceSalary": 1500,
            "totalOtherExpenseByCompany": 125,
            "totalTravelAllowance": 2500,
            "finalSalary": 2653.2986,
            "advanceList": [
              {
                "date": "18-12-2023",
                "amount": 1500,
                "_id": "65b73cdd180d00264e5cb208"
              }
            ],
            "absent": [
              "08-12-2023",
              "14-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394257"
          },
          {
            "employee": "HK2015-03",
            "employeeId": "65b4b4c03295f68bef8b0242",
            "totalWorkingDays": 21,
            "totalOverTimePeriod": 8.5,
            "OverTimeSalary": 334.6875,
            "totalAdvanceSalary": 1000,
            "totalOtherExpenseByCompany": 105,
            "totalTravelAllowance": 1575,
            "finalSalary": 8593.56,
            "advanceList": [
              {
                "date": "20-12-2023",
                "amount": 1000,
                "_id": "65b73db8180d00264e5cb224"
              }
            ],
            "absent": [
              "08-12-2023",
              "09-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "15-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394259"
          },
          {
            "employee": "HK2015-04",
            "employeeId": "65b4b4e23295f68bef8b0246",
            "totalWorkingDays": 19,
            "totalOverTimePeriod": 2,
            "OverTimeSalary": 90,
            "totalAdvanceSalary": 4000,
            "totalOtherExpenseByCompany": 95,
            "totalTravelAllowance": 1900,
            "finalSalary": 2563,
            "advanceList": [
              {
                "date": "17-12-2023",
                "amount": 1000,
                "_id": "65b73c924c0f25301d9671f9"
              },
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73cb6180d00264e5cb1fc"
              },
              {
                "date": "27-12-2023",
                "amount": 1000,
                "_id": "65b73cc1180d00264e5cb202"
              }
            ],
            "absent": [
              "07-12-2023",
              "11-12-2023",
              "14-12-2023",
              "20-12-2023",
              "25-12-2023",
              "28-12-2023",
              "29-12-2023",
              "30-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe39425b"
          },
          {
            "employee": "HK2015-05",
            "employeeId": "65b4b5113295f68bef8b024a",
            "totalWorkingDays": 12,
            "totalAdvanceSalary": 1000,
            "totalOtherExpenseByCompany": 60,
            "totalTravelAllowance": 900,
            "finalSalary": 2635,
            "advanceList": [
              {
                "date": "21-12-2023",
                "amount": 1000,
                "_id": "65b73da3180d00264e5cb21e"
              }
            ],
            "absent": [
              "03-12-2023",
              "04-12-2023",
              "07-12-2023",
              "08-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "20-12-2023",
              "24-12-2023",
              "27-12-2023",
              "28-12-2023",
              "29-12-2023",
              "30-12-2023",
              "31-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe39425f"
          },
          {
            "employee": "HK2015-06",
            "employeeId": "65b4b5353295f68bef8b024e",
            "totalWorkingDays": 10,
            "totalAdvanceSalary": 2500,
            "totalOtherExpenseByCompany": 50,
            "totalTravelAllowance": 900,
            "finalSalary": 8962,
            "advanceList": [
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73dfa180d00264e5cb236"
              },
              {
                "date": "22-12-2023",
                "amount": 500,
                "_id": "65b73e03180d00264e5cb23c"
              }
            ],
            "absent": [
              "02-12-2023",
              "03-12-2023",
              "04-12-2023",
              "06-12-2023",
              "08-12-2023",
              "09-12-2023",
              "10-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "15-12-2023",
              "16-12-2023",
              "17-12-2023",
              "18-12-2023",
              "23-12-2023",
              "24-12-2023",
              "25-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394261"
          },
          {
            "employee": "HK2015-07",
            "employeeId": "65b4b5533295f68bef8b0252",
            "totalWorkingDays": 18,
            "totalAdvanceSalary": 3000,
            "totalOtherExpenseByCompany": 90,
            "totalTravelAllowance": 2160,
            "finalSalary": 5698,
            "advanceList": [
              {
                "date": "13-12-2023",
                "amount": 1000,
                "_id": "65b73d70180d00264e5cb212"
              },
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73d87180d00264e5cb218"
              }
            ],
            "absent": [
              "01-12-2023",
              "06-12-2023",
              "07-12-2023",
              "10-12-2023",
              "11-12-2023",
              "20-12-2023",
              "30-12-2023",
              "31-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394264"
          }
        ],
        "isDeleted": false,
        "createdOn": "2024-02-02T09:58:20.469Z",
        "updatedOn": "2024-02-02T09:58:20.469Z",
        "__v": 0
        }, 
        {
        "_id": "65bcbcbc025ee6dfbe394210",
        "company": "659e4da6c62e0d0c9d717de6",
        "workingYear": "2023-24",
        "month": 10,
        "year": 2023,
        "salaryDetails": [
          {
            "employee": "HK2015-01",
            "employeeId": "65b4b4703295f68bef8b023a",
            "totalWorkingDays": 24,
            "totalOverTimePeriod": 9,
            "OverTimeSalary": 556.875,
            "totalAdvanceSalary": 2500,
            "totalOtherExpenseByCompany": 120,
            "totalTravelAllowance": 2640,
            "finalSalary": 4635.96,
            "advanceList": [
              {
                "date": "20-12-2023",
                "amount": 2000,
                "_id": "65b73dd1180d00264e5cb22a"
              },
              {
                "date": "25-12-2023",
                "amount": 500,
                "_id": "65b73dde180d00264e5cb230"
              }
            ],
            "absent": [
              "03-12-2023",
              "08-12-2023",
              "14-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394254"
          },
          {
            "employee": "HK2015-02",
            "employeeId": "65b4b49d3295f68bef8b023e",
            "totalWorkingDays": 25,
            "totalOverTimePeriod": 9,
            "OverTimeSalary": 379.6875,
            "totalAdvanceSalary": 1500,
            "totalOtherExpenseByCompany": 125,
            "totalTravelAllowance": 2500,
            "finalSalary": 7896.53,
            "advanceList": [
              {
                "date": "18-12-2023",
                "amount": 1500,
                "_id": "65b73cdd180d00264e5cb208"
              }
            ],
            "absent": [
              "08-12-2023",
              "14-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394257"
          },
          {
            "employee": "HK2015-03",
            "employeeId": "65b4b4c03295f68bef8b0242",
            "totalWorkingDays": 21,
            "totalOverTimePeriod": 8.5,
            "OverTimeSalary": 334.6875,
            "totalAdvanceSalary": 1000,
            "totalOtherExpenseByCompany": 105,
            "totalTravelAllowance": 1575,
            "finalSalary": 3658.36,
            "advanceList": [
              {
                "date": "20-12-2023",
                "amount": 1000,
                "_id": "65b73db8180d00264e5cb224"
              }
            ],
            "absent": [
              "08-12-2023",
              "09-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "15-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394259"
          },
          {
            "employee": "HK2015-04",
            "employeeId": "65b4b4e23295f68bef8b0246",
            "totalWorkingDays": 19,
            "totalOverTimePeriod": 2,
            "OverTimeSalary": 90,
            "totalAdvanceSalary": 4000,
            "totalOtherExpenseByCompany": 95,
            "totalTravelAllowance": 1900,
            "finalSalary": 2563.03,
            "advanceList": [
              {
                "date": "17-12-2023",
                "amount": 1000,
                "_id": "65b73c924c0f25301d9671f9"
              },
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73cb6180d00264e5cb1fc"
              },
              {
                "date": "27-12-2023",
                "amount": 1000,
                "_id": "65b73cc1180d00264e5cb202"
              }
            ],
            "absent": [
              "07-12-2023",
              "11-12-2023",
              "14-12-2023",
              "20-12-2023",
              "25-12-2023",
              "28-12-2023",
              "29-12-2023",
              "30-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe39425b"
          },
          {
            "employee": "HK2015-05",
            "employeeId": "65b4b5113295f68bef8b024a",
            "totalWorkingDays": 12,
            "totalAdvanceSalary": 1000,
            "totalOtherExpenseByCompany": 60,
            "totalTravelAllowance": 900,
            "finalSalary": 2365.9,
            "advanceList": [
              {
                "date": "21-12-2023",
                "amount": 1000,
                "_id": "65b73da3180d00264e5cb21e"
              }
            ],
            "absent": [
              "03-12-2023",
              "04-12-2023",
              "07-12-2023",
              "08-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "20-12-2023",
              "24-12-2023",
              "27-12-2023",
              "28-12-2023",
              "29-12-2023",
              "30-12-2023",
              "31-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe39425f"
          },
          {
            "employee": "HK2015-06",
            "employeeId": "65b4b5353295f68bef8b024e",
            "totalWorkingDays": 10,
            "totalAdvanceSalary": 2500,
            "totalOtherExpenseByCompany": 50,
            "totalTravelAllowance": 900,
            "finalSalary": 2365.026,
            "advanceList": [
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73dfa180d00264e5cb236"
              },
              {
                "date": "22-12-2023",
                "amount": 500,
                "_id": "65b73e03180d00264e5cb23c"
              }
            ],
            "absent": [
              "02-12-2023",
              "03-12-2023",
              "04-12-2023",
              "06-12-2023",
              "08-12-2023",
              "09-12-2023",
              "10-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "15-12-2023",
              "16-12-2023",
              "17-12-2023",
              "18-12-2023",
              "23-12-2023",
              "24-12-2023",
              "25-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394261"
          },
          {
            "employee": "HK2015-07",
            "employeeId": "65b4b5533295f68bef8b0252",
            "totalWorkingDays": 18,
            "totalAdvanceSalary": 3000,
            "totalOtherExpenseByCompany": 90,
            "totalTravelAllowance": 2160,
            "finalSalary": 5236.98,
            "advanceList": [
              {
                "date": "13-12-2023",
                "amount": 1000,
                "_id": "65b73d70180d00264e5cb212"
              },
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73d87180d00264e5cb218"
              }
            ],
            "absent": [
              "01-12-2023",
              "06-12-2023",
              "07-12-2023",
              "10-12-2023",
              "11-12-2023",
              "20-12-2023",
              "30-12-2023",
              "31-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394264"
          }
        ],
        "isDeleted": false,
        "createdOn": "2024-02-02T09:58:20.469Z",
        "updatedOn": "2024-02-02T09:58:20.469Z",
        "__v": 0
        }, 
        {
        "_id": "65bcbcbc025ee6dfbe394209",
        "company": "659e4da6c62e0d0c9d717de6",
        "workingYear": "2023-24",
        "month": 9,
        "year": 2023,
        "salaryDetails": [
          {
            "employee": "HK2015-01",
            "employeeId": "65b4b4703295f68bef8b023a",
            "totalWorkingDays": 24,
            "totalOverTimePeriod": 9,
            "OverTimeSalary": 556.875,
            "totalAdvanceSalary": 2500,
            "totalOtherExpenseByCompany": 120,
            "totalTravelAllowance": 2640,
            "finalSalary": 5687.6,
            "advanceList": [
              {
                "date": "20-12-2023",
                "amount": 2000,
                "_id": "65b73dd1180d00264e5cb22a"
              },
              {
                "date": "25-12-2023",
                "amount": 500,
                "_id": "65b73dde180d00264e5cb230"
              }
            ],
            "absent": [
              "03-12-2023",
              "08-12-2023",
              "14-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394254"
          },
          {
            "employee": "HK2015-02",
            "employeeId": "65b4b49d3295f68bef8b023e",
            "totalWorkingDays": 25,
            "totalOverTimePeriod": 9,
            "OverTimeSalary": 379.6875,
            "totalAdvanceSalary": 1500,
            "totalOtherExpenseByCompany": 125,
            "totalTravelAllowance": 2500,
            "finalSalary": 9678.356,
            "advanceList": [
              {
                "date": "18-12-2023",
                "amount": 1500,
                "_id": "65b73cdd180d00264e5cb208"
              }
            ],
            "absent": [
              "08-12-2023",
              "14-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394257"
          },
          {
            "employee": "HK2015-03",
            "employeeId": "65b4b4c03295f68bef8b0242",
            "totalWorkingDays": 21,
            "totalOverTimePeriod": 8.5,
            "OverTimeSalary": 334.6875,
            "totalAdvanceSalary": 1000,
            "totalOtherExpenseByCompany": 105,
            "totalTravelAllowance": 1575,
            "finalSalary": 7956.3,
            "advanceList": [
              {
                "date": "20-12-2023",
                "amount": 1000,
                "_id": "65b73db8180d00264e5cb224"
              }
            ],
            "absent": [
              "08-12-2023",
              "09-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "15-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394259"
          },
          {
            "employee": "HK2015-04",
            "employeeId": "65b4b4e23295f68bef8b0246",
            "totalWorkingDays": 19,
            "totalOverTimePeriod": 2,
            "OverTimeSalary": 90,
            "totalAdvanceSalary": 4000,
            "totalOtherExpenseByCompany": 95,
            "totalTravelAllowance": 1900,
            "finalSalary": 2658,
            "advanceList": [
              {
                "date": "17-12-2023",
                "amount": 1000,
                "_id": "65b73c924c0f25301d9671f9"
              },
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73cb6180d00264e5cb1fc"
              },
              {
                "date": "27-12-2023",
                "amount": 1000,
                "_id": "65b73cc1180d00264e5cb202"
              }
            ],
            "absent": [
              "07-12-2023",
              "11-12-2023",
              "14-12-2023",
              "20-12-2023",
              "25-12-2023",
              "28-12-2023",
              "29-12-2023",
              "30-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe39425b"
          },
          {
            "employee": "HK2015-05",
            "employeeId": "65b4b5113295f68bef8b024a",
            "totalWorkingDays": 12,
            "totalAdvanceSalary": 1000,
            "totalOtherExpenseByCompany": 60,
            "totalTravelAllowance": 900,
            "finalSalary": 3659.56,
            "advanceList": [
              {
                "date": "21-12-2023",
                "amount": 1000,
                "_id": "65b73da3180d00264e5cb21e"
              }
            ],
            "absent": [
              "03-12-2023",
              "04-12-2023",
              "07-12-2023",
              "08-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "20-12-2023",
              "24-12-2023",
              "27-12-2023",
              "28-12-2023",
              "29-12-2023",
              "30-12-2023",
              "31-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe39425f"
          },
          {
            "employee": "HK2015-06",
            "employeeId": "65b4b5353295f68bef8b024e",
            "totalWorkingDays": 10,
            "totalAdvanceSalary": 2500,
            "totalOtherExpenseByCompany": 50,
            "totalTravelAllowance": 900,
            "finalSalary": 1598.3,
            "advanceList": [
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73dfa180d00264e5cb236"
              },
              {
                "date": "22-12-2023",
                "amount": 500,
                "_id": "65b73e03180d00264e5cb23c"
              }
            ],
            "absent": [
              "02-12-2023",
              "03-12-2023",
              "04-12-2023",
              "06-12-2023",
              "08-12-2023",
              "09-12-2023",
              "10-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "15-12-2023",
              "16-12-2023",
              "17-12-2023",
              "18-12-2023",
              "23-12-2023",
              "24-12-2023",
              "25-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394261"
          },
          {
            "employee": "HK2015-07",
            "employeeId": "65b4b5533295f68bef8b0252",
            "totalWorkingDays": 18,
            "totalAdvanceSalary": 3000,
            "totalOtherExpenseByCompany": 90,
            "totalTravelAllowance": 2160,
            "finalSalary": 2365.96,
            "advanceList": [
              {
                "date": "13-12-2023",
                "amount": 1000,
                "_id": "65b73d70180d00264e5cb212"
              },
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73d87180d00264e5cb218"
              }
            ],
            "absent": [
              "01-12-2023",
              "06-12-2023",
              "07-12-2023",
              "10-12-2023",
              "11-12-2023",
              "20-12-2023",
              "30-12-2023",
              "31-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394264"
          }
        ],
        "isDeleted": false,
        "createdOn": "2024-02-02T09:58:20.469Z",
        "updatedOn": "2024-02-02T09:58:20.469Z",
        "__v": 0
        }, 
        {
        "_id": "65bcbcbc025ee6dfbe394208",
        "company": "659e4da6c62e0d0c9d717de6",
        "workingYear": "2023-24",
        "month": 8,
        "year": 2023,
        "salaryDetails": [
          {
            "employee": "HK2015-01",
            "employeeId": "65b4b4703295f68bef8b023a",
            "totalWorkingDays": 24,
            "totalOverTimePeriod": 9,
            "OverTimeSalary": 556.875,
            "totalAdvanceSalary": 2500,
            "totalOtherExpenseByCompany": 120,
            "totalTravelAllowance": 2640,
            "finalSalary": 9875,
            "advanceList": [
              {
                "date": "20-12-2023",
                "amount": 2000,
                "_id": "65b73dd1180d00264e5cb22a"
              },
              {
                "date": "25-12-2023",
                "amount": 500,
                "_id": "65b73dde180d00264e5cb230"
              }
            ],
            "absent": [
              "03-12-2023",
              "08-12-2023",
              "14-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394254"
          },
          {
            "employee": "HK2015-02",
            "employeeId": "65b4b49d3295f68bef8b023e",
            "totalWorkingDays": 25,
            "totalOverTimePeriod": 9,
            "OverTimeSalary": 379.6875,
            "totalAdvanceSalary": 1500,
            "totalOtherExpenseByCompany": 125,
            "totalTravelAllowance": 2500,
            "finalSalary": 8975,
            "advanceList": [
              {
                "date": "18-12-2023",
                "amount": 1500,
                "_id": "65b73cdd180d00264e5cb208"
              }
            ],
            "absent": [
              "08-12-2023",
              "14-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394257"
          },
          {
            "employee": "HK2015-03",
            "employeeId": "65b4b4c03295f68bef8b0242",
            "totalWorkingDays": 21,
            "totalOverTimePeriod": 8.5,
            "OverTimeSalary": 334.6875,
            "totalAdvanceSalary": 1000,
            "totalOtherExpenseByCompany": 105,
            "totalTravelAllowance": 1575,
            "finalSalary": 2685,
            "advanceList": [
              {
                "date": "20-12-2023",
                "amount": 1000,
                "_id": "65b73db8180d00264e5cb224"
              }
            ],
            "absent": [
              "08-12-2023",
              "09-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "15-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394259"
          },
          {
            "employee": "HK2015-04",
            "employeeId": "65b4b4e23295f68bef8b0246",
            "totalWorkingDays": 19,
            "totalOverTimePeriod": 2,
            "OverTimeSalary": 90,
            "totalAdvanceSalary": 4000,
            "totalOtherExpenseByCompany": 95,
            "totalTravelAllowance": 1900,
            "finalSalary": 3657.36,
            "advanceList": [
              {
                "date": "17-12-2023",
                "amount": 1000,
                "_id": "65b73c924c0f25301d9671f9"
              },
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73cb6180d00264e5cb1fc"
              },
              {
                "date": "27-12-2023",
                "amount": 1000,
                "_id": "65b73cc1180d00264e5cb202"
              }
            ],
            "absent": [
              "07-12-2023",
              "11-12-2023",
              "14-12-2023",
              "20-12-2023",
              "25-12-2023",
              "28-12-2023",
              "29-12-2023",
              "30-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe39425b"
          },
          {
            "employee": "HK2015-05",
            "employeeId": "65b4b5113295f68bef8b024a",
            "totalWorkingDays": 12,
            "totalAdvanceSalary": 1000,
            "totalOtherExpenseByCompany": 60,
            "totalTravelAllowance": 900,
            "finalSalary": 5976.3,
            "advanceList": [
              {
                "date": "21-12-2023",
                "amount": 1000,
                "_id": "65b73da3180d00264e5cb21e"
              }
            ],
            "absent": [
              "03-12-2023",
              "04-12-2023",
              "07-12-2023",
              "08-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "20-12-2023",
              "24-12-2023",
              "27-12-2023",
              "28-12-2023",
              "29-12-2023",
              "30-12-2023",
              "31-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe39425f"
          },
          {
            "employee": "HK2015-06",
            "employeeId": "65b4b5353295f68bef8b024e",
            "totalWorkingDays": 10,
            "totalAdvanceSalary": 2500,
            "totalOtherExpenseByCompany": 50,
            "totalTravelAllowance": 900,
            "finalSalary": 2659.36,
            "advanceList": [
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73dfa180d00264e5cb236"
              },
              {
                "date": "22-12-2023",
                "amount": 500,
                "_id": "65b73e03180d00264e5cb23c"
              }
            ],
            "absent": [
              "02-12-2023",
              "03-12-2023",
              "04-12-2023",
              "06-12-2023",
              "08-12-2023",
              "09-12-2023",
              "10-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "15-12-2023",
              "16-12-2023",
              "17-12-2023",
              "18-12-2023",
              "23-12-2023",
              "24-12-2023",
              "25-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394261"
          },
          {
            "employee": "HK2015-07",
            "employeeId": "65b4b5533295f68bef8b0252",
            "totalWorkingDays": 18,
            "totalAdvanceSalary": 3000,
            "totalOtherExpenseByCompany": 90,
            "totalTravelAllowance": 2160,
            "finalSalary": 6329.3,
            "advanceList": [
              {
                "date": "13-12-2023",
                "amount": 1000,
                "_id": "65b73d70180d00264e5cb212"
              },
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73d87180d00264e5cb218"
              }
            ],
            "absent": [
              "01-12-2023",
              "06-12-2023",
              "07-12-2023",
              "10-12-2023",
              "11-12-2023",
              "20-12-2023",
              "30-12-2023",
              "31-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394264"
          }
        ],
        "isDeleted": false,
        "createdOn": "2024-02-02T09:58:20.469Z",
        "updatedOn": "2024-02-02T09:58:20.469Z",
        "__v": 0
        }, 
        {
        "_id": "65bcbcbc025ee6dfbe394207",
        "company": "659e4da6c62e0d0c9d717de6",
        "workingYear": "2023-24",
        "month": 7,
        "year": 2023,
        "salaryDetails": [
          {
            "employee": "HK2015-01",
            "employeeId": "65b4b4703295f68bef8b023a",
            "totalWorkingDays": 24,
            "totalOverTimePeriod": 9,
            "OverTimeSalary": 556.875,
            "totalAdvanceSalary": 2500,
            "totalOtherExpenseByCompany": 120,
            "totalTravelAllowance": 2640,
            "finalSalary": 6980.355,
            "advanceList": [
              {
                "date": "20-12-2023",
                "amount": 2000,
                "_id": "65b73dd1180d00264e5cb22a"
              },
              {
                "date": "25-12-2023",
                "amount": 500,
                "_id": "65b73dde180d00264e5cb230"
              }
            ],
            "absent": [
              "03-12-2023",
              "08-12-2023",
              "14-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394254"
          },
          {
            "employee": "HK2015-02",
            "employeeId": "65b4b49d3295f68bef8b023e",
            "totalWorkingDays": 25,
            "totalOverTimePeriod": 9,
            "OverTimeSalary": 379.6875,
            "totalAdvanceSalary": 1500,
            "totalOtherExpenseByCompany": 125,
            "totalTravelAllowance": 2500,
            "finalSalary": 6593.5,
            "advanceList": [
              {
                "date": "18-12-2023",
                "amount": 1500,
                "_id": "65b73cdd180d00264e5cb208"
              }
            ],
            "absent": [
              "08-12-2023",
              "14-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394257"
          },
          {
            "employee": "HK2015-03",
            "employeeId": "65b4b4c03295f68bef8b0242",
            "totalWorkingDays": 21,
            "totalOverTimePeriod": 8.5,
            "OverTimeSalary": 334.6875,
            "totalAdvanceSalary": 1000,
            "totalOtherExpenseByCompany": 105,
            "totalTravelAllowance": 1575,
            "finalSalary": 2357.36,
            "advanceList": [
              {
                "date": "20-12-2023",
                "amount": 1000,
                "_id": "65b73db8180d00264e5cb224"
              }
            ],
            "absent": [
              "08-12-2023",
              "09-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "15-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394259"
          },
          {
            "employee": "HK2015-04",
            "employeeId": "65b4b4e23295f68bef8b0246",
            "totalWorkingDays": 19,
            "totalOverTimePeriod": 2,
            "OverTimeSalary": 90,
            "totalAdvanceSalary": 4000,
            "totalOtherExpenseByCompany": 95,
            "totalTravelAllowance": 1900,
            "finalSalary": 2659.03,
            "advanceList": [
              {
                "date": "17-12-2023",
                "amount": 1000,
                "_id": "65b73c924c0f25301d9671f9"
              },
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73cb6180d00264e5cb1fc"
              },
              {
                "date": "27-12-2023",
                "amount": 1000,
                "_id": "65b73cc1180d00264e5cb202"
              }
            ],
            "absent": [
              "07-12-2023",
              "11-12-2023",
              "14-12-2023",
              "20-12-2023",
              "25-12-2023",
              "28-12-2023",
              "29-12-2023",
              "30-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe39425b"
          },
          {
            "employee": "HK2015-05",
            "employeeId": "65b4b5113295f68bef8b024a",
            "totalWorkingDays": 12,
            "totalAdvanceSalary": 1000,
            "totalOtherExpenseByCompany": 60,
            "totalTravelAllowance": 900,
            "finalSalary": 7896.320,
            "advanceList": [
              {
                "date": "21-12-2023",
                "amount": 1000,
                "_id": "65b73da3180d00264e5cb21e"
              }
            ],
            "absent": [
              "03-12-2023",
              "04-12-2023",
              "07-12-2023",
              "08-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "20-12-2023",
              "24-12-2023",
              "27-12-2023",
              "28-12-2023",
              "29-12-2023",
              "30-12-2023",
              "31-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe39425f"
          },
          {
            "employee": "HK2015-06",
            "employeeId": "65b4b5353295f68bef8b024e",
            "totalWorkingDays": 10,
            "totalAdvanceSalary": 2500,
            "totalOtherExpenseByCompany": 50,
            "totalTravelAllowance": 900,
            "finalSalary": 3265.6,
            "advanceList": [
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73dfa180d00264e5cb236"
              },
              {
                "date": "22-12-2023",
                "amount": 500,
                "_id": "65b73e03180d00264e5cb23c"
              }
            ],
            "absent": [
              "02-12-2023",
              "03-12-2023",
              "04-12-2023",
              "06-12-2023",
              "08-12-2023",
              "09-12-2023",
              "10-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "15-12-2023",
              "16-12-2023",
              "17-12-2023",
              "18-12-2023",
              "23-12-2023",
              "24-12-2023",
              "25-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394261"
          },
          {
            "employee": "HK2015-07",
            "employeeId": "65b4b5533295f68bef8b0252",
            "totalWorkingDays": 18,
            "totalAdvanceSalary": 3000,
            "totalOtherExpenseByCompany": 90,
            "totalTravelAllowance": 2160,
            "finalSalary": 2035.36,
            "advanceList": [
              {
                "date": "13-12-2023",
                "amount": 1000,
                "_id": "65b73d70180d00264e5cb212"
              },
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73d87180d00264e5cb218"
              }
            ],
            "absent": [
              "01-12-2023",
              "06-12-2023",
              "07-12-2023",
              "10-12-2023",
              "11-12-2023",
              "20-12-2023",
              "30-12-2023",
              "31-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394264"
          }
        ],
        "isDeleted": false,
        "createdOn": "2024-02-02T09:58:20.469Z",
        "updatedOn": "2024-02-02T09:58:20.469Z",
        "__v": 0
        }, 
        {
        "_id": "65bcbcbc025ee6dfbe394206",
        "company": "659e4da6c62e0d0c9d717de6",
        "workingYear": "2023-24",
        "month": 6,
        "year": 2023,
        "salaryDetails": [
          {
            "employee": "HK2015-01",
            "employeeId": "65b4b4703295f68bef8b023a",
            "totalWorkingDays": 24,
            "totalOverTimePeriod": 9,
            "OverTimeSalary": 556.875,
            "totalAdvanceSalary": 2500,
            "totalOtherExpenseByCompany": 120,
            "totalTravelAllowance": 2640,
            "finalSalary": 2367.25,
            "advanceList": [
              {
                "date": "20-12-2023",
                "amount": 2000,
                "_id": "65b73dd1180d00264e5cb22a"
              },
              {
                "date": "25-12-2023",
                "amount": 500,
                "_id": "65b73dde180d00264e5cb230"
              }
            ],
            "absent": [
              "03-12-2023",
              "08-12-2023",
              "14-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394254"
          },
          {
            "employee": "HK2015-02",
            "employeeId": "65b4b49d3295f68bef8b023e",
            "totalWorkingDays": 25,
            "totalOverTimePeriod": 9,
            "OverTimeSalary": 379.6875,
            "totalAdvanceSalary": 1500,
            "totalOtherExpenseByCompany": 125,
            "totalTravelAllowance": 2500,
            "finalSalary": 8956.35,
            "advanceList": [
              {
                "date": "18-12-2023",
                "amount": 1500,
                "_id": "65b73cdd180d00264e5cb208"
              }
            ],
            "absent": [
              "08-12-2023",
              "14-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394257"
          },
          {
            "employee": "HK2015-03",
            "employeeId": "65b4b4c03295f68bef8b0242",
            "totalWorkingDays": 21,
            "totalOverTimePeriod": 8.5,
            "OverTimeSalary": 334.6875,
            "totalAdvanceSalary": 1000,
            "totalOtherExpenseByCompany": 105,
            "totalTravelAllowance": 1575,
            "finalSalary": 2653.90,
            "advanceList": [
              {
                "date": "20-12-2023",
                "amount": 1000,
                "_id": "65b73db8180d00264e5cb224"
              }
            ],
            "absent": [
              "08-12-2023",
              "09-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "15-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394259"
          },
          {
            "employee": "HK2015-04",
            "employeeId": "65b4b4e23295f68bef8b0246",
            "totalWorkingDays": 19,
            "totalOverTimePeriod": 2,
            "OverTimeSalary": 90,
            "totalAdvanceSalary": 4000,
            "totalOtherExpenseByCompany": 95,
            "totalTravelAllowance": 1900,
            "finalSalary": 8563.023,
            "advanceList": [
              {
                "date": "17-12-2023",
                "amount": 1000,
                "_id": "65b73c924c0f25301d9671f9"
              },
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73cb6180d00264e5cb1fc"
              },
              {
                "date": "27-12-2023",
                "amount": 1000,
                "_id": "65b73cc1180d00264e5cb202"
              }
            ],
            "absent": [
              "07-12-2023",
              "11-12-2023",
              "14-12-2023",
              "20-12-2023",
              "25-12-2023",
              "28-12-2023",
              "29-12-2023",
              "30-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe39425b"
          },
          {
            "employee": "HK2015-05",
            "employeeId": "65b4b5113295f68bef8b024a",
            "totalWorkingDays": 12,
            "totalAdvanceSalary": 1000,
            "totalOtherExpenseByCompany": 60,
            "totalTravelAllowance": 900,
            "finalSalary": 2689.30,
            "advanceList": [
              {
                "date": "21-12-2023",
                "amount": 1000,
                "_id": "65b73da3180d00264e5cb21e"
              }
            ],
            "absent": [
              "03-12-2023",
              "04-12-2023",
              "07-12-2023",
              "08-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "20-12-2023",
              "24-12-2023",
              "27-12-2023",
              "28-12-2023",
              "29-12-2023",
              "30-12-2023",
              "31-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe39425f"
          },
          {
            "employee": "HK2015-06",
            "employeeId": "65b4b5353295f68bef8b024e",
            "totalWorkingDays": 10,
            "totalAdvanceSalary": 2500,
            "totalOtherExpenseByCompany": 50,
            "totalTravelAllowance": 900,
            "finalSalary": 2356.03,
            "advanceList": [
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73dfa180d00264e5cb236"
              },
              {
                "date": "22-12-2023",
                "amount": 500,
                "_id": "65b73e03180d00264e5cb23c"
              }
            ],
            "absent": [
              "02-12-2023",
              "03-12-2023",
              "04-12-2023",
              "06-12-2023",
              "08-12-2023",
              "09-12-2023",
              "10-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "15-12-2023",
              "16-12-2023",
              "17-12-2023",
              "18-12-2023",
              "23-12-2023",
              "24-12-2023",
              "25-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394261"
          },
          {
            "employee": "HK2015-07",
            "employeeId": "65b4b5533295f68bef8b0252",
            "totalWorkingDays": 18,
            "totalAdvanceSalary": 3000,
            "totalOtherExpenseByCompany": 90,
            "totalTravelAllowance": 2160,
            "finalSalary": 2030.26,
            "advanceList": [
              {
                "date": "13-12-2023",
                "amount": 1000,
                "_id": "65b73d70180d00264e5cb212"
              },
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73d87180d00264e5cb218"
              }
            ],
            "absent": [
              "01-12-2023",
              "06-12-2023",
              "07-12-2023",
              "10-12-2023",
              "11-12-2023",
              "20-12-2023",
              "30-12-2023",
              "31-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394264"
          }
        ],
        "isDeleted": false,
        "createdOn": "2024-02-02T09:58:20.469Z",
        "updatedOn": "2024-02-02T09:58:20.469Z",
        "__v": 0
        }, 
        {
        "_id": "65bcbcbc025ee6dfbe394205",
        "company": "659e4da6c62e0d0c9d717de6",
        "workingYear": "2023-24",
        "month": 5,
        "year": 2023,
        "salaryDetails": [
          {
            "employee": "HK2015-01",
            "employeeId": "65b4b4703295f68bef8b023a",
            "totalWorkingDays": 24,
            "totalOverTimePeriod": 9,
            "OverTimeSalary": 556.875,
            "totalAdvanceSalary": 2500,
            "totalOtherExpenseByCompany": 120,
            "totalTravelAllowance": 2640,
            "finalSalary": 2358.365,
            "advanceList": [
              {
                "date": "20-12-2023",
                "amount": 2000,
                "_id": "65b73dd1180d00264e5cb22a"
              },
              {
                "date": "25-12-2023",
                "amount": 500,
                "_id": "65b73dde180d00264e5cb230"
              }
            ],
            "absent": [
              "03-12-2023",
              "08-12-2023",
              "14-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394254"
          },
          {
            "employee": "HK2015-02",
            "employeeId": "65b4b49d3295f68bef8b023e",
            "totalWorkingDays": 25,
            "totalOverTimePeriod": 9,
            "OverTimeSalary": 379.6875,
            "totalAdvanceSalary": 1500,
            "totalOtherExpenseByCompany": 125,
            "totalTravelAllowance": 2500,
            "finalSalary": 5236.971,
            "advanceList": [
              {
                "date": "18-12-2023",
                "amount": 1500,
                "_id": "65b73cdd180d00264e5cb208"
              }
            ],
            "absent": [
              "08-12-2023",
              "14-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394257"
          },
          {
            "employee": "HK2015-03",
            "employeeId": "65b4b4c03295f68bef8b0242",
            "totalWorkingDays": 21,
            "totalOverTimePeriod": 8.5,
            "OverTimeSalary": 334.6875,
            "totalAdvanceSalary": 1000,
            "totalOtherExpenseByCompany": 105,
            "totalTravelAllowance": 1575,
            "finalSalary": 5787.05,
            "advanceList": [
              {
                "date": "20-12-2023",
                "amount": 1000,
                "_id": "65b73db8180d00264e5cb224"
              }
            ],
            "absent": [
              "08-12-2023",
              "09-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "15-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394259"
          },
          {
            "employee": "HK2015-04",
            "employeeId": "65b4b4e23295f68bef8b0246",
            "totalWorkingDays": 19,
            "totalOverTimePeriod": 2,
            "OverTimeSalary": 90,
            "totalAdvanceSalary": 4000,
            "totalOtherExpenseByCompany": 95,
            "totalTravelAllowance": 1900,
            "finalSalary": 6396.147,
            "advanceList": [
              {
                "date": "17-12-2023",
                "amount": 1000,
                "_id": "65b73c924c0f25301d9671f9"
              },
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73cb6180d00264e5cb1fc"
              },
              {
                "date": "27-12-2023",
                "amount": 1000,
                "_id": "65b73cc1180d00264e5cb202"
              }
            ],
            "absent": [
              "07-12-2023",
              "11-12-2023",
              "14-12-2023",
              "20-12-2023",
              "25-12-2023",
              "28-12-2023",
              "29-12-2023",
              "30-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe39425b"
          },
          {
            "employee": "HK2015-05",
            "employeeId": "65b4b5113295f68bef8b024a",
            "totalWorkingDays": 12,
            "totalAdvanceSalary": 1000,
            "totalOtherExpenseByCompany": 60,
            "totalTravelAllowance": 900,
            "finalSalary": 4563.23,
            "advanceList": [
              {
                "date": "21-12-2023",
                "amount": 1000,
                "_id": "65b73da3180d00264e5cb21e"
              }
            ],
            "absent": [
              "03-12-2023",
              "04-12-2023",
              "07-12-2023",
              "08-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "20-12-2023",
              "24-12-2023",
              "27-12-2023",
              "28-12-2023",
              "29-12-2023",
              "30-12-2023",
              "31-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe39425f"
          },
          {
            "employee": "HK2015-06",
            "employeeId": "65b4b5353295f68bef8b024e",
            "totalWorkingDays": 10,
            "totalAdvanceSalary": 2500,
            "totalOtherExpenseByCompany": 50,
            "totalTravelAllowance": 900,
            "finalSalary": 5263.023,
            "advanceList": [
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73dfa180d00264e5cb236"
              },
              {
                "date": "22-12-2023",
                "amount": 500,
                "_id": "65b73e03180d00264e5cb23c"
              }
            ],
            "absent": [
              "02-12-2023",
              "03-12-2023",
              "04-12-2023",
              "06-12-2023",
              "08-12-2023",
              "09-12-2023",
              "10-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "15-12-2023",
              "16-12-2023",
              "17-12-2023",
              "18-12-2023",
              "23-12-2023",
              "24-12-2023",
              "25-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394261"
          },
          {
            "employee": "HK2015-07",
            "employeeId": "65b4b5533295f68bef8b0252",
            "totalWorkingDays": 18,
            "totalAdvanceSalary": 3000,
            "totalOtherExpenseByCompany": 90,
            "totalTravelAllowance": 2160,
            "finalSalary": 8956.320,
            "advanceList": [
              {
                "date": "13-12-2023",
                "amount": 1000,
                "_id": "65b73d70180d00264e5cb212"
              },
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73d87180d00264e5cb218"
              }
            ],
            "absent": [
              "01-12-2023",
              "06-12-2023",
              "07-12-2023",
              "10-12-2023",
              "11-12-2023",
              "20-12-2023",
              "30-12-2023",
              "31-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394264"
          }
        ],
        "isDeleted": false,
        "createdOn": "2024-02-02T09:58:20.469Z",
        "updatedOn": "2024-02-02T09:58:20.469Z",
        "__v": 0
        }, 
        {
        "_id": "65bcbcbc025ee6dfbe394204",
        "company": "659e4da6c62e0d0c9d717de6",
        "workingYear": "2023-24",
        "month": 4,
        "year": 2023,
        "salaryDetails": [
          {
            "employee": "HK2015-01",
            "employeeId": "65b4b4703295f68bef8b023a",
            "totalWorkingDays": 24,
            "totalOverTimePeriod": 9,
            "OverTimeSalary": 556.875,
            "totalAdvanceSalary": 2500,
            "totalOtherExpenseByCompany": 120,
            "totalTravelAllowance": 2640,
            "finalSalary": 8236.255,
            "advanceList": [
              {
                "date": "20-12-2023",
                "amount": 2000,
                "_id": "65b73dd1180d00264e5cb22a"
              },
              {
                "date": "25-12-2023",
                "amount": 500,
                "_id": "65b73dde180d00264e5cb230"
              }
            ],
            "absent": [
              "03-12-2023",
              "08-12-2023",
              "14-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394254"
          },
          {
            "employee": "HK2015-02",
            "employeeId": "65b4b49d3295f68bef8b023e",
            "totalWorkingDays": 25,
            "totalOverTimePeriod": 9,
            "OverTimeSalary": 379.6875,
            "totalAdvanceSalary": 1500,
            "totalOtherExpenseByCompany": 125,
            "totalTravelAllowance": 2500,
            "finalSalary": 6526.325,
            "advanceList": [
              {
                "date": "18-12-2023",
                "amount": 1500,
                "_id": "65b73cdd180d00264e5cb208"
              }
            ],
            "absent": [
              "08-12-2023",
              "14-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394257"
          },
          {
            "employee": "HK2015-03",
            "employeeId": "65b4b4c03295f68bef8b0242",
            "totalWorkingDays": 21,
            "totalOverTimePeriod": 8.5,
            "OverTimeSalary": 334.6875,
            "totalAdvanceSalary": 1000,
            "totalOtherExpenseByCompany": 105,
            "totalTravelAllowance": 1575,
            "finalSalary": 5453.0675,
            "advanceList": [
              {
                "date": "20-12-2023",
                "amount": 1000,
                "_id": "65b73db8180d00264e5cb224"
              }
            ],
            "absent": [
              "08-12-2023",
              "09-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "15-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394259"
          },
          {
            "employee": "HK2015-04",
            "employeeId": "65b4b4e23295f68bef8b0246",
            "totalWorkingDays": 19,
            "totalOverTimePeriod": 2,
            "OverTimeSalary": 90,
            "totalAdvanceSalary": 4000,
            "totalOtherExpenseByCompany": 95,
            "totalTravelAllowance": 1900,
            "finalSalary": 4587,
            "advanceList": [
              {
                "date": "17-12-2023",
                "amount": 1000,
                "_id": "65b73c924c0f25301d9671f9"
              },
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73cb6180d00264e5cb1fc"
              },
              {
                "date": "27-12-2023",
                "amount": 1000,
                "_id": "65b73cc1180d00264e5cb202"
              }
            ],
            "absent": [
              "07-12-2023",
              "11-12-2023",
              "14-12-2023",
              "20-12-2023",
              "25-12-2023",
              "28-12-2023",
              "29-12-2023",
              "30-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe39425b"
          },
          {
            "employee": "HK2015-05",
            "employeeId": "65b4b5113295f68bef8b024a",
            "totalWorkingDays": 12,
            "totalAdvanceSalary": 1000,
            "totalOtherExpenseByCompany": 60,
            "totalTravelAllowance": 900,
            "finalSalary": 2563.02,
            "advanceList": [
              {
                "date": "21-12-2023",
                "amount": 1000,
                "_id": "65b73da3180d00264e5cb21e"
              }
            ],
            "absent": [
              "03-12-2023",
              "04-12-2023",
              "07-12-2023",
              "08-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "20-12-2023",
              "24-12-2023",
              "27-12-2023",
              "28-12-2023",
              "29-12-2023",
              "30-12-2023",
              "31-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe39425f"
          },
          {
            "employee": "HK2015-06",
            "employeeId": "65b4b5353295f68bef8b024e",
            "totalWorkingDays": 10,
            "totalAdvanceSalary": 2500,
            "totalOtherExpenseByCompany": 50,
            "totalTravelAllowance": 900,
            "finalSalary": 2357.069,
            "advanceList": [
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73dfa180d00264e5cb236"
              },
              {
                "date": "22-12-2023",
                "amount": 500,
                "_id": "65b73e03180d00264e5cb23c"
              }
            ],
            "absent": [
              "02-12-2023",
              "03-12-2023",
              "04-12-2023",
              "06-12-2023",
              "08-12-2023",
              "09-12-2023",
              "10-12-2023",
              "11-12-2023",
              "13-12-2023",
              "14-12-2023",
              "15-12-2023",
              "16-12-2023",
              "17-12-2023",
              "18-12-2023",
              "23-12-2023",
              "24-12-2023",
              "25-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394261"
          },
          {
            "employee": "HK2015-07",
            "employeeId": "65b4b5533295f68bef8b0252",
            "totalWorkingDays": 18,
            "totalAdvanceSalary": 3000,
            "totalOtherExpenseByCompany": 90,
            "totalTravelAllowance": 2160,
            "finalSalary": 6396.34,
            "advanceList": [
              {
                "date": "13-12-2023",
                "amount": 1000,
                "_id": "65b73d70180d00264e5cb212"
              },
              {
                "date": "21-12-2023",
                "amount": 2000,
                "_id": "65b73d87180d00264e5cb218"
              }
            ],
            "absent": [
              "01-12-2023",
              "06-12-2023",
              "07-12-2023",
              "10-12-2023",
              "11-12-2023",
              "20-12-2023",
              "30-12-2023",
              "31-12-2023"
            ],
            "_id": "65bcbcbc025ee6dfbe394264"
          }
        ],
        "isDeleted": false,
        "createdOn": "2024-02-02T09:58:20.469Z",
        "updatedOn": "2024-02-02T09:58:20.469Z",
        "__v": 0
        },
        {
            "_id": "65bcbcbc025ee6dfbe394203",
            "company": "659e4da6c62e0d0c9d717de6",
            "workingYear": "2023-24",
            "month": 3,
            "year": 2023,
            "salaryDetails": [
              {
                "employee": "HK2015-01",
                "employeeId": "65b4b4703295f68bef8b023a",
                "totalWorkingDays": 24,
                "totalOverTimePeriod": 9,
                "OverTimeSalary": 556.875,
                "totalAdvanceSalary": 2500,
                "totalOtherExpenseByCompany": 120,
                "totalTravelAllowance": 2640,
                "finalSalary": 7895.235,
                "advanceList": [
                  {
                    "date": "20-12-2023",
                    "amount": 2000,
                    "_id": "65b73dd1180d00264e5cb22a"
                  },
                  {
                    "date": "25-12-2023",
                    "amount": 500,
                    "_id": "65b73dde180d00264e5cb230"
                  }
                ],
                "absent": [
                  "03-12-2023",
                  "08-12-2023",
                  "14-12-2023"
                ],
                "_id": "65bcbcbc025ee6dfbe394254"
              },
              {
                "employee": "HK2015-02",
                "employeeId": "65b4b49d3295f68bef8b023e",
                "totalWorkingDays": 25,
                "totalOverTimePeriod": 9,
                "OverTimeSalary": 379.6875,
                "totalAdvanceSalary": 1500,
                "totalOtherExpenseByCompany": 125,
                "totalTravelAllowance": 2500,
                "finalSalary": 2378.2365,
                "advanceList": [
                  {
                    "date": "18-12-2023",
                    "amount": 1500,
                    "_id": "65b73cdd180d00264e5cb208"
                  }
                ],
                "absent": [
                  "08-12-2023",
                  "14-12-2023"
                ],
                "_id": "65bcbcbc025ee6dfbe394257"
              },
              {
                "employee": "HK2015-03",
                "employeeId": "65b4b4c03295f68bef8b0242",
                "totalWorkingDays": 21,
                "totalOverTimePeriod": 8.5,
                "OverTimeSalary": 334.6875,
                "totalAdvanceSalary": 1000,
                "totalOtherExpenseByCompany": 105,
                "totalTravelAllowance": 1575,
                "finalSalary": 2356.3148,
                "advanceList": [
                  {
                    "date": "20-12-2023",
                    "amount": 1000,
                    "_id": "65b73db8180d00264e5cb224"
                  }
                ],
                "absent": [
                  "08-12-2023",
                  "09-12-2023",
                  "11-12-2023",
                  "13-12-2023",
                  "14-12-2023",
                  "15-12-2023"
                ],
                "_id": "65bcbcbc025ee6dfbe394259"
              },
              {
                "employee": "HK2015-04",
                "employeeId": "65b4b4e23295f68bef8b0246",
                "totalWorkingDays": 19,
                "totalOverTimePeriod": 2,
                "OverTimeSalary": 90,
                "totalAdvanceSalary": 4000,
                "totalOtherExpenseByCompany": 95,
                "totalTravelAllowance": 1900,
                "finalSalary": 4532.648,
                "advanceList": [
                  {
                    "date": "17-12-2023",
                    "amount": 1000,
                    "_id": "65b73c924c0f25301d9671f9"
                  },
                  {
                    "date": "21-12-2023",
                    "amount": 2000,
                    "_id": "65b73cb6180d00264e5cb1fc"
                  },
                  {
                    "date": "27-12-2023",
                    "amount": 1000,
                    "_id": "65b73cc1180d00264e5cb202"
                  }
                ],
                "absent": [
                  "07-12-2023",
                  "11-12-2023",
                  "14-12-2023",
                  "20-12-2023",
                  "25-12-2023",
                  "28-12-2023",
                  "29-12-2023",
                  "30-12-2023"
                ],
                "_id": "65bcbcbc025ee6dfbe39425b"
              },
              {
                "employee": "HK2015-05",
                "employeeId": "65b4b5113295f68bef8b024a",
                "totalWorkingDays": 12,
                "totalAdvanceSalary": 1000,
                "totalOtherExpenseByCompany": 60,
                "totalTravelAllowance": 900,
                "finalSalary": 2496.35,
                "advanceList": [
                  {
                    "date": "21-12-2023",
                    "amount": 1000,
                    "_id": "65b73da3180d00264e5cb21e"
                  }
                ],
                "absent": [
                  "03-12-2023",
                  "04-12-2023",
                  "07-12-2023",
                  "08-12-2023",
                  "11-12-2023",
                  "13-12-2023",
                  "14-12-2023",
                  "20-12-2023",
                  "24-12-2023",
                  "27-12-2023",
                  "28-12-2023",
                  "29-12-2023",
                  "30-12-2023",
                  "31-12-2023"
                ],
                "_id": "65bcbcbc025ee6dfbe39425f"
              },
              {
                "employee": "HK2015-06",
                "employeeId": "65b4b5353295f68bef8b024e",
                "totalWorkingDays": 10,
                "totalAdvanceSalary": 2500,
                "totalOtherExpenseByCompany": 50,
                "totalTravelAllowance": 900,
                "finalSalary": 9657.32,
                "advanceList": [
                  {
                    "date": "21-12-2023",
                    "amount": 2000,
                    "_id": "65b73dfa180d00264e5cb236"
                  },
                  {
                    "date": "22-12-2023",
                    "amount": 500,
                    "_id": "65b73e03180d00264e5cb23c"
                  }
                ],
                "absent": [
                  "02-12-2023",
                  "03-12-2023",
                  "04-12-2023",
                  "06-12-2023",
                  "08-12-2023",
                  "09-12-2023",
                  "10-12-2023",
                  "11-12-2023",
                  "13-12-2023",
                  "14-12-2023",
                  "15-12-2023",
                  "16-12-2023",
                  "17-12-2023",
                  "18-12-2023",
                  "23-12-2023",
                  "24-12-2023",
                  "25-12-2023"
                ],
                "_id": "65bcbcbc025ee6dfbe394261"
              },
              {
                "employee": "HK2015-07",
                "employeeId": "65b4b5533295f68bef8b0252",
                "totalWorkingDays": 18,
                "totalAdvanceSalary": 3000,
                "totalOtherExpenseByCompany": 90,
                "totalTravelAllowance": 2160,
                "finalSalary": 7856.3214,
                "advanceList": [
                  {
                    "date": "13-12-2023",
                    "amount": 1000,
                    "_id": "65b73d70180d00264e5cb212"
                  },
                  {
                    "date": "21-12-2023",
                    "amount": 2000,
                    "_id": "65b73d87180d00264e5cb218"
                  }
                ],
                "absent": [
                  "01-12-2023",
                  "06-12-2023",
                  "07-12-2023",
                  "10-12-2023",
                  "11-12-2023",
                  "20-12-2023",
                  "30-12-2023",
                  "31-12-2023"
                ],
                "_id": "65bcbcbc025ee6dfbe394264"
              }
            ],
            "isDeleted": false,
            "createdOn": "2024-02-02T09:58:20.469Z",
            "updatedOn": "2024-02-02T09:58:20.469Z",
            "__v": 0
        },
        {
                "_id": "65bcbcbc025ee6dfbe394202",
                "company": "659e4da6c62e0d0c9d717de6",
                "workingYear": "2023-24",
                "month": 2,
                "year": 2023,
                "salaryDetails": [
                  {
                    "employee": "HK2015-01",
                    "employeeId": "65b4b4703295f68bef8b023a",
                    "totalWorkingDays": 24,
                    "totalOverTimePeriod": 9,
                    "OverTimeSalary": 556.875,
                    "totalAdvanceSalary": 2500,
                    "totalOtherExpenseByCompany": 120,
                    "totalTravelAllowance": 2640,
                    "finalSalary": 8280.255,
                    "advanceList": [
                      {
                        "date": "20-12-2023",
                        "amount": 2000,
                        "_id": "65b73dd1180d00264e5cb22a"
                      },
                      {
                        "date": "25-12-2023",
                        "amount": 500,
                        "_id": "65b73dde180d00264e5cb230"
                      }
                    ],
                    "absent": [
                      "03-12-2023",
                      "08-12-2023",
                      "14-12-2023"
                    ],
                    "_id": "65bcbcbc025ee6dfbe394254"
                  },
                  {
                    "employee": "HK2015-02",
                    "employeeId": "65b4b49d3295f68bef8b023e",
                    "totalWorkingDays": 25,
                    "totalOverTimePeriod": 9,
                    "OverTimeSalary": 379.6875,
                    "totalAdvanceSalary": 1500,
                    "totalOtherExpenseByCompany": 125,
                    "totalTravelAllowance": 2500,
                    "finalSalary": 6364.75,
                    "advanceList": [
                      {
                        "date": "18-12-2023",
                        "amount": 1500,
                        "_id": "65b73cdd180d00264e5cb208"
                      }
                    ],
                    "absent": [
                      "08-12-2023",
                      "14-12-2023"
                    ],
                    "_id": "65bcbcbc025ee6dfbe394257"
                  },
                  {
                    "employee": "HK2015-03",
                    "employeeId": "65b4b4c03295f68bef8b0242",
                    "totalWorkingDays": 21,
                    "totalOverTimePeriod": 8.5,
                    "OverTimeSalary": 334.6875,
                    "totalAdvanceSalary": 1000,
                    "totalOtherExpenseByCompany": 105,
                    "totalTravelAllowance": 1575,
                    "finalSalary": 5368.235,
                    "advanceList": [
                      {
                        "date": "20-12-2023",
                        "amount": 1000,
                        "_id": "65b73db8180d00264e5cb224"
                      }
                    ],
                    "absent": [
                      "08-12-2023",
                      "09-12-2023",
                      "11-12-2023",
                      "13-12-2023",
                      "14-12-2023",
                      "15-12-2023"
                    ],
                    "_id": "65bcbcbc025ee6dfbe394259"
                  },
                  {
                    "employee": "HK2015-04",
                    "employeeId": "65b4b4e23295f68bef8b0246",
                    "totalWorkingDays": 19,
                    "totalOverTimePeriod": 2,
                    "OverTimeSalary": 90,
                    "totalAdvanceSalary": 4000,
                    "totalOtherExpenseByCompany": 95,
                    "totalTravelAllowance": 1900,
                    "finalSalary": 7856.321,
                    "advanceList": [
                      {
                        "date": "17-12-2023",
                        "amount": 1000,
                        "_id": "65b73c924c0f25301d9671f9"
                      },
                      {
                        "date": "21-12-2023",
                        "amount": 2000,
                        "_id": "65b73cb6180d00264e5cb1fc"
                      },
                      {
                        "date": "27-12-2023",
                        "amount": 1000,
                        "_id": "65b73cc1180d00264e5cb202"
                      }
                    ],
                    "absent": [
                      "07-12-2023",
                      "11-12-2023",
                      "14-12-2023",
                      "20-12-2023",
                      "25-12-2023",
                      "28-12-2023",
                      "29-12-2023",
                      "30-12-2023"
                    ],
                    "_id": "65bcbcbc025ee6dfbe39425b"
                  },
                  {
                    "employee": "HK2015-05",
                    "employeeId": "65b4b5113295f68bef8b024a",
                    "totalWorkingDays": 12,
                    "totalAdvanceSalary": 1000,
                    "totalOtherExpenseByCompany": 60,
                    "totalTravelAllowance": 900,
                    "finalSalary": 2659.32,
                    "advanceList": [
                      {
                        "date": "21-12-2023",
                        "amount": 1000,
                        "_id": "65b73da3180d00264e5cb21e"
                      }
                    ],
                    "absent": [
                      "03-12-2023",
                      "04-12-2023",
                      "07-12-2023",
                      "08-12-2023",
                      "11-12-2023",
                      "13-12-2023",
                      "14-12-2023",
                      "20-12-2023",
                      "24-12-2023",
                      "27-12-2023",
                      "28-12-2023",
                      "29-12-2023",
                      "30-12-2023",
                      "31-12-2023"
                    ],
                    "_id": "65bcbcbc025ee6dfbe39425f"
                  },
                  {
                    "employee": "HK2015-06",
                    "employeeId": "65b4b5353295f68bef8b024e",
                    "totalWorkingDays": 10,
                    "totalAdvanceSalary": 2500,
                    "totalOtherExpenseByCompany": 50,
                    "totalTravelAllowance": 900,
                    "finalSalary": 7895.236,
                    "advanceList": [
                      {
                        "date": "21-12-2023",
                        "amount": 2000,
                        "_id": "65b73dfa180d00264e5cb236"
                      },
                      {
                        "date": "22-12-2023",
                        "amount": 500,
                        "_id": "65b73e03180d00264e5cb23c"
                      }
                    ],
                    "absent": [
                      "02-12-2023",
                      "03-12-2023",
                      "04-12-2023",
                      "06-12-2023",
                      "08-12-2023",
                      "09-12-2023",
                      "10-12-2023",
                      "11-12-2023",
                      "13-12-2023",
                      "14-12-2023",
                      "15-12-2023",
                      "16-12-2023",
                      "17-12-2023",
                      "18-12-2023",
                      "23-12-2023",
                      "24-12-2023",
                      "25-12-2023"
                    ],
                    "_id": "65bcbcbc025ee6dfbe394261"
                  },
                  {
                    "employee": "HK2015-07",
                    "employeeId": "65b4b5533295f68bef8b0252",
                    "totalWorkingDays": 18,
                    "totalAdvanceSalary": 3000,
                    "totalOtherExpenseByCompany": 90,
                    "totalTravelAllowance": 2160,
                    "finalSalary": 2563.125,
                    "advanceList": [
                      {
                        "date": "13-12-2023",
                        "amount": 1000,
                        "_id": "65b73d70180d00264e5cb212"
                      },
                      {
                        "date": "21-12-2023",
                        "amount": 2000,
                        "_id": "65b73d87180d00264e5cb218"
                      }
                    ],
                    "absent": [
                      "01-12-2023",
                      "06-12-2023",
                      "07-12-2023",
                      "10-12-2023",
                      "11-12-2023",
                      "20-12-2023",
                      "30-12-2023",
                      "31-12-2023"
                    ],
                    "_id": "65bcbcbc025ee6dfbe394264"
                  }
                ],
                "isDeleted": false,
                "createdOn": "2024-02-02T09:58:20.469Z",
                "updatedOn": "2024-02-02T09:58:20.469Z",
                "__v": 0
        },
        {
                    "_id": "65bcbcbc025ee6dfbe394201",
                    "company": "659e4da6c62e0d0c9d717de6",
                    "workingYear": "2023-24",
                    "month": 1,
                    "year": 2023,
                    "salaryDetails": [
                      {
                        "employee": "HK2015-01",
                        "employeeId": "65b4b4703295f68bef8b023a",
                        "totalWorkingDays": 24,
                        "totalOverTimePeriod": 9,
                        "OverTimeSalary": 556.875,
                        "totalAdvanceSalary": 2500,
                        "totalOtherExpenseByCompany": 120,
                        "totalTravelAllowance": 2640,
                        "finalSalary": 2305,
                        "advanceList": [
                          {
                            "date": "20-12-2023",
                            "amount": 2000,
                            "_id": "65b73dd1180d00264e5cb22a"
                          },
                          {
                            "date": "25-12-2023",
                            "amount": 500,
                            "_id": "65b73dde180d00264e5cb230"
                          }
                        ],
                        "absent": [
                          "03-12-2023",
                          "08-12-2023",
                          "14-12-2023"
                        ],
                        "_id": "65bcbcbc025ee6dfbe394254"
                      },
                      {
                        "employee": "HK2015-02",
                        "employeeId": "65b4b49d3295f68bef8b023e",
                        "totalWorkingDays": 25,
                        "totalOverTimePeriod": 9,
                        "OverTimeSalary": 379.6875,
                        "totalAdvanceSalary": 1500,
                        "totalOtherExpenseByCompany": 125,
                        "totalTravelAllowance": 2500,
                        "finalSalary": 7889.035,
                        "advanceList": [
                          {
                            "date": "18-12-2023",
                            "amount": 1500,
                            "_id": "65b73cdd180d00264e5cb208"
                          }
                        ],
                        "absent": [
                          "08-12-2023",
                          "14-12-2023"
                        ],
                        "_id": "65bcbcbc025ee6dfbe394257"
                      },
                      {
                        "employee": "HK2015-03",
                        "employeeId": "65b4b4c03295f68bef8b0242",
                        "totalWorkingDays": 21,
                        "totalOverTimePeriod": 8.5,
                        "OverTimeSalary": 334.6875,
                        "totalAdvanceSalary": 1000,
                        "totalOtherExpenseByCompany": 105,
                        "totalTravelAllowance": 1575,
                        "finalSalary": 5895.36,
                        "advanceList": [
                          {
                            "date": "20-12-2023",
                            "amount": 1000,
                            "_id": "65b73db8180d00264e5cb224"
                          }
                        ],
                        "absent": [
                          "08-12-2023",
                          "09-12-2023",
                          "11-12-2023",
                          "13-12-2023",
                          "14-12-2023",
                          "15-12-2023"
                        ],
                        "_id": "65bcbcbc025ee6dfbe394259"
                      },
                      {
                        "employee": "HK2015-04",
                        "employeeId": "65b4b4e23295f68bef8b0246",
                        "totalWorkingDays": 19,
                        "totalOverTimePeriod": 2,
                        "OverTimeSalary": 90,
                        "totalAdvanceSalary": 4000,
                        "totalOtherExpenseByCompany": 95,
                        "totalTravelAllowance": 1900,
                        "finalSalary": 2548.32,
                        "advanceList": [
                          {
                            "date": "17-12-2023",
                            "amount": 1000,
                            "_id": "65b73c924c0f25301d9671f9"
                          },
                          {
                            "date": "21-12-2023",
                            "amount": 2000,
                            "_id": "65b73cb6180d00264e5cb1fc"
                          },
                          {
                            "date": "27-12-2023",
                            "amount": 1000,
                            "_id": "65b73cc1180d00264e5cb202"
                          }
                        ],
                        "absent": [
                          "07-12-2023",
                          "11-12-2023",
                          "14-12-2023",
                          "20-12-2023",
                          "25-12-2023",
                          "28-12-2023",
                          "29-12-2023",
                          "30-12-2023"
                        ],
                        "_id": "65bcbcbc025ee6dfbe39425b"
                      },
                      {
                        "employee": "HK2015-05",
                        "employeeId": "65b4b5113295f68bef8b024a",
                        "totalWorkingDays": 12,
                        "totalAdvanceSalary": 1000,
                        "totalOtherExpenseByCompany": 60,
                        "totalTravelAllowance": 900,
                        "finalSalary": 6369.02,
                        "advanceList": [
                          {
                            "date": "21-12-2023",
                            "amount": 1000,
                            "_id": "65b73da3180d00264e5cb21e"
                          }
                        ],
                        "absent": [
                          "03-12-2023",
                          "04-12-2023",
                          "07-12-2023",
                          "08-12-2023",
                          "11-12-2023",
                          "13-12-2023",
                          "14-12-2023",
                          "20-12-2023",
                          "24-12-2023",
                          "27-12-2023",
                          "28-12-2023",
                          "29-12-2023",
                          "30-12-2023",
                          "31-12-2023"
                        ],
                        "_id": "65bcbcbc025ee6dfbe39425f"
                      },
                      {
                        "employee": "HK2015-06",
                        "employeeId": "65b4b5353295f68bef8b024e",
                        "totalWorkingDays": 10,
                        "totalAdvanceSalary": 2500,
                        "totalOtherExpenseByCompany": 50,
                        "totalTravelAllowance": 900,
                        "finalSalary": 7856.32,
                        "advanceList": [
                          {
                            "date": "21-12-2023",
                            "amount": 2000,
                            "_id": "65b73dfa180d00264e5cb236"
                          },
                          {
                            "date": "22-12-2023",
                            "amount": 500,
                            "_id": "65b73e03180d00264e5cb23c"
                          }
                        ],
                        "absent": [
                          "02-12-2023",
                          "03-12-2023",
                          "04-12-2023",
                          "06-12-2023",
                          "08-12-2023",
                          "09-12-2023",
                          "10-12-2023",
                          "11-12-2023",
                          "13-12-2023",
                          "14-12-2023",
                          "15-12-2023",
                          "16-12-2023",
                          "17-12-2023",
                          "18-12-2023",
                          "23-12-2023",
                          "24-12-2023",
                          "25-12-2023"
                        ],
                        "_id": "65bcbcbc025ee6dfbe394261"
                      },
                      {
                        "employee": "HK2015-07",
                        "employeeId": "65b4b5533295f68bef8b0252",
                        "totalWorkingDays": 18,
                        "totalAdvanceSalary": 3000,
                        "totalOtherExpenseByCompany": 90,
                        "totalTravelAllowance": 2160,
                        "finalSalary": 7856.023,
                        "advanceList": [
                          {
                            "date": "13-12-2023",
                            "amount": 1000,
                            "_id": "65b73d70180d00264e5cb212"
                          },
                          {
                            "date": "21-12-2023",
                            "amount": 2000,
                            "_id": "65b73d87180d00264e5cb218"
                          }
                        ],
                        "absent": [
                          "01-12-2023",
                          "06-12-2023",
                          "07-12-2023",
                          "10-12-2023",
                          "11-12-2023",
                          "20-12-2023",
                          "30-12-2023",
                          "31-12-2023"
                        ],
                        "_id": "65bcbcbc025ee6dfbe394264"
                      }
                    ],
                    "isDeleted": false,
                    "createdOn": "2024-02-02T09:58:20.469Z",
                    "updatedOn": "2024-02-02T09:58:20.469Z",
                    "__v": 0
    }]
    const maxLimit = 10;
    const [curr, set_Curr] = useState(1);  
    const [data, setData] = useState(salaryList); 
    const handelModal = (type, id) => {
      if(type === modalTypeEnum.detail){
        const modalData = data.find((ele)=>{return(ele._id === id)});
        setModalType(modalTypeEnum.detail)
        setModalData(modalData);
      }
      else {
        setModalType(modalTypeEnum.attendance)
      }
      setModalShow(true);
    }
    const pageChangeFunction = (p) => {
      if (p >= 1 && p <= maxLimit) {
          set_Curr(p);
      }
    };
    const showPageItemsFunction = () => {
        const data = [];
        const numPage = 5;
        if (maxLimit <= numPage) {
            for (let i = 1; i <= maxLimit; i++) {
                data.push(
                    <Pagination.Item
                        key={i}
                        active={i === curr}
                        onClick={() => pageChangeFunction(i)}
                    >
                        {i}
                    </Pagination.Item>
                );
            }
        } else {
            const leftside = curr - numPage / 2 > 1;
            const rightside = curr + numPage / 2 < maxLimit;
            data.push(
                <Pagination.First
                    key="first"
                    onClick={() => pageChangeFunction(1)}
                />
            );
            data.push(
                <Pagination.Prev
                    key="prev"
                    onClick={() => pageChangeFunction(curr - 1)}
                />
            );
            if (leftside) {
                data.push(<Pagination.Ellipsis key="leftEllipsis" />);
            }
            const str = Math.max(1, Math.round(curr - numPage / 2));
            const end = Math.min(maxLimit, Math.round(curr + numPage / 2));
            for (let i = str; i <= end; i++) {
                data.push(
                    <Pagination.Item
                        key={i}
                        active={i === curr}
                        onClick={() => pageChangeFunction(i)}
                    >
                        {i}
                    </Pagination.Item>
                );
            }
            if (rightside) {
                data.push(<Pagination.Ellipsis key="rightEllipsis" />);
            }
            data.push(
                <Pagination.Next
                    key="next"
                    onClick={() => pageChangeFunction(curr + 1)}
                />
            );
            data.push(
                <Pagination.Last
                    key="last"
                    onClick={() => pageChangeFunction(maxLimit)}
                />
            );
        }
        return data;
    };
  return (
    <div className='m-2 p-3 layoutContentCard' style={{background: "#FFFFFF", borderRadius: "15px"}}>
      <div className='content-flex'>
        <div>
            <h3 className='navbarTitle'>Salary List</h3>
            <p>Here's your report of 2023-24</p>
        </div>
        <div>
            <Button className='w-100' onClick={()=>{handelModal(modalTypeEnum.attendance)}}><CalendarCheck /> Attendance Sheet</Button>
        </div>
      </div>
      <hr />
      <div>
        <header className='content-flex'>
          <div style={{display: "flex", alignItems: "center"}}>
            <p>Show</p>
            <Form className='px-2'>
              <Form.Select>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </Form.Select>
            </Form>
            <p>Entries</p>
          </div>
          <div>
            <Form>
              <Form.Select>
                <option value="2023-24">2023-24</option>
                <option value="2024-25">2024-25</option>
                <option value="2025-26">2025-26</option>
              </Form.Select>
            </Form>
          </div>
        </header>
        <div className='my-3'style={{height: "62vh", overflowX: "hidden"}}>
          <Table hover responsive>
            <thead>
              <tr>
                <th>Month</th>
                <th>Year</th>
                <th>Salary</th>
                <th>Detail</th>
                <th></th>
              </tr>
            </thead>
            <tbody style={{textAlign: "left"}}>
              {data.map((data, index)=>{
                return <tr key={data._id}>
                  <td>
                    {data.month}
                  </td>
                  <td>
                    {data.year}
                  </td>
                  <td style={{color: "#198754", fontWeight: "bold"}}>
                    <CurrencyRupee />
                    {
                      (()=>{
                          let totalSalary = 0;
                          for (const employeeSalary of data.salaryDetails) {
                              totalSalary += parseFloat(employeeSalary.finalSalary)
                          }
                          return Math.round(totalSalary).toLocaleString();
                      })()
                    }
                  </td>
                  <td><InfoCircle className='hoverEffect' onClick={()=>{ handelModal(modalTypeEnum.detail, data._id)}}/></td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle className='p-0 m-0'style={{backgroundColor: "transparent", borderColor: "transparent", color: "#000000"}}>
                        <ThreeDots className='hoverEffect'/>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Header>Download</Dropdown.Header>
                        <Dropdown.Item href=""><FiletypePdf color='red'/> PDF</Dropdown.Item>
                        <Dropdown.Item href=""><FiletypeXlsx color='#198754'/> EXCEL</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              })}
            </tbody>
          </Table>
        </div>
        <footer className='d-flex justify-content-end'>
          <Pagination className='mb-0'>{showPageItemsFunction()}</Pagination>
          <AppModal />
        </footer>
      </div>
    </div>
  )
}

export default Dashboard