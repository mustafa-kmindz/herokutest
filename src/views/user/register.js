import React, { useState } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions';

import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';
// import { postRequestMultipart, postRequest, getRequest } from '../../utils/request';
import { NotificationManager } from '../../components/common/react-notifications';
import { postRequest, postEwalletRequest } from '../../utils/request';

const Register = ({ history }) => {
  // const [email] = useState('demo@gogo.com');
  // const [password] = useState('gogo123');
  // const [name] = useState('Sarah Kortney');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [name, setname] = useState('');
  const [lastname, setlastname] = useState('');
  const [mobile, setmobile] = useState('');
  // const [userType, setuserType] = useState('consumer');



  const onUserRegister = () => {
    if (!name.length) {
      // alert("Please Enter FirstName")
      NotificationManager.warning('Please Enter FirstName');
    }
    else if (!lastname.length) {
      NotificationManager.warning("Please Enter LastName")
    }
    else if (!email.length) {
      NotificationManager.warning("Please Enter Email")
    }
    else {



      postRequest(
        `/user/register`, {
        email,
        lastName: lastname,
        mobile,
        name,
        password,
        userType: "consumer",

      }
      ).then(d => {
        console.log(d)
        if (d.code == 1) {



          postEwalletRequest('createEWallet', {
            // "wallet_id": email,
            "wallet_id": mobile,
            "name": `${name} ${lastname}`,
            "type": "test",
            "remarks": "Consumer"

          }).then((response) => {
            console.log(response, 'line no 5555555555555555555555555555555555555555555555')

            NotificationManager.warning("Register SuccessFully")
            history.push('/user/login')
            // 

          })
            .catch((error) => {
              // console.log(error)
              NotificationManager.warning(error.message)
            })
          // localStorage.setItem("token", d.token)
          // alert("Register SuccessFully")

          // postEwalletRequest(

          // ).then(response => {
          //   console.log(response)
          // })
          //   .catch(error => {
          //     console.log(error)
          //   }




          // NotificationManager.warning("Register SuccessFully")
          // history.push('/user/login')
        }
        else {
          NotificationManager.warning(d.message)
        }
      });

    }

    // const onChange = (e) => {
    //   console.log(e.target.value)
    // }
    // if (email !== '' && password !== '') {
    //   history.push('/');
    // }

    // if (values.email !== '' && values.password !== '') {
    //   loginUserAction(values, history);
    // }
    // call registerUserAction()
  };


  // console.log('88888888888888888888888888888888888888888888888888888')

  return (
    <Row className="h-100" >
      <Colxx xxs="9" md="7" className="mx-auto my-auto">
        <Card className="" >
          <div className="  ">
            {/* <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use this form to register. <br />
              If you are a member, please{' '}
              <NavLink to="/user/login" className="white">
                login
              </NavLink>
              .
            </p> */}
          </div>
          <div className="form-side" style={{ marginLeft: "5%", marginTop: "5%", marginRight: "5%", marginBottom: "5%" }}>
            {/* <NavLink to="/" className="white">
              <span className="logo-single" />
            </NavLink> */}
            {/* <Row >
              <Colxx xxs="5" md="2" >
                <span className="logo-single" />
              </Colxx>
              <Colxx xxs="5" md="3" >
                <strong style={{ fontSize: "25px" }}>E-Wallet</strong>
              </Colxx>

            </Row> */}
            <CardTitle className="mb-4">
              <IntlMessages id="user.register" />
            </CardTitle>
            <Form>

              <Row>
                <Colxx md="6" xxs="12" md="6" sm="12">
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.fullname" /> */}
                  Name
                </Label>
                    <Input type="name" name="name" value={name} onChange={(e) => {
                      // console.log(e.target.value)
                      setname(e.target.value)
                    }} />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.email" /> */}
                  E-mail
                </Label>
                    <Input type="email" value={email} onChange={(e) => {
                      // console.log(e.target.value)
                      setemail(e.target.value)
                    }} />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.password" defaultValue={password} /> */}
                  Password
                </Label>
                    <Input type="password" value={password} onChange={(e) => {

                      setpassword(e.target.value)
                    }} />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.password" defaultValue={password} /> */}
                  Address
                </Label>
                    <Input type="text" value="" onChange={(e) => {

                      // setpassword(e.target.value)
                    }} />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.password" defaultValue={password} /> */}
                City                </Label>
                    <Input type="text" value="" onChange={(e) => {


                    }} />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.password" defaultValue={password} /> */}
                Country               </Label>
                    <Input type="text" value="" onChange={(e) => {


                    }} />
                  </FormGroup>
                </Colxx>
                <Colxx md="6" xxs="12" md="6" sm="12">
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.fullname" /> */}
                  Last Name
                </Label>
                    <Input type="name" name="name" value={lastname} onChange={(e) => {
                      // console.log(e.target.value)
                      setlastname(e.target.value)
                    }} />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.email" /> */}
                  Phone Number
                </Label>
                    <Input type="number" value={mobile} onChange={(e) => {
                      // console.log(e.target.value)
                      setmobile(e.target.value)
                    }} />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.password" defaultValue={password} /> */}
                 Set Password
                </Label>
                    <Input type="password" value="" onChange={(e) => {

                      // setpassword(e.target.value)
                    }} />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.fullname" /> */}
                  State
                </Label>
                    <Input type="name" name="name" value="" onChange={(e) => {
                      // console.log(e.target.value)

                    }} />
                  </FormGroup>
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.fullname" /> */}
                  Pin Code
                </Label>
                    <Input type="name" name="name" value="" onChange={(e) => {
                      // console.log(e.target.value)

                    }} />
                  </FormGroup>

                  <FormGroup className="form-group has-float-label  mb-4" style={{ marginTop: "1%" }}>
                    Select Type

                    <div style={{ marginTop: "1%" }}>


                      <Row>
                        <Colxx sm="12" md="6" xxs="12" lg="6">
                          {/* <div onChange={this.onChangeValue}> */}
                          <div >
                            <input type="radio" value="Buyer" name="typeof" /> Buyer


      </div>

                        </Colxx>
                        <Colxx sm="12" md="6" xxs="12" lg="6">
                          {/* <div onChange={this.onChangeValue}> */}
                          <div >

                            <input type="radio" value="Seller" name="typeof" /> Seller

      </div>

                        </Colxx>


                      </Row>

                    </div>


                  </FormGroup>
                </Colxx>
              </Row>









              <div className="d-flex justify-content-end align-items-center">
                <Button
                  color="primary"
                  className="btn-shadow"
                  size="lg"
                  onClick={() => onUserRegister()}
                >
                  <IntlMessages id="user.register-button" />
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { user, loading } = authUser;
  return { user, loading };
};

export default connect(mapStateToProps, {
  registerUserAction: registerUser,
})(Register);
