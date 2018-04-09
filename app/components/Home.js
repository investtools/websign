// @flow
import React, { Component } from 'react';

import CertSelector from './CertSelector';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="container-fluid h-100">
        <CertSelector />
      </div>
    );
  }
}
