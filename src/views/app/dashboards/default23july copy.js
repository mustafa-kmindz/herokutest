// import React from 'react';
import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';

// import Select from 'react-select';
import { Colxx } from '../../../components/common/CustomBootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
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
} from 'reactstrap';

import { LineChart, DoughnutChart } from '../../../components/charts';

import arrowup from './images/arrowupcolor.png';
import uparrow from './images/arrow1upload.png';
import downarrow from './images/arrow1down.png';

import arrowdown from './images/arrowdowncolor.png';
import money from './images/moneycircle.png';
import debitcard from './images/debitcard.png';
import { postRequestMultipart, getRequest, postEwalletRequest } from '../../../utils/request';

import { NotificationManager } from '../../../components/common/react-notifications';
import StripeCheckout from 'react-stripe-checkout';
import moment from 'moment';
// import { Line, Doughnut } from 'react-chartjs-2'
// import { getDateWithFormat } from '../../../helpers/Utils';
import { NavLink } from 'react-router-dom';
// import axios from 'axios'


const getImageUrl = require('../../../utils/request');
var apiBaseUrl = getImageUrl.imageUrl()
// import MUIDataTable from "mui-datatables";
const selectData = [
  { label: 'Driving License', value: 'cake', key: 0 },
  { label: 'College Id', value: 'cupcake', key: 1 },
  { label: 'Election Id', value: 'dessert', key: 2 },
];

const selectGender = [
  { label: 'Male', value: 'Male', key: 0 },
  { label: 'Female', value: 'Female', key: 1 },

]

// console.log(apiBaseUrl)

