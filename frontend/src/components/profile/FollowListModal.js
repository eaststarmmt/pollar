import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Modal, Tab, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import FollowAccountList from './FollowAccountList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 800,
  bgcolor: 'background.paper',
  // border: '2px solid #333',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function FollowListModal({ openModal, type, listOwnerId }) {
  // 의도적으로 초기값을 설정하지 않음(i.e. undefined 상태) -> Modal이 페이지가 들어가자마자 열리는 것을 방지하기 위함
  const [open, setOpen] = useState();
  const [focusedTab, setFocusedTab] = useState('follower');

  const handleChange = (event, newValue) => {
    setFocusedTab(newValue);
  };

  const handleClose = () => {
    // open을 'false'로 설정한다
    setOpen(false);
  };

  // todo get Follower, Following list
  useEffect(() => {
    // 처음 Component 생성 시점일 경우에는 open이 'true'가 되는 것을 방지하기 위한 로직
    if (open === undefined) {
      setOpen(false);
    } else {
      setFocusedTab(type);
      setOpen(true);
    }
  }, [openModal]);

  return (
    <>
      {/* <ClickAwayListener onClickAway={handleClickAway}>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </ClickAwayListener> */}
      {/* open부분: 다른 Component에서 Modal을 열기위한 설계. open이 undefined 상태라면(i.e. 페이지 처음 render시) Modal이 open되는 것을 방지하기 위함 */}
      <Modal
        open={open === undefined ? false : open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TabContext value={focusedTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="user's following and follower list"
                sx={{ width: '100%' }}
              >
                <Tab label="팔로워 목록" value="follower" />
                <Tab label="팔로잉 목록" value="following" />
              </TabList>
            </Box>
            <Box sx={{ backgroundColor: '#fff', mx: { xs: -2, lg: -3 }, mt: -0.5 }}>
              <TabPanel value="follower">
                <FollowAccountList
                  listType="follower"
                  setOpenModal={setOpen}
                  listOwnerId={listOwnerId}
                />
              </TabPanel>
              <TabPanel value="following">
                <FollowAccountList
                  listType="following"
                  setOpenModal={setOpen}
                  listOwnerId={listOwnerId}
                />
              </TabPanel>
            </Box>
          </TabContext>
        </Box>
      </Modal>
    </>
  );
}
