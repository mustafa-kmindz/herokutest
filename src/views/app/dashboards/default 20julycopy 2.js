// import React from 'react';
import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
// import { Row } from 'reactstrap';
import Select from 'react-select';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Form,
  CardHeader,
  FormGroup,
  Col,
  CardImg,
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
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import IconCardsCarousel from '../../../containers/dashboards/IconCardsCarousel';
import RecentOrders from '../../../containers/dashboards/RecentOrders';
import Logs from '../../../containers/dashboards/Logs';
import Tickets from '../../../containers/dashboards/Tickets';
import Calendar from '../../../containers/dashboards/Calendar';
import BestSellers from '../../../containers/dashboards/BestSellers';
import ProfileStatuses from '../../../containers/dashboards/ProfileStatuses';
import GradientCardContainer from '../../../containers/dashboards/GradientCardContainer';
import Cakes from '../../../containers/dashboards/Cakes';
import GradientWithRadialProgressCard from '../../../components/cards/GradientWithRadialProgressCard';
import SortableStaticticsRow from '../../../containers/dashboards/SortableStaticticsRow';
import AdvancedSearch from '../../../containers/dashboards/AdvancedSearch';
import SmallLineCharts from '../../../containers/dashboards/SmallLineCharts';
import SalesChartCard from '../../../containers/dashboards/SalesChartCard';
import ProductCategoriesPolarArea from '../../../containers/dashboards/ProductCategoriesPolarArea';
import WebsiteVisitsChartCard from '../../../containers/dashboards/WebsiteVisitsChartCard';
import ConversionRatesChartCard from '../../../containers/dashboards/ConversionRatesChartCard';
import TopRatedItems from '../../../containers/dashboards/TopRatedItems';
import ThumbnailImage from '../../../components/cards/ThumbnailImage';
// import {
//   lineChartData
// } from '../../../data/charts';
import { LineChart, DoughnutChart } from '../../../components/charts';

import arrowup from './arrowupcolor.png';
import uparrow from './arrow1upload.png';
import downarrow from './arrow1down.png';

import arrowdown from './arrowdowncolor.png';
import money from './moneycircle.png';
import debitcard from './debitcard.png';
import { postRequestMultipart, postRequestImage, postRequest, getRequest, postEwalletRequest, getRequestImage } from '../../../utils/request';

import { NotificationManager } from '../../../components/common/react-notifications';
import StripeCheckout from 'react-stripe-checkout';
import moment from 'moment';
import { Line, Doughnut } from 'react-chartjs-2'
import { getDateWithFormat } from '../../../helpers/Utils';
import { NavLink } from 'react-router-dom';
import axios from 'axios'


