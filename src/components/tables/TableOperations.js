import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Col, Row, Button } from 'shards-react';
import { connect } from 'react-redux';

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
          <Button className="btn-outline-danger btn-sm mr-2">
          Hapus
          </Button>
        </div>
      )
    }
  }
]

const mapStateToProps = (state) => {
  return {
    operations : state.operations.operations
  }
}

const TableOperations = (props) => {
    return (
        <ToolkitProvider
                keyField="id"
                data={ props.operations }
                columns={ columns }
                search
              >
                {
                  props => (
                    <div className="mt-3">
                        <Row>
                            <Col>
                                <Button className="btn btn-xs btn-success ml-0 mr-0">
                                <i className="fas fa-plus-circle"></i>&nbsp; Submit
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                          <Col>
                            <strong className="mt-2"> Excel Operations</strong>
                          </Col>
                          <Col className="text-right">
                              <SearchBar className="mr-0" style={{ width: '350px'}} { ...props.searchProps } />
                          </Col>
                        </Row>
                      <BootstrapTable classes="table-sm"
                        { ...props.baseProps }
                        hover striped condensed
                      />
                    </div>
                  )
                }
        </ToolkitProvider>
        
    )
}

export default connect(mapStateToProps, null)(TableOperations)
