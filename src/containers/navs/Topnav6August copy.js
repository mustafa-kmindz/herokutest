/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { postRequestMultipart, postRequestImage, postRequest, getRequest, postEwalletRequest } from '../../utils/request';

import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container, Row, Col,
  Form, FormGroup, Label, Button
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { NotificationManager } from '../../components/common/react-notifications';

import IntlMessages from '../../helpers/IntlMessages';
import {
  setContainerClassnames,
  clickOnMobileMenu,
  logoutUser,
  changeLocale,
} from '../../redux/actions';

import {
  menuHiddenBreakpoint,
  searchPath,
  localeOptions,
  isDarkSwitchActive,
} from '../../constants/defaultValues';

import { MobileMenuIcon, MenuIcon } from '../../components/svg';
import TopnavEasyAccess from './Topnav.EasyAccess';
import TopnavNotifications from './Topnav.Notifications';
import TopnavDarkSwitch from './Topnav.DarkSwitch';

import { getDirection, setDirection } from '../../helpers/Utils';
import logoimg from './eWallet1.png'
import Select from 'react-select';
import DatePicker from 'react-datepicker';



const getImageUrl = require('../../utils/request');
var apiBaseUrl = getImageUrl.imageUrl()

const selectData = [
  { label: 'Driving License', value: 'Driving License', key: 0 },
  { label: 'College Id', value: 'College Id', key: 1 },
  { label: 'Election Id', value: 'Election Id', key: 2 },
];


