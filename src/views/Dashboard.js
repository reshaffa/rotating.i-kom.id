import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";

export default class Dashboard extends Component{
  render(){
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header text-center py-4">
          <Col>
          <iframe width="1024px" height="608px" src="https://app.powerbi.com/view?r=eyJrIjoiODRiYzlkYmMtNDY5Zi00MTg3LWIxNzItMGU3ZTk1ZWViNmQ1IiwidCI6IjczNjk3OWNlLTEyMDMtNDg5OC04MTBiLThhZDZmNDgzNzAxYyIsImMiOjEwfQ%3D%3D" title="framepowerbi" frameBorder="0" allowFullScreen={true}></iframe>
          </Col>
        </Row>
      </Container>
    )
  }
}
