import React, { useState} from 'react';
import { Col, Row, Button } from 'shards-react';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import FormAreas from '../form/FormAreas';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
    dataField: 'name', 
    text: 'Area Name', 
    sort: true
  },
  { 
    dataField: 'area_type', 
    text: 'Location type', 
    sort: true,
    formatter : (rowContent, row) => {
      return (row.area_type === 0 ? 'Vibrations' : 'Operations')
    }
  },
  {
    dataField : 'link',
    text : 'Action',
    headerClasses : 'text-center',
    align: 'center',
    formatter : (rowContent, row) => {
      return (
        <div>
          <Button className="btn-success btn-sm mr-2">
          <i className="far fa-edit"></i>
          </Button>
          <Button onClick={(e) => handleDelete(row) } className="btn-danger btn-sm mr-2">
          <i className="fas fa-trash-alt"></i>
          </Button>
        </div>
      )
    }
  }
]

const handleDelete = (row) => {
  SwalAlert.fire({
    title: 'Are you sure?',
    text: `Do you want to delete area ${row.area} !`,
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
    areas : state.areas.areas,
    error : state.areas.error
  }
}

const TableAreas = (props) => {
    const handleSubmit = props.save;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <div>
        { props.areas ? 
        <ToolkitProvider
                keyField="id"
                data={ props.areas }
                columns={ columns }
                search
              >
                {
                  props => (
                    <div className="mt-3">
                        <Row>
                            <Col>
                                <Button onClick={handleShow} className="btn btn-xs btn-success ml-0 mr-0">
                                <i className="fas fa-plus-circle"></i>&nbsp; Create Area
                                </Button>
                                <Modal 
                                  show={show} 
                                  onHide={handleClose} 
                                  backdrop="static" 
                                  keyboard={false}
                                  centered
                                >
                                  <Modal.Header closeButton>
                                    <strong className="ml-0">Create New Area</strong>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <FormAreas closed={handleClose} onSubmit={handleSubmit}></FormAreas>
                                  </Modal.Body>
                                </Modal>
                            </Col>
                            <Col className="text-right">
                                <SearchBar className="mr-0" style={{ width: '350px'}} { ...props.searchProps } />
                            </Col>
                        </Row>
                      <BootstrapTable bootstrap4 classes="table-sm"
                        { ...props.baseProps }
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

export default connect(mapStateToProps, null)(TableAreas)
