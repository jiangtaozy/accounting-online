import React from 'react';
import { Tab } from 'semantic-ui-react';
import AccountTable from './AccountTable';
import AccountForm from './AccountForm';
import axios from '../axios';

class BottomTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modify: false,
      activeIndex: 0,
      modifyAccount: {}
    };
    this.handleTab = this.handleTab.bind(this);
    this.handleModifyButtonClick = this.handleModifyButtonClick.bind(this);
    this.handleSubmitRecordButtonClick = this.handleSubmitRecordButtonClick.bind(this);
    this.handleSubmitModifyButtonClick = this.handleSubmitModifyButtonClick.bind(this);
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
    console.log('state: ', this.state);
  }

  handleModifyButtonClick(account) {
    this.setState({
      modify: true,
      activeIndex: 1,
      modifyAccount: account
    });
  }

  handleSubmitRecordButtonClick(account, next) {
    axios.post('/accounts', account).then(function(response) {
      if(response.status === 200) {
        alert('记录成功');
        next();
      }
    });
  }

  handleSubmitModifyButtonClick(account, next) {
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
      { menuItem: '账目', render: () => <Tab.Pane><AccountTable onModifyButtonClick={this.handleModifyButtonClick} /></Tab.Pane> },
      { menuItem: this.state.modify? '编辑': '记录', render: () => <Tab.Pane><AccountForm modifyAccount={this.state.modifyAccount} onSubmitButtonClick={this.state.modify? this.handleSubmitModifyButtonClick: this.handleSubmitRecordButtonClick} /></Tab.Pane> },
    ];

    return (
      <Tab activeIndex={this.state.activeIndex}
        menu={{ fixed: 'bottom', widths: 2 }}
        onTabChange={this.handleTab}
        panes={panes} />
    );
  }
}

export default BottomTab;
