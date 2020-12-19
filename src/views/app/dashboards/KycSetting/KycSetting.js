// import React from 'react';
import React, { useState, useEffect, createRef } from "react";
import { injectIntl } from "react-intl";
import Breadcrumb from '../../../../containers/navs/Breadcrumb';
import { Row, Button, Label, CustomInput, FormGroup, Form, Input } from 'reactstrap';
import { Colxx, Separator } from '../../../../components/common/CustomBootstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import DatatablePagination from '../../../../components/DatatablePagination';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {
    AvForm,
    AvField,
    AvGroup,
    AvInput,
    AvFeedback,
    AvRadioGroup,
    AvRadio,
    AvCheckboxGroup,
    AvCheckbox,
} from 'availity-reactstrap-validation';
// import MUIDataTable from 'mui-datatables';
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {
    postRequestMultipart,
    getRequest,
    postRequest,
    postEwalletRequest
} from "../../../../utils/request";



const KycSettingtDefault = ({ intl, match }) => {
    console.log(match)
    // const data = [["Nischal Narn", "nischal@gmail.com", "9632587410", "200", "niswer2020", "Paid"]];

    const [pendingkyclist, setpendingkyclist] = React.useState([])
    const [kycStatus, setKycStatus] = React.useState(0)
    const [updatetoggle, setupdatetoggle] = React.useState(false)




    React.useEffect(() => {
        getkycstatus()





    }, []);

    const getkycstatus = () => {
        setupdatetoggle(false)
        getRequest(`/website-settings/get-payment-gateway-charges`).then(d => {

            if (d.code === 1) {
                console.log(d)

                setKycStatus(d.paymentGatewayCharges.kycRequired)


            }
        });
        // postEwalletRequest('listKYC').then((res) => {
        //     console.log(res)
        //     console.log(res.data)
        //     if (res.status == 1) {


        //         setpendingkyclist(res.data)



        //     }


        // }).catch((error) => {
        //     console.log(error)
        // })
    }

    const statusChange = (e) => {
        // console.log(e.target.value)
        // setKycStatus(e.target.value)
        postRequest(`/website-settings/update-kyc`, {
            kycRequired: e.target.value

        }).then(d => {
            console.log(d)

            if (d.code === 1) {
                console.log(d)
                window.alert(d.message)
                // setKycStatus(e.target.value)
                getRequest(`/website-settings/get-payment-gateway-charges`).then(d => {

                    if (d.code === 1) {
                        console.log(d)
                        // setbandAmount(d.paymentGatewayCharges.kycRequired)
                        // setoriginalAmt(d.paymentGatewayCharges.nfcBandAmt)
                        setKycStatus(d.paymentGatewayCharges.kycRequired)

                        // this.setState({ amount: d.paymentGatewayCharges.nfcBandAmt })
                        // this.setState({ email: d.user.email, user_id: d.user._id })
                        // this.setState({
                        //   paymentGatewayCharges: d.paymentGatewayCharges,
                        // });
                    }
                });


            }
            else {
                window.alert(d.message)

            }
        });
    }








    console.log(kycStatus)

    return (
        <>
            <Row>
                <Colxx xxs="12" sm="6">

                    <h1 style={{ color: "#008ecc" }}>KYC Settings </h1>

                </Colxx>

                <Colxx xxs="12">


                    <Separator className="mb-5" />
                </Colxx>


                {/* <div >
                    <input type="radio" value="MALE" name="gender" /> Male
        <input type="radio" value="FEMALE" name="gender" /> Female
      </div> */}
            </Row>
            <Row>
                {/* <div>
                    <FormGroup>

                        <CustomInput
                            type="radio"
                            id="exCustomRadio"
                            name="customRadio"
                            checked={kycStatus == 0}
                            onChange={() => {
                                setKycStatus(0)
                            }}


                            label="Select this custom radio"

                        />
                        <CustomInput
                            type="radio"
                            id="exCustomRadio2"
                            name="customRadio"
                            label="Or this one"
                            checked={kycStatus == -1}
                            onChange={() => {
                                setKycStatus(-1)
                            }}



                        />
                        <CustomInput
                            type="radio"
                            name="customRadio"
                            id="exCustomRadio3"
                            label="But not this disabled one"
                            checked={kycStatus == 1}
                            onChange={() => {
                                setKycStatus(1)
                            }}

                        />
                    </FormGroup>
                </div> */}
                <FormControl component="fieldset">

                    {/* <RadioGroup aria-label="gender" name="gender1" value={kycStatus} onChange={(e) => {
                        setKycStatus(e.target.value)
                    }}> */}
                    <RadioGroup aria-label="gender" name="gender1" value={kycStatus} onChange={statusChange}>
                        <FormControlLabel value={0} control={<Radio checked={kycStatus == 0} style={{ color: "blue" }} />} label="Not Required" />
                        <FormControlLabel value={-1} control={<Radio checked={kycStatus == -1} style={{ color: "blue" }} />} label="Required" />
                        {kycStatus > 1 ? (<FormControlLabel value={kycStatus} control={<Radio checked={kycStatus > 1} style={{ color: "blue" }} />} label="Other" />) : (<FormControlLabel value={20} control={<Radio checked={kycStatus == 20} />} label="Other" />)}

                    </RadioGroup>
                </FormControl>




            </Row>

            {updatetoggle ? (
                <>
                    <Row>
                        <Form>
                            <Label className="form-group has-float-label">
                                <h2 style={{ color: "#008ecc" }}>Update Your KYC Price</h2>
                                <Input type="number" value={kycStatus} onChange={(e) => {
                                    console.log(e.target.value)
                                    setKycStatus(e.target.value)

                                }} />
                            </Label>
                        </Form>

                    </Row>

                    <Row>
                        <Button color="primary"
                            size="lg"
                            outline
                            onClick={() => {
                                postRequest(`/website-settings/update-kyc`, {
                                    kycRequired: kycStatus

                                }).then(d => {
                                    console.log(d)

                                    if (d.code === 1) {
                                        console.log(d)
                                        window.alert(d.message)

                                        getkycstatus()


                                        //   getRequest(`/website-settings/get-payment-gateway-charges`).then(d => {

                                        //     if (d.code === 1) {
                                        //       console.log(d)
                                        //       setbandAmount(d.paymentGatewayCharges.kycRequired)
                                        //       setoriginalAmt(d.paymentGatewayCharges.nfcBandAmt)
                                        //       setKycStatus(d.paymentGatewayCharges.kycRequired)


                                        //     }
                                        //   });


                                    }
                                    else {
                                        window.alert(d.message)
                                        // setOpen(false);
                                        // setdisable(false)
                                        // setloader(false)

                                    }
                                });
                            }}


                        > Submit</Button>
                        <Button color="primary"
                            size="lg"
                            style={{ marginLeft: "0.5%" }}
                            outline
                            onClick={() => {
                                setupdatetoggle(false)
                            }}> Cancel</Button>
                    </Row>
                </>
            ) : (
                    <>
                        {kycStatus > 1 &&
                            <>
                                <Row>
                                    <FormControl component="fieldset">
                                        <h2 style={{ color: "#008ecc" }}>KYC Required More Than <strong>${kycStatus}</strong></h2>
                                    </FormControl>

                                </Row>
                                <Row>
                                    <Button color="primary"
                                        size="lg"
                                        outline
                                        onClick={() => {
                                            setupdatetoggle(true)
                                        }}>Update</Button>
                                </Row>
                            </>

                        }

                    </>
                )}


        </>
    );
};
export default injectIntl(KycSettingtDefault);
