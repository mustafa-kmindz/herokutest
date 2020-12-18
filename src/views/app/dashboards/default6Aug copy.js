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

const selectGender = [
  { label: "Male", value: "Male", key: 0 },
  { label: "Female", value: "Female", key: 1 }
];

//validation
const validateEmail = value => {
  let error;
  if (!value) {
    error = "Please enter your email address";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
};

const validateName = value => {
  let error;
  if (!value) {
    error = "Please enter your name";
  } else if (value.length < 2) {
    error = "Value must be longer than 2 characters";
  }
  return error;
};
const validateCurrFrom = value => {
  let error;
  if (!value) {
    error = "Please enter amout to send";
  } else if (value.length < 3) {
    error = "Value must be longer than 100";
  }
  return error;
};
const validateCurrTo = value => {
  let error;
  if (!value) {
    error = "Recipient Amount";
  } else if (value.length < 3) {
    error = "Value must be longer than 100";
  }
  return error;
};
const validateAmount = value => {
  let error;
  if (!value) {
    error = "Please enter Amount";
  } else if (value.length < 2) {
    error = "Amount must be more the 100 CAD";
  }
  return error;
};

const validatePassword = value => {
  let error;
  if (!value) {
    error = "Please enter your password";
  } else if (value.length < 6) {
    error = "Password must be longer than 6 characters";
  }
  return error;
};
const validateRecitName = value => {
  let error;
  if (!value) {
    error = "Please enter your name";
  } else if (value.length < 2) {
    error = "Value must be longer than 2 characters";
  }
  return error;
};

const validateCity = value => {
  let error;
  if (!value) {
    error = "Please enter city";
  }
  return error;
};
const validateAddress = value => {
  let error;
  if (!value) {
    error = "Please enter Recipient Address";
  }
  return error;
};
const validatePostal = value => {
  let error;
  if (!value) {
    error = "Please enter your name";
  } else if (value.length < 6) {
    error = "Value must be longer than 6 characters";
  }
  return error;
};
const validateCountry = value => {
  let error;
  if (!value) {
    error = "Please Select Country";
  }
  return error;
};
const validatePurpose = value => {
  let error;
  if (!value) {
    error = "Please choose purpose";
  }
  return error;
};
//--------------

const DefaultDashboard = ({ intl, match }) => {
  const { messages } = intl;
  const [activeSecondTab, setActiveSecondTab] = useState("1");
  const [modalBasic, setModalBasic] = useState(false);
  const [modalLong, setModalLong] = useState(false);
  const [modalLong2, setModalLong2] = useState(false);
  const [modalStatus, setmodalStatus] = useState(false);
  const [gatewaycharge, setgatewaycharge] = useState(0);
  const [inputamount, setinputamount] = useState(0);
  const [useremail, setuseremail] = useState("");
  const [usernumber, setusernumber] = useState("");
  const [fixedamount, setfixedamount] = useState(0);
  const [ballance, setballance] = useState(0);
  const [transaction, settransaction] = useState([]);
  const [transaction1, settransaction1] = useState([]);

  const [accessToken, setaccessToken] = useState("");
  const [selectedAccordion, setSelectedAccordion] = useState(1);
  // const [settransferModal, transferModal] = useState(false)
  const [transferemailname, settransferemailname] = useState("");
  const [transferamount, settransferamount] = useState(0);
  const [receivedAmount, setreceivedAmount] = useState(0);
  const [sentAmount, setsentAmount] = useState(0);

  const [debitArray, setdebitArray] = useState([]);
  const [creditArray, setcreditArray] = useState([]);

  const [stripeToggle, setstripeToggle] = useState(false);

  const [profleImg, setprofleImg] = useState(null);
  const [bankdetiail] = useState(true);
  const [cashpoint] = useState(false);

  //currency--
  const [basecurrency, setCurrency] = useState("");
  const [convertcurrency, setconvertCurrency] = useState("");
  const [currancyfrom, setCurrFrom] = useState("");
  const [currancyto, setCurrTo] = useState("");
  const [curranylist, setCurrList] = useState("");
  const [exchangeprice, setExchangeRate] = useState("");
  const [chargeamount, setChargeAmount] = useState("");
  const [totalamount, setTotalAmount] = useState("");
  //bankAndCashPoint
  const [bankaccount, setBankAccount] = useState("");
  const [cashpointdata, setCashPoint] = useState("");
  //country
  const [countryname, setCountryName] = useState("");
  //--------

  const [file, filename] = useState(
    "https://via.placeholder.com/1135x240?text=Upload+Image"
  );
  // const [file, filename] = useState(
  //   'http://3.15.154.217:30880/ipfs/QmZzh4KwfE9n8ZuEWZPYE23wfA2MjF21sYVdQfhpRBYzZC',
  // );

  const [photofile, setphotofile] = useState(
    "https://via.placeholder.com/1135x240?text=Upload+Image"
  );
  const [selectedOption, setSelectedOption] = useState("USD");
  const [selectedOptions, setSelectedOptions] = useState("USD");
  const [startDateRange, setStartDateRange] = useState(new Date());
  const [endDateRange, setEndDateRange] = useState(new Date());

  const [verificationToggle, setverificationToggle] = useState(false);
  const [boldcolor, setboldcolor] = useState("all");
  const [addmoneytoggle, setaddmoneytoggle] = useState(false);

  const [remittancetoggle, setremittancetoggle] = useState(false);

  const [TrasferModel, setTrasferModel] = useState(false);
  const [bottomNavHidden, setBottomNavHidden] = useState(false);
  const [topNavDisabled, setTopNavDisabled] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [bankcheckbox, setBankCheckBox] = useState(true);

  //
  const forms = [createRef(null), createRef(null), createRef(null)];

  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState([
    {
      valid: false,
      name: "name",
      value: ""
    },
    {
      valid: false,
      name: "email",
      value: ""
    },
    {
      valid: false,
      name: "password",
      value: ""
    },
    {
      valid: false,
      name: "number",
      value: ""
    },
    {
      valid: false,
      name: "radio",
      value: ""
    },
    {
      valid: false,
      name: "select",
      value: ""
    },
    {
      valid: false,
      name: "checkbox",
      value: ""
    },
    {
      valid: false,
      name: "recipntname",
      value: ""
    },
    {
      valid: false,
      name: "cityname",
      value: ""
    },
    {
      valid: false,
      name: "address",
      value: ""
    },
    {
      valid: false,
      name: "postalcode",
      value: ""
    },
    {
      valid: false,
      name: "curranyfrom",
      value: ""
    },
    {
      valid: false,
      name: "convertcurrency",
      value: ""
    }
  ]);
  ///

  //api-------------



  //----------

  const topNavClick = (stepItem, push) => {
    if (topNavDisabled) {
      return;
    }
    push(stepItem.id);
  };

  const onClickNext = (goToNext, steps, step) => {
    step.isDone = true;
    if (steps.length - 1 <= steps.indexOf(step)) {
      setBottomNavHidden(true);
      setTopNavDisabled(true);
    }
    if (steps.length - 1 <= steps.indexOf(step)) {
      return;
    }
    goToNext();
  };

  const onClickPrev = (goToPrev, steps, step) => {
    if (steps.indexOf(step) <= 0) {
      return;
    }
    goToPrev();
  };

  useEffect(() => {
    getRequest("/user/get-user-details")
      .then(d => {
        if (d.code == 1) {
          localStorage.setItem("username", `${d.user.name}`);
          setuseremail(d.user.email);
          setusernumber(d.user.mobileNumber);

          postEwalletRequest("showEWalletBalance", {
            wallet_id: d.user.mobileNumber
          })
            .then(res => {
              console.log(res);
              if (res.status == 1) {
                setballance(res.data.balance);
              }
            })
            .catch(error => {
              console.log(error);
            });

          postEwalletRequest("getEWalletStatement", {
            wallet_id: d.user.mobileNumber
          })
            .then(res => {
              console.log(res);

              if (res.status == 1) {
                let sorting = res.data.sort((a, b) => {
                  const aDate = new Date(a.Timestamp);
                  const bDate = new Date(b.Timestamp);
                  return bDate.getTime() - aDate.getTime();
                });

                let setFilterElement = sorting.filter(value => {
                  return value.Value.action != "Create";
                });

                settransaction1(setFilterElement);

                // console.log(setFilterElement)

                if (setFilterElement.length) {
                  let receivedAmount = 0;
                  let sentAmount = 0;
                  let receivedchart = [];
                  let sentchart = [];
                  setFilterElement.forEach(value => {
                    if (value.Value.tx_data.tx_type == "CR") {
                      // console.log(typeof value.Value.amount)
                      receivedAmount =
                        receivedAmount + value.Value.tx_data.amount;
                    } else if (value.Value.tx_data.tx_type == "DR")
                      // sentAmount = sentAmount + value.Value.amount
                      sentAmount = sentAmount + value.Value.tx_data.amount;
                  });
                  setreceivedAmount(receivedAmount);
                  setsentAmount(sentAmount);

                  let debitArray = [];
                  let creditArray = [];

                  setFilterElement.forEach(val => {
                    if (val.Value.tx_data.tx_type == "CR") {
                      creditArray.push(val.Value.tx_data.amount);
                    } else {
                      debitArray.push(val.Value.tx_data.amount);
                    }
                  });

                  let revcreditArray = creditArray.reverse().slice(-18);
                  let revdebitArray = debitArray.reverse().slice(-18);

                  setdebitArray(revdebitArray);
                  setcreditArray(revcreditArray);
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });

    getRequest("/website-settings/get-payment-gateway-charges")
      .then(response => {
        if (response.code == 1) {
          setgatewaycharge(response.paymentGatewayCharges.percentage);
        }
      })
      .catch(error => {
        console.log(error);
      });
    //"BankList"

    getRequest("/get-all-banknadcashlistforconsumer")
      .then(res => {
        console.log("BANKLIST", res.getbankandcashList);
        const CashPointData = res.getbankandcashList.filter(
          x => x.category === "CashPointList"
        );
        console.log("CashPointList", CashPointData);
        setCashPoint(CashPointData);

        const BankNameData = res.getbankandcashList.filter(
          x => x.category === "BankList"
        );
        console.log("BankList", BankNameData);
        setBankAccount(BankNameData);
      })
      .catch(error => {
        console.log(error);
      });

    getRequest("/get-all-countrylistforconsumer")
      .then(res => {
        console.log("CountryList", res.getcountryList);
        setCountryName(res.getcountryList);
      })
      .catch(error => {
        console.log(error);
      });

    getRequest("/get-all-conversionPricelistforconsumer")
      .then(res => {
        // const BankNameData = res.getbankandcashList.filter(
        //   x => x.category === "BankList"
        //                           // );
        //                               const amount = `${inputamount - (inputamount * gatewaycharge) / 100}`;
        // const token_amount = inputamount;

        setCurrList(res.saveConversionPriceList);
        setExchangeRate(res.saveConversionPriceList[0].amount);
        const converstionPrice =
          basecurrency * exchangeprice;
        // console.log("convert", converstionPrice);

        setconvertCurrency(converstionPrice);
        console.log("setconvertCurrency", convertcurrency);
        const Amount = `${
          converstionPrice - (converstionPrice * gatewaycharge) / 100
          }`;
        setTotalAmount(Amount);
        const transfee = Amount - converstionPrice;
        setChargeAmount(transfee);
        console.log('Amount', Amount);
        console.log("transfee", transfee);


      })
      .catch(error => {
        console.log(error);
      });
  }, [basecurrency]);

  //  const reciptamount = `${
  //    basecurrency - (basecurrency * gatewaycharge) / 100
  //  }`;
  // //  setTotalAmount(reciptamount);
  // //  console.log("totalamount", totalamount);
  // console.log("gatewaycharge", gatewaycharge,);

  const setGradientColor = (canvas, color) => {
    console.log(color);
    const ctx = canvas.getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 350);

    console.log(color.opacity, color.colors);
    gradient.addColorStop(color.opacity, color.colors);

    ctx.fillStyle = gradient;

    return gradient;
  };

  const takeData = canvas => {
    const data = lineData;

    if (data.datasets) {
      let colors = [
        { colors: "#c2f0f0", opacity: 0.4 },
        { colors: "red", opacity: 1 }
      ];

      data.datasets.forEach((set, i) => {
        console.log(canvas);
        set.backgroundColor = setGradientColor(canvas, colors[i]);
        set.borderColor = "white";
        set.borderwidth = 2;
      });
    }
    return data;
  };

  const lineData = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        label: "income",
        backgroundColor: "#98e6e6",
        // data: [14, 15, 18, 15, 12, 19, 10]
        data: [54, 63, 60, 65, 60, 68, 60]
      },
      {
        label: "spent",
        backgroundColor: "",
        data: [14, 15, 11, 5, 20, 12, 2]
      }
    ]
  };

  const doughnutChartData = {
    datasets: [
      {
        label: "",
        borderColor: ["#99d6ff", "#f0c2c2"],
        backgroundColor: ["#f1fcfc", "#feebeb"],
        borderWidth: 2,
        data: [80, 20]
      }
    ]
  };

  const doughnutChartData1 = {
    datasets: [
      {
        label: "",
        borderColor: ["#99d6ff"],
        backgroundColor: ["#f1fcfc"],
        borderWidth: 2,
        data: [100]
      }
    ]
  };

  const doughnutChartData2 = {
    datasets: [
      {
        label: "",
        borderColor: ["#f0c2c2"],
        backgroundColor: ["#feebeb"],
        borderWidth: 2,
        data: [100]
      }
    ]
  };

  const lineChartData = {
    labels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20"
    ],
    datasets: [
      {
        label: "",
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
        label: "",
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
      }
    ]
  };

  const columns = ["Name", "Company", "City", "State"];

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"]
  ];

  const options = {
    filterType: "checkbox"
  };

  const finalAmount = e => {
    const fixedamount = e - (e * gatewaycharge) / 100;
    setfixedamount(fixedamount);
  };

  const tokenfunction = token => {
    setinputamount(0);
    console.log(token);
  };

  const checkkycRequired = () => {
    // console.log('clcolk')
    getRequest(`/website-settings/get-payment-gateway-charges`).then(
      response => {
        setaddmoneytoggle(false);
        if (response.paymentGatewayCharges.kycRequired == -1) {
          postEwalletRequest("getKYC", {
            wallet_id: usernumber
          })
            .then(response => {
              if (
                response.status == 1 &&
                response.data.approval_status == "Approved"
              ) {
                setTrasferModel(true);
              } else {
                NotificationManager.warning("kyc required");
                setverificationToggle(true);
                setinputamount("");
              }
            })
            .catch(error => {
              console.log(error);
            });

          // NotificationManager.warning("kyc required")
          // setverificationToggle(true)
          // setinputamount('')
        } else if (
          response.paymentGatewayCharges.kycRequired != 0 &&
          response.paymentGatewayCharges.kycRequired < inputamount
        ) {
          postEwalletRequest("getKYC", {
            wallet_id: usernumber
          })
            .then(response => {
              console.log(response);
              if (
                response.status == 1 &&
                response.data.approval_status == "Approved"
              ) {
                setTrasferModel(true);
              } else {
                NotificationManager.warning("kyc required");
                setverificationToggle(true);
                setinputamount("");
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          setTrasferModel(true);
        }
      }
    );
  };

  const onAmountSubmit = token => {
    console.log(token);

    const amount = `${inputamount - (inputamount * gatewaycharge) / 100}`;
    const token_amount = inputamount;

    console.log(token_amount);
    console.log(amount);

    setstripeToggle(true);
    setaddmoneytoggle(false);

    postEwalletRequest("rechargeEWallet", {
      wallet_id: usernumber,
      amount: amount,
      // "amount": "500.25",
      stripe_token: token,
      token_amount: inputamount,

      remarks: ""
    })
      .then(response => {
        setinputamount("");

        if (response.status == 1) {
          NotificationManager.warning(response.message);

          functionbalnceandtrfer();
        }
      })
      .catch(error => {
        console.log(error);
      });

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

    // getRequest(`/website-settings/get-payment-gateway-charges`).then((response) => {

    //   setaddmoneytoggle(false)

    // if (response.paymentGatewayCharges.kycRequired == -1) {
    //   NotificationManager.warning("kyc required")
    //   setverificationToggle(true)
    //   setinputamount('')
    // }
    // else if (response.paymentGatewayCharges.kycRequired != 0 && response.paymentGatewayCharges.kycRequired < inputamount) {
    //   NotificationManager.warning("kyc required")
    //   setverificationToggle(true)
    //   setinputamount('')

    // }
    // else if (response.paymentGatewayCharges.kycRequired == 0) {
    //   postEwalletRequest('rechargeEWallet', {
    //     "wallet_id": usernumber,
    //     "amount": amount,
    //     "stripe_token": token,
    //     "token_amount": inputamount,

    //     "remarks": ""

    //   }).then((response) => {
    //     setinputamount('')

    //     if (response.status == 1) {
    //       NotificationManager.warning(response.message)

    //       functionbalnceandtrfer()

    //     }

    //   })
    //     .catch((error) => {
    //       console.log(error)
    //     })

    // }
    // else {

    //   postEwalletRequest('rechargeEWallet', {
    //     "wallet_id": usernumber,
    //     "amount": `${amount}`,
    //     "stripe_token": token,
    //     "token_amount": inputamount,
    //     "remarks": ""

    //   }).then((response) => {
    //     setinputamount('')

    //     if (response.status == 1) {
    //       NotificationManager.warning(response.message)

    //       functionbalnceandtrfer()

    //     }

    //   })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // }

    // })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  };

  const transferFunciton = () => {
    console.log("click");
    setmodalStatus(true);
  };

  const proceedtransfer = () => {
    setmodalStatus(false);
    postEwalletRequest("transferBtwEWallets", {
      wallet_from: usernumber,
      wallet_to: transferemailname,
      amount: transferamount,
      master_id: "",
      child_id: "",
      remarks: ""
    })
      .then(res => {
        settransferemailname("");
        settransferamount("");
        functionbalnceandtrfer();

        if (res.status) {
          NotificationManager.warning(res.message);
        } else {
          NotificationManager.warning(res.message);
        }

        // console.log(res)
      })
      .catch(error => {
        console.log(error);
      });
  };

  const functionbalnceandtrfer = () => {
    postEwalletRequest("showEWalletBalance", {
      wallet_id: usernumber
    })
      .then(res => {
        // console.log(res)
        if (res.status == 1) {
          setballance(res.data.balance);
        }
      })
      .catch(error => {
        console.log(error);
      });

    postEwalletRequest("getEWalletStatement", {
      wallet_id: usernumber
    })
      .then(res => {
        console.log(res);

        if (res.status == 1) {
          let sorting = res.data.sort((a, b) => {
            const aDate = new Date(a.Timestamp);
            const bDate = new Date(b.Timestamp);
            return bDate.getTime() - aDate.getTime();
          });

          let setFilterElement = sorting.filter(value => {
            return value.Value.action != "Create";
          });

          settransaction1(setFilterElement);
          if (setFilterElement.length) {
            let receivedAmount = 0;
            let sentAmount = 0;
            setFilterElement.forEach(value => {
              if (value.Value.tx_data.tx_type == "CR") {
                receivedAmount = receivedAmount + value.Value.tx_data.amount;
              } else if (value.Value.tx_data.tx_type == "DR")
                sentAmount = sentAmount + value.Value.tx_data.amount;
            });
            setreceivedAmount(receivedAmount);
            setsentAmount(sentAmount);

            let debitArray = [];
            let creditArray = [];

            console.log(setFilterElement);
            setFilterElement.forEach(val => {
              if (val.Value.tx_data.tx_type == "CR") {
                creditArray.push(val.Value.tx_data.amount);
              } else {
                debitArray.push(val.Value.tx_data.amount);
              }
            });
            // console.log(debitArray)
            // console.log(debitArray.length)

            let revcreditArray = creditArray.reverse().slice(-18);
            let revdebitArray = debitArray.reverse().slice(-18);

            // console.log(revcreditArray)

            setdebitArray(revdebitArray);
            setcreditArray(revcreditArray);
          }

          // console.log(setFilterElement)
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const imageHandlerPhoto = e => {
    const file = e.target.files[0];
    postRequestMultipart("add", file)
      .then(res => {
        console.log(res);
        if (res.Hash) {
          console.log(apiBaseUrl);

          setphotofile(`${apiBaseUrl}${res.Hash}`);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const imageHandler = e => {
    console.log(e);

    const file = e.target.files[0];

    postRequestMultipart("add", file)
      .then(res => {
        console.log(res);
        if (res.Hash) {
          console.log(apiBaseUrl);

          filename(`${apiBaseUrl}${res.Hash}`);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <Row>
          <Colxx xxs="9">
            <Row>
              <Colxx xxs="12">
                <div>
                  <Row>
                    <Colxx md="6" sm="6" lg="4" xxs="12">
                      <Row>
                        <Container>
                          <Row>
                            <Col sm="2" style={{ backgroundColor: "" }}>
                              <a onClick={() => { }}>
                                <strong>All</strong>
                              </a>
                            </Col>
                            <Col
                              sm="4"
                              style={{ backgroundColor: "", marginRight: "" }}
                            >
                              <a
                                onClick={() => {
                                  transferFunciton();
                                }}
                              >
                                <strong>TRANSFER</strong>
                              </a>
                            </Col>
                            <Col
                              sm="4"
                              style={{ backgroundColor: "", marginRight: "" }}
                            >
                              <a
                                onClick={() => {
                                  setremittancetoggle(true);
                                }}
                              >
                                <strong>REMITTANCE</strong>
                              </a>
                            </Col>
                          </Row>
                        </Container>
                      </Row>
                    </Colxx>
                    <Colxx md="6" sm="6" lg="4" xxs="12"></Colxx>
                    <Colxx md="6" sm="6" lg="4" xxs="12">
                      <Row>
                        <Container>
                          <Row>
                            <Col sm="2" style={{ backgroundColor: "" }}></Col>

                            <Col
                              sm="8"
                              style={{ backgroundColor: "", marginRight: "" }}
                            >
                              <Form>
                                <FormGroup className="form-group has-float-label  mb-4">
                                  <DatePicker
                                    selected={startDateRange}
                                    selectsStart
                                    startDate={startDateRange}
                                    endDate={endDateRange}
                                    placeholderText={
                                      messages["form-components.start"]
                                    }
                                  />
                                </FormGroup>
                              </Form>
                            </Col>
                          </Row>
                        </Container>
                      </Row>
                    </Colxx>
                  </Row>
                </div>
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12">
                <div>
                  <Row>
                    <Colxx md="6" sm="6" lg="4" xxs="12">
                      <Card className="d-flex flex-row mb-4">
                        <div
                          className=" d-flex flex-grow-1 min-width-zero"
                          style={{ marginLeft: "5%" }}
                        >
                          <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                            <Container>
                              <Row>
                                <Col xs="4" style={{ backgroundColor: "" }}>
                                  <div style={{ backgroundColor: "" }}>
                                    <img
                                      src={money}
                                      style={{
                                        width: "40px",
                                        color: "",
                                        backgroundColor: ""
                                      }}
                                    />
                                  </div>
                                </Col>
                                <Col xs="8" style={{ backgroundColor: "" }}>
                                  <div style={{ marginTop: "" }}>
                                    <center>
                                      <span>CURRENT BALANCE</span>
                                    </center>
                                    <strong>$ {ballance}</strong>
                                    {!addmoneytoggle && (
                                      <Button
                                        color="primary"
                                        size="xs"
                                        outline
                                        style={{ marginLeft: "5%" }}
                                        onClick={() => {
                                          setaddmoneytoggle(true);
                                        }}
                                      >
                                        + Top Up
                                      </Button>
                                    )}
                                  </div>
                                </Col>
                              </Row>

                              {addmoneytoggle && (
                                <div style={{ marginTop: "5%" }}>
                                  <FormGroup className="form-group has-float-label  mb-4">
                                    <Label>Amount</Label>
                                    <Input
                                      type="number"
                                      name="name"
                                      value={inputamount}
                                      onChange={e => {
                                        setinputamount(e.target.value);

                                        finalAmount(e.target.value);
                                      }}
                                    />
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
                                    size="xs"
                                    outline
                                    style={{ marginTop: "-10%" }}
                                    onClick={() => {
                                      // setaddmoneytoggle(false)
                                      checkkycRequired();
                                      // setTrasferModel(true)
                                    }}
                                  >
                                    Submit
                                  </Button>{" "}
                                  <Button
                                    color="primary"
                                    size="xs"
                                    outline
                                    style={{ marginTop: "-10%" }}
                                    onClick={() => {
                                      setaddmoneytoggle(false);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              )}
                            </Container>
                          </CardBody>
                        </div>
                      </Card>
                    </Colxx>
                    <Colxx md="6" sm="6" lg="4" xxs="12">
                      <Card className="d-flex flex-row mb-4">
                        <div
                          className=" d-flex flex-grow-1 min-width-zero"
                          style={{ marginLeft: "5%" }}
                        >
                          <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                            <Container>
                              <Row>
                                <Col xs="4" style={{ backgroundColor: "" }}>
                                  <div style={{ backgroundColor: "" }}>
                                    <img
                                      src={arrowdown}
                                      style={{
                                        width: "40px",
                                        color: "",
                                        backgroundColor: ""
                                      }}
                                    />
                                  </div>
                                </Col>
                                <Col xs="8" style={{ backgroundColor: "" }}>
                                  <span>TOTAL RECEIVED</span>
                                  <br />
                                  <strong>$ {receivedAmount}</strong>
                                  <br />
                                </Col>
                              </Row>
                            </Container>
                          </CardBody>
                        </div>
                      </Card>
                    </Colxx>
                    <Colxx md="6" sm="6" lg="4" xxs="12">
                      <Card className="d-flex flex-row mb-4">
                        <div
                          className=" d-flex flex-grow-1 min-width-zero"
                          style={{ marginLeft: "5%" }}
                        >
                          <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                            <Container>
                              <Row>
                                <Col xs="4" style={{ backgroundColor: "" }}>
                                  <div style={{ backgroundColor: "" }}>
                                    <img
                                      src={arrowup}
                                      style={{
                                        width: "40px",
                                        color: "",
                                        backgroundColor: ""
                                      }}
                                    />
                                  </div>
                                </Col>
                                <Col xs="8" style={{ backgroundColor: "" }}>
                                  <span>TOTAL SPENT</span>
                                  <br />
                                  <strong>$ {sentAmount}</strong>
                                  <br />
                                </Col>
                              </Row>
                            </Container>
                          </CardBody>
                        </div>
                      </Card>
                    </Colxx>
                  </Row>
                </div>
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12">
                <Card style={{ backgroundColor: "", marginTop: "" }}>
                  <CardBody>
                    <CardTitle></CardTitle>
                    {/* <Row> */}

                    <CardSubtitle></CardSubtitle>
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
                        <div
                          className=""
                          style={{
                            backgroundColor: "",
                            marginTop: "5%",
                            width: "30%",
                            marginLeft: "2%"
                          }}
                        >
                          <DoughnutChart data={doughnutChartData} />
                        </div>

                        <div
                          className=" d-flex flex-grow-1 min-width-zero"
                          style={{ marginLeft: "5%" }}
                        >
                          <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                            <div className="min-width-zero">
                              <NavLink to="/app/ui/cards">
                                <CardSubtitle className="truncate mb-1">
                                  INCOMING VS OUTGOING
                                </CardSubtitle>
                              </NavLink>
                              <CardText className="text-muted text-small mb-2"></CardText>
                            </div>
                          </CardBody>
                        </div>
                      </Card>
                    </Colxx>
                    <Colxx md="6" sm="6" lg="4" xxs="12">
                      <Card className="d-flex flex-row mb-4">
                        <div
                          className=""
                          style={{
                            backgroundColor: "",
                            marginTop: "5%",
                            width: "30%",
                            marginLeft: "2%"
                          }}
                        >
                          <DoughnutChart data={doughnutChartData1} />
                        </div>

                        <div
                          className=" d-flex flex-grow-1 min-width-zero"
                          style={{ marginLeft: "5%" }}
                        >
                          <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                            <div className="min-width-zero">
                              <NavLink to="/app/ui/cards">
                                <CardSubtitle className="truncate mb-1">
                                  INCOMING
                                </CardSubtitle>
                              </NavLink>
                              <CardText className="text-muted text-small mb-2"></CardText>
                            </div>
                          </CardBody>
                        </div>
                      </Card>
                    </Colxx>
                    <Colxx md="6" sm="6" lg="4" xxs="12">
                      <Card className="d-flex flex-row mb-4">
                        <div
                          className=""
                          style={{
                            backgroundColor: "",
                            marginTop: "5%",
                            width: "30%",
                            marginLeft: "2%"
                          }}
                        >
                          <DoughnutChart data={doughnutChartData2} />
                        </div>

                        <div
                          className=" d-flex flex-grow-1 min-width-zero"
                          style={{ marginLeft: "5%" }}
                        >
                          <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                            <div className="min-width-zero">
                              <NavLink to="/app/ui/cards">
                                <CardSubtitle className="truncate mb-1">
                                  OUTGOING
                                </CardSubtitle>
                              </NavLink>
                              <CardText className="text-muted text-small mb-2"></CardText>
                            </div>
                          </CardBody>
                        </div>
                      </Card>
                    </Colxx>
                  </Row>
                </div>
              </Colxx>
            </Row>
          </Colxx>

          <Modal
            isOpen={TrasferModel}
          // toggle={() => setModalBasic(!modalStatus)}
          >
            <ModalHeader>
              <span style={{ fontSize: "20px" }}>
                <center>Transaction Summary</center>
              </span>
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
                  <span style={{ fontSize: "20px" }}>
                    Payment Gateway Charges :{" "}
                  </span>
                </Colxx>
                <Colxx xxs="3">
                  <span style={{ fontSize: "20px" }}>
                    {" "}
                    $ {(inputamount * gatewaycharge) / 100}
                  </span>
                </Colxx>
              </Row>
              <Row>
                <Colxx xxs="8">
                  <span style={{ fontSize: "20px" }}>
                    Amount to be credited :{" "}
                  </span>
                </Colxx>
                <Colxx xxs="3">
                  <span style={{ fontSize: "20px" }}>
                    {" "}
                    $ {inputamount - (inputamount * gatewaycharge) / 100}
                  </span>
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
                    console.log("!!token", token);
                    // tokenfunction(token)
                    onAmountSubmit(token);
                    setTrasferModel(false);
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
                    console.log("clcik")
                  }
                >
                  Proceed
                </Button>
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

          {modalStatus ? (
            <Modal
              isOpen={modalStatus}
            // toggle={() => setModalBasic(!modalStatus)}
            >
              <ModalHeader>
                <span style={{ fontSize: "20px" }}>
                  <center>Transfer Money</center>
                </span>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>Number</Label>
                    <Input
                      type="number"
                      name="name"
                      value={transferemailname}
                      onChange={e => {
                        console.log(e.target.value);
                        settransferemailname(e.target.value);
                      }}
                    />
                  </FormGroup>
                </Form>
                <Form>
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>Amount</Label>
                    <Input
                      type="number"
                      name="name"
                      value={transferamount}
                      onChange={e => {
                        console.log(e.target.value);
                        settransferamount(e.target.value);
                      }}
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  onClick={() => {
                    proceedtransfer();
                  }}
                >
                  Proceed
                </Button>{" "}
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
                <Button color="secondary" onClick={() => setmodalStatus(false)}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          ) : null}

          <Modal
            isOpen={remittancetoggle}
            toggle={() => setremittancetoggle(!remittancetoggle)}
            size="lg"
          >
            {/* <ModalHeader> */}
            {/* <span style={{ fontSize: "20px" }}><center>Remittance Details </center></span>  */}
            {/* <Button
                color="secondary"
                onClick={() => setremittancetoggle(false)}
              >
                Cancel
              </Button> */}
            {/* </ModalHeader> */}
            <ModalBody>
              <Container>
                <CardBody className="wizard wizard-default">
                  <Wizard>
                    <TopNavigation
                      className="justify-content-center"
                      disableNav={false}
                      topNavClick={topNavClick}
                    />
                    <Steps>
                      <Step size="lg" id="step1" name="Amount" desc="">
                        <div className="wizard-basic-step">
                          <Row style={{ width: "55%", marginLeft: "25%" }}>
                            <Colxx xxs="12" md="12" className="mb-5">
                              <InputGroup size="lg">
                                <Input
                                  placeholder="You Send"
                                  value={basecurrency}
                                  onChange={e => {
                                    setCurrency(e.target.value);
                                  }}
                                />
                                <InputGroupAddon addonType="append">
                                  <FormGroup>
                                    <Input
                                      type="select"
                                      style={{
                                        height: "48px",
                                        backgroundColor: "#4556ac",
                                        color: "#FFFFFF",
                                        fontSize: "20px"
                                      }}
                                    >
                                      {curranylist.length ? (
                                        curranylist.map((currlist, index) => {
                                          return (
                                            <option>
                                              {currlist.countryCodefrom}
                                            </option>
                                          );
                                        })
                                      ) : (
                                          <strong>not found...</strong>
                                        )}
                                    </Input>
                                  </FormGroup>
                                </InputGroupAddon>
                              </InputGroup>
                            </Colxx>
                            <Colxx xxs="12" md="12" className="mb-5">
                              <Colxx xxs="12" md="12" className="mb-5">
                                <strong style={{ fontSize: "15px" }}>
                                  Exchange Rate(Current):{" "}
                                  <span>{exchangeprice}</span>
                                </strong>
                              </Colxx>
                              <Colxx xxs="12" md="12" className="mb-5">
                                <strong style={{ fontSize: "15px" }}>
                                  Converted Amount:{" "}
                                  <span>{convertcurrency} PHP</span>
                                </strong>
                              </Colxx>
                              <Colxx xxs="12" md="12" className="mb-5">
                                <strong
                                  style={{
                                    fontSize: "15px",
                                    cursor: "pointer",
                                    color: "#922c88"
                                  }}
                                  color="link"
                                  onClick={() => setCollapse(!collapse)}
                                  className="mb-1"
                                >
                                  {" "}
                                  Transaction Fees:&nbsp;
                                  <span>{chargeamount} PHP</span>
                                </strong>
                              </Colxx>
                              <Collapse isOpen={collapse}>
                                <hr />
                                <Colxx
                                  className="p-4 border mt-4"
                                  xxs="12"
                                  md="12"
                                  className="mb-5"
                                >
                                  <strong style={{ fontSize: "15px" }}>
                                    Total Amount:{" "}
                                    <span>{convertcurrency} PHP</span>
                                  </strong>
                                </Colxx>
                                <Colxx
                                  className="p-4 border mt-4"
                                  xxs="12"
                                  md="12"
                                  className="mb-5"
                                >
                                  <strong style={{ fontSize: "15px" }}>
                                    {gatewaycharge}% of Total Amount:{" "}
                                    <span>{chargeamount} PHP</span>
                                  </strong>
                                </Colxx>
                                <Colxx
                                  className="p-4 border mt-4"
                                  xxs="12"
                                  md="12"
                                  className="mb-5"
                                >
                                  <strong style={{ fontSize: "15px" }}>
                                    Our Transaction Fees:{" "}
                                    <span>{chargeamount} PHP</span>
                                  </strong>
                                </Colxx>
                              </Collapse>

                              {/* </CardBody>
                              </Card> */}
                            </Colxx>
                            <Colxx xxs="12" md="12" className="mb-5">
                              <InputGroup size="lg">
                                <Input
                                  placeholder="Recipient get"
                                  value={convertcurrency}
                                // onChange={e => {
                                //   setconvertCurrency(e.target.value);
                                // }}
                                />
                                <InputGroupAddon addonType="append">
                                  <FormGroup>
                                    <Input
                                      type="select"
                                      style={{
                                        height: "48px",
                                        backgroundColor: "#4556ac",
                                        color: "#FFFFFF",
                                        fontSize: "20px"
                                      }}
                                    >
                                      {curranylist.length ? (
                                        curranylist.map((currlist, index) => {
                                          return (
                                            <option>
                                              {currlist.countryCodeto}
                                            </option>
                                          );
                                        })
                                      ) : (
                                          <strong>not found...</strong>
                                        )}
                                    </Input>
                                  </FormGroup>
                                </InputGroupAddon>
                              </InputGroup>
                            </Colxx>
                            <Colxx xxs="12" md="12" className="mb-5">
                              <strong style={{ fontSize: "15px" }}>
                                Total Transfer Amout:{" "}
                                <span>{totalamount} PHP</span>
                              </strong>
                            </Colxx>
                          </Row>
                        </div>
                      </Step>
                      <Step id="step2" name="Delivery Methods" desc="">
                        <div className="wizard-basic-step">
                          <Row>
                            <Col md="12" sm="12" lg="12" xxs="12">
                              <Card className="mb-4">
                                <CardHeader className="pl-0 pr-0">
                                  <Nav
                                    tabs
                                    className=" card-header-tabs  ml-0 mr-0"
                                  >
                                    <NavItem className="w-50 text-center">
                                      <NavLink
                                        style={{
                                          fontSize: "20px",
                                          color: "#000000"
                                        }}
                                        to="#"
                                        location={{}}
                                        className={classnames({
                                          active: activeSecondTab === "1",
                                          "nav-link": true
                                        })}
                                        onClick={() => {
                                          setActiveSecondTab("1");
                                        }}
                                      >
                                        Bank Account
                                      </NavLink>
                                    </NavItem>
                                    <NavItem className="w-50 text-center">
                                      <NavLink
                                        to="#"
                                        style={{
                                          fontSize: "20px",
                                          color: "#000000"
                                        }}
                                        location={{}}
                                        className={classnames({
                                          active: activeSecondTab === "2",
                                          "nav-link": true
                                        })}
                                        onClick={() => {
                                          setActiveSecondTab("2");
                                        }}
                                      >
                                        Cash Point
                                      </NavLink>
                                    </NavItem>
                                  </Nav>
                                </CardHeader>

                                <TabContent activeTab={activeSecondTab}>
                                  <TabPane tabId="1">
                                    <Row>
                                      <Colxx sm="12">
                                        <CardBody>
                                          <Row>
                                            <Colxx
                                              xxs="12"
                                              md="12"
                                              className="mb-5"
                                            >

                                              {bankaccount.length ? (
                                                bankaccount.map(
                                                  (value, index) => {
                                                    return (
                                                      <FormGroup
                                                        check
                                                        style={{
                                                          fontSize: "20px",
                                                          marginBottom: "2%"
                                                        }}
                                                      >
                                                        <Label check>
                                                          <Input
                                                            type="radio"
                                                            name="radio1"
                                                            size="lg"
                                                            style={{
                                                              width: "3%"
                                                            }}
                                                            onClick={() =>
                                                              setCollapse(
                                                                !collapse
                                                              )
                                                            }
                                                          />
                                                          <img
                                                            src={usd}
                                                            height="40px"
                                                            style={{
                                                              marginLeft: "3%"
                                                            }}
                                                          />{" "}
                                                            &nbsp;
                                                            <stong>
                                                            {value.bankname}
                                                          </stong>{" "}
                                                            &nbsp;
                                                          </Label>
                                                      </FormGroup>
                                                    );
                                                  }
                                                )
                                              ) : (
                                                  <strong>
                                                    Bank not found...
                                                  </strong>
                                                )}
                                              <Collapse isOpen={collapse}>
                                                <FormGroup>
                                                  <Label
                                                    style={{
                                                      fontSize: "15px"
                                                    }}
                                                    className="form-group has-float-label"
                                                  >
                                                    Recipient Account Number
                                                    <Input
                                                      style={{
                                                        height: "50px"
                                                      }}
                                                      type="text"
                                                    />
                                                  </Label>
                                                </FormGroup>
                                              </Collapse>
                                            </Colxx>
                                            <hr />
                                          </Row>
                                        </CardBody>
                                      </Colxx>
                                    </Row>
                                  </TabPane>
                                  <TabPane tabId="2">
                                    <Row>
                                      <Colxx sm="12">
                                        <CardBody>
                                          {cashpointdata.length ? (
                                            cashpointdata.map(
                                              (value, index) => {
                                                return (
                                                  <FormGroup
                                                    check
                                                    style={{
                                                      fontSize: "20px",
                                                      marginBottom: "2%"
                                                    }}
                                                  >
                                                    <Label check>
                                                      <Input
                                                        type="radio"
                                                        name="radio1"
                                                        size="lg"
                                                        style={{
                                                          width: "3%"
                                                        }}
                                                      />
                                                      <img
                                                        src={usd}
                                                        height="40px"
                                                        style={{
                                                          marginLeft: "3%"
                                                        }}
                                                      />{" "}
                                                      &nbsp;
                                                      <stong>
                                                        {value.bankname}
                                                      </stong>{" "}
                                                      &nbsp;
                                                    </Label>
                                                  </FormGroup>
                                                );
                                              }
                                            )
                                          ) : (
                                              <strong>Bank not found...</strong>
                                            )}
                                        </CardBody>
                                      </Colxx>
                                    </Row>
                                  </TabPane>
                                  <TabPane tabId="3">
                                    <Row>
                                      <Colxx sm="12">
                                        <CardBody>
                                          <CardTitle className="mb-4">
                                            Cheesecake with Chocolate Cookies
                                            and Cream Biscuits
                                          </CardTitle>
                                          <Button
                                            outline
                                            size="sm"
                                            color="primary"
                                          >
                                            Edit
                                          </Button>
                                        </CardBody>
                                      </Colxx>
                                    </Row>
                                  </TabPane>
                                </TabContent>
                              </Card>
                            </Col>
                          </Row>
                        </div>
                      </Step>
                      <Step id="step3" name="Recipient Details" desc="">
                        <div className="wizard-basic-step">
                          <Form>
                            <Label
                              style={{ fontSize: "15px" }}
                              className="form-group has-float-label"
                            >
                              Recipient email (required)
                              <Input style={{ height: "50px" }} type="email" />
                            </Label>
                            <Label
                              style={{ fontSize: "15px" }}
                              className="form-group has-float-label"
                            >
                              Recipient Full name
                              <Input style={{ height: "50px" }} type="text" />
                            </Label>
                            <div>
                              <strong style={{ fontSize: "15px" }}>
                                Recipient's address
                              </strong>
                              <hr />
                            </div>
                            <br />
                            <div
                              className="form-group has-float-label"
                              style={{
                                fontSize: "15px",
                                height: "50px"
                              }}
                            >
                              Country
                              <Input type="select" size="lg">
                                {countryname.length ? (
                                  countryname.map((cntry, index) => {
                                    return <option>{cntry.country}</option>;
                                  })
                                ) : (
                                    <strong>country not found</strong>
                                  )}
                              </Input>
                            </div>
                            <br />
                            <Label
                              className="form-group has-float-label"
                              style={{ fontSize: "15px" }}
                            >
                              City
                              <Input style={{ height: "50px" }} type="email" />
                            </Label>
                            <Label
                              className="form-group has-float-label"
                              style={{ fontSize: "15px" }}
                            >
                              Address
                              <Input style={{ height: "50px" }} type="text" />
                            </Label>
                            <Label
                              className="form-group has-float-label"
                              style={{ fontSize: "15px" }}
                            >
                              Postal code
                              <Input type="text" style={{ height: "50px" }} />
                            </Label>
                            <FormGroup>
                              <Label
                                for="exCustomRadio"
                                style={{ fontSize: "15px" }}
                              >
                                Purpose
                              </Label>
                              <div>
                                <CustomInput
                                  type="radio"
                                  id="exCustomRadio"
                                  name="customRadio"
                                  label="Select this custom radio"
                                />
                                <CustomInput
                                  type="radio"
                                  id="exCustomRadio2"
                                  name="customRadio"
                                  label="Or this one"
                                />
                                <CustomInput
                                  type="radio"
                                  name="customRadio"
                                  id="exCustomRadio3"
                                  label="But not this disabled one"
                                />
                              </div>
                            </FormGroup>
                          </Form>
                        </div>
                      </Step>
                      <Step id="step4" name="Preview" desc="">
                        <div className="wizard-basic-step">
                          <Row>
                            <Colxx xxs="12" md="12" className="mb-5">
                              <Card>
                                <CardTitle
                                  style={{
                                    textAlign: "center",
                                    paddingTop: "2%"
                                  }}
                                >
                                  <strong style={{ fontSize: "20px" }}>
                                    Amount
                                  </strong>
                                </CardTitle>

                                <CardBody>
                                  <Row>
                                    <Colxx xxs="12">
                                      <Row
                                        className="icon-cards-row mb-2"
                                        style={{
                                          textAlign: "center",
                                          fontSize: "15px"
                                        }}
                                      >
                                        <Colxx xxs="4" sm="4" md="4" lg="4">
                                          <strong>
                                            <Flag code="Ca" height="16" /> You
                                            send: <span>500 CAD</span>
                                          </strong>
                                        </Colxx>
                                        <Colxx xxs="4" sm="4" md="4" lg="4">
                                          <i className="iconsminds-sync" />
                                          <div>
                                            <strong>
                                              Exchange Rate:
                                              <span>1.3</span>
                                            </strong>
                                          </div>
                                        </Colxx>
                                        <Colxx xxs="4" sm="4" md="4" lg="4">
                                          <div style={{ textAlign: "center" }}>
                                            <strong>
                                              <Flag code="Ph" height="16" />{" "}
                                              Recipient get:{" "}
                                              <span>500 CAD</span>
                                            </strong>
                                          </div>
                                        </Colxx>
                                      </Row>
                                    </Colxx>
                                  </Row>
                                </CardBody>
                              </Card>
                            </Colxx>
                            <Colxx
                              sm={12}
                              xxs="12"
                              style={{
                                fontSize: "20px",
                                textAlign: "center"
                              }}
                            >
                              <strong>Reciept Details</strong>
                              <hr />
                            </Colxx>

                            <Row style={{ textAlign: "center" }}>
                              <Colxx sm={6} lg="6">
                                <Card
                                  style={{
                                    padding: "5%",
                                    marginBottom: "5%",
                                    fontSize: "15px"
                                  }}
                                >
                                  <strong>
                                    Recipient Name: <span>Vijay Gehlot</span>
                                  </strong>
                                </Card>
                              </Colxx>

                              <Colxx sm={6} lg="6">
                                <Card
                                  style={{
                                    padding: "5%",
                                    marginBottom: "5%",
                                    fontSize: "15px"
                                  }}
                                >
                                  <strong>
                                    Recipient Email:{" "}
                                    <span>gehlot@gmail.com</span>
                                  </strong>
                                </Card>
                              </Colxx>

                              <Colxx sm={6} lg="6">
                                <Card
                                  style={{
                                    padding: "5%",
                                    marginBottom: "5%",
                                    fontSize: "15px"
                                  }}
                                >
                                  <strong>
                                    Delivery Methods:
                                    <span>
                                      {" "}
                                      <strong>
                                        <span>
                                          <Badge color="danger">
                                            Bank Account
                                          </Badge>
                                        </span>
                                      </strong>
                                    </span>
                                  </strong>
                                </Card>
                              </Colxx>

                              <Colxx sm={6} lg="6">
                                <Card
                                  style={{
                                    padding: "5%",
                                    marginBottom: "5%",
                                    fontSize: "15px"
                                  }}
                                >
                                  <strong>
                                    Recipient Account No.:{" "}
                                    <span>9855220011</span>
                                  </strong>
                                </Card>
                              </Colxx>
                              <Colxx sm={6} lg="6">
                                <Card
                                  style={{
                                    padding: "5%",
                                    marginBottom: "5%",
                                    fontSize: "15px"
                                  }}
                                >
                                  <strong>
                                    City: <span>Ottawa</span>
                                  </strong>
                                </Card>
                              </Colxx>

                              <Colxx sm={6} lg="6">
                                <Card
                                  style={{
                                    padding: "5%",
                                    marginBottom: "5%",
                                    fontSize: "15px"
                                  }}
                                >
                                  <strong>
                                    Address: <span>4210 Heatherleigh</span>
                                  </strong>
                                </Card>
                              </Colxx>
                              <Colxx sm={6} lg="6">
                                <Card
                                  style={{
                                    padding: "5%",
                                    marginBottom: "5%",
                                    fontSize: "15px"
                                  }}
                                >
                                  <strong>
                                    Country: <span>Canada</span>
                                  </strong>
                                </Card>
                              </Colxx>

                              <Colxx sm={6} lg="6">
                                <Card
                                  style={{
                                    padding: "5%",
                                    marginBottom: "5%",
                                    fontSize: "15px"
                                  }}
                                >
                                  <strong>
                                    Postal Code: <span>A1A 1A1</span>
                                  </strong>
                                </Card>
                              </Colxx>
                              <Colxx sm={12}>
                                <Card
                                  style={{
                                    padding: "2%",
                                    marginBottom: "2%",
                                    fontSize: "20px"
                                  }}
                                >
                                  <strong>
                                    Purpose of Transaction:{" "}
                                    <span>
                                      <Badge color="info">
                                        purpose of banking
                                      </Badge>
                                    </span>
                                  </strong>
                                </Card>
                              </Colxx>
                              <Colxx sm={12} xss={12}>
                                <Card
                                  style={{
                                    padding: "2%",
                                    marginBottom: "5%",
                                    fontSize: "15px"
                                  }}
                                >
                                  <strong style={{ fontSize: "15px" }}>
                                    <CustomInput
                                      type="checkbox"
                                      id="exampleCustomCheckbox"
                                      label="Please Confirm your Details"
                                    />
                                  </strong>
                                </Card>
                              </Colxx>
                            </Row>
                          </Row>
                        </div>
                      </Step>
                      <Step id="step5" name="Pay" desc="">
                        <div className="wizard-basic-step">
                          <Form>
                            <FormGroup>
                              <Label>
                                <IntlMessages id="forms.password" />
                              </Label>
                              <Input
                                type="password"
                                name="password"
                                placeholder={messages["forms.password"]}
                              />
                            </FormGroup>
                          </Form>
                        </div>
                      </Step>
                    </Steps>
                    <BottomNavigation
                      onClickNext={onClickNext}
                      onClickPrev={onClickPrev}
                      className={`justify-content-center ${
                        bottomNavHidden && "invisible"
                        }`}
                      prevLabel={messages["wizard.prev"]}
                      nextLabel={messages["wizard.next"]}
                    />
                  </Wizard>
                </CardBody>
              </Container>
            </ModalBody>
            {/* <ModalFooter>
              
              <Button
                color="secondary"
                onClick={() => setremittancetoggle(false)}
              >
                Cancel
              </Button>
            </ModalFooter> */}
          </Modal>

          <Modal
            isOpen={verificationToggle}
            toggle={() => setModalBasic(!modalStatus)}
            size="lg"
          >
            <ModalHeader>
              <span style={{ fontSize: "20px" }}>
                <center>Verification Details Required</center>
              </span>
            </ModalHeader>
            <ModalBody>
              <h4 className="imgheading">
                Please Go To User Profile and Select KYC Verification Details
              </h4>
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                onClick={() => setverificationToggle(false)}
              >
                OK
              </Button>
            </ModalFooter>
          </Modal>

          <Colxx xxs="3">
            <span>
              <strong>Your Card</strong>
            </span>

            <center>
              <img src={debitcard} style={{ marginTop: "5%" }} />
            </center>
            <div style={{ marginTop: "5%" }}>
              <strong>Your History</strong>
              <div style={{ marginTop: "10%" }}>
                {transaction1.length
                  ? transaction1.map((value, index) => {
                    return (
                      <div key={value.TxId}>
                        {index < 3 && (
                          <>
                            <Row key={value.TxId}>
                              <Colxx xxs="2">
                                {value.Value.tx_data.tx_type == "CR" ? (
                                  <img
                                    src={downarrow}
                                    style={{
                                      width: "40px",
                                      color: "",
                                      backgroundColor: ""
                                    }}
                                  />
                                ) : (
                                    <img
                                      src={uparrow}
                                      style={{
                                        width: "40px",
                                        color: "",
                                        backgroundColor: ""
                                      }}
                                    />
                                  )}
                              </Colxx>
                              <Colxx xxs="6">
                                <div
                                  style={{
                                    marginTop: "5%",
                                    marginLeft: "1%"
                                  }}
                                >
                                  <strong>
                                    {value.Value.tx_data.amount}
                                  </strong>
                                  <br />
                                  <span>
                                    {value.Value.tx_data.tx_details}
                                  </span>
                                </div>
                              </Colxx>
                              <Colxx xxs="4">
                                {moment(value.Timestamp).format(
                                  "DD/MM/YYYY hh:mm:ss a"
                                )}
                              </Colxx>
                            </Row>
                            <br />
                          </>
                        )}
                      </div>
                    );
                  })
                  : null}
              </div>
              <div style={{ marginTop: "2%", fontSize: "15px" }}>
                <span style={{ color: "#99d6ff" }}>
                  <strong>
                    <center>View All</center>
                  </strong>
                </span>
              </div>
            </div>
          </Colxx>
        </Row>
      </div>
    </>
  );
};
export default injectIntl(DefaultDashboard);
