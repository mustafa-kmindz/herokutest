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

const FeesSettingDefault = ({ intl, match }) => {
    console.log(match)
    // const data = [["Nischal Narn", "nischal@gmail.com", "9632587410", "200", "niswer2020", "Paid"]];

    const [conversionpircelist, setconversionpircelist] = React.useState([])
    const [percentage, setpercentage] = React.useState(0)
    const [amount, setamount] = React.useState(0)




    React.useEffect(() => {
        gettransactionfees()







    }, []);

    const gettransactionfees = () => {
        getRequest('/website-settings/get-payment-gateway-charges').then((response) => {
            if (response.code == 1) {
                setpercentage(response.paymentGatewayCharges.percentage)
                setamount(response.paymentGatewayCharges.amount)



            }
            console.log(response)
        }).catch((error) => {
            console.log(error)
            alert(error)
        })
    }

    const saveClick = () => {


        postRequest('/website-settings/update-payment-gateway-charges', {
            amount: amount,
            percentage: percentage
        }).then((response) => {
            if (response.code == 1) {
                // setpercentage(response.paymentGatewayCharges.percentage)
                // setamount(response.paymentGatewayCharges.amount)
                alert(response.message)
                gettransactionfees()



            }
            console.log(response)
        }).catch((error) => {
            console.log(error)
            alert(error)
        })

    }




    return (
        <>
            <Row>
                <Colxx xxs="12" sm="6">
                    {/* <p className="mb-0 text-muted">ColoredStrategies 2020</p> */}
                    <h1 style={{ color: "#008ecc" }}>Transaction Fees </h1>
                </Colxx>
                <Colxx className="col-sm-6 d-none d-sm-block" style={{ backgroundColor: "" }}>








                </Colxx>

            </Row>
            <Row>
                <Colxx xxs="12">
                    <Container>
                        <Row>
                            <Colxx lg="2">

                            </Colxx>
                            <Colxx lg="8">
                                <Card>
                                    <CardBody>
                                        <CardTitle>

                                        </CardTitle>

                                        <Container>
                                            <Row>
                                                <Colxx md="5" style={{ backgroundColor: "" }}>
                                                    <Form>
                                                        <Label className="form-group has-float-label">

                                                            <strong>Percentage</strong>
                                                            <Input type="number" value={percentage} onChange={(e) => {
                                                                setpercentage(e.target.value)
                                                            }} />
                                                        </Label>
                                                    </Form>
                                                </Colxx>
                                                <Colxx md="2" style={{ backgroundColor: "", marginTop: "3%" }}>
                                                    <strong>And</strong>
                                                </Colxx>
                                                <Colxx md="5" style={{ backgroundColor: "" }}>
                                                    <Form>
                                                        <Label className="form-group has-float-label">

                                                            <strong>Amount</strong>
                                                            <Input type="number" value={amount} onChange={(e) => {
                                                                setamount(e.target.value)
                                                            }} />
                                                        </Label>
                                                    </Form>
                                                </Colxx>
                                            </Row>
                                            <Row>
                                                <Button color="primary"
                                                    outline
                                                    size="lg"
                                                    onClick={() => {
                                                        console.log("click")
                                                        saveClick()

                                                    }}
                                                >

                                                    Save
                                            </Button>
                                            </Row>


                                        </Container>


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

        </>
    );
};
export default injectIntl(FeesSettingDefault);
