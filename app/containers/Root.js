// @flow
import { UserAgentProvider } from '@quentin-sommer/react-useragent';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';

type Props = {
  store: {},
  history: {}
};

export default class Root extends Component<Props> {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <UserAgentProvider ua={window.navigator.userAgent}>
            <Routes />
          </UserAgentProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}
