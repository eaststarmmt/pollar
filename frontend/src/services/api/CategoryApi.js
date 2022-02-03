import { instance } from '../../services/axios';

const COMMON = '/category';

/* 모든 카테고리 리스트 */
export const getAllCategories = async () => {
  const response = await instance.get(COMMON);
  return response.data;
};

// export default {
//   getAllCategories,
// };
