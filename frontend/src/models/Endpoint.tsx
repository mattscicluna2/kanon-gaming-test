import { EndpointType } from '../enums/EndpointType';
import { EndpointMethod } from '../enums/EndpointMethod';

export class Endpoint {
  type: EndpointType;
  method: EndpointMethod;

  constructor(props: { type: EndpointType; method: EndpointMethod }) {
    this.type = props.type;
    this.method = props.method;
  }
}
