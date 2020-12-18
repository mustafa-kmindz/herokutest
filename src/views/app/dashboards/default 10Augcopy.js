// import React from 'react';
import React, { useState, useEffect, createRef } from "react";
import { Wizard, Steps, Step } from "react-albus";

import { Formik, Field } from "formik";
import Flag from "react-world-flags";
import { injectIntl } from "react-intl";
import IntlMessages from "../../../helpers/IntlMessages";
import BottomNavigation from "../../../components/wizard/BottomNavigation";
import TopNavigation from "../../../components/wizard/TopNavigation";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
// import Select from 'react-select';
import { Colxx } from "../../../components/common/CustomBootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import usd from "../../../assets/images/canada-flag-square-small.png";
import {
  Row,
  Card,
  Badge,
  CardBody,
  CardTitle,
  CardSubtitle,
  Spinner,
  CardHeader,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  CustomInput,
  Form,
  // CardHeader,
  FormGroup,
  Col,
  // CardImg,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Label,
  Input,
  DropdownMenu,
  InputGroup,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  Collapse,
  InputGroupAddon
} from "reactstrap";

import { LineChart, DoughnutChart } from "../../../components/charts";

import arrowup from "./images/arrowupcolor.png";
import uparrow from "./images/arrow1upload.png";
import downarrow from "./images/arrow1down.png";

import arrowdown from "./images/arrowdowncolor.png";
import money from "./images/moneycircle.png";
import debitcard from "./images/debitcard.png";
import {
  postRequestMultipart,
  getRequest,
  postRequest,
  postEwalletRequest
} from "../../../utils/request";
import classnames from "classnames";
import { NotificationManager } from "../../../components/common/react-notifications";
import StripeCheckout from "react-stripe-checkout";
import moment from "moment";
// import { Line, Doughnut } from 'react-chartjs-2'
// import { getDateWithFormat } from '../../../helpers/Utils';
import { NavLink } from "react-router-dom";
// import axios from 'axios'

const getImageUrl = require("../../../utils/request");
var apiBaseUrl = getImageUrl.imageUrl();
// import MUIDataTable from "mui-datatables";



