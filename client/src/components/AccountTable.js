import React from 'react';
import { Table } from 'react-bootstrap';

class AccountTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountArray: [{"ID":288094287488352257,"CreatedAt":"2017-10-14T14:03:19.123259Z","UpdatedAt":"2017-10-14T14:03:19.123259Z","DeletedAt":null,"Name":"紫薯黑米","Category":"food","PayMethod":"alipay","Value":10.93},{"ID":288106797827194881,"CreatedAt":"2017-10-14T15:06:56.978284Z","UpdatedAt":"2017-10-14T15:06:56.978284Z","DeletedAt":null,"Name":"紫薯黑米","Category":"food","PayMethod":"alipay","Value":10.93},{"ID":288325987925229569,"CreatedAt":"2017-10-15T09:41:48.619033Z","UpdatedAt":"2017-10-15T09:41:48.619033Z","DeletedAt":null,"Name":"挂面","Category":"food","PayMethod":"alipay","Value":3.6}]
      //accountArray: []
    };
  }

  componentDidMount() {
    var that = this;
    fetch('http://localhost:1025/api/account').then(
      response => response.json()
    ).then(function(result) {
      if(result.status === 'success') {
        that.setState({
          accountArray: result.data
        });
      } else {
        console.log('result: ', result);
      }
    });
  }
        
  render() {
    const tableHead = <tr>
      <th>名称</th>
      <th>金额</th>
      <th>类型</th>
      <th>支付方式</th>
      <th>创建时间</th>
    </tr>;

    const tableBody = this.state.accountArray.map((account) =>
      <tr>
        <td>{account.Name}</td>
        <td>{account.Value}</td>
        <td>{account.Category}</td>
        <td>{account.PayMethod}</td>
        <td>{account.CreatedAt}</td>
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
    );
  }
}

export default AccountTable;
