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
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions';

import IntlMessages from '../../helpers/IntlMessages';
import { Colxx } from '../../components/common/CustomBootstrap';
// import { postRequestMultipart, postRequest, getRequest } from '../../utils/request';
import { postRequestMultipart, postRequest, getRequest } from '../../utils/request';

const Register = ({ history }) => {
  const [email] = useState('demo@gogo.com');
  const [password] = useState('gogo123');
  const [name] = useState('Sarah Kortney');

  const onUserRegister = () => {
    if (email !== '' && password !== '') {
      history.push('/');
    }

    // if (values.email !== '' && values.password !== '') {
    //   loginUserAction(values, history);
    // }
    // call registerUserAction()
  };

  return (
    <Row className="h-100">
      <Colxx xxs="9" md="7" className="mx-auto my-auto">
        <Card className="auth-card" style={{ marginTop: "-20%" }}>
          <div className="position-relative image-side ">
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
          <div className="form-side">
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
              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.fullname" />
                </Label>
                <Input type="name" defaultValue={name} />
              </FormGroup>

              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.email" />
                </Label>
                <Input type="email" defaultValue={email} />
              </FormGroup>

              <FormGroup className="form-group has-float-label  mb-4">
                <Label>
                  <IntlMessages id="user.password" defaultValue={password} />
                </Label>
                <Input type="password" />
              </FormGroup>

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
