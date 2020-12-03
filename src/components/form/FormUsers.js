import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Col, FormLabel, FormControl , Row, FormGroup, Button } from 'react-bootstrap'
import userValidate from '../../validations/userValidate'

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

class FormUsers extends Component {
    render() {
        return (
            <form className="form-horizontal" onSubmit={this.props.handleSubmit}>
                <FormGroup row="true">
                    <FormGroup>
                        <Field
                            type="text"
                            name="nip"
                            component={renderField}
                            label="NIP "
                            colWidth="7"
                        />
                    </FormGroup>
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
                        <Field
                            type="email"
                            name="email"
                            component={renderField}
                            label="Email "
                            colWidth="8"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Field
                            type="text"
                            name="phone"
                            component={renderField}
                            label="No. Telp "
                            colWidth="6"
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
                                    name="role"
                                    component="select" 
                                    label="Role" 
                                    className="form-control"
                                >
                                    <option value=""> -- Select role user --</option>
                                    <option value="admin">Administrasi</option>
                                    <option value="engineer">Engineer</option>
                                    <option value="manager">Manager</option>
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

FormUsers = reduxForm({
    form : 'FormUsers',
    validate : userValidate, 
    enableReinitialize : true
})(FormUsers)

export default connect()(FormUsers)