const DefaultDashboard = ({ intl, match }) => {
  const { messages } = intl;

  const [modalBasic, setModalBasic] = useState(false);

  const [modalStatus, setmodalStatus] = useState(false);
  const [gatewaycharge, setgatewaycharge] = useState(0)
  const [inputamount, setinputamount] = useState(0)
  const [useremail, setuseremail] = useState("")
  const [usernumber, setusernumber] = useState("")
  const [fixedamount, setfixedamount] = useState(0)
  const [ballance, setballance] = useState(0)
  const [transaction, settransaction] = useState([])
  const [transaction1, settransaction1] = useState([])

  const [accessToken, setaccessToken] = useState("")

  // const [settransferModal, transferModal] = useState(false)
  const [transferemailname, settransferemailname] = useState('')
  const [transferamount, settransferamount] = useState(0)
  const [receivedAmount, setreceivedAmount] = useState(0)
  const [sentAmount, setsentAmount] = useState(0)

  const [debitArray, setdebitArray] = useState([]);
  const [creditArray, setcreditArray] = useState([])

  const [stripeToggle, setstripeToggle] = useState(false)

  const [profleImg, setprofleImg] = useState(null)

  const [file, filename] = useState(
    'https://via.placeholder.com/1135x240?text=Upload+Image',
  );
  // const [file, filename] = useState(
  //   'http://3.15.154.217:30880/ipfs/QmZzh4KwfE9n8ZuEWZPYE23wfA2MjF21sYVdQfhpRBYzZC',
  // );

  const [photofile, setphotofile] = useState(
    'https://via.placeholder.com/1135x240?text=Upload+Image',

  );
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [startDateRange, setStartDateRange] = useState(new Date());
  const [endDateRange, setEndDateRange] = useState(new Date());

  const [verificationToggle, setverificationToggle] = useState(false);
  const [boldcolor, setboldcolor] = useState("all");
  const [addmoneytoggle, setaddmoneytoggle] = useState(false)

  const [remittancetoggle, setremittancetoggle] = useState(false)

  const [TrasferModel, setTrasferModel] = useState(false)

  useEffect(() => {

    getRequest('/user/get-user-details').then((d) => {
      if (d.code == 1) {

        localStorage.setItem("username", `${d.user.name}`)
        setuseremail(d.user.email)
        setusernumber(d.user.mobileNumber)


        postEwalletRequest('showEWalletBalance', {
          "wallet_id": d.user.mobileNumber,


        }).then((res) => {
          console.log(res)
          if (res.status == 1) {
            setballance(res.data.balance)

          }
        }).catch((error) => {
          console.log(error)
        })

        postEwalletRequest('getEWalletStatement', {
          "wallet_id": d.user.mobileNumber,


        }).then((res) => {
          console.log(res)

          if (res.status == 1) {


            let sorting = res.data.sort((a, b) => {
              const aDate = new Date(a.Timestamp);
              const bDate = new Date(b.Timestamp);
              return bDate.getTime() - aDate.getTime();
            })

            let setFilterElement = sorting.filter((value) => {
              return value.Value.action != 'Create'
            })




            settransaction1(setFilterElement)

            // console.log(setFilterElement)


            if (setFilterElement.length) {
              let receivedAmount = 0
              let sentAmount = 0
              let receivedchart = []
              let sentchart = []
              setFilterElement.forEach((value) => {
                if (value.Value.tx_data.tx_type == "CR") {
                  // console.log(typeof value.Value.amount)
                  receivedAmount = receivedAmount + value.Value.tx_data.amount




                }
                else if (value.Value.tx_data.tx_type == "DR")
                  // sentAmount = sentAmount + value.Value.amount
                  sentAmount = sentAmount + value.Value.tx_data.amount



              })
              setreceivedAmount(receivedAmount)
              setsentAmount(sentAmount)

              let debitArray = []
              let creditArray = []

              setFilterElement.forEach((val) => {


                if (val.Value.tx_data.tx_type == "CR") {

                  creditArray.push(val.Value.tx_data.amount)
                }
                else {

                  debitArray.push(val.Value.tx_data.amount)
                }

              })


              let revcreditArray = creditArray.reverse().slice(-18)
              let revdebitArray = debitArray.reverse().slice(-18)




              setdebitArray(revdebitArray)
              setcreditArray(revcreditArray)


            }

          }
        }).catch((error) => {
          console.log(error)
        })

      }


    }).catch((error) => {
      console.log(error)

    })

    getRequest('/website-settings/get-payment-gateway-charges')
      .then((response) => {
        if (response.code == 1) {

          setgatewaycharge(response.paymentGatewayCharges.percentage)
        }
      })
      .catch((error) => {
        console.log(error)
      })

  }, []);

  const setGradientColor = (canvas, color) => {
    console.log(color)
    const ctx = canvas.getContext('2d')
    var gradient = ctx.createLinearGradient(0, 0, 0, 350);

    console.log(color.opacity, color.colors)
    gradient.addColorStop(color.opacity, color.colors);


    ctx.fillStyle = gradient;

    return gradient
  }

  const takeData = (canvas) => {
    const data = lineData

    if (data.datasets) {

      let colors = [{ colors: "#c2f0f0", opacity: 0.4 }, { colors: "red", opacity: 1 }]

      data.datasets.forEach((set, i) => {

        console.log(canvas)
        set.backgroundColor = setGradientColor(canvas, colors[i])
        set.borderColor = "white"
        set.borderwidth = 2
      })
    }
    return data;
  }

  const lineData = {

    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        label: "income",
        backgroundColor: "#98e6e6",
        // data: [14, 15, 18, 15, 12, 19, 10]
        data: [54, 63, 60, 65, 60, 68, 60],


      },
      {
        label: "spent",
        backgroundColor: "",
        data: [14, 15, 11, 5, 20, 12, 2]

      }

    ]
  }

  const doughnutChartData = {


    datasets: [
      {
        label: '',
        borderColor: ["#99d6ff", "#f0c2c2"],
        backgroundColor: [
          "#f1fcfc",
          "#feebeb",

        ],
        borderWidth: 2,
        data: [80, 20],
      },
    ],
  };

  const doughnutChartData1 = {

    datasets: [
      {
        label: '',
        borderColor: ["#99d6ff"],
        backgroundColor: [
          "#f1fcfc",


        ],
        borderWidth: 2,
        data: [100],
      },
    ],
  };

  const doughnutChartData2 = {

    datasets: [
      {
        label: '',
        borderColor: ["#f0c2c2"],
        backgroundColor: [

          "#feebeb",

        ],
        borderWidth: 2,
        data: [100],
      },
    ],
  };


  const lineChartData = {

    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    datasets: [

      {
        label: '',
        //data: [200, 350, 400, 450, 60, 68, 60, 52, 59, 42, 54, 63, 60, 65, 60, 58, 60, 52, 59, 62],
        data: creditArray,
        borderColor: "#99d6ff",
        pointBackgroundColor: "#99d6ff",
        pointBorderColor: "#99d6ff",
        pointHoverBackgroundColor: "#99d6ff",
        pointHoverBorderColor: "#99d6ff",
        pointRadius: 3,
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        fill: true,
        backgroundColor: "#f1fcfc"
      },
      {
        label: '',
        //data: [150, 305, 310, 58, 53, 58, 68, 49, 52, 62, 52, 60, 50, 58, 53, 68, 52, 49, 52, 41],
        data: debitArray,
        borderColor: "#f0c2c2",
        pointBackgroundColor: "#f0c2c2",
        pointBorderColor: "#f0c2c2",
        pointHoverBackgroundColor: "#f0c2c2",
        pointHoverBorderColor: "#f0c2c2",
        pointRadius: 3,
        pointBorderWidth: 1,
        pointHoverRadius: 1,
        fill: true,
        backgroundColor: "#feebeb"

      },
    ],
  };

  const columns = ["Name", "Company", "City", "State"];

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
  ];



  const options = {
    filterType: 'checkbox',
  };


  const finalAmount = (e) => {

    const fixedamount = e - ((e * gatewaycharge) / 100)
    setfixedamount(fixedamount)


  }

  const tokenfunction = (token) => {
    setinputamount(0)
    console.log(token)


  }

  const checkkycRequired = () => {
    // console.log('clcolk')
    getRequest(`/website-settings/get-payment-gateway-charges`).then((response) => {


      setaddmoneytoggle(false)
      if (response.paymentGatewayCharges.kycRequired == -1) {

        postEwalletRequest('getKYC', {
          "wallet_id": usernumber
        })
          .then((response) => {

            if (response.status == 1 && response.data.approval_status == "Approved") {
              setTrasferModel(true)



            }
            else {
              NotificationManager.warning("kyc required")
              setverificationToggle(true)
              setinputamount('')

            }

          })
          .catch((error) => {
            console.log(error)
          })




        // NotificationManager.warning("kyc required")
        // setverificationToggle(true)
        // setinputamount('')
      }
      else if (response.paymentGatewayCharges.kycRequired != 0 && response.paymentGatewayCharges.kycRequired < inputamount) {
        postEwalletRequest('getKYC', {
          "wallet_id": usernumber
        })
          .then((response) => {
            console.log(response)
            if (response.status == 1 && response.data.approval_status == "Approved") {
              setTrasferModel(true)



            }
            else {
              NotificationManager.warning("kyc required")
              setverificationToggle(true)
              setinputamount('')

            }
          })
          .catch((error) => {
            console.log(error)
          })





      }
      else {
        setTrasferModel(true)

      }

    })

  }

  const onAmountSubmit = (token) => {
    console.log(token)

    const amount = inputamount - ((inputamount * gatewaycharge) / 100)
    const token_amount = inputamount

    console.log(token_amount)
    console.log(amount)

    setstripeToggle(true)

    // <StripeCheckout
    //   name=" Wallet recharge"
    //   amount={fixedamount * 100}
    //   currency="USD"

    //   stripeKey="pk_test_51GsjcnHwYK8DwJABu6OELI7yv3i2pccljZM9CBgvcjtY4ub3lUhCHn4kpItQVhQp8Sc51odcGW05uywemRt8BxAZ00ggvDl4xl"

    //   email={useremail}
    //   token={token => {
    //     {
    //       console.log('!!token', token);
    //       tokenfunction(token)

    //     }
    //   }}
    // >
    //   <Button color="primary" onClick={() => setModalBasic(false)}>
    //     Proceed
    //           </Button>
    // </StripeCheckout>



    getRequest(`/website-settings/get-payment-gateway-charges`).then((response) => {

      setaddmoneytoggle(false)

      if (response.paymentGatewayCharges.kycRequired == -1) {
        NotificationManager.warning("kyc required")
        setverificationToggle(true)
        setinputamount('')
      }
      else if (response.paymentGatewayCharges.kycRequired != 0 && response.paymentGatewayCharges.kycRequired < inputamount) {
        NotificationManager.warning("kyc required")
        setverificationToggle(true)
        setinputamount('')


      }
      else if (response.paymentGatewayCharges.kycRequired == 0) {
        postEwalletRequest('rechargeEWallet', {
          "wallet_id": usernumber,
          "amount": amount,
          "stripe_token": token,
          "token_amount": inputamount,

          "remarks": ""

        }).then((response) => {
          setinputamount('')

          if (response.status == 1) {
            NotificationManager.warning(response.message)

            functionbalnceandtrfer()

          }


        })
          .catch((error) => {
            console.log(error)
          })


      }
      else {

        postEwalletRequest('rechargeEWallet', {
          "wallet_id": usernumber,
          "amount": `${amount}`,
          "stripe_token": token,
          "token_amount": inputamount,
          "remarks": ""

        }).then((response) => {
          setinputamount('')

          if (response.status == 1) {
            NotificationManager.warning(response.message)

            functionbalnceandtrfer()

          }

        })
          .catch((error) => {
            console.log(error)
          })
      }

    })
      .catch((error) => {
        console.log(error)
      })
  }

  const transferFunciton = () => {
    console.log('click')
    setmodalStatus(true)
  }

  const proceedtransfer = () => {

    setmodalStatus(false)
    postEwalletRequest('transferBtwEWallets', {
      "wallet_from": usernumber,
      "wallet_to": transferemailname,
      "amount": transferamount,
      "master_id": "",
      "child_id": "",
      "remarks": ""



    }).then((res) => {
      settransferemailname('')
      settransferamount('')
      functionbalnceandtrfer()

      if (res.status) {
        NotificationManager.warning(res.message)

      }
      else {
        NotificationManager.warning(res.message)
      }

      // console.log(res)

    }).catch((error) => {
      console.log(error)
    })
  }


  const functionbalnceandtrfer = () => {

    postEwalletRequest('showEWalletBalance', {
      "wallet_id": usernumber,


    }).then((res) => {
      // console.log(res)
      if (res.status == 1) {
        setballance(res.data.balance)

      }

    })
      .catch((error) => {
        console.log(error)
      })


    postEwalletRequest('getEWalletStatement', {
      "wallet_id": usernumber,


    }).then((res) => {
      console.log(res)

      if (res.status == 1) {

        let sorting = res.data.sort((a, b) => {
          const aDate = new Date(a.Timestamp);
          const bDate = new Date(b.Timestamp);
          return bDate.getTime() - aDate.getTime();
        })

        let setFilterElement = sorting.filter((value) => {
          return value.Value.action != 'Create'
        })

        settransaction1(setFilterElement)
        if (setFilterElement.length) {
          let receivedAmount = 0
          let sentAmount = 0
          setFilterElement.forEach((value) => {
            if (value.Value.tx_data.tx_type == "CR") {
              receivedAmount = receivedAmount + value.Value.tx_data.amount

            }
            else if (value.Value.tx_data.tx_type == "DR")
              sentAmount = sentAmount + value.Value.tx_data.amount


          })
          setreceivedAmount(receivedAmount)
          setsentAmount(sentAmount)

          let debitArray = []
          let creditArray = []

          console.log(setFilterElement)
          setFilterElement.forEach((val) => {

            if (val.Value.tx_data.tx_type == "CR") {

              creditArray.push(val.Value.tx_data.amount)
            }
            else {

              debitArray.push(val.Value.tx_data.amount)
            }

          })
          // console.log(debitArray)
          // console.log(debitArray.length)

          let revcreditArray = creditArray.reverse().slice(-18)
          let revdebitArray = debitArray.reverse().slice(-18)

          // console.log(revcreditArray)

          setdebitArray(revdebitArray)
          setcreditArray(revcreditArray)

        }



        // console.log(setFilterElement)


      }
    }).catch((error) => {
      console.log(error)
    })

  }



  const imageHandlerPhoto = (e) => {
    const file = e.target.files[0];
    postRequestMultipart('add', file).then((res) => {
      console.log(res)
      if (res.Hash) {
        console.log(apiBaseUrl)

        setphotofile(`${apiBaseUrl}${res.Hash}`);

      }

    }).catch((error) => {
      console.log(error)
    })


  }

  const imageHandler = (e) => {
    console.log(e)

    const file = e.target.files[0];

    postRequestMultipart('add', file).then((res) => {
      console.log(res)
      if (res.Hash) {
        console.log(apiBaseUrl)

        filename(`${apiBaseUrl}${res.Hash}`);
      }

    }).catch((error) => {
      console.log(error)
    })
  }


  return (
    <>

      <div >
        < Row >
          <Colxx xxs="9">
            <Row >

              <Colxx xxs="12">
                <div >
                  <Row>
                    <Colxx md="6" sm="6" lg="4" xxs="12">

                      <Row>

                        <Container>
                          <Row>
                            <Col sm="2" style={{ backgroundColor: "" }}>

                              <a onClick={() => {


                              }}><strong>All</strong></a>

                            </Col>
                            <Col sm="4" style={{ backgroundColor: "", marginRight: "" }}>
                              <a onClick={() => {
                                transferFunciton()
                              }}><strong>TRANSFER</strong></a>
                            </Col>
                            <Col sm="4" style={{ backgroundColor: "", marginRight: "" }}>
                              <a onClick={() => {
                                setremittancetoggle(true)
                              }}><strong>REMITTANCE</strong></a>
                            </Col>

                          </Row>
                        </Container>
                      </Row>

                    </Colxx >
                    <Colxx md="6" sm="6" lg="4" xxs="12">


                    </Colxx>
                    <Colxx md="6" sm="6" lg="4" xxs="12">
                      <Row>

                        <Container>
                          <Row>
                            <Col sm="2" style={{ backgroundColor: "" }}>

                            </Col>

                            <Col sm="8" style={{ backgroundColor: "", marginRight: "" }}>
                              <Form>
                                <FormGroup className="form-group has-float-label  mb-4">

                                  <DatePicker
                                    selected={startDateRange}
                                    selectsStart
                                    startDate={startDateRange}
                                    endDate={endDateRange}

                                    placeholderText={messages['form-components.start']}
                                  />

                                </FormGroup>
                              </Form>
                            </Col>

                          </Row>
                        </Container>
                      </Row>

                    </Colxx>
                  </Row >
                </div >

              </Colxx >


            </Row >
            <Row >

              <Colxx xxs="12">
                <div >
                  <Row>
                    <Colxx md="6" sm="6" lg="4" xxs="12">
                      <Card className="d-flex flex-row mb-4">

                        <div className=" d-flex flex-grow-1 min-width-zero" style={{ marginLeft: "5%" }}>
                          <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">

                            <Container>

                              <Row>
                                <Col xs="4" style={{ backgroundColor: "" }}>
                                  <div style={{ backgroundColor: "" }}  >

                                    < img src={money} style={{ width: "40px", color: "", backgroundColor: "" }} />
                                  </div>
                                </Col>
                                <Col xs="8" style={{ backgroundColor: "" }}>
                                  <div style={{ marginTop: "" }}>
                                    <center><span>CURRENT BALANCE</span></center>
                                    <strong>$ {ballance}</strong>
                                    {!addmoneytoggle &&
                                      <Button
                                        color="primary"
                                        size='xs'
                                        outline
                                        style={{ marginLeft: "5%" }}
                                        onClick={() => {
                                          setaddmoneytoggle(true)
                                        }}

                                      >+ Top Up</Button>
                                    }


                                  </div>


                                </Col>
                              </Row>


                              {addmoneytoggle &&

                                <div style={{ marginTop: "5%" }}>

                                  <FormGroup className="form-group has-float-label  mb-4">
                                    <Label>
                                      Amount
</Label>
                                    <Input type="number" name="name" value={inputamount} onChange={(e) => {

                                      setinputamount(e.target.value)

                                      finalAmount(e.target.value)
                                    }} />
                                  </FormGroup>

                                  {/* <Button
                                    color="primary"
                                    size='xs'
                                    outline
                                    style={{ marginTop: "-10%" }}
                                    onClick={() =>
                                      onAmountSubmit()
                                    }

                                  >Add Money</Button>
                                  {' '} */}
                                  {/* <StripeCheckout
                                    name=" Wallet recharge"
                                    amount={fixedamount * 100}
                                    currency="USD"

                                    stripeKey="pk_test_51GsjcnHwYK8DwJABu6OELI7yv3i2pccljZM9CBgvcjtY4ub3lUhCHn4kpItQVhQp8Sc51odcGW05uywemRt8BxAZ00ggvDl4xl"

                                    email={useremail}
                                    token={token => {
                                      {
                                        console.log('!!token', token);

                                        onAmountSubmit(token)

                                      }
                                    }}
                                  >
                                    <Button
                                      color="primary"
                                      size='xs'
                                      outline
                                      style={{ marginTop: "-10%" }}


                                    >Proceed</Button>

                                  </StripeCheckout> */}
                                  <Button
                                    color="primary"
                                    size='xs'
                                    outline
                                    style={{ marginTop: "-10%" }}
                                    onClick={() => {
                                      // setaddmoneytoggle(false)
                                      checkkycRequired()
                                      // setTrasferModel(true)
                                    }}
                                  >Submit</Button>{' '}
                                  <Button
                                    color="primary"
                                    size='xs'
                                    outline
                                    style={{ marginTop: "-10%" }}
                                    onClick={() => {
                                      setaddmoneytoggle(false)
                                    }}
                                  >Cancel</Button>


                                </div>

                              }


                            </Container>



                          </CardBody >
                        </div >
                      </Card >

                    </Colxx >
                    <Colxx md="6" sm="6" lg="4" xxs="12">
                      <Card className="d-flex flex-row mb-4">
                        <div className=" d-flex flex-grow-1 min-width-zero" style={{ marginLeft: "5%" }}>
                          <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">

                            <Container>

                              <Row>
                                <Col xs="4" style={{ backgroundColor: "" }}>
                                  <div style={{ backgroundColor: "" }}  >

                                    <img src={arrowdown} style={{ width: "40px", color: "", backgroundColor: "" }} />
                                  </div>
                                </Col>
                                <Col xs="8" style={{ backgroundColor: "" }}>
                                  <span>TOTAL RECEIVED</span><br />
                                  <strong>$ {receivedAmount}</strong><br />

                                </Col>
                              </Row>
                            </Container>
                          </CardBody>
                        </div>
                      </Card>

                    </Colxx>
                    <Colxx md="6" sm="6" lg="4" xxs="12">
                      <Card className="d-flex flex-row mb-4">

                        <div className=" d-flex flex-grow-1 min-width-zero" style={{ marginLeft: "5%" }}>
                          <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">

                            <Container>

                              <Row>
                                <Col xs="4" style={{ backgroundColor: "" }}>
                                  <div style={{ backgroundColor: "" }}  >

                                    <img src={arrowup} style={{ width: "40px", color: "", backgroundColor: "" }} />
                                  </div>
                                </Col>
                                <Col xs="8" style={{ backgroundColor: "" }}>
                                  <span>TOTAL SPENT</span><br />
                                  <strong>$ {sentAmount}</strong><br />

                                </Col>
                              </Row>
                            </Container>


                          </CardBody>
                        </div>
                      </Card>

                    </Colxx>
                  </Row >
                </div >

              </Colxx >
            </Row >
            <Row>
              <Colxx xxs="12">
                <Card style={{ backgroundColor: "", marginTop: "" }}>
                  <CardBody>
                    <CardTitle>

                    </CardTitle>
                    {/* <Row> */}

                    <CardSubtitle>
                    </CardSubtitle>
                    <div className="chart-container">
                      <LineChart shadow data={lineChartData} />
                    </div>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>

            <Row>

              <Colxx xxs="12">
                <div style={{ marginTop: "5%" }}>
                  <Row>
                    <Colxx md="6" sm="6" lg="4" xxs="12">
                      <Card className="d-flex flex-row mb-4">
                        <div className="" style={{ backgroundColor: "", marginTop: "5%", width: "30%", marginLeft: "2%" }}>
                          <DoughnutChart data={doughnutChartData}
                          />
                        </div>

                        <div className=" d-flex flex-grow-1 min-width-zero" style={{ marginLeft: "5%" }}>
                          <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                            <div className="min-width-zero">
                              <NavLink to="/app/ui/cards">
                                <CardSubtitle className="truncate mb-1">
                                  INCOMING VS OUTGOING
                      </CardSubtitle>
                              </NavLink>
                              <CardText className="text-muted text-small mb-2">

                              </CardText>
                            </div>
                          </CardBody>
                        </div>
                      </Card>

                    </Colxx>
                    <Colxx md="6" sm="6" lg="4" xxs="12">
                      <Card className="d-flex flex-row mb-4">

                        <div className="" style={{ backgroundColor: "", marginTop: "5%", width: "30%", marginLeft: "2%" }}>
                          <DoughnutChart data={doughnutChartData1}
                          />
                        </div>

                        <div className=" d-flex flex-grow-1 min-width-zero" style={{ marginLeft: "5%" }}>
                          <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                            <div className="min-width-zero">
                              <NavLink to="/app/ui/cards">
                                <CardSubtitle className="truncate mb-1">
                                  INCOMING
                      </CardSubtitle>
                              </NavLink>
                              <CardText className="text-muted text-small mb-2">

                              </CardText>
                            </div>
                          </CardBody>
                        </div>
                      </Card>

                    </Colxx>
                    <Colxx md="6" sm="6" lg="4" xxs="12">
                      <Card className="d-flex flex-row mb-4">
                        <div className="" style={{ backgroundColor: "", marginTop: "5%", width: "30%", marginLeft: "2%" }}>
                          <DoughnutChart data={doughnutChartData2}
                          />
                        </div>

                        <div className=" d-flex flex-grow-1 min-width-zero" style={{ marginLeft: "5%" }}>
                          <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                            <div className="min-width-zero">
                              <NavLink to="/app/ui/cards">
                                <CardSubtitle className="truncate mb-1">
                                  OUTGOING
                      </CardSubtitle>
                              </NavLink>
                              <CardText className="text-muted text-small mb-2">

                              </CardText>
                            </div>
                          </CardBody>
                        </div>
                      </Card>
                    </Colxx>
                  </Row>
                </div>

              </Colxx>
            </Row>

          </Colxx >


          <Modal
            isOpen={TrasferModel}
          // toggle={() => setModalBasic(!modalStatus)}
          >
            <ModalHeader>

              <span style={{ fontSize: "20px" }}><center>Transaction Summary</center></span>
            </ModalHeader>
            <ModalBody>
              <Row>
                <Colxx xxs="8">
                  <span style={{ fontSize: "20px" }}>Your Input :</span>
                </Colxx>
                <Colxx xxs="3">
                  <span style={{ fontSize: "20px" }}>$ {inputamount}</span>
                </Colxx>
              </Row>
              <Row>
                <Colxx xxs="8">
                  <span style={{ fontSize: "20px" }}>Payment Gateway Charges : </span>
                </Colxx>
                <Colxx xxs="3">
                  <span style={{ fontSize: "20px" }}> $ {(inputamount * gatewaycharge) / 100}</span>
                </Colxx>
              </Row>
              <Row>
                <Colxx xxs="8">
                  <span style={{ fontSize: "20px" }}>Amount to be credited : </span>
                </Colxx>
                <Colxx xxs="3">
                  <span style={{ fontSize: "20px" }}> $ {inputamount - ((inputamount * gatewaycharge) / 100)}</span>
                </Colxx>
              </Row>

            </ModalBody>
            <ModalFooter>
              <StripeCheckout
                name=" Wallet recharge"
                amount={fixedamount * 100}
                currency="USD"

                stripeKey="pk_test_51GsjcnHwYK8DwJABu6OELI7yv3i2pccljZM9CBgvcjtY4ub3lUhCHn4kpItQVhQp8Sc51odcGW05uywemRt8BxAZ00ggvDl4xl"

                email={useremail}
                token={token => {
                  {
                    console.log('!!token', token);
                    // tokenfunction(token)
                    onAmountSubmit(token)
                    setTrasferModel(false)

                  }
                }}
              >
                <Button
                  color="secondary"
                  // size='xs'
                  outline
                  // style={{ marginTop: "-10%" }}
                  onClick={() =>
                    // onAmountSubmit()
                    // setTrasferModel(false)
                    console.log('clcik')
                  }

                >Proceed</Button>
                {/* <Button color="primary" onClick={() => setModalBasic(false)}>
                                      Proceed
              </Button> */}
              </StripeCheckout>

              {/* <StripeCheckout
                name=" Wallet recharge"
                amount={fixedamount * 100}
                currency="USD"

                stripeKey="pk_test_51GsjcnHwYK8DwJABu6OELI7yv3i2pccljZM9CBgvcjtY4ub3lUhCHn4kpItQVhQp8Sc51odcGW05uywemRt8BxAZ00ggvDl4xl"

                email={useremail}
                token={token => {
                  {
                    console.log('!!token', token);
                    tokenfunction(token)

                  }
                }}
              >
                <Button color="primary" onClick={() => setModalBasic(false)}>
                  Proceed
              </Button>
              </StripeCheckout>{' '} */}
              <Button
                color="secondary"
                outline
                // onClick={() => setModalBasic(false)}
                onClick={() => setTrasferModel(false)}
              >
                Cancel
                    </Button>
            </ModalFooter>

          </Modal>



          {
            modalStatus ? (
              <Modal
                isOpen={modalStatus}
              // toggle={() => setModalBasic(!modalStatus)}
              >

                <ModalHeader>

                  <span style={{ fontSize: "20px" }}><center>Transfer Money</center></span>
                </ModalHeader>
                <ModalBody>
                  <Form>
                    <FormGroup className="form-group has-float-label  mb-4">
                      <Label>

                        Number
                </Label>
                      <Input type="number" name="name" value={transferemailname} onChange={(e) => {
                        console.log(e.target.value)
                        settransferemailname(e.target.value)
                      }} />
                    </FormGroup>
                  </Form>
                  <Form>
                    <FormGroup className="form-group has-float-label  mb-4">
                      <Label>

                        Amount
                </Label>
                      <Input type="number" name="name" value={transferamount} onChange={(e) => {
                        console.log(e.target.value)
                        settransferamount(e.target.value)
                      }} />
                    </FormGroup>
                  </Form>


                </ModalBody>
                <ModalFooter>

                  <Button
                    color="secondary"
                    onClick={() => {
                      proceedtransfer()
                    }}

                  >
                    Proceed
                    </Button>{' '}


                  {/* <StripeCheckout
                name=" Wallet recharge"
                amount={fixedamount * 100}
                currency="USD"

                stripeKey="pk_test_51GsjcnHwYK8DwJABu6OELI7yv3i2pccljZM9CBgvcjtY4ub3lUhCHn4kpItQVhQp8Sc51odcGW05uywemRt8BxAZ00ggvDl4xl"

                email={useremail}
                token={token => {
                  {
                    console.log('!!token', token);
                    tokenfunction(token)

                  }
                }}
              >
                <Button color="primary" onClick={() => setModalBasic(false)}>
                  Proceed
              </Button>
              </StripeCheckout>{' '} */}
                  <Button
                    color="secondary"
                    onClick={() => setmodalStatus(false)}
                  >
                    Cancel
                    </Button>
                </ModalFooter>



              </Modal >
            ) : (null)
          }



          <Modal
            isOpen={remittancetoggle}

            size="lg"
          >

            <ModalHeader>

              <span style={{ fontSize: "20px" }}><center>Remittance Details </center></span>
            </ModalHeader>
            <ModalBody>
              <Container>
                <Row>

                  <Col md="10" sm="10" lg="10" xxs="12" style={{ backgroundColor: "", marginTop: "3%" }}>

                    <Container>
                      <Row>
                        <Col md="6" sm="6" lg="6" xxs="12" style={{ backgroundColor: "" }}>
                          <Form>
                            <FormGroup className="form-group has-float-label  mb-4">
                              <Label>

                                Name
                </Label>
                              <Input type="name" name="name" value={transferemailname} onChange={(e) => {
                                console.log(e.target.value)

                              }} />
                            </FormGroup>
                          </Form>

                          <Form>
                            <FormGroup className="form-group has-float-label  mb-4">
                              <Label>

                                Email
                </Label>
                              <Input name="name" value='' onChange={(e) => {
                                console.log(e.target.value)

                              }} />
                            </FormGroup>
                          </Form>

                          <Form>
                            <FormGroup className="form-group has-float-label  mb-4">
                              <Label>

                                Address
                </Label>
                              <Input name="name" value='' onChange={(e) => {
                                console.log(e.target.value)

                              }} />
                            </FormGroup>
                          </Form>
                          <Form>
                            <FormGroup className="form-group has-float-label  mb-4">
                              <Label>

                                City
                </Label>
                              <Input name="name" value='' onChange={(e) => {
                                console.log(e.target.value)

                              }} />
                            </FormGroup>
                          </Form>
                          <Form>
                            <FormGroup className="form-group has-float-label  mb-4">
                              <Label>

                                Country
                </Label>
                              <Input name="name" value='' onChange={(e) => {
                                console.log(e.target.value)

                              }} />
                            </FormGroup>
                          </Form>
                        </Col>
                        <Col md="6" sm="6" lg="6" xxs="12" style={{ backgroundColor: "" }}>
                          <Form>
                            <FormGroup className="form-group has-float-label  mb-4">
                              <Label>

                                Mobile
                </Label>
                              <Input type="number" name="name" value='' onChange={(e) => {
                                console.log(e.target.value)

                              }} />
                            </FormGroup>
                          </Form>

                          <Form>
                            <FormGroup className="form-group has-float-label  mb-4">
                              <Label>

                                Account No
                </Label>
                              <Input type="number" name="name" value='' onChange={(e) => {
                                console.log(e.target.value)

                              }} />
                            </FormGroup>
                          </Form>
                          <Form>
                            <FormGroup className="form-group has-float-label  mb-4">
                              <Label>

                                Confirm Account No
                </Label>
                              <Input type="number" name="name" value='' onChange={(e) => {
                                console.log(e.target.value)

                              }} />
                            </FormGroup>
                          </Form>
                          <Form>
                            <FormGroup className="form-group has-float-label  mb-4">
                              <Label>

                                IFSC Code
                </Label>
                              <Input type="number" name="name" value='' onChange={(e) => {
                                console.log(e.target.value)

                              }} />
                            </FormGroup>
                          </Form>
                          <Form>
                            <FormGroup className="form-group has-float-label  mb-4">
                              <Label>

                                Postal Code
                </Label>
                              <Input type="number" name="name" value='' onChange={(e) => {
                                console.log(e.target.value)

                              }} />
                            </FormGroup>
                          </Form>
                        </Col>
                      </Row>
                    </Container>
                  </Col>

                </Row>
              </Container>
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"

              >
                Proceed
                    </Button>{' '}
              <Button
                color="secondary"
                onClick={() => setremittancetoggle(false)}

              >
                Cancel
                    </Button>
            </ModalFooter>
          </Modal >

          <Modal
            isOpen={verificationToggle}
            toggle={() => setModalBasic(!modalStatus)}
            size="lg"
          >

            <ModalHeader>
              <span style={{ fontSize: "20px" }}><center>Verification Details Required</center></span>
            </ModalHeader>
            <ModalBody>
              <h4 className="imgheading">Please Go To User Profile and Select KYC Verification Details</h4>
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                onClick={() => setverificationToggle(false)}

              >
                OK
                    </Button>
            </ModalFooter>
          </Modal >

          <Colxx xxs="3">

            <span><strong>Your Card</strong></span>

            <center><img src={debitcard} style={{ marginTop: "5%" }} /></center>
            <div style={{ marginTop: "5%" }}>
              <strong>Your History</strong>
              <div style={{ marginTop: "10%" }}>

                {transaction1.length ? (

                  transaction1.map((value, index) => {
                    return (
                      <div key={value.TxId}>
                        {index < 3 &&
                          <>
                            <Row key={value.TxId}>

                              <Colxx xxs="2">
                                {value.Value.tx_data.tx_type == "CR" ? (<img src={downarrow} style={{ width: "40px", color: "", backgroundColor: "" }} />) : (<img src={uparrow} style={{ width: "40px", color: "", backgroundColor: "" }} />)}


                              </Colxx>
                              <Colxx xxs="6">
                                <div style={{ marginTop: "5%", marginLeft: "1%" }}>
                                  <strong>{value.Value.tx_data.amount}</strong><br />
                                  <span>{value.Value.tx_data.tx_details}</span>
                                </div>
                              </Colxx>
                              <Colxx xxs="4">
                                {moment(value.Timestamp).format('DD/MM/YYYY hh:mm:ss a')}
                              </Colxx>
                            </Row>
                            <br />
                          </>
                        }
                      </div>
                    )
                  })

                ) : (null)}
              </div>
              <div style={{ marginTop: "2%", fontSize: "15px" }}><span style={{ color: "#99d6ff" }}><strong><center>View All</center></strong></span></div>
            </div>
          </Colxx>
        </Row >
      </div >
    </>
  );
};
export default injectIntl(DefaultDashboard);
