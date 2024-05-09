import { EndpointMethod } from '../enums/EndpointMethod';
import { EndpointType } from '../enums/EndpointType';
import { Endpoint } from '../models/Endpoint';

export const EndpointManagerConfig: {
  endpoints: Record<EndpointMethod, Endpoint>;
} = {
  endpoints: {
    [EndpointMethod.games]: new Endpoint({
      type: EndpointType.GET,
      method: EndpointMethod.games,
    }),
  },
};
