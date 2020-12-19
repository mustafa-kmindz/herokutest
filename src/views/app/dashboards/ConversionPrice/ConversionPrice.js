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
    const [countryCodefrom, setcountryCodefrom] = React.useState("")
    const [countryCodeto, setcountryCodeto] = React.useState("")
    const [countryfrom, setcountryfrom] = React.useState("")
    const [countryto, setcountryto] = React.useState("")
    const [Idfor, setIdfor] = React.useState("")
    const [edittoggle, setedittoggle] = React.useState(false)
    const [amount, setamount] = React.useState("")
    const [samplelist, setsamplelist] = React.useState([])





    React.useEffect(() => {
        getconverisonpricelist()







    }, []);

    const getconverisonpricelist = () => {
        getRequest('/get-all-conversionPricelist').then((response) => {
            if (response.code == 1) {

                setconversionpircelist(response.saveConversionPriceList)

                console.log(response.saveConversionPriceList)

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
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <><Flag code={props.value.slice(0, 2)} height="16" /> {props.value}</>,
            },
            {
                Header: 'Conversion Price',
                accessor: 'amount',
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Details',
                accessor: '_id',
                cellClass: 'text-muted w-20',
                Cell: (props) => <><Button color="primary"
                    size="lg"
                    outline onClick={() => {

                        // console.log(props.value)
                        // console.log(conversionpircelist)
                        // console.log(samplelist)
                        // checksamplelist()
                        seteditform(props.value)


                    }}>View</Button></>,
            },

        ],
        []
    );




    const seteditform = (e) => {
        setedittoggle(true)

        getRequest('/get-all-conversionPricelist').then((response) => {
            if (response.code == 1) {
                let filterconversionlist = response.saveConversionPriceList.filter((detail) => {
                    return detail._id == e
                })

                console.log(filterconversionlist)
                filterconversionlist.forEach((value) => {
                    console.log(value)
                    setamount(value.amount)
                    setcountryCodefrom(value.countryCodefrom)
                    setcountryCodeto(value.countryCodeto)
                    setcountryfrom(value.countryfrom)
                    setcountryto(value.countryto)
                    setIdfor(value._id)

                })




            }

        }).catch((error) => {
            console.log(error)
            alert(error)
        })








    }

    const editfunction = (value) => {
        // console.log(e.target.value)
        // console.log(value)
        // console.log(countryto)
        setedittoggle(false)
        postRequest(`/edit-conversionPricelist/${value}`, {
            "amount": amount,
            "countryCodefrom": countryCodefrom,
            "countryCodeto": countryCodeto,
            "countryfrom": countryfrom,
            "countryto": countryto
        }).then((response) => {
            console.log(response)
            if (response.code == 1) {
                getconverisonpricelist()

            }
            // getcountrylist()

        }).catch((error) => {
            console.log(error)
        })

    }

    console.log(conversionpircelist)


    return (
        <>
            <Row>
                <Colxx xxs="12" sm="6">
                    {/* <p className="mb-0 text-muted">ColoredStrategies 2020</p> */}
                    {edittoggle ? <h1 style={{ color: "#008ecc" }}> Edit Conversion Price List </h1> : <h1 style={{ color: "#008ecc" }}>Conversion Price List </h1>}

                </Colxx>
                <Colxx className="col-sm-6 d-none d-sm-block" style={{ backgroundColor: "" }}>





                </Colxx>

            </Row>
            {edittoggle ?
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


                                            <Form>
                                                <Label className="form-group has-float-label">

                                                    <strong>Country From</strong>
                                                    <Input type="text" value={countryfrom} onChange={(e) => {
                                                        setcountryfrom(e.target.value)

                                                    }} />
                                                </Label>
                                                <Label className="form-group has-float-label">

                                                    <strong>Country Code From</strong>
                                                    <Input type="text" value={countryCodefrom} onChange={(e) => {
                                                        setcountryCodefrom(e.target.value)
                                                    }} />
                                                </Label>
                                                <Label className="form-group has-float-label">

                                                    <strong>Country To</strong>
                                                    <Input type="text" value={countryto} onChange={(e) => {
                                                        setcountryto(e.target.value)
                                                    }} />
                                                </Label>
                                                <Label className="form-group has-float-label">

                                                    <strong>Country Code To</strong>
                                                    <Input type="text" value={countryCodeto} onChange={(e) => {
                                                        setcountryCodeto(e.target.value)
                                                    }} />
                                                </Label>
                                                <Label className="form-group has-float-label">

                                                    <strong>Price</strong>
                                                    <Input type="text" value={amount} onChange={(e) => {
                                                        setamount(e.target.value)
                                                    }} />
                                                </Label>






                                                <Button color="primary"
                                                    outline
                                                    size="lg"
                                                    onClick={() => {
                                                        editfunction(Idfor)
                                                    }}
                                                >

                                                    Edit
                                            </Button>{' '}
                                                <Button color="primary"
                                                    outline
                                                    size="lg"
                                                    onClick={() => {
                                                        setedittoggle(false)
                                                        setamount("")
                                                        setcountryCodefrom("")
                                                        setcountryCodeto("")
                                                        setcountryfrom("")
                                                        setcountryto("")
                                                        setIdfor("")
                                                    }}
                                                >

                                                    Cancel
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
                :
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
            }
        </>
    );
};
export default injectIntl(ConversionPriceDefault);
