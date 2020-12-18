// import React from 'react';
import React, { useState, useEffect, createRef } from "react";
import { injectIntl } from "react-intl";
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Row, Button } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import { Card, CardBody, CardTitle, Container, Form, Label, Input, CardImg } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import DatatablePagination from '../../../../components/DatatablePagination';
import moment from 'moment';
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

const KycListDefault = ({ intl, match }) => {
    console.log(match)
    // const data = [["Nischal Narn", "nischal@gmail.com", "9632587410", "200", "niswer2020", "Paid"]];


    const [pendingkyclist, setpendingkyclist] = React.useState([])
    const [listdetails, setlistdetails] = React.useState("list")
    const [name, setname] = React.useState("")
    const [valid_till, setvalid_till] = React.useState("")
    const [id_proof_hash, setid_proof_hash] = React.useState("")
    const [image_hash, setimage_hash] = React.useState("")
    const [proof_type, setproof_type] = React.useState("")
    const [comment, setcomment] = React.useState("")
    const [kycId, setkycId] = React.useState("")




    React.useEffect(() => {
        getkyclist()





    }, []);

    const getkyclist = () => {



        postEwalletRequest('listKYC').then((res) => {
            console.log(res)
            console.log(res.data)
            if (res.status == 1) {

                let filterarray = res.data.filter((value) => {
                    return value.approval_status == "Waiting"
                })

                setpendingkyclist(filterarray)

                // console.log(filterarray)

                // setpendingkyclist(res.data)
                // setpendingkyclist(res.data)



            }


        }).catch((error) => {
            console.log(error)
        })
    }



    const cols = React.useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',

                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Mobile',
                accessor: 'proof_number',
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'KYC ID',
                accessor: 'kyc_id',
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },

            {
                Header: 'KYC Status',
                accessor: 'approval_status',
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <>{props.value}</>,
            },
            {
                Header: 'Details',
                accessor: 'email',
                cellClass: 'list-item-heading w-20',
                Cell: (props) => <><Button color="primary"
                    size="xs"
                    outline onClick={() => {
                        // console.log(countryList)
                        // console.log(props.value)
                        console.log(props.data)
                        detailfunction(props.data, props.value)

                        // console.log(countryList)
                    }}>View</Button></>,
            },
            // {
            //     Header: 'Action',
            //     accessor: '_id',
            //     cellClass: 'text-muted w-20',
            //     Cell: (props) => <><Button color="primary"
            //         size="xs"
            //         outline onClick={() => {
            //             console.log(props.value)
            //         }}>View</Button></>,
            // },
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

    const detailfunction = (data, id) => {

        setlistdetails("detail")
        let filtercountry = data.filter((detail) => {
            return detail.email == id
        })

        console.log(filtercountry)


        filtercountry.forEach((value) => {
            setname(value.name)
            setvalid_till(value.valid_till)
            setid_proof_hash(value.id_proof_hash)
            setimage_hash(value.image_hash)
            setproof_type(value.proof_type)
            setkycId(value.kyc_id)
        })


    }

    const approvedfunction = () => {
        console.log("approve")
        setlistdetails("list")

        postEwalletRequest('updateApprovalStatus', {
            "kyc_id": kycId,
            "approval_status": "Approved",
            "approval_comment": comment
        }).then((response) => {
            console.log(response)
            if (response.status == 1) {
                getkyclist()



            }
            // getcountrylist()

        }).catch((error) => {
            console.log(error)
        })

    }

    const rejectfunction = () => {
        console.log("reject")
        setlistdetails("list")
        postEwalletRequest('updateApprovalStatus', {
            "kyc_id": kycId,
            "approval_status": "Rejected",
            "approval_comment": comment
        }).then((response) => {
            console.log(response)
            if (response.status == 1) {
                getkyclist()



            }
            // getcountrylist()

        }).catch((error) => {
            console.log(error)
        })

    }


    return (
        <>
            {listdetails == "list" ? (
                <div>
                    <Row>
                        <Colxx xxs="12" sm="6">
                            <h1 style={{ color: "#008ecc" }}>KYC List </h1>
                        </Colxx>


                    </Row>
                    <Row>
                        <Colxx xxs="12">
                            <Card className="mb-4">
                                <CardBody>
                                    <Table columns={cols} data={pendingkyclist} />

                                </CardBody>

                            </Card>



                        </Colxx>
                    </Row>
                </div>

            ) : (
                    <div>

                        <Row>
                            <Colxx xxs="12" sm="6">
                                <h1 style={{ color: "#008ecc" }}>Verification Details </h1>
                            </Colxx>


                        </Row>
                        <Row>
                            <Colxx xxs="12">
                                <Container>
                                    <Row>

                                        <Colxx lg="12">
                                            <Card>
                                                <CardBody>
                                                    <CardTitle>

                                                    </CardTitle>
                                                    <Row>
                                                        <Colxx lg="6">
                                                            <div className="imgcontainer" style={{ backgroundColor: "" }}>
                                                                {/* <h1 className="imgheading">Upload ID Proof</h1> */}
                                                                <h1 style={{ color: "#008ecc" }}>Uploaded Photo </h1>
                                                                <div className="imgholder">
                                                                    {/* <img src={file} alt="" className="img" /> */}
                                                                    {/* <object width="100%" height="150" data="https://backend.carnivalist.tk/images/file-1594962403745-4e8ee110-c7eb-11ea-8785-6743707faf75.pdf" >   </object> */}
                                                                    <object width="180%" height="80%" data={image_hash} style={{ marginTop: "" }} >   </object>
                                                                </div>


                                                            </div>
                                                            <div style={{ marginTop: "5%" }}>
                                                                <Form>
                                                                    <Label className="form-group has-float-label">

                                                                        Name
                                                <Input type="text" value={name} />
                                                                    </Label>

                                                                    <Label className="form-group has-float-label">

                                                                        Valid Till
                                                <Input type="text" value={moment(valid_till).format('DD/MM/YYYY')} />
                                                                    </Label>







                                                                    {/* <Button color="primary"
                                                            outline
                                                            size="lg"
                                                        >

                                                            Eidt
                                            </Button> */}
                                                                </Form>
                                                            </div>
                                                        </Colxx>
                                                        <Colxx lg="6">

                                                            <div className="imgcontainer" style={{ backgroundColor: "" }}>
                                                                {/* <h1 className="imgheading">Upload ID Proof</h1> */}
                                                                <h1 style={{ color: "#008ecc" }}>Uploaded ID Proof </h1>
                                                                <div className="imgholder">
                                                                    {/* <img src={file} alt="" className="img" /> */}
                                                                    {/* <object width="100%" height="150" data="https://backend.carnivalist.tk/images/file-1594962403745-4e8ee110-c7eb-11ea-8785-6743707faf75.pdf" >   </object> */}
                                                                    <object width="180%" height="80%" data={id_proof_hash} style={{ marginTop: "" }} >   </object>
                                                                </div>


                                                            </div>

                                                            <div style={{ marginTop: "5%" }}>
                                                                <Form>

                                                                    <Label className="form-group has-float-label">

                                                                        Valid Proof
                                                <Input type="text" value={proof_type} />
                                                                    </Label>
                                                                    <Label className="form-group has-float-label">

                                                                        Comment
                                                <Input type="text" value={comment} onChange={(e) => {
                                                                            setcomment(e.target.value)
                                                                        }} />
                                                                    </Label>







                                                                    {/* <Button color="primary"
                                                            outline
                                                            size="lg"
                                                        >

                                                            Eidt
                                            </Button> */}
                                                                </Form>
                                                            </div>



                                                            {/* <CardImg
                                                                    top
                                                                    src="http://3.15.154.217:30880/ipfs/QmR9mvtGPK1iUN3FuVNyoxTEDmZsptzfTuueuAnbkrLCkQ"
                                                                    alt="Card image cap"
                                                                /> */}
                                                            {/* <object width="130%" height="150" data="http://3.15.154.217:30880/ipfs/QmR9mvtGPK1iUN3FuVNyoxTEDmZsptzfTuueuAnbkrLCkQ" style={{ marginTop: "" }} ></object> */}



                                                        </Colxx>

                                                    </Row>
                                                    <Container>
                                                        <Row>
                                                            <Colxx lg="12">
                                                                <Button color="primary"
                                                                    outline
                                                                    size="lg"
                                                                    onClick={() => {
                                                                        approvedfunction()
                                                                    }}
                                                                >

                                                                    Approved
                                            </Button>{' '}
                                                                <Button color="primary"
                                                                    outline
                                                                    size="lg"
                                                                    onClick={() => {
                                                                        rejectfunction()
                                                                    }}
                                                                >

                                                                    Reject
                                            </Button>{' '}
                                                                <Button color="primary"
                                                                    outline
                                                                    size="lg"
                                                                    onClick={() => {
                                                                        setlistdetails("list")
                                                                    }}
                                                                >

                                                                    Cancel
                                            </Button>


                                                            </Colxx>


                                                        </Row>
                                                    </Container>


                                                </CardBody>
                                            </Card>

                                        </Colxx>


                                    </Row>

                                </Container>






                            </Colxx>
                        </Row>
                    </div>
                )}

        </>
    );
};
export default injectIntl(KycListDefault);
