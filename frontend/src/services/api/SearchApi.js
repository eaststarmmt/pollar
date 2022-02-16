import instance from '../axiosInstance';

const COMMON = '/search';

// 전체 유저 검색
export const getAllUsers = async (userId) => {
  const response = await instance.get(COMMON + `/alluserlist`, {
    params: {
      userId: userId,
    },
  });
  return response.data;
};

// 검색창 유저 검색 결과
export const getUserSearchBar = async (user) => {
  const response = await instance.get(COMMON + `/usernickname`, {
    params: {
      userNickname: user.searchInfo,
    },
  });
  return response.data;
};

// 유저 검색 결과 화면
export const getUserSearchPage = async (user) => {
  const response = await instance.get(COMMON + `/userlist`, {
    params: {
      userId: user.userId,
      userNickname: user.searchInfo,
    },
  });
  return response.data;
};

// 검색창 피드 결과
export const getFeedSearchBar = async (user) => {
  const response = await instance.get(COMMON + `/feedname`, {
    params: {
      feedName: user.searchInfo,
    },
  });
  return response.data;
};
