// import React from 'react';
import React, { useState, useEffect, createRef } from "react";
import { injectIntl } from "react-intl";
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Row, Button } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import {
    Card, CardBody, CardTitle, Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import DatatablePagination from '../../../../components/DatatablePagination';
import {
    CardText,
    CardSubtitle,
    CardImg,
    Badge,
} from 'reactstrap';
import Select from 'react-select';
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
    const [addproducttoggle, setaddproducttoggle] = React.useState(false)
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

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

    const selectData = [
        { label: 'Coin', value: 'Coin', key: 0 },
        { label: 'Metal', value: 'Metal', key: 1 },
        { label: 'Painting', value: 'Painting', key: 2 },
    ];


    return (
        <>
            <Row>
                <Colxx xxs="12" sm="12" md="6" lg="6">
                    {/* <p className="mb-0 text-muted">ColoredStrategies 2020</p> */}
                    <h1 style={{ color: "#008ecc" }}>Product Status </h1>
                </Colxx>
                <Colxx xxs="12" sm="12" md="6" lg="6" >
                    {/* <p className="mb-0 text-muted">ColoredStrategies 2020</p> */}
                    <Button style={{ marginLeft: "60%" }} onClick={() => {
                        setaddproducttoggle(true)
                    }}>
                        Add Product
                        </Button>
                </Colxx>











            </Row>
            <Separator />
            <br />
            {addproducttoggle ?

                <div>
                    <Row>
                        <Colxx xxs="12" sm="12" lg="12">
                            <Card className="mb-4">
                                <Row>
                                    <div className="form-side" style={{ marginLeft: "5%", marginTop: "5%", marginRight: "5%" }}>
                                        <CardTitle className="mb-4">
                                            Add Product For Sale
                                </CardTitle>
                                    </div>

                                    {/* <Colxx xxs="12" sm="12" lg="6" md="6">


                            </Colxx>
                            <Colxx xxs="12" xs="12" lg="6" md="6">

                            </Colxx> */}
                                </Row>
                                <Row style={{ marginLeft: "5%", marginBottom: "5%" }}>
                                    <Colxx md="4" xxs="12" sm="12" lg="4">
                                        <FormGroup className="form-group has-float-label  mb-4">
                                            <Label>
                                                {/* <IntlMessages id="user.fullname" /> */}
                Title
                </Label>
                                            <Input type="name" name="name" value="" onChange={(e) => {
                                                // console.log(e.target.value)
                                                // setname(e.target.value)
                                            }} />
                                        </FormGroup>
                                        <FormGroup className="form-group has-float-label  mb-4">
                                            <Label>
                                                {/* <IntlMessages id="user.fullname" /> */}
               Price
                </Label>
                                            <Input type="name" name="name" value="" onChange={(e) => {
                                                // console.log(e.target.value)
                                                // setname(e.target.value)
                                            }} />
                                        </FormGroup>
                                        <FormGroup className="form-group has-float-label  mb-4">
                                            <Label>
                                                {/* <IntlMessages id="user.fullname" /> */}
               Select Category
                </Label>

                                            <Select

                                                className="react-select"
                                                classNamePrefix="react-select"
                                                name="form-field-name"
                                                value={selectedOption}
                                                onChange={setSelectedOption}
                                                options={selectData}
                                            />
                                        </FormGroup>

                                        <FormGroup className="form-group has-float-label  mb-4">
                                            <Label>
                                                {/* <IntlMessages id="user.fullname" /> */}
                Description
                </Label>
                                            <Input type="textarea" name="name" value="" onChange={(e) => {
                                                // console.log(e.target.value)
                                                // setname(e.target.value)
                                            }} />
                                        </FormGroup>

                                        <Button outline>
                                            Submit
                                </Button>
                                        {' '}
                                        <Button outline onClick={() => {
                                            setaddproducttoggle(false)
                                        }}>
                                            Cancel
                                </Button>


                                    </Colxx>
                                    <Colxx md="8" xxs="12" lg="6" sm="12">
                                        <CardImg
                                            top
                                            src="/assets/img/antique3.jpg"
                                            alt="Card image cap"
                                            style={{ height: "40vh" }}
                                        />
                                        <br />
                                        <input type="file" />



                                    </Colxx>
                                </Row>

                            </Card>

                        </Colxx>

                    </Row>
                </div>
                :
                <div>
                    <Row>
                        <Colxx xxs="12" xs="6" lg="4">
                            <Card className="mb-4">
                                <div className="position-relative">

                                    <CardImg
                                        top
                                        src="/assets/img/antique3.jpg"
                                        alt="Card image cap"
                                        style={{ height: "40vh" }}
                                    />

                                    <Badge
                                        color="primary"
                                        pill
                                        className="position-absolute badge-top-left"
                                    >
                                        Status
                </Badge>
                                    <Badge
                                        color="success"
                                        pill
                                        className="position-absolute badge-top-left-2"
                                    >
                                        Approved
                </Badge>
                                </div>
                                <CardBody>
                                    <CardSubtitle className="mb-4">
                                        <h5><strong>Vintage Compass With Vintage Accesories</strong></h5>
                                    </CardSubtitle>
                                    <Row>
                                        <Colxx sm="12" xxs="12" md="6" lg="6">
                                            <CardText className=" ">
                                                <h6><strong>Price :</strong> $200</h6>
                                            </CardText></Colxx>
                                        <Colxx sm="12" xxs="12" md="6" lg="6">
                                            <CardText className=" ">
                                                <Button outline>
                                                    Details
                                       </Button>
                                            </CardText></Colxx>
                                    </Row>

                                </CardBody>
                            </Card>
                        </Colxx>
                        <Colxx xxs="12" xs="6" lg="4">
                            <Card className="mb-4">
                                <div className="position-relative">
                                    <CardImg
                                        top
                                        src="/assets/img/antique4.jpg"
                                        alt="Card image cap"
                                        style={{ height: "40vh" }}
                                    />
                                    <Badge
                                        color="primary"
                                        pill
                                        className="position-absolute badge-top-left"
                                    >
                                        Status
                </Badge>
                                    <Badge
                                        color="warning"
                                        pill
                                        className="position-absolute badge-top-left-2"
                                    >
                                        Waiting
                </Badge>
                                </div>
                                <CardBody>
                                    <CardSubtitle className="mb-4">
                                        <h5><strong>Vintage Compass With Vintage Accesories</strong></h5>
                                    </CardSubtitle>
                                    <Row>
                                        <Colxx sm="12" xxs="12" md="6" lg="6">
                                            <CardText className=" ">
                                                <h6><strong>Price :</strong> $200</h6>
                                            </CardText></Colxx>
                                        <Colxx sm="12" xxs="12" md="6" lg="6">
                                            <CardText className=" ">
                                                <Button outline>
                                                    Details
                                       </Button>
                                            </CardText></Colxx>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Colxx>
                        <Colxx xxs="12" xs="6" lg="4">
                            <Card className="mb-4">
                                <div className="position-relative">
                                    <CardImg
                                        top
                                        src="/assets/img/antique2.png"
                                        alt="Card image cap"
                                        style={{ height: "40vh" }}
                                    />
                                    <Badge
                                        color="primary"
                                        pill
                                        className="position-absolute badge-top-left"
                                    >
                                        Status
                </Badge>
                                    <Badge
                                        color="danger"
                                        pill
                                        className="position-absolute badge-top-left-2"
                                    >
                                        Rejected
                </Badge>
                                </div>
                                <CardBody>
                                    <CardSubtitle className="mb-4">
                                        <h5><strong>Vintage Compass With Vintage Accesories</strong></h5>
                                    </CardSubtitle>
                                    <Row>
                                        <Colxx sm="12" xxs="12" md="6" lg="6">
                                            <CardText className=" ">
                                                <h6><strong>Price :</strong> $200</h6>
                                            </CardText></Colxx>
                                        <Colxx sm="12" xxs="12" md="6" lg="6">
                                            <CardText className=" ">
                                                <Button outline>
                                                    Details
                                       </Button>
                                            </CardText></Colxx>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Colxx>
                        <Colxx xxs="12" xs="6" lg="4">
                            <Card className="mb-4">
                                <div className="position-relative">
                                    <CardImg
                                        top
                                        src="/assets/img/antique.png"
                                        alt="Card image cap"
                                        style={{ height: "40vh" }}
                                    />
                                    <Badge
                                        color="primary"
                                        pill
                                        className="position-absolute badge-top-left"
                                    >
                                        Status
                </Badge>
                                    <Badge
                                        color="secondary"
                                        pill
                                        className="position-absolute badge-top-left-2"
                                    >
                                        Approved
                </Badge>
                                </div>
                                <CardBody>
                                    <CardSubtitle className="mb-4">
                                        <h5><strong>Vintage Compass With Vintage Accesories</strong></h5>
                                    </CardSubtitle>
                                    <Row>
                                        <Colxx sm="12" xxs="12" md="6" lg="6">
                                            <CardText className=" ">
                                                <h6><strong>Price :</strong> $200</h6>
                                            </CardText></Colxx>
                                        <Colxx sm="12" xxs="12" md="6" lg="6">
                                            <CardText className=" ">
                                                <Button outline>
                                                    Details
                                       </Button>
                                            </CardText></Colxx>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Colxx>
                        <Colxx xxs="12" xs="6" lg="4">
                            <Card className="mb-4">
                                <div className="position-relative">
                                    <CardImg
                                        top
                                        src="/assets/img/antique.png"
                                        alt="Card image cap"
                                        style={{ height: "40vh" }}
                                    />
                                    <Badge
                                        color="primary"
                                        pill
                                        className="position-absolute badge-top-left"
                                    >
                                        Status
                </Badge>
                                    <Badge
                                        color="secondary"
                                        pill
                                        className="position-absolute badge-top-left-2"
                                    >
                                        Approved
                </Badge>
                                </div>
                                <CardBody>
                                    <CardSubtitle className="mb-4">
                                        <h5><strong>Vintage Compass With Vintage Accesories</strong></h5>
                                    </CardSubtitle>
                                    <Row>
                                        <Colxx sm="12" xxs="12" md="6" lg="6">
                                            <CardText className=" ">
                                                <h6><strong>Price :</strong> $200</h6>
                                            </CardText></Colxx>
                                        <Colxx sm="12" xxs="12" md="6" lg="6">
                                            <CardText className=" ">
                                                <Button outline>
                                                    Details
                                       </Button>
                                            </CardText></Colxx>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Colxx>
                        {/* <Colxx xxs="12">
                    <Card className="mb-4">

                        <CardBody>
                      

                            <Table columns={cols} data={produtcs} />

                        </CardBody>



                    </Card>



                </Colxx> */}
                    </Row>
                </div>
            }
        </>
    );
};
export default injectIntl(ListOfUserDefault);
