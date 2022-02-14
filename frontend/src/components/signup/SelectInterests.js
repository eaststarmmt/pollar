import { useEffect, useState } from 'react';
import { getAllCategories } from '../../services/api/CategoryApi';
import { Alert, Box, Button, Chip, Collapse, IconButton, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function SelectInterests({ setConfirm, setUser, user }) {
  // 전체 카테고리
  const [categoryList, setCategoryList] = useState([]);
  // 사용자 선택 관심분야 (초기값: 관심분야 수정일 경우)
  const [interestList, setInterestList] = useState([]);
  // 관심분야 최대개수(3개) 초과 선택 시 Alert
  const [openLimitedAlert, setOpenLimitedAlert] = useState(false);
  // 중복된 관심분야 선택 시 Alert
  const [openDuplicatedAlert, setOpenDuplicatedAlert] = useState(false);

  const handleCommit = () => {
    // setSelectedInterestList(interestList);
    // 관심분야 목록에서 id만 뽑아서 전달
    const categories = interestList.map((item) => item.categoryId);
    setUser({ ...user, categories });
    setConfirm(categories);
  };

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
      <Box>
        <Typography variant="body2" align="left" sx={{ color: 'text.secondary', mt: 1 }}>
          {bigCategoryGroup[0]}
        </Typography>
        <Stack direction="row" spacing={1}>
          {bigCategoryGroup[1].map((item) => (
            <Chip
              key={item.categoryId}
              label={item.categoryNameSmall}
              onClick={() => selectCategory(item)}
            />
          ))}
        </Stack>
      </Box>
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
      setOpenLimitedAlert(true);
    } else {
      // 중복검사
      console.log(interestList);
      let existing = false;
      for (let i of interestList) {
        if (selected.categoryId === i.categoryId) {
          existing = true;
          setOpenDuplicatedAlert(true);
          break;
        }
      }
      if (!existing) setInterestList((currentArray) => [selected, ...currentArray]);
    }
  };

  useEffect(() => {
    setInterestList(user.categories);
    // 관심분야 목록 API 호출
    getList();
  }, [user]);

  return (
    <>
      <Stack sx={{ width: '100%' }}>
        <Collapse in={openLimitedAlert}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenLimitedAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            variant="filled"
            sx={{ mb: 2 }}
          >
            최대 3개의 관심분야까지 가능합니다.
          </Alert>
        </Collapse>
        <Collapse in={openDuplicatedAlert}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenDuplicatedAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            variant="filled"
            sx={{ mb: 2 }}
          >
            이미 선택한 관심분야입니다.
          </Alert>
        </Collapse>
        <Typography variant="body1" align="left" sx={{ color: 'text.secondary', mt: 3, mb: 1 }}>
          선택한 관심분야
        </Typography>
        <Stack direction="row" spacing={1}>
          {interestList.map((item, index) => (
            <Chip
              key={index}
              label={item.categoryNameSmall}
              onDelete={() => handleDelete(item)}
              color="success"
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
        <Button variant="contained" onClick={handleCommit} sx={{ marginTop: 5 }}>
          선택완료
        </Button>
      </Stack>
    </>
  );
}
