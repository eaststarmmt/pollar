import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
// import commentFill from '@iconify/icons-eva/comment-fill';
import commentFill from '@iconify/icons-eva/message-circle-fill';
// material
import { Stack, Button, Divider, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function AuthSocial() {
  return (
    <>
      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={commentFill} color="#ffcd77" height={24} />
        </Button>
        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={googleFill} color="#DF3E30" height={24} />
        </Button>
      </Stack>
    </>
  );
}
