import { instance, instanceWithAuth } from '../../services/axios';
const COMMON = '/vote';


// create vote
export const voteCreate = async (vote) => {
  const response = await instance
    .post(COMMON + '/create', {
      // author: vote.author,
      author: 'user1',
      voteName: vote.voteName,
      voteContent: vote.voteContent,
      voteType: vote.voteType,
      voteExpirationTime: vote.voteExpirationTime,
      userAnonymousType: vote.userAnonymousType,
      voteAnonymousType: vote.voteAnonymousType,
      voteCategories: vote.voteCategories,
      voteSelects: vote.voteSelects
    });
  // console.log(response.config.data);
};
