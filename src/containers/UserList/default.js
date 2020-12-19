// import React from 'react';
import React, { useState, useEffect, createRef } from "react";
import { Wizard, Steps, Step } from "react-albus";

import { Formik, Field } from "formik";
import Flag from "react-world-flags";
import { injectIntl } from "react-intl";

// import Select from 'react-select';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

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




// import {
//     postRequestMultipart,
//     getRequest,
//     postRequest,
//     postEwalletRequest
// } from "../../../utils/request";
import classnames from "classnames";
import { NotificationManager } from "../../components/common/react-notifications";
import StripeCheckout from "react-stripe-checkout";
import moment from "moment";
// import { Line, Doughnut } from 'react-chartjs-2'
// import { getDateWithFormat } from '../../../helpers/Utils';
import { NavLink } from "react-router-dom";
// import axios from 'axios'

// const getImageUrl = require("../../../utils/request");
// var apiBaseUrl = getImageUrl.imageUrl();
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


    return (
        <>
            <div>
                this is dashboard

      </div>
        </>
    );
};
export default injectIntl(DefaultDashboard);