const getImageUrl = require('../../../utils/request');
var apiBaseUrl = getImageUrl.imageUrl()
// import MUIDataTable from "mui-datatables";
const selectData = [
  { label: 'Driving License', value: 'cake', key: 0 },
  { label: 'College Id', value: 'cupcake', key: 1 },
  { label: 'Election Id', value: 'dessert', key: 2 },
];





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

  useEffect(() => {

    // balancefunction()

    // console.log('777777777777777777777777777777777777777777777777777777777777777777777')
    // getRequestImage(`ipfs/QmXnaVMhvkKetxvqp1N1jeqPg764DreX7N9EAphBYodxhw`)
    //   .then((response) => {
    //     console.log(response)

    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })


    getRequest('/user/get-user-details').then((d) => {
      if (d.code == 1) {
        // localStorage.setItem("username")
        // console.log(d)
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
                  receivedAmount = receivedAmount + value.Value.amount

                  // receivedArray(value.Value.amount)
                  // receivedchart.push(value.Value.amount)
                  // console.log(value.Value.amount)
                  // console.log(value.Value.tx_data.tx_type)


                }
                else if (value.Value.tx_data.tx_type == "DR")
                  sentAmount = sentAmount + value.Value.amount
                // sentArray(value.Value.amount)
                // sentchart.push(value.Value.amount)
                // console.log(value.Value.amount)
                // console.log(value.Value.tx_data.tx_type)


              })
              setreceivedAmount(receivedAmount)
              setsentAmount(sentAmount)

              let debitArray = []
              let creditArray = []
              // console.log(setFilterElement)
              setFilterElement.forEach((val) => {


                if (val.Value.tx_data.tx_type == "CR") {

                  creditArray.push(val.Value.amount)
                }
                else {

                  debitArray.push(val.Value.amount)
                }

              })


              let revcreditArray = creditArray.reverse().slice(-18)
              let revdebitArray = debitArray.reverse().slice(-18)
              // console.log(revcreditArray)


              // revcreditArray.slice(revcreditArray.length - 10, revcreditArray.length - 1)



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
          // console.log(response)
          setgatewaycharge(response.paymentGatewayCharges.percentage)


        }
      })
      .catch((error) => {
        console.log(error)
      })



  }, []);



  // const setGradientColor = (canvas, color) = {
  //  const ctx = canvas.getContext("2d"),
  //  const gradient = ctx.createLi

  // }
  const setGradientColor = (canvas, color) => {
    console.log(color)
    const ctx = canvas.getContext('2d')
    var gradient = ctx.createLinearGradient(0, 0, 0, 350);
    // var gradient = ctx.createLinearGradient(95, 50, 10, 20);
    // gradient.addColorStop(0, color);

    // ctx.fillStyle = gradient;
    // ctx.fillRect(20, 20, 150, 100);
    // const gradient = ctx.createLinearGradient(0, 0, 0, 500)

    //gradient.addColorStop(1, '#aeebeb');
    // gradient.addColorStop(0.4, '#c2f0f0');
    console.log(color.opacity, color.colors)
    gradient.addColorStop(color.opacity, color.colors);


    ctx.fillStyle = gradient;
    // ctx.fillRect(75, 0, 75, 75);
    return gradient
  }

  const takeData = (canvas) => {
    const data = lineData
    // console.log('helo')
    if (data.datasets) {
      // let colors = ["rgba(225,0,255,0.75)", "rgba(0,255,0,0.75)"]
      let colors = [{ colors: "#c2f0f0", opacity: 0.4 }, { colors: "red", opacity: 1 }]
      //let colors = ["rgba(0,255,0,0.75)", "rgba(225,0,255,0.75)"]

      //let colors = ["#98e6e6", "#ffb3d9"]
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
    // labels: ["1", "2", "3", "4", "5"],
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


  // var gradientFill = ctx.createLinearGradient(500, 0, 100, 0);
  // gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6)");
  // gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6)");
  const doughnutChartData = {

    // labels: ['INCOMING', 'OUTGOING'],
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
    // labels: ['SAVE', 'DELETE'],
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
    // labels: ['IMAGE', 'PHOTO'],
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
    // labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
    datasets: [
      // {
      //   label: '',
      //   data: [54, 63, 60, 65, 60, 68, 60],
      //   borderColor: colors.themeColor1,
      //   pointBackgroundColor: colors.foregroundColor,
      //   pointBorderColor: colors.themeColor1,
      //   pointHoverBackgroundColor: colors.themeColor1,
      //   pointHoverBorderColor: colors.foregroundColor,
      //   pointRadius: 6,
      //   pointBorderWidth: 2,
      //   pointHoverRadius: 8,
      //   fill: false,
      // },

      // label: '',
      // data: [54, 63, 60, 65, 60, 68, 60],
      // borderColor: colors.themeColor1,
      // pointBackgroundColor: colors.foregroundColor,
      // pointBorderColor: colors.themeColor1,
      // pointHoverBackgroundColor: colors.themeColor1,
      // pointHoverBorderColor: colors.foregroundColor,
      // pointRadius: 4,
      // pointBorderWidth: 2,
      // pointHoverRadius: 5,
      // fill: true,
      // borderWidth: 2,
      // backgroundColor: colors.themeColor1_10,
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
        // backgroundColor: [
        //   'rgba(255, 99, 132, 0.2)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)'
        // ],

        // backgroundColor: 'linear-gradient(to bottom right, #d6106d 0%, #ae4d4d 100%)'
        // backgroundColor: 'linear_gradient(red,yellow)'


        // backgroundColor: "linear_gradient(red, yellow, green)",
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

  // console.log(modalBasic)
  // console.log(gatewaycharge)
  const finalAmount = (e) => {
    // console.log(e)
    const fixedamount = e - ((e * gatewaycharge) / 100)
    setfixedamount(fixedamount)
    // console.log(fixedamount)
    // setfinalAmount(e )

  }

  const tokenfunction = (token) => {
    setinputamount(0)
    console.log(token)

    // const accesstoken = localStorage.getItem("walletAccessToken")
    // postRequest('/wallet-transfer-v2', {
    //   amount: fixedamount,
    //   email: useremail,
    //   ewalletToken: accesstoken,
    //   token: token
    // }).then((response) => {
    //   console.log(response)
    //   if (response.code == 1) {
    //     postRequest('/v1/ewallet/deposit', {
    //       amount: fixedamount,
    //       ewalletToken: accesstoken
    //     }).then((d) => {

    //       postRequest('/v1/ewallet/transactions', {
    //         ewalletToken: accesstoken
    //       }).then((response) => {
    //         console.log(response)

    //         if (response.code == 1) {

    //           if (response.body.message == "jwt expired") {
    //             console.log('expired')
    //             localStorage.removeItem("userType")
    //             localStorage.removeItem("token")
    //             localStorage.removeItem("walletAccessToken")
    //             localStorage.removeItem("walletUserEmail")
    //             localStorage.removeItem("walletRefreshToken")
    //             window.location = '/user/login'

    //           }
    //           else {
    //             console.log('expired not')
    //           }
    //           settransaction(response.body)


    //         }

    //       })
    //         .catch((error) => {
    //           console.log(error)
    //         })
    //       postRequest('/v1/ewallet/balance', {
    //         ewalletToken: accesstoken
    //       }).then((response) => {
    //         console.log(response)
    //         setballance(response.body.balance)

    //       })
    //         .catch((error) => {
    //           console.log(error)
    //         })
    //     })
    //       .catch((error) => {
    //         console.log(error)
    //       })
    //   }
    // })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  }

  const onAmountSubmit = () => {

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


      // console.log(response)
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
          "amount": inputamount,
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
        // NotificationManager.warning("kfc not  required")

      }
      else {
        // NotificationManager.warning("Successfull")
        postEwalletRequest('rechargeEWallet', {
          "wallet_id": usernumber,
          "amount": inputamount,
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
    // console.log('click')
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
      // NotificationManager.warning(res.message)
      if (res.status) {
        NotificationManager.warning(res.message)

      }
      else {
        NotificationManager.warning(res.message)

      }

      console.log(res)

    }).catch((error) => {
      console.log(error)
    })
  }


  const functionbalnceandtrfer = () => {

    postEwalletRequest('showEWalletBalance', {
      "wallet_id": usernumber,


    }).then((res) => {
      console.log(res)
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
        // setballance(res.data.balance)

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
              receivedAmount = receivedAmount + value.Value.amount

            }
            else if (value.Value.tx_data.tx_type == "DR")
              sentAmount = sentAmount + value.Value.amount


          })
          setreceivedAmount(receivedAmount)
          setsentAmount(sentAmount)

          let debitArray = []
          let creditArray = []

          console.log(setFilterElement)
          setFilterElement.forEach((val) => {


            if (val.Value.tx_data.tx_type == "CR") {

              creditArray.push(val.Value.amount)
            }
            else {

              debitArray.push(val.Value.amount)
            }

          })
          console.log(debitArray)
          console.log(debitArray.length)



          let revcreditArray = creditArray.reverse().slice(-18)
          let revdebitArray = debitArray.reverse().slice(-18)

          // console.log('originalArray', revcreditArray)
          // let original = revcreditArray.slice(revcreditArray.length - 8, revcreditArray.length)
          // console.log('after', original)

          console.log(revcreditArray)








          // setdebitArray(revdebitArray)
          // setcreditArray(original)

          setdebitArray(revdebitArray)
          setcreditArray(revcreditArray)

        }



        console.log(setFilterElement)


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

    // setphotofile(URL.createObjectURL(e.target.files[0]));
  }



  const imageHandler = (e) => {
    console.log(e)
    // filename(URL.createObjectURL(e.target.files[0]));
    const file = e.target.files[0];

    // postRequestMultipart('add', file).then((res) => {
    //   console.log(res)

    // }).catch((error) => {
    //   console.log(error)
    // })

    // let formData = new FormData()
    // formData.append("file", file)

    // axios({
    //   url: "http://3.15.154.217:30501/api/v0/add",
    //   method: "POST",
    //   data: formData

    // }).then((respose) => {
    //   console.log(respose)
    // }).catch((error) => {
    //   console.log(error)
    // })



    postRequestMultipart('add', file).then((res) => {
      console.log(res)
      if (res.Hash) {
        console.log(apiBaseUrl)



        filename(`${apiBaseUrl}${res.Hash}`);


      }

    }).catch((error) => {
      console.log(error)
    })
    // filename(URL.createObjectURL(e.target.files[0]));


  }



  // console.log(typeof fixedamount)
  // console.log(transaction)
  // console.log(transferModal)
  // console.log('5555555555555555555555555555555555555555555555555555555')

  // console.log(profleImg)

  return (
    <>
      {/* <div style={{ marginTop: "2%" }}> */}
      <div >



        < Row >
          <Colxx xxs="9">
            {/* <Row style={{ backgroundColor: "" }}>
              <Container>
                <Row>
                  <Col md="7" sm="7" lg="5" xxs="12" style={{ backgroundColor: "" }}>
                    <Container>
                      <Row>
                        <Col sm="1" style={{ backgroundColor: "" }}>
                          All
                      </Col>
                        <Col sm="3" style={{ backgroundColor: "", marginRight: "" }}>
                          <a onClick={() => {
                            transferFunciton()
                          }}>TRANSFER</a>
                        </Col>
                        <Col sm="4" style={{ backgroundColor: "", marginRight: "" }}>
                          RECEIVED
                      </Col>

                      </Row>
                    </Container>




                  </Col>

                </Row>

              </Container>





            </Row> */}


            {/* <img src={profleImg} /> */}
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
                              <strong>RECEIVED</strong>
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
                            {/* <Col sm="4" style={{ backgroundColor: "", marginRight: "" }}>

                            </Col> */}
                            <Col sm="8" style={{ backgroundColor: "", marginRight: "" }}>
                              <Form>
                                <FormGroup className="form-group has-float-label  mb-4">
                                  {/* <Label>
                                  
                  Valid Till
                </Label> */}
                                  <DatePicker
                                    selected={startDateRange}
                                    selectsStart
                                    startDate={startDateRange}
                                    endDate={endDateRange}
                                    // onChange={setStartDateRange}
                                    placeholderText={messages['form-components.start']}
                                  />
                                  {/* <Input type="number" name="name" value='' onChange={(e) => {
                                console.log(e.target.value)
                                settransferamount(e.target.value)
                              }} /> */}
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
                                    {/* <h2>helo</h2> */}
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
                                  </StripeCheckout> */}
                                  <Button
                                    color="primary"
                                    size='xs'
                                    outline
                                    style={{ marginTop: "-10%" }}
                                    onClick={() =>
                                      onAmountSubmit()
                                    }

                                  >Add Money</Button>{' '}
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
                                    {/* <h2>helo</h2> */}
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
                                    {/* <h2>helo</h2> */}
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
                      {/* <IntlMessages id="charts.line" /> */}
                    </CardTitle>
                    {/* <Row> */}

                    <CardSubtitle>
                      {/* <IntlMessages id="charts.shadow" /> */}
                      {/* <strong><span style={{ color: "red" }}>- TOTAL SPENT</span></strong>{' '}
                      <strong><span style={{ color: "green" }}>+ TOTAL RECEIVED</span></strong> */}

                    </CardSubtitle>
                    <div className="chart-container">
                      {/* <LineChart shadow data={lineChartData} /> */}
                      <LineChart shadow data={lineChartData} />
                      {/* <LineChart data={takeData} /> */}



                      {/* <div style={{ position: "relative", width: 600, height: 550 }}>
                        <Line
                          options={{
                            responsive: true
                          }}
                          data={lineChartData} />
                      </div> */}





                    </div>


                    {/* <Colxx xxs="12" lg="6" className="mb-5">
                    <CardSubtitle>
                   
                      <strong>- Transfer Money</strong>
                    </CardSubtitle>
                    <div className="chart-container">
                      <LineChart shadow data={lineChartData} />
                    </div>
                  </Colxx> */}
                    {/* </Row> */}
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
                                {/* Executive Director */}
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
                                {/* Executive Director */}
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



          {
            modalStatus ? (



              <Modal
                isOpen={modalStatus}
                toggle={() => setModalBasic(!modalStatus)}
              >

                <ModalHeader>

                  <span style={{ fontSize: "20px" }}><center>Transfer Money</center></span>
                </ModalHeader>
                <ModalBody>
                  <Form>
                    <FormGroup className="form-group has-float-label  mb-4">
                      <Label>
                        {/* <IntlMessages id="user.fullname" /> */}
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
                        {/* <IntlMessages id="user.fullname" /> */}
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


                {/* <ModalHeader>
             
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
                    tokenfunction(token)
                    
                  }
                }}
              >
                <Button color="primary" onClick={() => setModalBasic(false)}>
                  Proceed
              </Button>
              </StripeCheckout>{' '}
              <Button
                color="secondary"
                onClick={() => setModalBasic(false)}
              >
                Cancel
                    </Button>
            </ModalFooter> */}
              </Modal >
            ) : (null)
          }


          <Modal
            isOpen={verificationToggle}
            toggle={() => setModalBasic(!modalStatus)}
            size="lg"
          >

            <ModalHeader>

              <span style={{ fontSize: "20px" }}><center>Verification Details</center></span>
            </ModalHeader>
            <ModalBody>
              <Container>
                {/* <object width="100%" height="400" data="https://backend.carnivalist.tk/images/file-1594962875036-67782dc0-c7ec-11ea-8785-6743707faf75.png" >   </object> */}

                {/* <object width="100%" height="400" data="https://backend.carnivalist.tk/images/file-1594962403745-4e8ee110-c7eb-11ea-8785-6743707faf75.pdf" >   </object> */}
                <Row>
                  <Col md="6" sm="6" lg="6" xxs="12" style={{ backgroundColor: "" }}>
                    <div className="imgcontainer" style={{ backgroundColor: "" }}>
                      <h1 className="imgheading">Upload ID Proof</h1>
                      <div className="imgholder">
                        {/* <img src={file} alt="" className="img" /> */}
                        {/* <object width="100%" height="150" data="https://backend.carnivalist.tk/images/file-1594962403745-4e8ee110-c7eb-11ea-8785-6743707faf75.pdf" >   </object> */}
                        <object width="130%" height="150" data={file} style={{ marginTop: "" }} >   </object>
                      </div>
                      <input type="file" name="imageUpload" id="input" style={{ marginTop: "5%" }} onChange={imageHandler} />

                    </div>
                  </Col>
                  <Col md="6" sm="6" lg="6" xxs="12" style={{ backgroundColor: "" }}>
                    <div className="imgcontainer" style={{ backgroundColor: "" }}>
                      <h1 className="imgheading">Upload Photo</h1>
                      {/* <div className="imgholder"> */}
                      {/* <img src={photofile} alt="" className="img" /> */}
                      <object width="130%" height="150" data={photofile} style={{ marginTop: "" }} >   </object>

                      {/* </div> */}
                      <input type="file" name="imageUpload" id="input" accept="image/*" style={{ marginTop: "5%" }} onChange={imageHandlerPhoto} />

                    </div>

                    {/* second half */}
                  </Col>




                </Row>




              </Container>
              <Container>
                <Row>

                  <Col md="10" sm="10" lg="10" xxs="12" style={{ backgroundColor: "", marginTop: "3%" }}>
                    <h1 className="imgheading">Identification</h1>
                    <Container>
                      <Row>
                        <Col md="6" sm="6" lg="6" xxs="12" style={{ backgroundColor: "" }}>
                          <Form>
                            <FormGroup className="form-group has-float-label  mb-4">
                              <Label>
                                {/* <IntlMessages id="user.fullname" /> */}
                  Name
                </Label>
                              <Input type="name" name="name" value={transferemailname} onChange={(e) => {
                                console.log(e.target.value)
                                settransferemailname(e.target.value)
                              }} />
                            </FormGroup>
                          </Form>
                          <Form>
                            <FormGroup className="form-group has-float-label  mb-4">
                              <Label>
                                {/* <IntlMessages id="user.fullname" /> */}
                  Number
                </Label>
                              <Input type="number" name="name" value='' onChange={(e) => {
                                console.log(e.target.value)
                                settransferamount(e.target.value)
                              }} />
                            </FormGroup>
                          </Form>

                        </Col>
                        <Col md="6" sm="6" lg="6" xxs="12" style={{ backgroundColor: "" }}>
                          <Form>
                            <FormGroup className="form-group has-float-label  mb-4">
                              {/* <Label>
                                
                  Name
                </Label> */}
                              <Select

                                className="react-select"
                                classNamePrefix="react-select"
                                name="form-field-name"
                                value={selectedOption}
                                onChange={setSelectedOption}
                                options={selectData}
                              />

                            </FormGroup>
                          </Form>
                          <Form>
                            <FormGroup className="form-group has-float-label  mb-4">
                              <Label>
                                {/* <IntlMessages id="user.fullname" /> */}
                  Valid Till
                </Label>
                              <DatePicker
                                selected={startDateRange}
                                selectsStart
                                startDate={startDateRange}
                                endDate={endDateRange}
                                onChange={setStartDateRange}
                                placeholderText={messages['form-components.start']}
                              />
                              {/* <Input type="number" name="name" value='' onChange={(e) => {
                                console.log(e.target.value)
                                settransferamount(e.target.value)
                              }} /> */}
                            </FormGroup>
                          </Form>

                          {/* <Select
                        
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={selectedOption}
                            onChange={setSelectedOption}
                            options={selectData}
                          /> */}



                          {/* <DatePicker
                            selected={startDateRange}
                            selectsStart
                            startDate={startDateRange}
                            endDate={endDateRange}
                            onChange={setStartDateRange}
                            placeholderText={messages['form-components.start']}
                          /> */}

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
                onClick={() => {
                  proceedtransfer()
                }}

              >
                Proceed
                    </Button>{' '}



              <Button
                color="secondary"
                onClick={() => setverificationToggle(false)}
              // style={{ backgroundColor: "" }}
              >
                Cancel
                    </Button>
            </ModalFooter>





          </Modal >






          <Colxx xxs="3">
            {/* <h2>kkaglahl</h2> */}
            <span><strong>Your Card</strong></span>
            {/* <br />
            <br /> */}
            <center><img src={debitcard} style={{ marginTop: "5%" }} /></center>
            {/* <br /> */}








            <div style={{ marginTop: "5%" }}>
              <strong>Your History</strong>
              <div style={{ marginTop: "10%" }}>

                {transaction1.length ? (

                  transaction1.map((value, index) => {
                    return (
                      <>
                        {index < 3 &&

                          <>


                            <Row key={value.TxId}>

                              <Colxx xxs="2">
                                {value.Value.tx_data.tx_type == "CR" ? (<img src={downarrow} style={{ width: "40px", color: "", backgroundColor: "" }} />) : (<img src={uparrow} style={{ width: "40px", color: "", backgroundColor: "" }} />)}


                              </Colxx>
                              <Colxx xxs="6">
                                <div style={{ marginTop: "5%", marginLeft: "1%" }}>
                                  <strong>{value.Value.amount}</strong><br />
                                  {/* <span>{value.Value.action}</span> */}
                                  {/* <span>{value.Value.tx_data.tx_type == "CR" ? ("Received") : ("Transfer")}</span> */}
                                  <span>{value.Value.tx_data.tx_details}</span>

                                </div>

                              </Colxx>
                              <Colxx xxs="4">

                                {moment(value.Timestamp).format('DD/MM/YYYY hh:mm:ss a')}


                              </Colxx>




                            </Row>
                            <br />
                          </>

                          // <>


                          //   <Row key={value.id}>

                          //     <Colxx xxs="2">
                          //       {value.operation == "deposit" ? (<img src={downarrow} style={{ width: "40px", color: "", backgroundColor: "" }} />) : (<img src={uparrow} style={{ width: "40px", color: "", backgroundColor: "" }} />)}


                          //     </Colxx>
                          //     <Colxx xxs="6">
                          //       <div style={{ marginTop: "5%", marginLeft: "15%" }}>
                          //         <strong>{value.amount}</strong><br />
                          //         <span>{value.operation}</span>
                          //       </div>

                          //     </Colxx>
                          //     <Colxx xxs="4">

                          //       {moment(value.createdAt).format('DD/MM/YYYY hh:mm:ss a')}


                          //     </Colxx>




                          //   </Row>
                          //   <br />
                          // </>
                        }



                      </>
                    )
                  })


                ) : (null)}

                {/*<br />
                <Row>



                  <Colxx xxs="2">
                    <img src={uparrow} style={{ width: "40px", color: "", backgroundColor: "" }} />

                  </Colxx>
                  <Colxx xxs="6">
                    <div style={{ marginTop: "5%", marginLeft: "15%" }}>
                      <strong>$ 212.60</strong><br />
                      <span>Spending</span>
                    </div>

                  </Colxx>
                  <Colxx xxs="4">
                    14/12/2019

                  </Colxx>





                </Row>
                <br />
                 <Row>



                  <Colxx xxs="2">
                    <img src={downarrow} style={{ width: "40px", color: "", backgroundColor: "" }} />

                  </Colxx>
                  <Colxx xxs="6">
                    <div style={{ marginTop: "5%", marginLeft: "15%" }}>
                      <strong>$ 212.60</strong><br />
                      <span>Income</span>
                    </div>

                  </Colxx>
                  <Colxx xxs="4">
                    11/12/2019

                  </Colxx>





                </Row> */}


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
