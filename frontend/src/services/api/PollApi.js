import instance from '../axiosInstance';
import { getLoggedUserId } from '../../utils/loggedUser';

const COMMON = '/vote';

/* 유저가 총 업로드한 투표 개수 */
export const getTotalUploadsCount = async (userId) => {
  const response = await instance.get(COMMON + `/${userId}/uvotecount`);
  return response.data;
};

/* 유저가 총 참여한 투표 개수 */
export const getTotalVotesCount = async (userId) => {
  const response = await instance.get(COMMON + `/${userId}/uparcount`);
  return response.data;
};

// /* 유저가 업로드한 투표 리스트 */
// export const getUserUploadsList = async (userId) => {
//   const response = await instance.get(COMMON + `/${userId}/uvotelist`);
//   return response.data;
// };

// /* 유저가 참여한 투표 리스트 */
// export const getUserVotesList = async (userId) => {
//   const response = await instance.get(COMMON + `/${userId}/uparlist`);
//   return response.data;
// };

// /* 유저가 '좋아요' 누른 투표 리스트 */
// export const getUserLikesList = async (userId) => {
//   const response = await instance.get(COMMON + `/${userId}/ulikelist`);
//   return response.data;
// };

/* Trending(인기) 투표 리스트 */
export const getTrendingPollList = async () => {
  const userId = getLoggedUserId();
  let params;
  if (typeof userId !== 'undefined') {
    params = { params: { userId } };
  }
  const response = await instance.get(COMMON + '/trendingvote', params);
  return response.data;
};

/* 최신순 투표 리스트 (피드 전체목록) */
export const getRecentPollList = async () => {
  const response = await instance.get(COMMON, {
    params: { userId: getLoggedUserId() },
  });
  return response.data;
};

/* 유저 관심분야 투표 리스트 */
export const getInterestPollList = async () => {
  const response = await instance.get(COMMON + `/${getLoggedUserId()}/interlist`);
  return response.data;
};

/* 유저 팔로잉 투표 리스트 */
export const getFollowingPollist = async () => {
  const response = await instance.get(COMMON + `/${getLoggedUserId()}/fvotelist`);
  return response.data;
};

/* 텍스트 투표 생성 */
export const voteCreate = async (form) => {
  const response = await instance.post(COMMON + '/create', form);
  return response.data;
};

// 이미지 투표 생성
export const voteImageCreate = async (form) => {
  console.log(form);
  const response = await instance.post(COMMON + '/create', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

/* 투표 '좋아요' 등록 */
export const requestPollLike = async (voteId) => {
  const response = await instance.post(COMMON + '/like', {
    userId: getLoggedUserId(),
    voteId,
  });
  return response.data;
};

/* 투표 '좋아요' 해제 */
export const requestPollUnlike = async (voteId) => {
  const response = await instance.delete(COMMON + '/like', {
    //? axios에서의 DELETE는 다음과 같이 'data' key에 body를 담아서 보내야 함
    data: { userId: getLoggedUserId(), voteId },
  });
  return response.data;
};

/* 유저가 투표 선택지에 투표 */
export const requestPollVote = async (selectionId) => {
  const response = await instance.post(COMMON + `/${getLoggedUserId()}/${selectionId}`);
  return response.data;
};

/* 유저가 투표 선택지에 투표 취소 */
export const cancelPollVote = async (selectionId) => {
  const response = await instance.delete(COMMON + `/${getLoggedUserId()}/${selectionId}`);
  return response.data;
};

/* (투표시 결과 디스플레이) 투표 총 참여자 수, 선택지 별 참여자 수 */
export const getPollSelectionStatus = async (voteId) => {
  const response = await instance.get(COMMON + `/${voteId}/vparcount`);
  return response.data;
};

export const getVoteInfo = async (voteId) => {
  // voteId를 pathvariable로 보내서 vote dto를 받아옴
  const response = await instance.get(COMMON + `/${voteId}`, {
    params: {
      voteId,
    },
  });
  return response.data;
};
