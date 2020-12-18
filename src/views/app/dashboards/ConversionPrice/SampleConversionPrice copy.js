// import React from 'react';
import React, { useState, useEffect, createRef } from "react";
import { injectIntl } from "react-intl";
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Row, Button, Form, Label, Input } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import { Card, CardBody, CardTitle, Container } from 'reactstrap';
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
import Flag from 'react-world-flags'

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

const ConversionPriceDefault = ({ intl, match }) => {
    console.log(match)
    // const data = [["Nischal Narn", "nischal@gmail.com", "9632587410", "200", "niswer2020", "Paid"]];

    const [conversionpircelist, setconversionpircelist] = React.useState([])




    React.useEffect(() => {
        getconverisonpricelist()







    }, []);

    const getconverisonpricelist = () => {
        getRequest('/get-all-conversionPricelist').then((response) => {
            if (response.code == 1) {

                setconversionpircelist(response.saveConversionPriceList)

            }
            console.log(response)
        }).catch((error) => {
            console.log(error)
            alert(error)
        })
    }
    const cols = React.useMemo(
        () => [
            {
                Header: 'Country From',
                accessor: 'countryfrom',

                cellClass: 'list-item-heading w-20',
                Cell: (props) => <><Flag code={props.value.slice(0, 2)} height="16" /> {props.value}</>,
            },
            {
                Header: 'Country To',
                accessor: 'countryto',
                cellClass: 'text-muted w-20',
                Cell: (props) => <><Flag code={props.value.slice(0, 2)} height="16" /> {props.value}</>,
            },
            {
                Header: 'Conversion Price',
                accessor: 'amount',
                cellClass: 'text-muted w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Details',
                accessor: '_id',
                cellClass: 'text-muted w-20',
                Cell: (props) => <><Button color="primary"
                    size="xs"
                    outline onClick={() => {
                        console.log(props.value)
                    }}>View</Button></>,
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
                    <h1 style={{ color: "#008ecc" }}>Conversion Price List </h1>
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
                                outline>Add Country</Button>

                        </Colxx>

                    </Row> */}





                </Colxx>

            </Row>
            <Row>
                <Colxx xxs="12">
                    <Container>
                        <Row>
                            <Colxx lg="2">
                                {/* <Card className="mb-4">
                                    <CardBody>
                                        

                                    </CardBody>


                                </Card> */}
                            </Colxx>
                            <Colxx lg="8">
                                <Card>
                                    <CardBody>
                                        <CardTitle>

                                        </CardTitle>

                                        <Form>
                                            <Label className="form-group has-float-label">

                                                Country From
                                                <Input type="text" />
                                            </Label>
                                            <Label className="form-group has-float-label">

                                                Country Code From
                                                <Input type="text" />
                                            </Label>
                                            <Label className="form-group has-float-label">

                                                Country To
                                                <Input type="text" />
                                            </Label>
                                            <Label className="form-group has-float-label">

                                                Country Code To
                                                <Input type="text" />
                                            </Label>
                                            <Label className="form-group has-float-label">

                                                Price
                                                <Input type="text" />
                                            </Label>






                                            <Button color="primary"
                                                outline
                                                size="lg"
                                            >

                                                Eidt
                                            </Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                                {/* <Card className="mb-4">
                                   
                                    <CardBody>
                                        

                                    </CardBody>


                                </Card> */}
                            </Colxx>
                            <Colxx lg="2">
                                {/* <Card className="mb-4">
                                    <CardBody>
                                   

                                    </CardBody>


                                </Card> */}
                            </Colxx>

                        </Row>

                    </Container>




                </Colxx>
            </Row>
            <Row>
                <Colxx xxs="12">
                    <Container>
                        <Card className="mb-4">
                            <CardBody>
                                <Table columns={cols} data={conversionpircelist} />

                            </CardBody>

                        </Card>
                    </Container>




                </Colxx>
            </Row>
        </>
    );
};
export default injectIntl(ConversionPriceDefault);
