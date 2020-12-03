import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Col, FormLabel, FormControl , Row, FormGroup, Button } from 'react-bootstrap'
import areaValidate from '../../validations/areaValidate'

const renderField = ({
    input, type, placeholder, label, disabled, readOnly, colWidth,
    meta : { touched, error, warning },
}) => (
    <Row>
        <Col md={3}>
            <FormLabel htmlFor={input} className="control-label">
                {label} <span className="text-danger">*</span>
            </FormLabel>
        </Col>
        <Col md={colWidth}>
            <FormControl
                {...input}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
            ></FormControl>
            {
                touched && (( error && <small className="text-danger">{error}</small>) || 
                (warning && <small className="text-warning">{warning}</small>))
            }
        </Col>
    </Row>
)

class FormAreas extends Component {
    render() {
        return (
            <form className="form-horizontal" onSubmit={this.props.handleSubmit}>
                <FormGroup row="true">
                    <FormGroup>
                        <Field
                            type="text"
                            name="name"
                            component={renderField}
                            label="Nama "
                            colWidth="9"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col md={3}>
                                <FormLabel htmlFor="role" className="control-label">
                                    Role <span className="text-danger">*</span>
                                </FormLabel>
                            </Col>
                            <Col md={5}>
                                <Field 
                                    type="select"
                                    name="area_type"
                                    component="select" 
                                    label="Type" 
                                    className="form-control"
                                >
                                    <option value=""> -- Select type --</option>
                                    <option value="1">Operation</option>
                                    <option value="2">Vibration</option>
                                </Field>
                            </Col>
                        </Row>
                    </FormGroup>
                </FormGroup>
                <FormGroup row="true">
                    <FormGroup>
                        <Row>
                        <Col md={9} className="offset-md-3">
                            <Button
                                color="primary"
                                type="submit"
                                disabled={this.props.submitting}
                            >
                                Save
                            </Button>
                            <Button
                                className="btn btn-danger ml-1"
                                type="button"
                                onClick={this.props.closed}
                            >
                                Cancel
                            </Button>
                        </Col>
                        </Row>
                    </FormGroup>
                </FormGroup>
            </form>
        )
    }
}

FormAreas = reduxForm({
    form : 'FormAreas',
    validate : areaValidate, 
    enableReinitialize : true
})(FormAreas)

export default connect()(FormAreas)
