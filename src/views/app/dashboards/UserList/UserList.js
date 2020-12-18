// import React from 'react';
import React, { useState, useEffect, createRef } from "react";
import { injectIntl } from "react-intl";
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Row, Button } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import DatatablePagination from '../../../../components/DatatablePagination';
// import MUIDataTable from 'mui-datatables';
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
    postRequestMultipart,
    getRequest,
    postRequest,
    postEwalletRequest
} from "../../../../utils/request";

function Table({ columns, data, divided = false, defaultPageSize = 6 }) {
    const {
        getTableProps,
        getTableBodyProps,
        prepareRow,
        headerGroups,
        page,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: defaultPageSize },
        },
        useSortBy,
        usePagination
    );

    return (
        <>
            <table
                {...getTableProps()}
                className={`r-table table ${classnames({ 'table-divided': divided })}`}
            >
                <thead style={{ backgroundColor: "#008ecc", color: "white", fontSize: "15px" }}>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, columnIndex) => (
                                <th
                                    key={`th_${columnIndex}`}
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={
                                        column.isSorted
                                            ? column.isSortedDesc
                                                ? 'sorted-desc'
                                                : 'sorted-asc'
                                            : ''
                                    }
                                >
                                    {column.render('Header')}
                                    <span />
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell, cellIndex) => (
                                    <td
                                        key={`td_${cellIndex}`}
                                        {...cell.getCellProps({
                                            className: cell.column.cellClass,
                                        })}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <DatatablePagination
                page={pageIndex}
                pages={pageCount}
                canPrevious={canPreviousPage}
                canNext={canNextPage}
                pageSizeOptions={[4, 10, 20, 30, 40, 50]}
                showPageSizeOptions={false}
                showPageJump={false}
                defaultPageSize={pageSize}
                onPageChange={(p) => gotoPage(p)}
                onPageSizeChange={(s) => setPageSize(s)}
                paginationMaxSize={pageCount}
            />
        </>
    );
}

const ListOfUserDefault = ({ intl, match }) => {
    console.log(match)
    // const data = [["Nischal Narn", "nischal@gmail.com", "9632587410", "200", "niswer2020", "Paid"]];

    const [UserList, setUserList] = React.useState([])

    React.useEffect(() => {
        getuserlist()





    }, []);

    const getuserlist = () => {
        getRequest('/user/get-all-users/consumer').then((response) => {
            if (response.code == 1) {
                setUserList(response.users)
            }
            console.log(response)
        }).catch((error) => {
            console.log(error)
            alert(error)
        })
    }







    const produtcs = [
        {
            id: 1,
            name: 'Nischal Narnaware',
            email: 'nis@gmail.com',
            mobileNumber: '9175581897',
            Status: "Approved",
            Address: "89 street Gondia",
            Pincode: "52632",
            City: "Gondia",
            State: "Maharastra",
            Country: "India",
            Type: "Seller"

        },
        {
            id: 2,
            name: 'Akshay Meshram',
            email: 'aksh@gmail.com',
            mobileNumber: '9175581898',
            Status: "Rejected",
            Address: "90 street Nagpur",
            Pincode: "52632",
            City: "Nagpur",
            State: "Maharastra",
            Country: "India",
            Type: "Buyer"

        }

    ]
    const cols = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
                // label: "nischl",

                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Email',
                accessor: 'email',
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Mobile Number',
                accessor: 'mobileNumber',
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },

            {
                Header: 'Address',
                accessor: 'Address',
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Pincode',
                accessor: 'Pincode',
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'City',
                accessor: 'City',
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'State',
                accessor: 'State',
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Country',
                accessor: 'Country',
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Type',
                accessor: 'Type',
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Action',
                accessor: 'id',
                cellClass: 'text-muted w-20',
                Cell: (props) => <><Button color="primary"
                    size="xs"
                    outline >Approved</Button></>,
            },
            // {
            //     Header: 'Stock',
            //     accessor: 'stock',
            //     cellClass: 'text-muted w-20',

            //     Cell: (props) => <>{props.value}</>,
            // },
            // {
            //     Header: 'Category',
            //     accessor: 'category',
            //     cellClass: 'text-muted w-20',
            //     Cell: (props) => <>{props.value}</>,
            // },
            // {
            //     Header: 'Action',
            //     accessor: 'id',
            //     cellClass: 'text-muted w-20',
            //     Cell: (props) => <><Button color="primary"
            //         size="xs"
            //         outline onClick={() => {
            //             console.log(props.value)
            //         }}>View</Button></>,
            // },
        ],
        []
    );


    return (
        <>
            <Row>
                <Colxx xxs="12" sm="6">
                    {/* <p className="mb-0 text-muted">ColoredStrategies 2020</p> */}
                    <h1 style={{ color: "#008ecc" }}>User List </h1>
                </Colxx>
                <Colxx className="col-sm-6 d-none d-sm-block" style={{ backgroundColor: "" }}>


                    {/* <Button color="primary"
                        size="xs"
                        outline><i className="iconsminds-add d-block" /> Add</Button> */}
                    {/* <Row>
                        <Colxx xxs="12" sm="6">

                        </Colxx>
                        <Colxx xxs="12" sm="6">
                            <Button color="primary"
                                size="lg"
                                outline>Add User</Button>

                        </Colxx>

                    </Row> */}





                </Colxx>
                {/* <Colxx xxs="12">
               
                    
                    <Separator className="mb-5" />
                </Colxx> */}
            </Row>
            <Row>
                <Colxx xxs="12">
                    <Card className="mb-4">

                        <CardBody>
                            {/* <Table columns={cols} data={UserList} /> */}

                            <Table columns={cols} data={produtcs} />

                        </CardBody>



                    </Card>



                </Colxx>
            </Row>
        </>
    );
};
export default injectIntl(ListOfUserDefault);
