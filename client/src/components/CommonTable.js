/*
 * Maintained by jemo from 2017.11.19 to now
 * Created by jemo on 2017.11.19
 * 资产负债表
 */

import React from 'react'
import { Table } from 'react-bootstrap';

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
      if(data) {
        that.setState({
          dataArray: data,
        })
      }
    })
  }

  render() {
    const {
      headerArray,
    } = this.props
    const tableHead = <tr>
      {headerArray.map((header, index) =>
        <th key={index}>
          {header.name}
        </th>
      )}
    </tr>;
    const {
      dataArray,
    } = this.state
    const tableBody = dataArray.map((data, index) =>
      <tr key={index}>
        {headerArray.map((header, index) =>
          <td key={index}>
            {Math.round(data[header.key] * 100) / 100}
          </td>
        )}
      </tr>
    );
    return (
      <Table responsive>
        <thead>
          {tableHead}
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </Table>
    )
  }
}

export default CommonTable
