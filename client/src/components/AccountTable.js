/*
 * Maintained by jemo from 2017.11.19 to now
 * Created by jemo on 2017.11.19
 * 帐目表
 */

import React from 'react';
import { Table, Panel, Button } from 'react-bootstrap';
import axios from '../axios';

class AccountTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountArray: []
    };
    this.expandPanel = this.expandPanel.bind(this);
    this.delete = this.delete.bind(this);
    this.getAccounts = this.getAccounts.bind(this);
    this.handleModifyButtonClick = this.handleModifyButtonClick.bind(this);
  }

  componentDidMount() {
    this.getAccounts();
  }

  getAccounts() {
    var that = this;
    axios.get('/accounts').then(function(response) {
      that.setState({
        accountArray: response.data.accounts || []
      });
    });
  }

  expandPanel(index, e) {
    this.setState(prevState => {
      let accountArray = JSON.parse(JSON.stringify(prevState.accountArray)); 
      for(let i = 0; i < accountArray.length; i++) {
	let account = accountArray[i];
	if(i === index) {
	  account.Expanded = !account.Expanded;
	} else {
	  account.Expanded = false;
	}
      }
      return {
	accountArray: accountArray
      };
    });
    e.preventDefault();
  }
  
  delete(id, e) {
    let that = this;
    axios.delete('/accounts/' + id).then(function(response) {
      if(response.status === 200) {
	alert('删除成功');
        that.getAccounts();
      }
    });
    e.preventDefault();
  }

  handleModifyButtonClick(account, e) {
    this.props.onModifyButtonClick(account);
    e.preventDefault();
  }

  render() {
    const tableHead = <tr>
      <th>名称</th>
      <th>金额</th>
      <th>类型</th>
      <th>支付方式</th>
      <th>创建时间</th>
    </tr>;

    const tableBody = this.state.accountArray.map((account, index) =>
      <tr key={account.ID} onClick={(e) =>
        this.expandPanel(index, e)}>
        <td>{account.Name}</td>
        <td>{account.Value}</td>
        <td>{account.Category}</td>
        <td>{account.PayMethod}</td>
        <td>{account.CreatedAt}</td>
        <td>
          <Panel collapsible expanded={account.Expanded}>
            <Button bsStyle="danger" onClick={(e) =>
              this.delete(account.ID_str, e)}>删除</Button>
            <Button bsStyle="primary" onClick={(e) =>
              this.handleModifyButtonClick(account, e)}>编辑</Button>
            <Button bsStyle="info">取消</Button>
          </Panel>
        </td>
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
