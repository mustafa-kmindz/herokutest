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

const ListOfUserDefault = ({ intl, match }) => {
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
                this is list of user

      </div>
        </>
    );
};
export default injectIntl(ListOfUserDefault);
