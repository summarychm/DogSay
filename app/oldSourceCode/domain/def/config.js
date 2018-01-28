//MOCK根URL
const URL_MOCK_BASIC = "http://rap2api.taobao.org/app/mock/4624";

export const ConstURL = {
  accessToken: "abc123",
  header: {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  },
  API: {
    MOCK_BASIC: URL_MOCK_BASIC,
    //创意列表页面URL
    CREATIONS_GET: URL_MOCK_BASIC + "/GET/api/creations",
    VOTED: URL_MOCK_BASIC + "/POST/api/voted"
  }
}

