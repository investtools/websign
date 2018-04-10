// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import certificatesDuck from './certificatesDuck';
import certSelectorDuck from './certSelectorDuck';
import CertSelector from './CertSelector';

type Props = {
  certificates: Array,
  certSelector: { origin: string, selected?: string },
  actions: {
    certificates: { load: () => Array },
    certSelector: {
      load: () => { origin: string },
      select: (id: string) => void,
      sign: () => void,
      cancel: () => void
    }
  }
};


function mapStateToProps(state) {
  return {
    certificates: state.certificates,
    certSelector: state.certSelector
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      certificates: bindActionCreators(certificatesDuck.creators, dispatch),
      certSelector: bindActionCreators(certSelectorDuck.creators, dispatch),
    }
  };
}

class CertSelectorContainer extends Component<Props> {
  props: Props;

  componentDidMount() {
    this.props.actions.certificates.load();
    this.props.actions.certSelector.load();
  }

  render() {
    return (
      <CertSelector
        certificates={this.props.certificates}
        onSelect={this.props.actions.certSelector.select}
        onSuccess={this.props.actions.certSelector.sign}
        onCancel={this.props.actions.certSelector.cancel}
        {...this.props.certSelector}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CertSelectorContainer);
