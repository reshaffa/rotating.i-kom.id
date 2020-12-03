import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody } from "shards-react";
import { connect } from "react-redux";

import PageTitle from "../components/common/PageTitle";
import TableVibrations from "../components/tables/TableVibrations";
import FormReports from '../components/form/FormReports'
import { getVibrations, postVibrations } from '../actions/vibrationActions';

class Reports extends Component{

  componentDidMount(){
    this.props.dispatch(getVibrations())
  }


  handleSubmit(data){
    console.log(data)
    //this.props.dispatch(postVibrations(data))
  }

  render(){
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle sm="12" subtitle="Upload Excel Rotating Engineering untuk Dashboard PowerBI" className="text-sm-left" />
        </Row>
        <Row>
          <div className="col-md-12">
            <Card small className="mb-4">
              <CardBody className="p-0 pb-3">
                <Col>
                <FormReports onSubmit={(data) => this.handleSubmit(data)}></FormReports>  
                <TableVibrations></TableVibrations> 
                </Col>               
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    )
  }
}

export default connect()(Reports)

