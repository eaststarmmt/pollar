import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Input,
  InputBase,
  Paper,
  TextField,
  Typography,
  Tooltip,
} from '@mui/material';
import { useEffect, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function SharePollDialog({ openDialog, pollId }) {
  const [open, setOpen] = useState();
  const [isCopied, setIsCopied] = useState(false);

  // todo
  const shareUrl = `https://pollar.com/poll/${pollId}`;

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open === undefined) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [openDialog]);

  async function copyTextToClipboard() {
    setIsCopied(true);
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(shareUrl);
    } else {
      return document.execCommand('copy', true, shareUrl);
    }
  }

  return (
    <div>
      <Dialog open={open === undefined ? false : open} onClose={handleClose}>
        <DialogTitle>투표 공유하기</DialogTitle>
        <DialogContent>
          <DialogContentText variant="body2">
            다른 사람들에게 이 투표를 공유해보세요!
          </DialogContentText>
          {/* <Input readOnly type="text" value={shareUrl} /> */}
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 400,
              backgroundColor: '#eee',
              mt: 2,
            }}
          >
            <InputBase
              readOnly
              sx={{ ml: 1, flex: 1 }}
              inputProps={{ 'aria-label': 'copy poll link' }}
              value={shareUrl}
            />
            {isCopied ? (
              <Typography variant="caption" color="secondary">
                Copied!
              </Typography>
            ) : null}
            <Tooltip title="복사하기">
              <IconButton sx={{ p: '10px' }} aria-label="copy" onClick={copyTextToClipboard}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
