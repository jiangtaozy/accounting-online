import React from 'react';
import { Table } from 'react-bootstrap';

class AccountTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //accountArray: [{"ID":288094287488352257,"CreatedAt":"2017-10-14T14:03:19.123259Z","UpdatedAt":"2017-10-14T14:03:19.123259Z","DeletedAt":null,"Name":"紫薯黑米","Category":"food","PayMethod":"alipay","Value":10.93},{"ID":288106797827194881,"CreatedAt":"2017-10-14T15:06:56.978284Z","UpdatedAt":"2017-10-14T15:06:56.978284Z","DeletedAt":null,"Name":"紫薯黑米","Category":"food","PayMethod":"alipay","Value":10.93},{"ID":288325987925229569,"CreatedAt":"2017-10-15T09:41:48.619033Z","UpdatedAt":"2017-10-15T09:41:48.619033Z","DeletedAt":null,"Name":"挂面","Category":"food","PayMethod":"alipay","Value":3.6}]
      accountArray: []
    };
  }

  componentDidMount() {
    var that = this;
    //fetch('http://localhost:1026/api/account', {
    //  mode: 'no-cors'
    //}).then(function(response) {
    fetch('http://10.42.0.1:1026/api/account')
    .then(function(response) {
      //console.log('response: ' + JSON.stringify(response));
      console.log('status: ' + response.status);
      console.log('statusText: ' + response.statusText);
      console.log('ok: ' + response.ok);
      console.log('headers: ' + JSON.stringify(response.headers));
      console.log('url: ' + response.url);
      //console.log('text: ' + JSON.stringify(response.text()));
      //console.log('json: ' + JSON.stringify(response.json()));
      if(response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok.');
      }
      //response => response.json()
    }).then(function(result) {
      if(result.status === 'success') {
        that.setState({
          accountArray: result.data
        });
      } else {
        console.log('result: ', result);
      }
    }).catch(function(error) {
      console.log('error: ', error);
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
      <tr key={account.ID}>
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
