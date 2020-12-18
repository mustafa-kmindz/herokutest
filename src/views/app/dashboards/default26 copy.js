import React from 'react';
import { injectIntl } from 'react-intl';
// import { Row } from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardImg,
  CardText,
  Button,
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
// import MUIDataTable from "mui-datatables";


const DefaultDashboard = ({ intl, match }) => {
  const { messages } = intl;

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

  return (
    <>
      <Row>

        <Colxx xxs="12">
          <Row>
            <Colxx xxs="8">
              <Row>
                <Colxx xxs="8">
                  <Row>
                    <Colxx xxs="2">
                      ALL
              </Colxx>
                    <Colxx xxs="2">
                      SPENT
              </Colxx>
                    <Colxx xxs="3">
                      RECEIVED
              </Colxx>
                    <Colxx xxs="5">

                      <Button color="info" style={{ marginTop: "-5%" }}>+ Create Payment</Button>

                    </Colxx>


                  </Row>


                </Colxx>

              </Row>

              {/* <Row>
                <Colxx xxs="4">


                </Colxx>

              </Row>
              <Row>
                <Colxx xxs="2">
                  All
              </Colxx>
                <Colxx xxs="2">
                  Spent
              </Colxx>
                <Colxx xxs="3">
                  Received
              </Colxx>
                <Colxx xxs="5">
                  Create Paymnent
              </Colxx>


              </Row> */}

            </Colxx>

            <Colxx xxs="4">
              {/* <Row>
                <Colxx xxs="2">
                  All
              </Colxx>
                <Colxx xxs="2">
                  Spent
              </Colxx>
                <Colxx xxs="3">
                  Received
              </Colxx>
                <Colxx xxs="5">
                  Create Paymnent
              </Colxx>


              </Row> */}


            </Colxx>





          </Row>





        </Colxx>



        {/* <Row>
          <Colxx xxs="8">
            <Row>
              <Colxx xxs="2">
                All
              </Colxx>
              <Colxx xxs="2">
                Spent
              </Colxx>
              <Colxx xxs="3">
                Received
              </Colxx>
              <Colxx xxs="5">
                Create Paymnent
              </Colxx>


            </Row>


          </Colxx>
          <Colxx xxs="4">
            <Row>
              <Colxx xxs="3">
                Received
              </Colxx>
              <Colxx xxs="5">
                Create Paymnent
              </Colxx>

            </Row>



          </Colxx>



        </Row> */}



        <Colxx xxs="12" style={{ marginTop: '2%' }}>


          <Row>
            <Colxx xxs="4">
              <Card className="mb-3" style={{ marginLeft: "2%", marginRight: "2%", marginTop: "2%", backgroundColor: "" }}>
                <CardBody>

                  <Row>
                    <Colxx xxs="4">
                      <div className="simple-line-icons">
                        <div className="glyph" >
                          <div className={`glyph-icon iconsminds-coins`} />
                        </div>
                      </div>

                    </Colxx>
                    <Colxx xxs="8">


                    </Colxx>

                  </Row>



                  {/* <Row>
                    <Colxx xxs="6">
                      <CardText className="text-muted text-small mb-4">
                        <strong style={{ color: "white" }}>Kortney</strong>
                      </CardText>
                      <Button outline size="sm" color="" style={{ color: "white" }}>
                     
                           Available Balance $ 12.300
                            </Button>


                    </Colxx>
                    <Colxx xxs="6">
                      <span style={{ fontSize: "15px", color: "white" }}>{`Money Add  : + $ 18.500`}</span>
                      <br />
                      <span style={{ fontSize: "15px", color: "white" }}>{`Transfer   : - $ 5.450`}</span>

                    </Colxx>


                  </Row> */}

                </CardBody>

              </Card>
            </Colxx>

            <Colxx xxs="4">




            </Colxx>
            <Colxx xxs="4">




            </Colxx>



          </Row>







        </Colxx>
      </Row>






    </>
  );
};
export default injectIntl(DefaultDashboard);
