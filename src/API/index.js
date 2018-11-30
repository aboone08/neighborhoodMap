class Helper{
  static baseURL(){
    return "https://api.foursquare.com/v2";
  }
  static auth(){
    const keys={
      client_id:"ZPNOEP5IYQA4UPC5A5CXPLU02JL2244ZEIED3C0NQBFCUJMN",
      client_secret:"UMJYFIAP2U0T4JGF5CEGJNPSB5MPUGCVNLDBZRHOODGKZXVG",
      v:"20181109"
    };
    return Object.keys(keys).map(key=>`${key}=${keys[key]}`).join("&");
  }
  static urlBuilder(urlPrams){
    if(!urlPrams){
      return "";
    }
    return Object.keys(urlPrams).map(key=>`${key}=${urlPrams[key]}`).join("&");
    }
  static headers(){
    return{
      Accept: "application/json"
    };
  }
    static simpleFetch(endPoint, method, urlPrams){
      let requestData={
        method,
        headers: Helper.headers()
      };
      return fetch(`${Helper.baseURL()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(urlPrams)}`,requestData).then(res=>res.json());
  }
}
export default class Foursquare{
  static search(urlPrams){
    return Helper.simpleFetch("/venues/search", "GET", urlPrams);
  }
  static getVenueDetails(VENUE_ID){
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
  }
  static getVenuePhotos(VENUE_ID){
    return Helper.simpleFetch(`/venues/${VENUE_ID}/photos`, "GET");
  }
}
