import React from 'react'
import { Table } from 'semantic-ui-react'

class CommonTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataArray: []
    }
  }

  componentDidMount() {
    const that = this
    this.props.getData().then((data) => {
      //console.log('data: ', data)
      that.setState({
        dataArray: data,
      })
    })
  }

  render() {
    const headerComponentArray = this.props.headerArray.map((header, index) =>
      <Table.HeaderCell key={index}>{header.name}</Table.HeaderCell>
    )
    const tableRowArray = this.state.dataArray.map((data, index) =>
      <Table.Row key={index}>
        {this.props.headerArray.map((header, index) =>
          <Table.Cell key={index}>{data[header.key]}</Table.Cell>
        )}
      </Table.Row>
    )
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            {headerComponentArray}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tableRowArray}
        </Table.Body>
      </Table>
    )
  }
}

export default CommonTable
