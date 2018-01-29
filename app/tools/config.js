import {Dimensions} from 'react-native';

const BASE_URL = "http://192.168.1.5:6001";
export const Config = {
    accessToken: "1517151608876",
    header: {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    },
    URL: {
      creation: BASE_URL + "/creation",
    },
    Style: {
      Color_Main: "#ee735c",
      DeviceWidth: Dimensions.get("window").width,
      DeviceHeight: Dimensions.get("window").height,
      Flex1: {flex: 1}
    }
  }
;
