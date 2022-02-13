import {
  instance,
  createMultipartInstance,
  fileInstance,
  createIntstanceWithAuth,
} from '../../services/axios';
import { getLoggedUserId } from '../../utils/loggedUser';

const COMMON = '/vote';

/* 유저가 총 업로드한 투표 개수 */
export const getTotalUploadsCount = async (userId) => {
  const response = await createMultipartInstance().get(COMMON + `/${userId}/uvotecount`);
  return response.data;
};

/* 유저가 총 참여한 투표 개수 */
export const getTotalVotesCount = async (userId) => {
  const response = await createMultipartInstance().get(COMMON + `/${userId}/uparcount`);
  return response.data;
};

// /* 유저가 업로드한 투표 리스트 */
// export const getUserUploadsList = async (userId) => {
//   const response = await createMultipartInstance().get(COMMON + `/${userId}/uvotelist`);
//   return response.data;
// };

// /* 유저가 참여한 투표 리스트 */
// export const getUserVotesList = async (userId) => {
//   const response = await createMultipartInstance().get(COMMON + `/${userId}/uparlist`);
//   return response.data;
// };

// /* 유저가 '좋아요' 누른 투표 리스트 */
// export const getUserLikesList = async (userId) => {
//   const response = await createMultipartInstance().get(COMMON + `/${userId}/ulikelist`);
//   return response.data;
// };

// create vote
// Text vote
export const voteCreate = async (form) => {
  const response = await instance
    .post(COMMON + '/create', form)

    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // alert('작성 실패 ')
    });
};

export const voteImageCreate = async (form) => {
  console.log(form);
  const response = await instance
    .post(COMMON + '/create', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      alert('작성 실패 ');
    });
};

/* 투표 '좋아요' 등록 */
export const requestPollLike = async (voteId) => {
  const response = await createIntstanceWithAuth().post(COMMON + '/like', {
    userId: getLoggedUserId(),
    voteId,
  });
  return response.data;
};

/* 투표 '좋아요' 해제 */
export const requestPollUnlike = async (voteId) => {
  const response = await createIntstanceWithAuth().delete(COMMON + '/like', {
    //? axios에서의 DELETE는 다음과 같이 'data' key에 body를 담아서 보내야 함
    data: { userId: getLoggedUserId(), voteId },
  });
  return response.data;
};
