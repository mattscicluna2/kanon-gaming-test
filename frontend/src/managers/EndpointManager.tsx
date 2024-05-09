import { EndpointManagerConfig } from '../config/EndpointManagerConfig';
import { EndpointMethod } from '../enums/EndpointMethod';
import { EndpointType } from '../enums/EndpointType';
import { Endpoint } from '../models/Endpoint';

export class EndpointManager {
  private static instance: EndpointManager;
  private requestOngoing = false;

  public static getInstance(): EndpointManager {
    if (!EndpointManager.instance) {
      EndpointManager.instance = new EndpointManager();
    }
    return EndpointManager.instance;
  }

  public async call(props: {
    endpointMethod: EndpointMethod;
    data?: Record<string, any>;
    timeout?: number;
    additionalUrlData?: string;
  }) {
    if (this.requestOngoing) {
      this.throwError('Endpoint Request Timed Out', false);
    }

    this.requestOngoing = true;

    const { endpointMethod, data, timeout = 60, additionalUrlData } = props;
    const endpointUrl = 'http://localhost:3000';

    const endpointSettings: Endpoint | undefined =
      EndpointManagerConfig.endpoints[endpointMethod];
    if (!endpointSettings) {
      this.throwError('Invalid endpoint method');
    }
    let fullUrl = `${endpointUrl}/${endpointMethod}${additionalUrlData ?? ''}`;

    if (endpointSettings.type === EndpointType.GET && data) {
      const queryString = new URLSearchParams(data).toString();
      fullUrl += `?${queryString}`;
    }

    const requestOptions: RequestInit = {
      method: endpointSettings.type,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      },
      body:
        data && endpointSettings.type !== EndpointType.GET
          ? JSON.stringify(data)
          : undefined,
    };
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout * 1000);

    try {
      const response = await fetch(fullUrl, {
        ...requestOptions,
        signal: controller.signal,
      });
      if (!response.ok) {
        this.throwError('Request failed');
      }

      const result = await response.json();
      this.requestOngoing = false;
      return result;
    } catch (error: any) {
      this.requestOngoing = false;
      if (error.name === 'AbortError') {
        this.throwError('Request Timed Out');
      } else {
        throw error;
      }
    } finally {
      clearTimeout(timeoutId);
    }
  }

  throwError(message: string, setRequestOngoingAsFalse = true) {
    this.requestOngoing = setRequestOngoingAsFalse
      ? false
      : this.requestOngoing;
    throw new Error(`Endpoint Manager::${message}`);
  }
}
