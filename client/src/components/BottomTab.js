/*
 * Maintained by jemo from 2017.11.19 to now
 * Created by jemo on 2017.11.19
 * Bottom tab
 */

import React from 'react';
import { Tab } from 'semantic-ui-react';
import AccountTable from './AccountTable';
import AccountForm from './AccountForm';
import BalanceForm from './BalanceForm';
import CommonTable from './CommonTable';
import axios from '../axios';

class BottomTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modify: false,
      activeIndex: 1,
      modifyAccount: {}
    };
    this.handleTab = this.handleTab.bind(this);
    this.handleModifyButtonClick = this.handleModifyButtonClick.bind(this);
    this.handleAccountSubmitRecordButtonClick = this.handleAccountSubmitRecordButtonClick.bind(this);
    this.handleAccountSubmitModifyButtonClick = this.handleAccountSubmitModifyButtonClick.bind(this);
    this.handleBalanceSubmitButtonClick = this.handleBalanceSubmitButtonClick.bind(this);
  }

  handleTab(event, data) {
    let modify = this.state.modify;
    let modifyAccount = this.state.modifyAccount;
    let activeIndex = data.activeIndex;
    if(activeIndex !== 1) {
      modify = false;
      modifyAccount = {};
    }
    this.setState({
      modify: modify,
      activeIndex: activeIndex,
      modifyAccount: modifyAccount
    });
  }

  handleModifyButtonClick(account) {
    this.setState({
      modify: true,
      activeIndex: 1,
      modifyAccount: account
    });
  }

  handleAccountSubmitRecordButtonClick(account, next) {
    axios.post('/accounts', account).then(function(response) {
      if(response.status === 200) {
        alert('记录成功');
        next();
      }
    });
  }

  handleBalanceSubmitButtonClick(balance, next) {
    axios.post('/balances', balance).then(function(response) {
      if(response.status === 200) {
        alert('记录成功');
        next();
      }
    });
  }

  handleAccountSubmitModifyButtonClick(account, next) {
    let that = this;
    let id = account.ID_str;
    delete account.ID;
    delete account.ID_str;
    delete account.UpdatedAt;
    delete account.CreatedAt;
    delete account.DeletedAt;
    axios.patch('/accounts/' + id, account).then(function(response) {
      if(response.status === 200) {
        alert('修改成功');
        that.setState({
          modify: false,
          activeIndex: 0,
          modifyAccount: {}
        });
      }
    });
  }

  render() {
    const panes = [
      {
        menuItem: '账目',
	      render: () => <Tab.Pane>
	        <AccountTable onModifyButtonClick={this.handleModifyButtonClick} />
	      </Tab.Pane>
      },
      {
        menuItem: this.state.modify? '编辑': '记录',
	      render: () => <Tab.Pane>
	        <AccountForm modifyAccount={this.state.modifyAccount}
	          onSubmitButtonClick={this.state.modify? this.handleAccountSubmitModifyButtonClick: this.handleAccountSubmitRecordButtonClick} />
	      </Tab.Pane>
      },
      {
        menuItem: '记录基础数据',
	      render: () => <Tab.Pane>
	        <BalanceForm onSubmitButtonClick={this.handleBalanceSubmitButtonClick} />
      	</Tab.Pane>
      },
      { 
        menuItem: '资产负债表',
        render: () => <Tab.Pane>
          <CommonTable headerArray = {this.balanceSheetHeaderArray}
            getData = {this.getBalanceData} />
        </Tab.Pane>
      }
    ];

    return (
      <Tab activeIndex={this.state.activeIndex}
        menu={{ fixed: 'bottom', widths: panes.length }}
        onTabChange={this.handleTab}
        panes={panes} />
    );
  }

  getBalanceData() {
    return axios.get('/balances').then((response) => {
      return Promise.resolve(response.data.balances)
    })
  }

  balanceSheetHeaderArray = [
    {
      name: '支付宝',
      key: 'Alipay',
    },
    {
      name: '微信',
      key: 'Wechat',
    },
    {
      name: '招行',
      key: 'Cmb',
    },
    {
      name: '现金',
      key: 'Cash',
    },
    {
      name: '资金合计',
      key: 'Funds',
    },
    {
      name: '应收账款',
      key: 'AccountsReceivable',
    },
    {
      name: '待摊费用',
      key: 'PrepaidExpenses',
    },
    {
      name: '总资产',
      key: 'Assets',
    },
    {
      name: '应付票据',
      key: 'AccountsPayable',
    },
    {
      name: '负债合计',
      key: 'Liabilities',
    },
    {
      name: '初始投资',
      key: 'OriginalInvestment',
    },
    {
      name: '留存收益',
      key: 'RetainedEarnings',
    },
    {
      name: '本期收益',
      key: 'Earnings',
    },
    {
      name: '所有者权益合计',
      key: 'OwnersEquity',
    },
    {
      name: '负债及所有者权益合计',
      key: 'Equities',
    },
  ]
}

export default BottomTab;
