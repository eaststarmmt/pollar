import { Stack, Avatar } from '@mui/material';
import { modifyProfilePhoto } from '../../services/api/UserApi';
import { useEffect, useState, useRef } from 'react';
import { getLoggedUserId, setLoggedUserInfo } from '../../utils/loggedUser';

export default function ProfileImageUploadButton({ size, userId, prevImage }) {
  let loggedUserId = getLoggedUserId();
  // 회원가입 시 필요(localStorage에 아직 없음)
  if (typeof userId !== 'undefined') loggedUserId = userId;

  const [image, setImage] = useState(prevImage);
  const fileInput = useRef(null);
  // 아래 주소 default로 넣어놔도 좋을듯
  // https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png

  const onChange = async (e) => {
    if (e.target.files[0]) {
      const formData = new FormData();
      formData.append(
        'userDto',
        new Blob([JSON.stringify({ userId: loggedUserId })], { type: 'application/json' })
      );
      formData.append('userProfilePhoto', e.target.files[0]);

      // 서버 요청
      const result = await modifyProfilePhoto(formData);
      if (result === 'success') {
        //todo localStorage에 갱신
        // const updatedData = await getUser
        // setLoggedUserInfo();
      }
    } else {
      //업로드 취소할 시
      setImage(prevImage);
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        console.log(reader);
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  // 프로필 이미지 변경 완료. 해당 이미지를 서버로 전송하기

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        {/* 아래처럼 url로 접근시 바로 이미지 사용 가능 */}
        {/* 유저 정보를 호출해서 해당 유저의 db에 담긴 url 주소 불러오기 */}
        {/*  불러오기 + 수정하기도 되야하므로 put 먼저 만들고 있자. */}
        <Avatar
          alt="user profile photo"
          src={image}
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
