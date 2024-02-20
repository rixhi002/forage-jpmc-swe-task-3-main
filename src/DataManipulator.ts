import { ServerResponse } from 'http';
import { ServerRespond } from './DataStreamer';

export interface Row {
        price_abc: number,
        price_def: number,
        ratio: number,
        timestamp: Date,
        upper_Bound: number,
        lower_Bound: number,
        trigger_bound: number | undefined, 
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]) {
    const priceABC = (serverRespond[0].top_ask.price+serverRespond[1].top_bid.price)/2;
    const priceDEF = (serverRespond[1].top_ask.price+serverRespond[1].top_bid.price)/2;
    const ratio = priceABC/priceDEF;
    const upper_Bound =  1+ 0.05;
    const lowerBound = 1 - 0.05;
    return { 
      price_abc : priceABC,
      price_def : priceDEF,
      ratio,
      timestamp:serverRespond[0].timestamp>serverRespond[1].timestamp?
        serverRespond[0].timestamp:serverRespond[1].timestamp,
        upper_bound:upper_Bound,
        lower_bound:lowerBound,
        trigger_alert:(ratio>upper_Bound||ratio<lowerBound)? ratio:undefined,
    }
      
      };
    }

