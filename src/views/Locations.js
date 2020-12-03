import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import TableAreas from "../components/tables/TableAreas";
import { connect } from 'react-redux';
import { getAreas, postAreas } from '../actions/areaActions';

class Locations extends Component{
  componentDidMount(){
    this.props.dispatch(getAreas())
  }

  handleSubmit(data){
    this.props.dispatch(postAreas(data))
  }
  render(){
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" subtitle="LIST OF AREA" className="text-sm-left" />
        </Row>
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardBody className="p-0 pb-3">
                <Col>
                <TableAreas save={(data) => this.handleSubmit(data)}></TableAreas> 
                </Col>               
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default  connect()(Locations)

