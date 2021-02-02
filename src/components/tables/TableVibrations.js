import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Col, Row, Button } from 'shards-react';
import { connect } from 'react-redux';
import _ from 'lodash'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { deleteVibrations, getVibrations } from '../../actions/vibrationActions';
//import FormReports from '../form/FormReports';

const SwalAlert = withReactContent(Swal)

const { SearchBar} = Search;
const mapStateToProps = (state) => {
  return {
    vibrations : state.vibrations.vibrations,
    get_status : state.vibrations.get_status,
    created_status : state.vibrations.created_status,
    deleted_status : state.vibrations.deleted_status,
    error : state.vibrations.error
  }
}

const handleDelete = (dispatch, row) => {
  SwalAlert.fire({
    title: 'Are you sure?',
    text: `Do you want to delete file ${row.filename} !`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(deleteVibrations(row.id))
    }
  })
}

const TableVibrations = (props) => {
  const rowStyle = { fontWeight: 'normal' };
  if(props.created_status === true) {
    Swal.fire({
      position: 'middle-center',
      icon: 'success',
      title: 'Success !',
      text : 'Your upload file has been saved !',
      showConfirmButton: false,
      timer: 2500
    }).then(response => {
      window.location.reload('/reports');
    })
  }

  if(props.deleted_status === true){
    Swal.fire({
      position: 'middle-center',
      icon: 'success',
      title: 'Success !',
      text : 'Your file has been deleted !',
      showConfirmButton: false,
      timer: 2500
    }).then(response => {
      window.location.reload('/reports');
    })
  }

  const max_id = (_.maxBy(props.vibrations, function(o) {
    return o.id;
  }));


  const columns = [
    { 
      dataField: 'id', 
      text: '#', 
      sort: true,
      headerStyle : { width : '5%'},
      headerClasses : 'text-center',
      align: 'center'
    },
    { 
      dataField: 'filename', 
      text: 'Judul File', 
      headerStyle : { width : '55%'},
      sort: true
    },
    {
      dataField : 'month',
      text : 'Bulan',
      headerClasses : 'text-center',
      sort : true,
      formatter : (rowContent, row) => {
        switch(row.month){
          case 1 : 
            return `Januari W-${row.week}` 
            break;
          case 2 : 
            return `Febuari W-${row.week}` 
            break;
          case 3 : 
            return `Maret W-${row.week}` 
            break;
          case 4 : 
            return `April W-${row.week}` 
            break;
          case 5 : 
            return `Mei W-${row.week}` 
            break;
          case 6 : 
            return `Juni W-${row.week}` 
            break;
          case 7 : 
            return `Juli W-${row.week}` 
            break;
          case 8 : 
            return `Agustus W-${row.week}` 
            break;
          case 9 : 
            return `September W-${row.week}` 
            break;
          case 10 : 
            return `Oktober W-${row.week}` 
            break;
          case 11 : 
            return `November W-${row.week}` 
            break;
          case 12 : 
            return `Desember W-${row.week}` 
            break;
          default : 
            return "-"
        }
      }
    },
    { 
      dataField: 'year', 
      headerClasses : 'text-center',
      text: 'Tahun', 
      sort: true,
      align: 'center'
    },
    {
      dataField : 'link',
      text : 'Action',
      headerClasses : 'text-center',
      align: 'center',
      formatter : (rowContent, row) => {
        if(row.id === max_id.id ){
          return (
            <div>
              <Button onClick={(e) => handleDelete(props.dispatch ,row) } className="btn-outline-danger btn-sm mr-2">
              Hapus
              </Button>
            </div>
          )
        }else{
          return (
            <div className="text-center">
              
            </div>
          )
        }
      }
    }
  ]
  return (
    <div>
      { props.vibrations ? 
      <ToolkitProvider
              keyField="id"
              data={ props.vibrations }
              columns={ columns }
              search
            >
              {
                props => (
                  <div className="mt-3">
                                        
                      <Row>
                        <Col className="pt-3">
                          <span style={{fontWeight:"normal"}}>History Excel Vibrasi</span>
                        </Col>
                        <Col className="text-right">
                            <SearchBar  className="mr-0" style={{ width: '350px'}} { ...props.searchProps } />
                        </Col>
                      </Row>
                    <BootstrapTable bootstrap4 classes="table-sm" 
                      { ...props.baseProps } loading={ true } 
                      hover striped condensed rowStyle={ rowStyle }
                    />
                  </div>
                )
              }
        </ToolkitProvider>
      : <div className="text-center mt-3 mb-1">
      <span className="text-danger">
      <i className="fas fa-exclamation-triangle"></i> Upss sorry, request timeout from server !
      </span>
    </div>
    }
    </div>  
  )
}

export default connect(mapStateToProps, null)(TableVibrations)
