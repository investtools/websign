// @flow
import React, { Component } from 'react';

import CertSelectorContainer from '../CertSelector/CertSelectorContainer';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="container-fluid h-100">
        <CertSelectorContainer />
      </div>
    );
  }
}
