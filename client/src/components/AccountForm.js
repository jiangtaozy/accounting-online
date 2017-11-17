import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
//import axios from '../axios';

class AccountForm extends React.Component {

  constructor(props) {
    super(props);
    if(Object.keys(props.modifyAccount).length !== 0) {
      this.state = props.modifyAccount;
    } else {
      this.state = {
        Name: '',
        Value: '',
        Category: 'Food',
        PayMethod: 'Cmb'
      };
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    if(name === 'Value') {
      value = parseFloat(value);
    }

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    let that = this;
    this.props.onSubmitButtonClick(this.state, function() {
      that.setState({
        Name: '',
        Value: '',
        Category: 'Food',
        PayMethod: 'Cmb'
      });
    });
    //event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="accountFormName">
	  <ControlLabel>名称</ControlLabel>
	  <FormControl
            name="Name"
	    type="text"
	    value={this.state.Name}
	    placeholder="请输入名称"
            onChange={this.handleInputChange}
	  />
	</FormGroup>
	<FormGroup controlId="accountFormValue">
	  <ControlLabel>金额</ControlLabel>
	  <FormControl
            name="Value"
	    type="number"
	    value={this.state.Value}
	    placeholder="请输入金额"
            onChange={this.handleInputChange}
	  />
	</FormGroup>
	<FormGroup controlId="accountFormCategory">
	  <ControlLabel>类型</ControlLabel>
	  <FormControl
            name="Category"
            componentClass="select"
	    value={this.state.Category}
            placeholder="PayMethod"
            onChange={this.handleInputChange}>
	    <option value="Food">饭费</option>
	    <option value="House">住房</option>
	    <option value="Transport">交通</option>
	    <option value="Communication">通讯</option>
	    <option value="Entertainment">娱乐</option>
	    <option value="Clothing">衣服鞋帽</option>
	    <option value="Invest">投资</option>
	    <option value="CashGift">礼金</option>
	    <option value="Family">亲属</option>
	    <option value="Medical">医疗</option>
	    <option value="OtherExpense">其他费用</option>
	    <option value="Salary">工资</option>
	    <option value="Interest">利息</option>
	    <option value="OtherIncome">其他收入</option>
	  </FormControl>
	</FormGroup>
	<FormGroup controlId="accountFormPayMethod">
	  <ControlLabel>支付方式</ControlLabel>
	  <FormControl
            name="PayMethod"
            componentClass="select"
	    value={this.state.PayMethod}
            placeholder=""
            onChange={this.handleInputChange}>
	    <option value="Cmb">招行</option>
	    <option value="Cash">现金</option>
	    <option value="Alipay">支付宝</option>
	    <option value="Wechat">微信</option>
	  </FormControl>
	</FormGroup>
        <Button type="submit" block bsStyle="info">
          确定
        </Button>
      </form>
    );
  }
}

export default AccountForm;
