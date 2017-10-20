import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

class AccountForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Value: 0,
      Category: 'Food',
      PayMethod: 'Alipay'
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log('constructor-state: ' + JSON.stringify(this.state));
  }

  handleInputChange(event) {
    console.log('handleInputChange is called');
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    console.log('state: ' + JSON.stringify(this.state));
  }

  handleSubmit(event) {
    this.state.Value = parseInt(this.state.Value);
    console.log('state: ' + JSON.stringify(this.state));
    //fetch('/api/account', {
    fetch('http://localhost:1025/api/account', {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
	"Content-Type": "application/json"
      }
    }).then(function(response) {
      console.log('status: ' + response.status);
      console.log('statusText: ' + response.statusText);
      console.log('ok: ' + response.ok);
      console.log('headers: ' + JSON.stringify(response.headers));
      console.log('url: ' + response.url);
      //console.log('text(): ' + JSON.stringify(response.text()));
      return response.json();
    }).then(function(json) {
      console.log('json: ' + JSON.stringify(json));
    }).catch(function(error) {
      console.log('error: ' + JSON.stringify(error));
    });
    //alert('state: ' + JSON.stringify(this.state));
    event.preventDefault();
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
	    placeholder=""
            onChange={this.handleInputChange}
	  />
	</FormGroup>
	<FormGroup controlId="accountFormValue">
	  <ControlLabel>金额</ControlLabel>
	  <FormControl
            name="Value"
	    type="number"
	    value={this.state.Value}
	    placeholder=""
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
	    <option value="Alipay">支付宝</option>
	    <option value="Wechat">微信</option>
	    <option value="Cmb">招行</option>
	    <option value="Cash">现金</option>
	  </FormControl>
	</FormGroup>
        <Button type="submit">
          记录
        </Button>
      </form>
    );
  }
}

export default AccountForm;
