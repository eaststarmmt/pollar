import { Button, IconButton, Stack, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import profile from '../../_mocks_/profile';
import { modifyProfilePhoto } from '../../services/api/UserApi';
import { getProfileInfo } from '../../services/api/ProfileApi';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLoggedUserId, getLoggedUserPhoto } from '../../utils/loggedUser';
import { createIntstanceWithAuth } from '../../services/axios';

const Input = styled('input')({
  display: 'none',
});

export default function ImageUploadButton({ size, userId }) {
  // 로그인되어있는 사용자의 Id, 이미지 확인
  //// const loggedUserId = getLoggedUserId();
  let loggedUserId = getLoggedUserId();
  if (typeof userId !== 'undefined') loggedUserId = userId;

  const loggedUserPhoto = getLoggedUserPhoto();
  console.log('==========================================');
  console.log('현재 로그인한 아이디: ' + loggedUserId);
  console.log('유저 프로필 이미지 주소: ' + loggedUserPhoto);
  console.log('==========================================');

  // 이미지 상태값으로 사용해서 변경해주기

  const [Image, setImage] = useState(loggedUserPhoto);
  const fileInput = useRef(null);
  // 아래 주소 default로 넣어놔도 좋을듯
  // https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png

  const onChange = (e) => {
    if (e.target.files[0]) {
      const formData = new FormData();
      let variable = [
        {
          userId: loggedUserId,
        },
      ];
      // formData.append(
      //   "userDto",
      //   new Blob([JSON.stringify(variable)], { type: "application/json" })
      // )
      formData.append(
        'userDto',
        new Blob([JSON.stringify({ userId: loggedUserId })], { type: 'application/json' })
      );
      // formData.append("userDto", loggedUserId);
      formData.append('userProfilePhoto', e.target.files[0]);

      setImage(e.target.files[0]);
      console.log(e.target.files[0]);
      modifyProfilePhoto(formData);
    } else {
      //업로드 취소할 시
      setImage(loggedUserPhoto);
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  // 프로필 이미지 변경 완료. 해당 이미지를 서버로 전송하기

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        {/* <Input accept="image/*" id="contained-button-file" multiple type="file" /> */}
        {/* <Button variant="contained" component="span">
          Upload
        </Button> */}
        {/* 아래처럼 url로 접근시 바로 이미지 사용 가능 */}
        {/* 유저 정보를 호출해서 해당 유저의 db에 담긴 url 주소 불러오기 */}
        {/*  불러오기 + 수정하기도 되야하므로 put 먼저 만들고 있자. */}
        <Avatar
          alt="user profile photo"
          src={Image}
          // sx={{ width: 56, height: 56, cursor: 'pointer' }}
          sx={{ width: `${size}`, height: `${size}`, cursor: 'pointer' }}
          onClick={() => {
            fileInput.current.click();
          }}
        />
        <input
          type="file"
          style={{ display: 'none' }}
          accept="image/jpg,impge/png,image/jpeg"
          name="userProfilePhoto"
          onChange={onChange}
          ref={fileInput}
        />
      </label>
    </Stack>
  );
}