const DefaultDashboard = ({ intl, match }) => {
  const { messages } = intl;

  const [userlength, setuser] = React.useState(0)
  const [countrylength, setcountry] = React.useState(0)
  const [banklength, setBank] = React.useState(0)


  React.useEffect(() => {
    getadminDashboard()





  }, []);

  const getadminDashboard = () => {
    getRequest('/get-SuperAdmin-Dashboard').then((response) => {
      if (response.code == 1) {
        // setUserList(response.users)
        setuser(response.superAdminDashboard.totalUsers)
        setcountry(response.superAdminDashboard.totalCountry)
        setBank(response.superAdminDashboard.totalBank)
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
          <h1 style={{ color: "#008ecc" }}>DashBoard </h1>
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
                                outline>Add Bank</Button>

                        </Colxx>

                    </Row> */}





        </Colxx>
        {/* <Colxx xxs="12">
               
                    
                    <Separator className="mb-5" />
                </Colxx> */}
      </Row>
      <Container>
        <Row>
          <Colxx xxs="12" sm="3">
            <Card style={{ backgroundColor: "#008ecc" }}>
              <CardBody>
                <Container>
                  <Row>
                    <Colxx xxs="12" sm="3" style={{ backgroundColor: "" }}>
                      <div className="simple-line-icons" style={{ color: "white", backgroundColor: "red" }}>
                        <div className="glyph" >
                          <div className={`glyph-icon iconsminds-user`} />


                        </div>
                      </div>


                    </Colxx>
                    <Colxx xxs="12" sm="9">
                      <center><h1 style={{ color: "white" }}><span>{userlength}</span></h1></center>


                      <center><h3 style={{ color: "white" }}>User List</h3></center>

                    </Colxx>

                  </Row>
                  <Row style={{ backgroundColor: "", marginTop: "-10%", marginBottom: "-8%" }}>
                    <Colxx xxs="12" sm="12">
                      {/* <h6 style={{ color: "white" }}>View More</h6> */}
                      <Button color="white"
                        size="xs"
                        outline
                        onClick={() => {
                          // window.history.push('/listofuser')
                          window.location = 'listofuser'
                        }}>View More</Button>
                    </Colxx>

                  </Row>






                </Container>


              </CardBody>
            </Card>
          </Colxx>
          <Colxx xxs="12" sm="3">
            <Card style={{ backgroundColor: "#008ecc" }}>
              <CardBody>
                <Container>
                  <Row>




                    <Colxx xxs="12" sm="3" style={{ backgroundColor: "" }}>
                      <div className="simple-line-icons" style={{ color: "white", backgroundColor: "red" }}>
                        <div className="glyph" >
                          <div className={`glyph-icon iconsminds-bank`} />


                        </div>
                      </div>


                    </Colxx>
                    <Colxx xxs="12" sm="9">
                      <center><h1 style={{ color: "white" }}>{banklength}</h1></center>


                      <center><h3 style={{ color: "white" }}>Bank List</h3></center>

                    </Colxx>
                  </Row>
                  <Row style={{ backgroundColor: "", marginTop: "-10%", marginBottom: "-8%" }}>
                    <Colxx xxs="12" sm="12">
                      {/* <h6 style={{ color: "white" }}>View More</h6> */}
                      <Button color="white"
                        size="xs"
                        outline
                        onClick={() => {
                          // window.history.push('/listofuser')
                          window.location = 'banklist'
                        }}>View More</Button>
                    </Colxx>

                  </Row>


                </Container>

              </CardBody>
            </Card>
          </Colxx>
          {/* <Colxx xxs="12" sm="3">
            <Card style={{ backgroundColor: "#008ecc" }}>
              <CardBody>
                <Container>
                  <Row>




                    <Colxx xxs="12" sm="3" style={{ backgroundColor: "" }}>
                      <div className="simple-line-icons" style={{ color: "white" }}>
                        <div className="glyph" style={{ marginTop: "5%" }} >
                          <div className={`glyph-icon iconsminds-post-office`} />


                        </div>
                      </div>


                    </Colxx>
                    <Colxx xxs="12" sm="9">
                      <center><h1 style={{ color: "white" }}>3</h1></center>


                      <center><h3 style={{ color: "white" }}>KYC List</h3></center>

                    </Colxx>
                  </Row>


                </Container>
              </CardBody>
            </Card>
          </Colxx> */}
          <Colxx xxs="12" sm="3">

            <Card style={{ backgroundColor: "#008ecc" }}>
              <CardBody>
                <Container>
                  <Row>




                    <Colxx xxs="12" sm="3" style={{ backgroundColor: "" }}>
                      <div className="simple-line-icons" style={{ color: "white", backgroundColor: "red" }}>
                        <div className="glyph" >
                          <div className={`glyph-icon iconsminds-file-clipboard`} />


                        </div>
                      </div>


                    </Colxx>
                    <Colxx xxs="12" sm="9">
                      <center><h1 style={{ color: "white" }}> {countrylength}</h1></center>


                      <center><h3 style={{ color: "white" }}>Country List</h3></center>

                    </Colxx>
                  </Row>
                  <Row style={{ backgroundColor: "", marginTop: "-10%", marginBottom: "-8%" }}>
                    <Colxx xxs="12" sm="12">
                      <Button color="white"
                        size="xs"
                        outline
                        onClick={() => {
                          // window.history.push('/listofuser')
                          window.location = 'countrylist'
                        }}>View More</Button>
                    </Colxx>

                  </Row>


                </Container>
              </CardBody>
            </Card>
          </Colxx>

        </Row>
        <br />
        <Row>
          {/* <Colxx xxs="12" sm="3">
            <Card style={{ backgroundColor: "#008ecc" }}>
              <CardBody>
                <Container>
                  <Row>




                    <Colxx xxs="12" sm="3" style={{ backgroundColor: "" }}>
                      <div className="simple-line-icons" style={{ color: "white", backgroundColor: "red" }}>
                        <div className="glyph" >
                          <div className={`glyph-icon iconsminds-pricing`} />


                        </div>
                      </div>


                    </Colxx>
                    <Colxx xxs="12" sm="9">
                      <center><h1 style={{ color: "white" }}>3</h1></center>


                      <center><h3 style={{ color: "white" }}>Conversion Price</h3></center>

                    </Colxx>
                  </Row>


                </Container>


              </CardBody>
            </Card>
          </Colxx> */}
          {/* <Colxx xxs="12" sm="3">
            <Card style={{ backgroundColor: "#008ecc" }}>
              <CardBody>
                <Container>
                  <Row>




                    <Colxx xxs="12" sm="3" style={{ backgroundColor: "" }}>
                      <div className="simple-line-icons" style={{ color: "white", backgroundColor: "red" }}>
                        <div className="glyph" >
                          <div className={`glyph-icon iconsminds-library`} />


                        </div>
                      </div>


                    </Colxx>
                    <Colxx xxs="12" sm="9">
                      <center><h1 style={{ color: "white" }}>3</h1></center>


                      <center><h3 style={{ color: "white" }}>KYC Setting</h3></center>

                    </Colxx>
                  </Row>


                </Container>

              </CardBody>
            </Card>
          </Colxx> */}
          {/* <Colxx xxs="12" sm="3">
            <Card style={{ backgroundColor: "#008ecc" }}>
              <CardBody>
                <Container>
                  <Row>




                    <Colxx xxs="12" sm="3" style={{ backgroundColor: "" }}>
                      <div className="simple-line-icons" style={{ color: "white" }}>
                        <div className="glyph" style={{ marginTop: "5%" }} >
                          <div className={`glyph-icon iconsminds-security-settings`} />


                        </div>
                      </div>


                    </Colxx>
                    <Colxx xxs="12" sm="9">
                      <center><h1 style={{ color: "white" }}>3</h1></center>


                      <center><h3 style={{ color: "white" }}>Fees Setting</h3></center>

                    </Colxx>
                  </Row>


                </Container>
              </CardBody>
            </Card>
          </Colxx> */}


        </Row>
      </Container>


    </>
  );
};
export default injectIntl(DefaultDashboard);
