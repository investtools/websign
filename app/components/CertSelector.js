// @flow
import React, { Component } from 'react';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="d-flex h-100 flex-column">
        <div className="row">
          <div className="col">
            <h1 className="text-overflow pt-4">Selecione um certificado</h1>
            <h2 className="text-overflow pb-4">http://<span className="host">www.google.com</span>/adff/dhtr</h2>
          </div>
        </div>
        <div className="row fill" style={{ overflow: 'scroll' }}>
          <div className="col">
            <div className="list-group">
              <button className="list-group-item list-group-item-action" onClick={() => this.close()}>
                Certificado 1
              </button>
              <button className="list-group-item list-group-item-action">Certificado 2</button>
              <button className="list-group-item list-group-item-action">Certificado 3</button>
            </div>
          </div>
        </div>
        <div className="row footer py-2">
          <div className="col d-flex justify-content-end">
            <button className="btn btn-primary m-1">Assinar</button>
            <button className="btn btn-default m-1">Cancelar</button>
          </div>
        </div>
      </div>
    );
  }
}
