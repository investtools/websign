// @flow
import { UserAgent } from '@quentin-sommer/react-useragent';
import React, { Component } from 'react';

type Props = {
  certificates: Array<{
    id: string,
    subject: string,
    issuer: string
  }>,
  origin: string,
  selected?: string,
  onSelect: (id: string) => void,
  onSuccess: () => void,
  onCancel: () => void
};

export default class CertSelector extends Component<Props> {
  props: Props;

  static defaultProps = {
    selected: undefined
  }

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  origin() {
    const originParts = this.props.origin.match(/^([^/]*\/\/)([^/]*)(\/.*)?$/);
    if (!originParts) { return null; }
    const [, schema, host, uri] = originParts;
    return (
      <h2 className="text-overflow pb-4">
        {schema}<span className="host">{host}</span>{uri}
      </h2>
    );
  }

  render() {
    return (
      <div className="d-flex h-100 flex-column">
        <UserAgent mac>
          <div className="row px-4" id="titlebar">
            <div className="col text-center pt-1 px-5">WebSign</div>
          </div>
        </UserAgent>
        <div className="row">
          <div className="col">
            <h1 className="text-overflow pt-2">Selecione um certificado</h1>
            {this.origin()}
          </div>
        </div>
        <div className="row fill" style={{ overflowY: 'auto' }}>
          <div className="col">
            <div className="list-group">
              {this.props.certificates.map(cert => (
                <button key={cert.id} className={`list-group-item list-group-item-action ${this.props.selected === cert.id && 'active'}`} onClick={() => this.props.onSelect(cert.id)}>
                  {cert.subject}
                  <div className="issuer">{cert.issuer}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="row footer py-2">
          <div className="col d-flex justify-content-end">
            <button className="btn btn-primary m-1" disabled={!this.props.selected} onClick={this.props.onSuccess}>Assinar</button>
            <button className="btn btn-default m-1" onClick={this.props.onCancel}>Cancelar</button>
          </div>
        </div>
      </div>
    );
  }
}
