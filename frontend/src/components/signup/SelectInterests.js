import { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/api/CategoryApi';
import { Chip, Stack, Typography } from '@mui/material';

export default function SelectInterests({ signupInfo }) {
  // 전체 카테고리
  const [categoryList, setCategoryList] = useState([]);
  // 사용자 선택 관심분야
  const [interestList, setInterestList] = useState([]);

  const getList = async () => {
    const list = await getAllCategories();
    // setCategoryList(list);
    // 대분류대로 배열에 삽입
    let bigCategoryList = {};
    list.forEach((item) =>
      typeof bigCategoryList[item.categoryNameBig] === 'undefined'
        ? (bigCategoryList[item.categoryNameBig] = [item])
        : bigCategoryList[item.categoryNameBig].push(item)
    );
    setCategoryList(bigCategoryList);
  };

  function CategoryGroup({ bigCategoryGroup }) {
    return (
      <>
        <Typography variant="body2" align="left" sx={{ color: 'text.secondary', mt: 1 }}>
          {bigCategoryGroup[0]}
        </Typography>
        <Stack direction="row" spacing={1}>
          {bigCategoryGroup[1].map((item) => (
            <Chip
              key={item.categoryId}
              label={item.categoryNameSmall}
              onClick={() => selectCategory(item)}
              // clickable={interestList.includes(item)}
            />
          ))}
        </Stack>
      </>
    );
  }

  /* 관심분야 선택 해제 */
  const handleDelete = (unselected) => {
    const filteredList = interestList.filter(
      (item) => item.categoryNameSmall !== unselected.categoryNameSmall
    );
    setInterestList(filteredList);
    // 삭제한 카테고리는 다시 전체 목록에 반영
    console.log(filteredList);
  };

  /* 관심분야 선택 추가 */
  const selectCategory = (selected) => {
    if (interestList.length >= 3) {
      // todo
      alert('최대 3개 선택가능');
    } else {
      // 중복검사
      console.log(interestList);
      let existing = false;
      for (let i of interestList) {
        if (selected.categoryId === i.categoryId) {
          existing = true;
          alert('중복');
          break;
        }
      }
      if (!existing) setInterestList((currentArray) => [selected, ...currentArray]);
    }
  };

  /* 관심분야 선택완료 시 */
  // todo

  useEffect(() => {
    // 관심분야 목록 API 호출
    getList();
  }, []);

  return (
    <>
      <Typography variant="body1" align="left" sx={{ color: 'text.secondary', mt: 3, mb: 1 }}>
        선택한 관심분야
      </Typography>
      <Stack direction="row" spacing={1}>
        {interestList.map((item, index) => (
          <Chip
            key={item.categoryId}
            label={item.categoryNameSmall}
            onDelete={() => handleDelete(item)}
            color="info"
          />
        ))}
      </Stack>
      <Typography variant="body1" align="left" sx={{ color: 'text.secondary', mt: 3, mb: 1 }}>
        카테고리 전체목록
      </Typography>

      <Stack spacing={2}>
        {Object.entries(categoryList).map((bigCategoryGroup, index) => (
          <CategoryGroup key={index} bigCategoryGroup={bigCategoryGroup} />
        ))}
      </Stack>
    </>
  );
}
