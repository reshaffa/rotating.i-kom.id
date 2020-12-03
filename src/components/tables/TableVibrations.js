import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Col, Row, Button } from 'shards-react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
//import FormReports from '../form/FormReports';

const SwalAlert = withReactContent(Swal)

const { SearchBar} = Search;

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
    sort: true
  },
  { 
    dataField: 'week', 
    text: 'Week', 
    sort: true
  },
  {
    dataField : 'month',
    text : 'Bulan',
    sort : true
  },
  { 
    dataField: 'year', 
    text: 'Tahun', 
    sort: true
  },
  {
    dataField : 'link',
    text : 'Action',
    headerClasses : 'text-center',
    align: 'center',
    formatter : (rowContent, row) => {
      return (
        <div>
          <Button onClick={(e) => handleDelete(row) } className="btn-outline-danger btn-sm mr-2">
          Hapus
          </Button>
        </div>
      )
    }
  }
]

const handleDelete = (row) => {
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
      SwalAlert.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    }
  })
}

const mapStateToProps = (state) => {
  return {
    vibrations : state.vibrations.vibrations,
    error : state.vibrations.error
  }
}

const TableVibrations = (props) => {
  const rowStyle = { fontWeight: 'normal' };
  //const handleSubmit = props.save;
    return (
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
        
    )
}

export default connect(mapStateToProps, null)(TableVibrations)
