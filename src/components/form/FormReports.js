import React, { Component } from 'react'
import { reduxForm, Field, FieldArray } from 'redux-form'
import { connect } from 'react-redux'
import { Col, FormLabel, Row, FormGroup, Button } from 'react-bootstrap'
import _ from 'lodash'
import moment from 'moment'
import * as XLSX from 'xlsx'

let excel = []
class FormReports extends Component {
    
    getYears (){
        const years = []
        const dateStart = moment()
        const dateEnd = moment().subtract(10, 'y')
        while (dateStart.diff(dateEnd, 'years') >= 0) {
          years.push(<option key={dateStart.format('YYYY')} value={dateStart.format('YYYY')}>{dateStart.format('YYYY')}</option>)
          dateStart.subtract(1,'y')
        }
        return years
    }

    readExcel(file){
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
    
            fileReader.onload = (e) => {
                const arrayBuffer = e.target.result;
                const wbook = XLSX.read(arrayBuffer, { type : 'buffer'})
                const wbookName = wbook.SheetNames[0];
                const wsheet = wbook.Sheets[wbookName];
    
                const data = XLSX.utils.sheet_to_json(wsheet,  { raw: false });
                resolve(data);
            }
    
            fileReader.onerror = ((error) => {
                reject(error);
            })
        })
    
        promise.then((d) => {
            //d.splice(0,5);
            //const columns = {...d[1], ...d[3]}
            //console.log(d)
            let temp = []
            d.map((el) => {
              
                let vib_max = (_.isEmpty(el.__EMPTY_31) || el.__EMPTY_31.trim() == "" ? 0 : el.__EMPTY_31.toString().replace(" (g)",""))
                let acc_max = (_.isEmpty(el.__EMPTY_32) || el.__EMPTY_32.trim() == "" ? 0 : el.__EMPTY_32.toString().replace(" (g)",""))
                let max_level = (_.isEmpty(el.__EMPTY_33) || el.__EMPTY_33.trim() == "" ? 0 : el.__EMPTY_33.toString().replace(" (g)",""))

                let actual_vib = (
                    el.__EMPTY_38 == "A" && el.__EMPTY_39 == "D" ? parseFloat(vib_max) : 
                    el.__EMPTY_38 == "N" && el.__EMPTY_39 == "A" || el.__EMPTY_39 == "D", el.__EMPTY_39 ? parseFloat(acc_max) :
                    el.__EMPTY_38 == "N" && el.__EMPTY_39 == "N" ? parseFloat(max_level) : 0
                )
    
                temp.push({
                    tag_no : el.__EMPTY_2,
                    user_id : 1,
                    area_name : el.__EMPTY_5,
                    last_date : (_.isEmpty(el.__EMPTY_6) ? null : el.__EMPTY_6.toString()),
                    dvr_ob : (_.isEmpty(el.__EMPTY_13) ? 0 : parseFloat(el.__EMPTY_13)),
                    dvr_obv : (_.isEmpty(el.__EMPTY_14) ? 0 : parseFloat(el.__EMPTY_14)),
                    dvr_obh : (_.isEmpty(el.__EMPTY_15) ? 0 : parseFloat(el.__EMPTY_15)),
                    dvr_ib : (_.isEmpty(el.__EMPTY_16) ? 0 : parseFloat(el.__EMPTY_16)),
                    dvr_ibv : (_.isEmpty(el.__EMPTY_17) ? 0 : parseFloat(el.__EMPTY_17)),
                    dvr_ibh : (_.isEmpty(el.__EMPTY_18) ? 0 : parseFloat(el.__EMPTY_18)),
                    dvr_a : (_.isEmpty(el.__EMPTY_19) ? 0 : parseFloat(el.__EMPTY_19)),
                    dvn_ob : (_.isEmpty(el.__EMPTY_20) ? 0 :parseFloat( el.__EMPTY_20)),
                    dvn_obv : (_.isEmpty(el.__EMPTY_21) ? 0 : parseFloat(el.__EMPTY_21)),
                    dvn_obh : (_.isEmpty(el.__EMPTY_22) ? 0 : parseFloat(el.__EMPTY_22)),
                    dvn_ib : (_.isEmpty(el.__EMPTY_23) ? 0 : parseFloat(el.__EMPTY_23)),
                    dvn_ibv : (_.isEmpty(el.__EMPTY_24) ? 0 : parseFloat(el.__EMPTY_24)),
                    dvn_ibh : (_.isEmpty(el.__EMPTY_25) ? 0 : parseFloat(el.__EMPTY_25)),
                    dvn_a : (_.isEmpty(el.__EMPTY_26) ? 0 : parseFloat(el.__EMPTY_26)),
                    dvr_max : (_.isEmpty(vib_max) ? 0 : parseFloat(vib_max)),
                    dvn_max : (_.isEmpty(acc_max) ? 0 : parseFloat(acc_max)),
                    max_level : (_.isEmpty(max_level) ? 0 : parseFloat(max_level)),
                    actual_vib : parseFloat(actual_vib),
                    position : (_.isEmpty(el.__EMPTY_37) || el.__EMPTY_37.trim() =="" ? "-" : el.__EMPTY_37),
                    vib_status : (_.isEmpty(el.__EMPTY_38) || el.__EMPTY_38.trim() =="" ? "-" : el.__EMPTY_38),
                    acc_status : (_.isEmpty(el.__EMPTY_39) || el.__EMPTY_39.trim() =="" ? "-" : el.__EMPTY_39),
                    status : (_.isEmpty(el.__EMPTY_40) || el.__EMPTY_40.trim() =="" ? "-" : el.__EMPTY_40),
                    indikasi : (_.isEmpty(el.__EMPTY_67) || el.__EMPTY_67.trim() =="" ? "-" : el.__EMPTY_67),
                    type : (_.isEmpty(el.__EMPTY_68) || el.__EMPTY_68.trim() == "" ? "-" : el.__EMPTY_68),
                    remark : (_.isEmpty(el.__EMPTY_69) || el.__EMPTY_69.trim() =="" ? "-" : el.__EMPTY_69),
                    saran : (_.isEmpty(el.__EMPTY_70) || el.__EMPTY_70.trim() =="" ? "-" : el.__EMPTY_70)
                })
            })
            temp.splice(0,5)
            excel.push({
                filename : file.name,
                items : temp
            })
            console.log(temp)
        })
    }

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.props.handleSubmit}>
                    <Row className="mt-2">
                        <Col md={5}>
                            <FormGroup>
                                <FormLabel htmlFor="month" className="control-label">
                                Upload File Excel <span className="text-danger">*</span>
                                </FormLabel>
                                <input
                                    className="form-control"
                                    style={{ padding: '3.75px'}}
                                    component="input"
                                    name="filename"
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0]
                                        this.readExcel(file)
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <FormLabel htmlFor="year" className="control-label">
                                    Tahun <span className="text-danger">*</span>
                                </FormLabel>
                                <Field
                                    component="select"
                                    name="year"
                                    className="form-control"
                                    required={true}
                                >
                                    <option value="">-- Pilih Tahun --</option>
                                    { this.getYears() }
                                </Field>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <FormLabel htmlFor="month" className="control-label">
                                    Bulan <span className="text-danger">*</span>
                                </FormLabel>
                                <Field 
                                    component="select"
                                    name="month"
                                    className="form-control"
                                    required={true}
                                >
                                    <option value="">-- Pilih Bulan --</option>
                                    <option value="1"> Januari</option>
                                    <option value="2"> Febuari</option>
                                    <option value="3"> Maret</option>
                                    <option value="4"> April</option>
                                    <option value="5"> Mei</option>
                                    <option value="6"> Juni</option>
                                    <option value="7"> Juli</option>
                                    <option value="8"> Agustus</option>
                                    <option value="9"> September</option>
                                    <option value="10"> Oktober</option>
                                    <option value="11"> November</option>
                                    <option value="12"> Desember</option>
                                </Field>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <FormLabel htmlFor="week" className="control-label">
                                    Week <span className="text-danger">*</span>
                                </FormLabel>
                                <Field
                                    component="select"
                                    name="week"
                                    className="form-control"
                                    required={true}
                                >
                                    <option value="">-- Pilih Week --</option>
                                    <option value="1"> W 1</option>
                                    <option value="2"> W 2</option>
                                    <option value="3"> W 3</option>
                                    <option value="4"> W 4</option>
                                    <option value="5"> W 5</option>
                                </Field>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button 
                                type="submit"
                                disabled={ this.props.pristine || this.props.submitting}
                                className="btn btn-xs btn-success ml-0 mr-0"
                            >
                                <div><i className="fas fa-plus-circle"></i>&nbsp; Submit</div>
                            </Button>
                        </Col>
                    </Row>
            </form>
        )
    }
}

FormReports = reduxForm({
    form : 'FormReports',
    initialValues : {
        file : excel
    },
    //validate : areaValidate, 
    enableReinitialize : true
})(FormReports)

export default connect()(FormReports)
