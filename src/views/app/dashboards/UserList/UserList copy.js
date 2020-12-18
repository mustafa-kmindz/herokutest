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






    const produtcs = [
        {
            id: 1,
            title: 'Marble Cake',
            //   img: '/assets/img/marble-cake-thumb.jpg',
            category: 'Cakes',
            createDate: '02.04.2018',
            status: 'ON HOLD',
            statusColor: 'primary',
            description: 'Wedding cake with flowers Macarons and blueberries',
            sales: 1647,
            stock: 62,
        },
        {
            id: 2,
            title: 'Fat Rascal',
            category: 'Cupcakes',
            //   img: '/assets/img/fat-rascal-thumb.jpg',
            createDate: '01.04.2018',
            status: 'PROCESSED',
            statusColor: 'secondary',
            description: 'Cheesecake with chocolate cookies and Cream biscuits',
            sales: 1240,
            stock: 48,
        },
        {
            id: 3,
            title: 'Chocolate Cake',
            //   img: '/assets/img/chocolate-cake-thumb.jpg',
            category: 'Cakes',
            createDate: '25.03.2018',
            status: 'PROCESSED',
            statusColor: 'secondary',
            description: 'Homemade cheesecake with fresh berries and mint',
            sales: 1080,
            stock: 57,
        },
        {
            id: 4,
            title: 'Goose Breast',
            //   img: '/assets/img/goose-breast-thumb.jpg',
            category: 'Cakes',
            createDate: '21.03.2018',
            status: 'PROCESSED',
            statusColor: 'secondary',
            description: 'Chocolate cake with berries',
            sales: 1014,
            stock: 41,
        },
        {
            id: 1,
            title: 'Marble Cake',
            //   img: '/assets/img/marble-cake-thumb.jpg',
            category: 'Cakes',
            createDate: '02.04.2018',
            status: 'ON HOLD',
            statusColor: 'primary',
            description: 'Wedding cake with flowers Macarons and blueberries',
            sales: 1647,
            stock: 62,
        },
        {
            id: 2,
            title: 'Fat Rascal',
            category: 'Cupcakes',
            //   img: '/assets/img/fat-rascal-thumb.jpg',
            createDate: '01.04.2018',
            status: 'PROCESSED',
            statusColor: 'secondary',
            description: 'Cheesecake with chocolate cookies and Cream biscuits',
            sales: 1240,
            stock: 48,
        },
        {
            id: 3,
            title: 'Chocolate Cake',
            //   img: '/assets/img/chocolate-cake-thumb.jpg',
            category: 'Cakes',
            createDate: '25.03.2018',
            status: 'PROCESSED',
            statusColor: 'secondary',
            description: 'Homemade cheesecake with fresh berries and mint',
            sales: 1080,
            stock: 57,
        },
        {
            id: 4,
            title: 'Goose Breast',
            //   img: '/assets/img/goose-breast-thumb.jpg',
            category: 'Cakes',
            createDate: '21.03.2018',
            status: 'PROCESSED',
            statusColor: 'secondary',
            description: 'Chocolate cake with berries',
            sales: 1014,
            stock: 41,
        },
    ]
    const cols = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'title',

                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Sales',
                accessor: 'sales',
                cellClass: 'text-muted w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Stock',
                accessor: 'stock',
                cellClass: 'text-muted w-20',

                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Category',
                accessor: 'category',
                cellClass: 'text-muted w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Action',
                accessor: 'id',
                cellClass: 'text-muted w-20',
                Cell: (props) => <><Button color="primary"
                    size="xs"
                    outline onClick={() => {
                        console.log(props.value)
                    }}>View</Button></>,
            },
        ],
        []
    );


    return (
        <>
            <Row>
                <Colxx xxs="12" sm="6">
                    {/* <p className="mb-0 text-muted">ColoredStrategies 2020</p> */}
                    <h1>User List </h1>
                </Colxx>
                <Colxx className="col-sm-6 d-none d-sm-block" style={{ backgroundColor: "" }}>


                    {/* <Button color="primary"
                        size="xs"
                        outline><i className="iconsminds-add d-block" /> Add</Button> */}
                    <Row>
                        <Colxx xxs="12" sm="6">

                        </Colxx>
                        <Colxx xxs="12" sm="6">
                            <Button color="primary"
                                size="lg"
                                outline>Add User</Button>

                        </Colxx>

                    </Row>





                </Colxx>
                {/* <Colxx xxs="12">
               
                    
                    <Separator className="mb-5" />
                </Colxx> */}
            </Row>
            <Row>
                <Colxx xxs="12">
                    <Card className="mb-4">
                        <CardBody>
                            <Table columns={cols} data={produtcs} />

                        </CardBody>

                    </Card>



                </Colxx>
            </Row>
        </>
    );
};
export default injectIntl(ListOfUserDefault);
