import React from 'react';
import { Tab } from 'semantic-ui-react';
import AccountTable from './AccountTable';
import AccountForm from './AccountForm';

const panes = [
  { menuItem: "账目", render: () => <Tab.Pane><AccountTable /></Tab.Pane> },
  { menuItem: "记录", render: () => <Tab.Pane><AccountForm /></Tab.Pane> },
];

const BottomTab = () => (
  <Tab menu={{ fixed: 'bottom', widths: 2 }} panes={panes} />
);

export default BottomTab;
