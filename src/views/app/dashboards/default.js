// import React from 'react';
import React, { useState, useEffect, createRef } from "react";
import { injectIntl } from "react-intl";
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { Row, Button } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import {
  Card, CardBody, CardTitle, Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
// import DatatablePagination from '../../../components/DatatablePagination';
// import DatatablePagination from '../../../components/DatatablePagination';
import {
  CardText,
  CardSubtitle,
  CardImg,
  Badge,
} from 'reactstrap';
// import MUIDataTable from 'mui-datatables';
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
  postRequestMultipart,
  getRequest,
  postRequest,
  postEwalletRequest
} from "../../../utils/request";



const ListOfUserDefault = ({ intl, match }) => {
  console.log(match)
  // const data = [["Nischal Narn", "nischal@gmail.com", "9632587410", "200", "niswer2020", "Paid"]];

  const [UserList, setUserList] = React.useState([])
  const [addproducttoggle, setaddproducttoggle] = React.useState(false)

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
        <Colxx xxs="12" sm="12" md="6" lg="6">
          {/* <p className="mb-0 text-muted">ColoredStrategies 2020</p> */}
          <h1 style={{ color: "#008ecc" }}>Dash Board </h1>
        </Colxx>
        <Colxx xxs="12" sm="12" md="6" lg="6" >
          {/* <p className="mb-0 text-muted">ColoredStrategies 2020</p> */}

        </Colxx>











      </Row>
      <Separator />
      <br />



      <div>
        <Row>
          <Colxx xxs="12" xs="6" lg="4">
            <Card className="mb-4">

              <CardBody>
                <CardSubtitle className="mb-4">
                  <Row>
                    <Colxx sm="6" xxs="6" md="6" lg="6">
                      <CardText className=" ">
                        <h5><strong>Total Products</strong></h5>
                      </CardText>

                    </Colxx>

                    <Colxx sm="6" xxs="6" md="6" lg="6">
                      <CardText className=" ">
                        <h5><strong>50</strong></h5>

                      </CardText></Colxx>
                  </Row>
                  <Separator />

                </CardSubtitle>
                <Row>
                  <Colxx sm="6" xxs="6" md="6" lg="6">
                    <CardText className=" ">
                      <h5><strong>Total Approved</strong></h5>
                    </CardText>

                  </Colxx>

                  <Colxx sm="6" xxs="6" md="6" lg="6">
                    <CardText className=" ">
                      <h5><strong>30</strong></h5>

                    </CardText></Colxx>
                </Row>
                <Row>
                  <Colxx sm="6" xxs="6" md="6" lg="6">
                    <CardText className=" ">
                      <h5><strong>Total Pending</strong></h5>
                    </CardText>

                  </Colxx>

                  <Colxx sm="6" xxs="6" md="6" lg="6">
                    <CardText className=" ">
                      <h5><strong>10</strong></h5>

                    </CardText></Colxx>
                </Row>
                <Row>
                  <Colxx sm="6" xxs="6" md="6" lg="6">
                    <CardText className=" ">
                      <h5><strong>Total Rejected</strong></h5>
                    </CardText>

                  </Colxx>

                  <Colxx sm="6" xxs="6" md="6" lg="6">
                    <CardText className=" ">
                      <h5><strong>10</strong></h5>

                    </CardText></Colxx>
                </Row>
                {/* <Row>
                  <Colxx sm="12" xxs="12" md="6" lg="6">
                    <CardText className=" ">
                      

                      <h6><strong>Total Approved</strong></h6>
                      <h6><strong>Total Pending</strong></h6>
                      <h6><strong>Total Rejected</strong></h6>

                    </CardText></Colxx>
                  <Colxx sm="12" xxs="12" md="6" lg="6">
                    <CardText className=" ">
                      <center>
                        <h6><strong>30</strong></h6>
                        <h6><strong>10</strong></h6>
                        <h6><strong>10</strong></h6>
                      </center>

                    </CardText></Colxx>
                </Row> */}

              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12" xs="6" lg="4">
            <Card className="mb-4">

              <CardBody>
                <CardSubtitle className="mb-4">
                  <Row>
                    <Colxx sm="6" xxs="6" md="6" lg="6">
                      <CardText className=" ">
                        <h5><strong>Selling Category</strong></h5>
                      </CardText>

                    </Colxx>

                    <Colxx sm="6" xxs="6" md="6" lg="6">
                      <CardText className=" ">
                        <h5><strong>$3500</strong></h5>

                      </CardText></Colxx>
                  </Row>
                  <Separator />

                </CardSubtitle>
                <Row>
                  <Colxx sm="6" xxs="6" md="6" lg="6">
                    <CardText className=" ">
                      <h5><strong>Coin</strong></h5>
                    </CardText>

                  </Colxx>

                  <Colxx sm="6" xxs="6" md="6" lg="6">
                    <CardText className=" ">
                      <h5><strong>$330</strong></h5>

                    </CardText></Colxx>
                </Row>
                <Row>
                  <Colxx sm="6" xxs="6" md="6" lg="6">
                    <CardText className=" ">
                      <h5><strong>Painting</strong></h5>
                    </CardText>

                  </Colxx>

                  <Colxx sm="6" xxs="6" md="6" lg="6">
                    <CardText className=" ">
                      <h5><strong>$310</strong></h5>

                    </CardText></Colxx>
                </Row>
                <Row>
                  <Colxx sm="6" xxs="6" md="6" lg="6">
                    <CardText className=" ">
                      <h5><strong>Metal</strong></h5>
                    </CardText>

                  </Colxx>

                  <Colxx sm="6" xxs="6" md="6" lg="6">
                    <CardText className=" ">
                      <h5><strong>$1200</strong></h5>

                    </CardText></Colxx>
                </Row>
                {/* <Row>
                  <Colxx sm="12" xxs="12" md="6" lg="6">
                    <CardText className=" ">
                      

                      <h6><strong>Total Approved</strong></h6>
                      <h6><strong>Total Pending</strong></h6>
                      <h6><strong>Total Rejected</strong></h6>

                    </CardText></Colxx>
                  <Colxx sm="12" xxs="12" md="6" lg="6">
                    <CardText className=" ">
                      <center>
                        <h6><strong>30</strong></h6>
                        <h6><strong>10</strong></h6>
                        <h6><strong>10</strong></h6>
                      </center>

                    </CardText></Colxx>
                </Row> */}

              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12" xs="6" lg="4">
            <Card className="mb-4">

              <CardBody>
                <CardSubtitle className="mb-4">
                  <Row>
                    <Colxx sm="6" xxs="6" md="6" lg="6">
                      <CardText className=" ">
                        <h5><strong>Total Category</strong></h5>
                      </CardText>

                    </Colxx>

                    <Colxx sm="6" xxs="6" md="6" lg="6">
                      <CardText className=" ">
                        <h5><strong>3</strong></h5>

                      </CardText></Colxx>
                  </Row>
                  <Separator />

                </CardSubtitle>
                <Row>
                  <Colxx sm="6" xxs="6" md="6" lg="6">
                    <CardText className=" ">
                      <h5><strong>Coin</strong></h5>
                    </CardText>

                  </Colxx>

                  <Colxx sm="6" xxs="6" md="6" lg="6">
                    <CardText className=" ">
                      <h5><strong>30</strong></h5>

                    </CardText></Colxx>
                </Row>
                <Row>
                  <Colxx sm="6" xxs="6" md="6" lg="6">
                    <CardText className=" ">
                      <h5><strong>Painting</strong></h5>
                    </CardText>

                  </Colxx>

                  <Colxx sm="6" xxs="6" md="6" lg="6">
                    <CardText className=" ">
                      <h5><strong>10</strong></h5>

                    </CardText></Colxx>
                </Row>
                <Row>
                  <Colxx sm="6" xxs="6" md="6" lg="6">
                    <CardText className=" ">
                      <h5><strong>Metal</strong></h5>
                    </CardText>

                  </Colxx>

                  <Colxx sm="6" xxs="6" md="6" lg="6">
                    <CardText className=" ">
                      <h5><strong>10</strong></h5>

                    </CardText></Colxx>
                </Row>
                {/* <Row>
                  <Colxx sm="12" xxs="12" md="6" lg="6">
                    <CardText className=" ">
                      

                      <h6><strong>Total Approved</strong></h6>
                      <h6><strong>Total Pending</strong></h6>
                      <h6><strong>Total Rejected</strong></h6>

                    </CardText></Colxx>
                  <Colxx sm="12" xxs="12" md="6" lg="6">
                    <CardText className=" ">
                      <center>
                        <h6><strong>30</strong></h6>
                        <h6><strong>10</strong></h6>
                        <h6><strong>10</strong></h6>
                      </center>

                    </CardText></Colxx>
                </Row> */}

              </CardBody>
            </Card>
          </Colxx>
          {/* <Colxx xxs="12" xs="6" lg="4">
            <Card className="mb-4">

              <CardBody>
                <CardSubtitle className="mb-4">
                  <Row>
                    <Colxx sm="12" xxs="12" md="6" lg="6">
                      <CardText className=" ">
                        <h5><strong>Total Category</strong></h5>
                      </CardText></Colxx>
                    <Colxx sm="12" xxs="12" md="6" lg="6">
                      <CardText className=" ">
                        <center><h5><strong>3</strong></h5></center>

                      </CardText></Colxx>
                  </Row>
                  <Separator />

                </CardSubtitle>
                <Row>
                  <Colxx sm="12" xxs="12" md="6" lg="6">
                    <CardText className=" ">
                      <h6><strong>Coin</strong></h6>
                      <h6><strong>Painting</strong></h6>
                      <h6><strong>Metal</strong></h6>


                    </CardText></Colxx>
                  <Colxx sm="12" xxs="12" md="6" lg="6">
                    <CardText className=" ">
                      <center>
                        <h6><strong>30</strong></h6>
                        <h6><strong>10</strong></h6>
                        <h6><strong>10</strong></h6>
                      </center>

                    </CardText></Colxx>
                </Row>

              </CardBody>
            </Card>
          </Colxx> */}
          {/* <Colxx xxs="12" xs="6" lg="4">
            <Card className="mb-4">

              <CardBody>
                <CardSubtitle className="mb-4">
                  <Row>
                    <Colxx sm="12" xxs="12" md="6" lg="6">
                      <CardText className=" ">
                        <h5><strong> Selling Category</strong></h5>
                      </CardText></Colxx>
                    <Colxx sm="12" xxs="12" md="6" lg="6">
                      <CardText className=" ">
                        <center><h5><strong>$ 3500</strong></h5></center>

                      </CardText></Colxx>
                  </Row>
                  <Separator />

                </CardSubtitle>
                <Row>
                  <Colxx sm="12" xxs="12" md="6" lg="6">
                    <CardText className=" ">
                      <h6><strong>Coin</strong></h6>
                      <h6><strong>Painting</strong></h6>
                      <h6><strong>Metal</strong></h6>


                    </CardText></Colxx>
                  <Colxx sm="12" xxs="12" md="6" lg="6">
                    <CardText className=" ">
                      <center>
                        <h6><strong>$450</strong></h6>
                        <h6><strong>$700</strong></h6>
                        <h6><strong>$1200</strong></h6>
                      </center>

                    </CardText></Colxx>
                </Row>

              </CardBody>
            </Card>
          </Colxx> */}
          {/* <Colxx xxs="12" xs="6" lg="4">
            <Card className="mb-4">
              
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
          </Colxx> */}
          {/* <Colxx xxs="12" xs="6" lg="4">
            <Card className="mb-4">
              <div className="position-relative">
                <CardImg
                  top
                  src="/assets/img/antique2.png"
                  alt="Card image cap"
                  style={{ height: "40vh" }}
                />
               
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
          </Colxx> */}


          {/* <Colxx xxs="12">
                    <Card className="mb-4">

                        <CardBody>
                      

                            <Table columns={cols} data={produtcs} />

                        </CardBody>



                    </Card>



                </Colxx> */}
        </Row>
      </div>

    </>
  );
};
export default injectIntl(ListOfUserDefault);
