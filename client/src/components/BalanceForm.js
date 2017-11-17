import React from 'react';
import { Button, Form } from 'semantic-ui-react';

class BalanceForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Alipay: '',
      Wechat: '',
      Cmb: '',
      Cash: '',
      AccountsReceivable: '',
      PrepaidExpenses: '',
      AccountsPayable: '',
      OriginalInvestment: '',
      RetainedEarnings: '',
      Earnings: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.value;
    value = parseFloat(value);
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    const that = this;
    this.props.onSubmitButtonClick(this.state, function() {
      that.setState({
        Alipay: '',
        Wechat: '',
        Cmb: '',
        Cash: '',
        AccountsReceivable: '',
        PrepaidExpenses: '',
        AccountsPayable: '',
        OriginalInvestment: '',
        RetainedEarnings: '',
      });
    });
  }

  balanceItemArray = [
    { name: 'Alipay',
      label: '支付宝'
    },
    { name: 'Wechat',
      label: '微信'
    },
    { name: 'Cmb',
      label: '招行'
    },
    { name: 'Cash',
      label: '现金'
    },
    { name: 'AccountsReceivable',
      label: '应收账款'
    },
    { name: 'PrepaidExpenses',
      label: '待摊费用'
    },
    { name: 'AccountsPayable',
      label: '应付票据'
    },
    { name: 'OriginalInvestment',
      label: '初始投资'
    },
    { name: 'RetainedEarnings',
      label: '留存收益'
    },
    { name: 'Earnings',
      label: '本期收益'
    },
  ];

  render() {
    const formFieldArray = this.balanceItemArray.map((item, index) =>
      <Form.Field key={index}
        value={this.state[item.name]}
        onChange={this.handleInputChange}>
        <label>{item.label}</label>
        <input
          name={item.name}
          placeholder={'请输入' + item.label + '金额'}/>
      </Form.Field>
    );
    return (
      <Form onSubmit={this.handleSubmit}>
        { formFieldArray }
        <Button type='submit' fluid color='teal'>
          确定
        </Button>
      </Form>
    );
  }
}

export default BalanceForm;
