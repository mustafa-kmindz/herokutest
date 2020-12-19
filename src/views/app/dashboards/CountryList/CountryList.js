// import React from 'react';
import React, { useState, useEffect, createRef } from "react";
import { injectIntl } from "react-intl";
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
// import { Row, Button } from 'reactstrap';
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

const CountryListDefault = ({ intl, match }) => {
    console.log(match)


    const [countryList, setcountryList] = React.useState([])
    const [addeditstatus, setaddeditstatus] = React.useState("list")
    const [country, setcountry] = React.useState("")
    const [currecycode, setcurrecycode] = React.useState("")
    const [Idfor, setIdfor] = React.useState("")




    React.useEffect(() => {
        getcountrylist()






    }, []);

    const getcountrylist = () => {
        setaddeditstatus("list")
        setcountry("")
        setcurrecycode("")
        setIdfor("")
        getRequest('/get-all-countrylist').then((response) => {
            if (response.code == 1) {

                setcountryList(response.getcountryList)

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
                Header: 'Country',
                accessor: 'country',

                cellClass: 'list-item-heading w-20',
                Cell: (props) => <><Flag code={props.value.slice(0, 2)} height="16" /> {props.value}</>,
            },
            {
                Header: 'Currency Code',
                accessor: 'code',
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Details',
                accessor: '_id',
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <><Button color="primary"
                    size="xs"
                    outline onClick={() => {
                        // console.log(countryList)
                        // console.log(props.value)
                        // console.log(props.data)
                        editfunction(props.data, props.value)

                        // console.log(countryList)
                    }}>View</Button></>,
            },

        ],
        []
    );
    const editfunction = (data, id) => {

        setaddeditstatus("edit")
        let filtercountry = data.filter((detail) => {
            return detail._id == id
        })


        filtercountry.forEach((value) => {
            setcountry(value.country)
            setcurrecycode(value.code)
            setIdfor(value._id)
        })


    }

    const addCountry = () => {


        if (!country) {
            alert("Please Select Country")
        }
        else if (!currecycode) {
            alert("Please Select Country Code")
        }
        else {
            // 


            postRequest('/create-countrylist', {
                country: country,
                code: currecycode
            }).then((response) => {
                // console.log(respones)
                if (response.code == 1) {
                    // alert(response.message)
                    getcountrylist()

                }
            }).catch((error) => {
                console.log(error)
            })
        }


    }

    const editsubmitfuction = () => {
        if (!country) {
            alert("Please Select Country")
        }
        else if (!currecycode) {
            alert("Please Select Country Code")
        }
        else {
            postRequest(`/edit-contrylist/${Idfor}`, {
                "country": country,
                "code": currecycode
            }).then((response) => {
                console.log(response)
                if (response.code == 1) {
                    // setidentificationtoggle(false)
                    // alert(response.status)
                    getcountrylist()
                }
                // getcountrylist()

            }).catch((error) => {
                console.log(error)
            })



        }

    }

    const deletesubmitfuction = () => {
        postRequest(`/delete-contrylist/${Idfor}`).then((response) => {
            console.log(response)
            if (response.code == 1) {
                // setidentificationtoggle(false)
                // alert(response.status)
                getcountrylist()
            }
            // getcountrylist()

        }).catch((error) => {
            console.log(error)
        })

    }


    return (
        <>
            <Row>
                <Colxx xxs="12" sm="6">

                    {addeditstatus == "list" ? <h1 style={{ color: "#008ecc" }}>Country List </h1> :
                        (addeditstatus == "add" ? <h1 style={{ color: "#008ecc" }}>Add Country List </h1> : <h1 style={{ color: "#008ecc" }}>Edit Country List </h1>)
                    }

                    {/* <h1 style={{ color: "#008ecc" }}>Country List </h1> */}
                </Colxx>
                <Colxx className="col-sm-6 d-none d-sm-block" style={{ backgroundColor: "" }}>



                    <Row>
                        <Colxx xxs="12" sm="6">

                        </Colxx>
                        {addeditstatus == "list" &&
                            <Colxx xxs="12" sm="6">
                                <Button color="primary"
                                    size="lg"
                                    outline
                                    onClick={() => {
                                        setaddeditstatus("add")
                                    }}>Add Country</Button>

                            </Colxx>

                        }


                    </Row>





                </Colxx>

            </Row>
            <div>
                {addeditstatus != "list" ?
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

                                                        <strong>Country</strong>
                                                        <Input type="text" value={country} onChange={(e) => {
                                                            // console.log(e)
                                                            setcountry(e.target.value)

                                                        }} />
                                                    </Label>
                                                    <Label className="form-group has-float-label">

                                                        <strong>Currency Code </strong>
                                                        <Input type="text" value={currecycode} onChange={(e) => {
                                                            setcurrecycode(e.target.value)
                                                        }} />
                                                    </Label>
                                                    {addeditstatus == "add" ?
                                                        <Button color="primary"
                                                            outline
                                                            size="lg"
                                                            onClick={() => {
                                                                console.log("click")
                                                                addCountry()


                                                            }}
                                                        >

                                                            Add
                                        </Button> : (<>

                                                            <Button color="primary"
                                                                outline
                                                                size="lg"
                                                                onClick={() => {
                                                                    console.log("click")
                                                                    editsubmitfuction()


                                                                }}
                                                            >

                                                                Edit
                                            </Button>{' '}
                                                            <Button color="primary"
                                                                outline
                                                                size="lg"
                                                                onClick={() => {
                                                                    console.log("click")
                                                                    deletesubmitfuction()


                                                                }}
                                                            >

                                                                Delete
                                            </Button></>)
                                                    }
                                                    {' '}
                                                    <Button color="primary"
                                                        outline
                                                        size="lg"
                                                        onClick={() => {
                                                            console.log("click")
                                                            setaddeditstatus("list")
                                                            setcurrecycode("")
                                                            setcountry("")
                                                        }}
                                                    >

                                                        Cancel
                                            </Button>
                                                </Form>
                                            </CardBody>
                                        </Card>

                                    </Colxx>
                                    <Colxx lg="2">

                                    </Colxx>

                                </Row>

                            </Container>




                        </Colxx>
                    </Row>
                    :
                    <Row>
                        <Colxx xxs="12">
                            <Card className="mb-4">
                                <CardBody>
                                    <Table columns={cols} data={countryList} />

                                </CardBody>

                            </Card>



                        </Colxx>
                    </Row>
                }
            </div>
        </>
    );
};
export default injectIntl(CountryListDefault);
