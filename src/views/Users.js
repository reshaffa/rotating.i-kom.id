import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import TableUsers from "../components/tables/TableUsers";
import { connect } from 'react-redux';
import { getUsers, postUsers } from '../actions/userActions'

class Users extends Component{
  componentDidMount(){
    this.props.dispatch(getUsers())
  }

  handleSubmit(data){
    this.props.dispatch(postUsers(data))
  }

  componentDidUpdate(){
    this.props.dispatch(getUsers())
  }

  render(){
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" subtitle="ACTIVE USERS" className="text-sm-left" />
        </Row>
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardBody className="p-0 pb-3">
                <Col>
                  <TableUsers save={(data) => this.handleSubmit(data)}></TableUsers>   
                </Col>             
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default connect()(Users)

