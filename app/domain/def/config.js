//MOCK根URL
const URL_MOCK_BASIC = "http://rap2api.taobao.org/app/mock/4624";

export const ConstURL = {
  header: {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  },
  MOCK_BASIC: URL_MOCK_BASIC,
  //创意列表页面URL
  CREATIONS_GET: URL_MOCK_BASIC + "/GET/creations"
}

