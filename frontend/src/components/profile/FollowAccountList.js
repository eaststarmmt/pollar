import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import FollowButton from './FollowButton';
import { getFollowerList, getFollowingList } from '../../services/api/FollowApi';

/**
 * 팔로워, 팔로잉 리스트 공용
 * @param {listType, setOpenModal, listOwnerId}
 * listType: 'follower': 현재 프로필을 팔로우하고 있는 계정 리스트 / 'following': 현재 프로필이 팔로우하고 있는 계정 리스트
 * setOpenModal: props로 modifier함수 가져오기 (모달창 닫아야 함)
 * listOwnerId: 리스트의 주체 userId
 */
export default function FollowAccountList({ listType, setOpenModal, listOwnerId }) {
  const navigate = useNavigate();
  // 사용자 계정 목록
  const [accountList, setAccountList] = useState([]);
  const isFollowerList = listType === 'follower';

  const getAccountList = async () => {
    const list = isFollowerList
      ? await getFollowerList(listOwnerId)
      : await getFollowingList(listOwnerId);
    setAccountList(list);
  };

  useEffect(() => {
    getAccountList();
  }, []); // todo [listType]?아니면 그냥 생성초기에만?

  /* 사용자 프로필을 클릭했을 시 해당 사용자의 프로필로 이동 */
  const handleAccountClick = (userId) => {
    console.log(userId);
    // 아이템(사용자 계정)을 누르면 모달창을 닫는다
    setOpenModal(false);
    navigate(`/users/profile/${userId}`, { replace: true });
  };

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: '100%',
        height: 650,
        overflow: 'auto',
        bgcolor: 'background.paper',
      }}
      // dense
    >
      {accountList.map((account, index) => {
        const labelId = `checkbox-list-secondary-label-${account}`;
        return (
          <ListItem
            key={index}
            secondaryAction={
              <FollowButton
                isFollowButton={!account.isFollow}
                // 리스트의 종류에 따라서, accountId를 각각 다르게 꺼내와야 함
                accountId={isFollowerList ? account.followingId : account.followerId}
              />
            }
            disablePadding
            onClick={() => handleAccountClick(account)}
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  // todo 사용자 프로필 추가 + listType에 따라서 갈리게
                  alt={`Avatar n°${account.followingNickname + 1}`}
                  src={`/static/images/avatar/${account.followingNickname + 1}.jpg`}
                />
              </ListItemAvatar>
              {/* <ListItemText id={labelId} primary={`Line item ${value + 1}`} /> */}
              <ListItemText
                id={labelId}
                primary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body1"
                    color="text.primary"
                  >
                    {isFollowerList ? account.followingNickname : account.followerNickname}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="caption"
                      color="text.disabled"
                    >
                      @{isFollowerList ? account.followingId : account.followerId}
                    </Typography>
                  </>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
