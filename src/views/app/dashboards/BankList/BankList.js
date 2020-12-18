// import React from 'react';
import React, { useState, useEffect, createRef } from "react";
import { injectIntl } from "react-intl";
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Row, Button, Form, Label, Input, FormGroup, Container } from 'reactstrap';
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

const BankListDefault = ({ intl, match }) => {
    console.log(match)
    // const data = [["Nischal Narn", "nischal@gmail.com", "9632587410", "200", "niswer2020", "Paid"]];

    const [countryList, setcountryList] = React.useState([])

    const [bankandcashList, setbankandcashList] = React.useState([])

    const [bankandcashtoggle, setbankandcashtoggle] = React.useState("Bank List")

    const [addeditstatus, setaddeditstatus] = React.useState("list")
    // const [cashpoint, cashpointlist] = React.useState("cashpointlist")

    const [CountryName, setCountryName] = React.useState("")

    const [bankname, setbankname] = React.useState("")
    const [state, setstate] = React.useState("")
    const [city, setcity] = React.useState("")
    const [Idfor, setIdfor] = React.useState("")



    React.useEffect(() => {
        getcountrylist()
        // getbankandcashlist()





    }, []);

    const getcountrylist = () => {
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

    const getbankandcashlist = (countryname) => {
        // console.log(bankandcashtoggle)
        getRequest('/get-all-banknadcashlist').then((response) => {
            if (response.code == 1) {
                const filterarraybanklist = response.getbankandcashList.filter((value) => {
                    return value.category == bankandcashtoggle && value.country == countryname
                })




                setbankandcashList(filterarraybanklist)

            }
            console.log(response)
        }).catch((error) => {
            console.log(error)
            alert(error)
        })
    }

    const getcommonbankandcashlist = (getvalue) => {

        setaddeditstatus("list")
        getRequest('/get-all-banknadcashlist').then((response) => {
            if (response.code == 1) {
                const filterarraybanklist = response.getbankandcashList.filter((value) => {
                    return value.category == getvalue && value.country == CountryName
                })




                setbankandcashList(filterarraybanklist)

            }
            console.log(response)
        }).catch((error) => {
            console.log(error)
            alert(error)
        })

    }

    const selectCountrybyid = (e) => {
        // console.log(e.target.value)
        setCountryName(e.target.value)
        getbankandcashlist(e.target.value)
    }

    const cols = React.useMemo(
        () => [
            {
                Header: 'BankName',
                accessor: 'bankname',

                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'City',
                accessor: 'city',
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'State',
                accessor: 'state',
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Action',
                accessor: '_id',
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <><Button color="primary"
                    size="xs"
                    outline onClick={() => {
                        console.log(props.value)

                        editfunction(props.data, props.value)
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

    const editfunction = (data, id) => {

        setaddeditstatus("edit")
        let filtercountry = data.filter((detail) => {
            return detail._id == id
        })

        console.log(filtercountry)


        filtercountry.forEach((value) => {
            console.log(value)
            setbankname(value.bankname)
            setcity(value.city)
            setstate(value.state)
            setIdfor(value._id)
        })


    }

    const setSubmitForm = (category) => {
        console.log(category)
        if (!bankname) {
            alert("Please Select Bank Name")
        }

        else if (!state) {
            alert("Please Select State Name")
        }

        else if (!city) {
            alert("Please Select City Name")
        }
        else {
            setaddeditstatus("list")
            postRequest('/create-bankandcashlist', {
                bankname: bankname,
                state: state,
                country: CountryName,
                city: city,
                category: category
            }).then((response) => {
                // console.log(respones)
                if (response.code == 1) {
                    setaddeditstatus("list")
                    alert(response.message)
                    setbankname("")
                    setstate("")
                    setcity("")

                    getcommonbankandcashlist(category)

                    // filterbandandcashpoint(CountryName, category)



                    // getcountrylist()

                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }


    const editsubmitfuction = (category) => {
        console.log(category)
        if (!bankname) {
            alert("Please Select Bank Name")
        }

        else if (!state) {
            alert("Please Select State Name")
        }

        else if (!city) {
            alert("Please Select City Name")
        }
        else {
            setaddeditstatus("list")
            postRequest(`/edit-bankandcashlist/${Idfor}`, {
                bankname: bankname,
                state: state,
                country: CountryName,
                city: city,
                category: category
            }).then((response) => {

                console.log(response)
                if (response.code == 1) {

                    alert(response.status)
                    setbankname("")
                    setstate("")
                    setcity("")
                    setIdfor("")

                    getcommonbankandcashlist(category)

                    // filterbandandcashpoint(CountryName, category)



                    // getcountrylist()

                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    const deletesubmitfuction = (category) => {
        setaddeditstatus("list")
        postRequest(`/delete-bandkandcashlist/${Idfor}`).then((response) => {

            console.log(response)
            if (response.code == 1) {

                alert(response.status)
                setbankname("")
                setstate("")
                setcity("")
                setIdfor("")

                getcommonbankandcashlist(category)

                // filterbandandcashpoint(CountryName, category)



                // getcountrylist()

            }
        }).catch((error) => {
            console.log(error)
        })

    }




    return (
        <>
            <Row>
                <Colxx xxs="12" sm="4">
                    <FormGroup>
                        <Label for="exampleSelect"><strong>Select Country</strong></Label>
                        <Input type="select" name="select" id="exampleSelect" onChange={selectCountrybyid}>
                            <option >Select.. </option>
                            {countryList.map(output => <option key={output._id} value={output.country}>{output.country}</option>)}
                        </Input>
                    </FormGroup>


                </Colxx>

            </Row>
            {CountryName &&
                <>

                    {addeditstatus == "list" ?


                        <div>




                            <Row>

                                <Colxx xxs="12" sm="8">
                                    {/* <p className="mb-0 text-muted">ColoredStrategies 2020</p> */}
                                    <Colxx xxs="12" sm="6">
                                        <Button color="primary"
                                            size="lg"
                                            outline
                                            style={{
                                                backgroundColor: bankandcashtoggle == "Bank List"
                                                    ? '#007bff'
                                                    : 'transparent',
                                                color: bankandcashtoggle == "Bank List" ? '#fff' : '#008ecc',
                                                // marginLeft: "5%"
                                            }}
                                            onClick={() => {
                                                setbankandcashtoggle("Bank List")
                                                getcommonbankandcashlist("Bank List")
                                            }}
                                        >Bank List</Button>{' '}
                                        <Button color="primary"
                                            size="lg"
                                            outline
                                            style={{
                                                backgroundColor: bankandcashtoggle == "Cash Point List"
                                                    ? '#007bff'
                                                    : 'transparent',
                                                color: bankandcashtoggle == "Cash Point List" ? '#fff' : '#008ecc',
                                                // marginLeft: "5%"
                                            }}
                                            onClick={() => {
                                                setbankandcashtoggle("Cash Point List")
                                                getcommonbankandcashlist("Cash Point List")
                                                // getbankandcashlist()

                                            }}


                                        >Cash Point List</Button>

                                    </Colxx>

                                </Colxx>
                                <Colxx className="col-sm-4 d-none d-sm-block" style={{ backgroundColor: "" }}>



                                    <Row>
                                        <Colxx xxs="12" sm="6">

                                        </Colxx>
                                        <Colxx xxs="12" sm="6">
                                            <Button color="primary"
                                                size="lg"
                                                outline
                                                onClick={() => {
                                                    setaddeditstatus("add")

                                                }}
                                            >Add Bank</Button>

                                        </Colxx>

                                    </Row>





                                </Colxx>

                            </Row>




                            <div>

                                <Row style={{ marginTop: "2%" }} >
                                    <Colxx xxs="12" sm="6">





                                        <h1 style={{ color: "#008ecc" }}>{bankandcashtoggle} </h1>


                                    </Colxx>
                                </Row>


                                <Row style={{ marginTop: "1%" }}>
                                    <Colxx xxs="12">
                                        <Card className="mb-4">
                                            <CardBody>
                                                <Table columns={cols} data={bankandcashList} />

                                            </CardBody>

                                        </Card>



                                    </Colxx>
                                </Row>
                            </div>











                        </div> :
                        <div>
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
                                                                {bankandcashtoggle == "Bank List" ? <strong>Bank Name</strong> :
                                                                    <strong>Cash Point Bank Name</strong>
                                                                }

                                                                <Input type="text" value={bankname} onChange={(e) => {
                                                                    // console.log(e)
                                                                    setbankname(e.target.value)

                                                                }} />
                                                            </Label>
                                                            <Label className="form-group has-float-label">

                                                                <strong>State </strong>
                                                                <Input type="text" value={state} onChange={(e) => {
                                                                    setstate(e.target.value)
                                                                }} />
                                                            </Label>
                                                            <Label className="form-group has-float-label">

                                                                <strong>City </strong>
                                                                <Input type="text" value={city} onChange={(e) => {
                                                                    // setcurrecycode(e.target.value)
                                                                    setcity(e.target.value)
                                                                }} />
                                                            </Label>
                                                            {addeditstatus == "add" ?
                                                                <Button color="primary"
                                                                    outline
                                                                    size="lg"
                                                                    onClick={() => {
                                                                        console.log("click")
                                                                        // addCountry()
                                                                        setSubmitForm(bankandcashtoggle)


                                                                    }}
                                                                >

                                                                    Add
                                        </Button> : (
                                                                    <>
                                                                        <Button color="primary"
                                                                            outline
                                                                            size="lg"
                                                                            onClick={() => {
                                                                                console.log("click")
                                                                                // editsubmitfuction()
                                                                                editsubmitfuction(bankandcashtoggle)


                                                                            }}
                                                                        >

                                                                            Edit
                                                                </Button>{' '}<Button color="primary"
                                                                            outline
                                                                            size="lg"
                                                                            onClick={() => {
                                                                                console.log("click")
                                                                                // editsubmitfuction()
                                                                                deletesubmitfuction(bankandcashtoggle)


                                                                            }}
                                                                        >

                                                                            Delete
                                            </Button>
                                                                    </>
                                                                )
                                                            }
                                                            {' '}
                                                            <Button color="primary"
                                                                outline
                                                                size="lg"
                                                                onClick={() => {
                                                                    console.log("click")
                                                                    // setaddeditstatus("list")
                                                                    // setcurrecycode("")
                                                                    // setcountry("")
                                                                    setaddeditstatus("list")
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

                        </div>
                    }
                </>
            }
        </>
    );
};
export default injectIntl(BankListDefault);