const TopNav = ({
  intl,
  history,
  containerClassnames,
  menuClickCount,
  selectedMenuHasSubItems,
  locale,
  setContainerClassnamesAction,
  clickOnMobileMenuAction,
  logoutUserAction,
  changeLocaleAction,
}) => {
  const [isInFullScreen, setIsInFullScreen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [userName, setUserName] = useState('');
  const [kyctoggle, setkyctoggle] = useState(false)
  const [file, filename] = useState(
    'https://via.placeholder.com/1135x240?text=Upload+Image',
  );
  // const [file, filename] = useState(
  //   'http://3.15.154.217:30880/ipfs/QmZzh4KwfE9n8ZuEWZPYE23wfA2MjF21sYVdQfhpRBYzZC',
  // );

  const [photofile, setphotofile] = useState(
    'https://via.placeholder.com/1135x240?text=Upload+Image',

  );
  const [transferemailname, settransferemailname] = useState('')
  const [transferamount, settransferamount] = useState(0)
  const [MobileNumber, setMobileNumber] = useState('')
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [startDateRange, setStartDateRange] = useState(new Date());
  const [endDateRange, setEndDateRange] = useState(new Date());

  const [verificationtoggle, setverificationtoggle] = useState(false);

  const [kycstatus, setkycstatus] = useState("")
  const [disableproceed, setdisableproceed] = useState(true)
  const [emailname, setemailname] = useState("")


  useEffect(() => {
    getRequest('/user/get-user-details').then((d) => {
      console.log(d)
      if (d.code == 1) {
        settransferemailname(d.user.name)
        setemailname(d.user.email)
        setMobileNumber(d.user.mobileNumber)

        postEwalletRequest('getKYC', {
          "wallet_id": d.user.mobileNumber
        }).then((d) => {
          console.log(d)
          if (d.status == 1) {
            // setStatusCondition()
            setphotofile(d.data.image_hash)
            filename(d.data.id_proof_hash)
            settransferemailname(d.data.name)
            setMobileNumber(d.data.proof_number)
            setStartDateRange(new Date(d.data.valid_till))
            let status = `Your KYC Status has been ${d.data.approval_status}`
            setkycstatus(status)
            setdisableproceed(false)




          }
          // if (d.code == 1) {
          //   settransferemailname(d.user.name)
          //   setMobileNumber(d.user.mobileNumber)

          // }

        })
          .catch(error => {
            console.log(error)
          })

      }

    })
      .catch(error => {
        console.log(error)
      })








  }, []);

  const search = () => {
    history.push(`${searchPath}?key=${searchKeyword}`);
    setSearchKeyword('');
  };

  const handleChangeLocale = (_locale, direction) => {
    changeLocaleAction(_locale);

    const currentDirection = getDirection().direction;
    if (direction !== currentDirection) {
      setDirection(direction);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const isInFullScreenFn = () => {
    return (
      (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement &&
        document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement &&
        document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)
    );
  };

  const handleSearchIconClick = (e) => {
    if (window.innerWidth < menuHiddenBreakpoint) {
      let elem = e.target;
      if (!e.target.classList.contains('search')) {
        if (e.target.parentElement.classList.contains('search')) {
          elem = e.target.parentElement;
        } else if (
          e.target.parentElement.parentElement.classList.contains('search')
        ) {
          elem = e.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains('mobile-view')) {
        search();
        elem.classList.remove('mobile-view');
        removeEventsSearch();
      } else {
        elem.classList.add('mobile-view');
        addEventsSearch();
      }
    } else {
      search();
    }
    e.stopPropagation();
  };

  const handleDocumentClickSearch = (e) => {
    let isSearchClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('navbar') ||
        e.target.classList.contains('simple-icon-magnifier'))
    ) {
      isSearchClick = true;
      if (e.target.classList.contains('simple-icon-magnifier')) {
        search();
      }
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      e.target.parentElement.classList.contains('search')
    ) {
      isSearchClick = true;
    }

    if (!isSearchClick) {
      const input = document.querySelector('.mobile-view');
      if (input && input.classList) input.classList.remove('mobile-view');
      removeEventsSearch();
      setSearchKeyword('');
    }
  };

  const removeEventsSearch = () => {
    document.removeEventListener('click', handleDocumentClickSearch, true);
  };

  const addEventsSearch = () => {
    document.addEventListener('click', handleDocumentClickSearch, true);
  };

  const handleSearchInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      search();
    }
  };

  const toggleFullScreen = () => {
    const isFS = isInFullScreenFn();

    const docElm = document.documentElement;
    if (!isFS) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsInFullScreen(!isFS);
  };

  const handleLogout = () => {
    logoutUserAction(history);
    localStorage.removeItem("userType")
    localStorage.removeItem("token")
    localStorage.removeItem("walletAccessToken")
    localStorage.removeItem("walletUserEmail")
    localStorage.removeItem("walletRefreshToken")
    localStorage.removeItem("username")
  };

  const menuButtonClick = (e, _clickCount, _conClassnames) => {
    e.preventDefault();
    // console.log('8888888888888888888888888888888888888888888888')
    console.log(_clickCount)

    setTimeout(() => {
      const event = document.createEvent('HTMLEvents');
      event.initEvent('resize', false, false);
      window.dispatchEvent(event);
    }, 350);
    setContainerClassnamesAction(
      _clickCount + 1,

      _conClassnames,
      selectedMenuHasSubItems
    );
  };

  const mobileMenuButtonClick = (e, _containerClassnames) => {
    e.preventDefault();
    clickOnMobileMenuAction(_containerClassnames);
  };

  const namefuction = () => {
    const username = localStorage.getItem("username")
    return username
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

  const SelectedOptionvalue = (e) => {
    console.log(e.target.value)
  }

  const proceedKyc = () => {
    // console.log('clcik')
    postEwalletRequest('saveKYC', {
      "wallet_id": MobileNumber,
      "name": transferemailname,
      "proof_type": selectedOption.value,
      "proof_number": MobileNumber,
      "valid_till": startDateRange,
      "id_proof_hash": photofile,
      "photo_hash": file,
      "email": emailname

    })
      .then((response) => {
        console.log(response)
        setverificationtoggle(false)
        if (response.status == 1) {
          NotificationManager.warning(response.message)


        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const { messages } = intl;
  // console.log(menuClickCount)
  // console.log(selectedOption.value)
  // console.log(startDateRange)
  return (
    <div>
      <nav className="navbar fixed-top">



        <div className="d-flex align-items-center navbar-left">
          <div className="" style={{
            marginLeft: '3%', color: '#008ecc',
            width: '20px', fontSize: "20px"
          }}>
            <img src={logoimg} style={{ width: "45px" }} /> EWallet
        </div>

          <NavLink
            to="#"
            location={{}}
            className="menu-button d-none d-md-block"
            style={{ marginLeft: "5%" }}
            onClick={(e) =>
              menuButtonClick(e, menuClickCount, containerClassnames)

            }
          >
            <MenuIcon />
          </NavLink>
          <NavLink
            to="#"
            location={{}}
            className="menu-button-mobile d-xs-block d-sm-block d-md-none"
            onClick={(e) => mobileMenuButtonClick(e, containerClassnames)}
          >
            <MobileMenuIcon />
          </NavLink>

          <div className="search" data-search-path="/app/pages/search">
            <Input
              name="searchKeyword"
              id="searchKeyword"
              placeholder={messages['menu.search']}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={(e) => handleSearchInputKeyPress(e)}
            />
            <span
              className="search-icon"
              onClick={(e) => handleSearchIconClick(e)}
            >
              <i className="simple-icon-magnifier" />
            </span>
          </div>
          {/* <div className="d-inline-block">
        <span className="logo-single" />
        </div> */}
          <div className="d-inline-block">

            <UncontrolledDropdown className="ml-2">
              <DropdownToggle
                caret
                color="light"
                size="sm"
                className="language-button"
              >
                <span className="name">{locale.toUpperCase()}</span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                {localeOptions.map((l) => {
                  return (
                    <DropdownItem
                      onClick={() => handleChangeLocale(l.id, l.direction)}
                      key={l.id}
                    >
                      {l.name}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
          <div className="position-relative d-none d-none d-lg-inline-block">
            <a
              className="btn btn-outline-primary btn-sm ml-2"
              target="_top"
              href=""
            >
              {/* <IntlMessages id="user.buy" /> */}
             Recharge
          </a>
          </div>
        </div>
        <a className="navbar-logo" href="/" style={{ marginTop: "-1%" }}>
          {/* <span className="logo-single" /> */}
          {/* <span className="logo d-none d-xs-block" /> */}
          {/* <span className="logo-mobile d-block d-xs-none" /> */}
        </a>

        <div className="navbar-right">
          {isDarkSwitchActive && <TopnavDarkSwitch />}
          <div className="header-icons d-inline-block align-middle">
            <TopnavEasyAccess />
            {/* <TopnavNotifications /> */}
            <button
              className="header-icon btn btn-empty d-none d-sm-inline-block"
              type="button"
              id="fullScreenButton"
              onClick={toggleFullScreen}
            >
              {isInFullScreen ? (
                <i className="simple-icon-size-actual d-block" />
              ) : (
                  <i className="simple-icon-size-fullscreen d-block" />
                )}
            </button>
          </div>
          <div className="user d-inline-block">
            <UncontrolledDropdown className="dropdown-menu-right">
              <DropdownToggle className="p-0" color="empty">
                {/* <span className="name mr-1"> {namefuction()}</span> */}
                <span className="name mr-1"> {transferemailname}</span>

                <span>
                  <img alt="Profile" src="/assets/img/profile-pic-l-11.jpg" />
                </span>
              </DropdownToggle>
              <DropdownMenu className="mt-3" right>
                <DropdownItem>Account</DropdownItem>
                <DropdownItem
                  onClick={() =>

                    getRequest('/user/get-user-details').then((d) => {
                      setverificationtoggle(true)
                      console.log(d)
                      if (d.code == 1) {
                        settransferemailname(d.user.name)
                        setMobileNumber(d.user.mobileNumber)

                        postEwalletRequest('getKYC', {
                          "wallet_id": d.user.mobileNumber
                        }).then((d) => {
                          console.log(d)
                          if (d.status == 1) {
                            // setStatusCondition()
                            setphotofile(d.data.image_hash)
                            filename(d.data.id_proof_hash)
                            settransferemailname(d.data.name)
                            setMobileNumber(d.data.proof_number)
                            setStartDateRange(new Date(d.data.valid_till))
                            let status = `Your KYC Status has been ${d.data.approval_status}`
                            setkycstatus(status)
                            setdisableproceed(false)




                          }
                          // if (d.code == 1) {
                          //   settransferemailname(d.user.name)
                          //   setMobileNumber(d.user.mobileNumber)

                          // }

                        })
                          .catch(error => {
                            console.log(error)
                          })

                      }

                    })
                      .catch(error => {
                        console.log(error)
                      })



                  }
                >KYC Verification Details</DropdownItem>
                {/* <DropdownItem

                  onClick={() =>
                    setkyctoggle(true)
                  }
                >Kyc Details</DropdownItem> */}
                <DropdownItem>Features</DropdownItem>
                <DropdownItem>History</DropdownItem>
                <DropdownItem>Support</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={() => handleLogout()}>
                  Sign out
              </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </nav>


      <Modal
        isOpen={verificationtoggle}
        // toggle={() => setModalBasic(!modalStatus)}
        size="lg"
      >
        <ModalHeader>

          <span style={{ fontSize: "20px" }}><center>Verification Details</center></span>


        </ModalHeader>
        <ModalBody>
          <center><span style={{ fontSize: "20px" }}>{kycstatus}</span></center>
          <Container style={{ marginTop: "5%" }}>
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
                  Mobile
                </Label>
                          <Input type="number" name="name" value={MobileNumber} onChange={(e) => {
                            console.log(e.target.value)
                            // setMobileNumber(e.target.value)
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
                            // onChange={SelectedOptionvalue}
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


          {disableproceed &&
            <Button
              color="secondary"
              onClick={() => {
                // proceedtransfer()
                proceedKyc()
              }}

            >
              Proceed
                   </Button>

          }

          {' '}



          <Button
            color="secondary"
            onClick={() => setverificationtoggle(false)}
          // style={{ backgroundColor: "" }}
          >
            Cancel
                    </Button>
        </ModalFooter>

      </Modal>









      <Modal
        isOpen={kyctoggle}
      // toggle={() => setModalBasic(!modalStatus)}
      >

        <ModalHeader>

          <span style={{ fontSize: "20px" }}><center>Kyc Notifications</center></span>
        </ModalHeader>

        <ModalBody>

          <span style={{ fontSize: "15px" }}>Your KYC Account has been Rejected</span>

          <Form style={{ marginTop: "5%" }}>
            <FormGroup className="form-group has-float-label  mb-4">
              <Label>

                Comment For Rejection
              </Label>
              <Input type="textarea" name="name" value="Wrong Documents" />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            onClick={() => {
              setkyctoggle(false)
            }}

          >
            Close
                    </Button>

        </ModalFooter>

      </Modal>




    </div>
  );
};

const mapStateToProps = ({ menu, settings }) => {
  const { containerClassnames, menuClickCount, selectedMenuHasSubItems } = menu;
  // menuClickCount = 1
  const { locale } = settings;
  return {
    containerClassnames,
    menuClickCount,
    selectedMenuHasSubItems,
    locale,
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    setContainerClassnamesAction: setContainerClassnames,
    clickOnMobileMenuAction: clickOnMobileMenu,
    logoutUserAction: logoutUser,
    changeLocaleAction: changeLocale,
  })(TopNav)
);
