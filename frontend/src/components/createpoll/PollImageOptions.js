import React, { useState, useRef, useEffect } from 'react';
import { Button, Container, Stack, Card, Typography, Avatar } from '@mui/material';
import ImageUploadButton from '../common/ImageUploadButton';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { alpha, styled } from '@mui/material/styles';
import { getLoggedUserId, getLoggedUserPhoto } from '../../utils/loggedUser';
import { number } from 'yup';

const ImageDiv = styled(Card)(({ theme }) => ({
  width: 200,
  height: 200,
  backgroundColor: theme.palette.common.white,
  border: '2px dashed',
  display: 'flex',
  boxShadow: 30,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 15,
}));

function PollImageOptions(props) {
  const { vote, setVote, imageList, setImageList } = props;
  const fileInput = useRef(null);
  const [Index, setIndex] = useState(0);

  const createimageList = (item) => {
    let voteArr = [...imageList];
    let counter = voteArr.slice(-1)[0];
    counter += 1;

    voteArr.push(counter);
    setImageList(voteArr);
  };


  const deleteImageList = (item) => {
    setVote({
      ...vote,
      imageList : imageList.splice(-1, 1)
    })
    
    let voteArr = [...imageList];
    let counter = voteArr.slice(-1)[0];
    counter -= 1;

    setImageList([...voteArr]);
    setVote({
      ...vote,
      voteSelects: [...vote.voteSelects]
    })
    // fileInput= fileInput.current.value(-1)
  };

  const uploadImage = (e) => {
    // const fileArr = e.target.files[0]; // 여기서 하나씩만 추가하지 않나
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      imageList[Index] = reader.result;
      setImageList([...imageList]);

      vote.voteSelects[Index] = file;
      setVote({
        ...vote,
        voteSelects: [...vote.voteSelects],
      });
    };
    reader.readAsDataURL(file);
  };

  // useEffect(() => {
  //   console.log(fileInput);
  //   // fileInput.current = fileInput.current.click()
  // }, [fileInput]);

  return (
    <>
      <Typography variant="caption" paddingTop={1}>
        &nbsp;&nbsp; 이미지 파일은 .jpg, .png, .jpeg의 형식으로 5mb이하의 크기만 업로드 가능합니다.
      </Typography>
      <br />
      <Stack direction={{ lg: 'row' }} sx={{ marginTop: 3 }}>
        {imageList &&
          imageList.map((item, i) => (
              <ImageDiv key={i} >
                <Avatar
                  alt="vote-photo-option"
                  sx={{ width: 200, height: 200 }}
                  variant="rounded"
                  src={item}
                  onClick={() => {
                    setIndex(i);
                    fileInput.current.click();
                  }}
                >
                  <AddPhotoAlternateIcon color="disabled" sx={{ fontSize: 40 }} />
                  <Typography component="span" variant="subtitle1" color="text.secondary">
                    Upload Image
                  </Typography>
                </Avatar>

                <input
                  type="file"
                  style={{ display: 'none' }}
                  accept="image/jpg,impge/png,image/jpeg"
                  name="votePhotoOption"
                  ref={fileInput}
                  onChange={uploadImage}
                />
              </ImageDiv>
          ))}
      </Stack>
      {imageList.length < 4 && (
        <Button
          variant="contained"
          className="option-button"
          sx={{ mt: 2 }}
          size="small"
          onClick={createimageList}
        >
          + 이미지 추가하기 
        </Button>
      )}
      <Button
        onClick={deleteImageList}
        size="small"
        variant="outlined"
        sx={{ mt: 2, ml:1 }}
      >
        - 이미지 삭제 
      </Button>
      <br /> <br />
    </>
  );
}

export default PollImageOptions;
