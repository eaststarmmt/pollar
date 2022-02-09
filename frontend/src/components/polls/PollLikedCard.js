import PropTypes from 'prop-types';
// import { Icon } from '@iconify/react';
// import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
// import shareFill from '@iconify/icons-eva/share-fill';
// import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShareIcon from '@mui/icons-material/Share';
// material
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  CardActionArea,
  Stack,
  IconButton,
  Chip,
  CardActions,
} from '@mui/material';
import SvgIconStyle from '../common/SvgIconStyle';

// ----------------------------------------------------------------------

const TitleStyle = styled(Link)({
  // height: 44,
  overflow: 'hidden',
  //? 1(개) 줄만 표시하겠다는 것
  WebkitLineClamp: 1,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});
const ContentStyle = styled(Typography)({
  height: 44,
  overflow: 'hidden',
  //? 1(개) 줄만 표시하겠다는 것
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  padding: 5,
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  // position: 'absolute',
  // left: theme.spacing(3),
  marginRight: 15,
  marginBottom: 5,
  // bottom: theme.spacing(-3),
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  // marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
// ----------------------------------------------------------------------

PollLikedCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

const dummytext =
  '투표내용: (투표했을 경우 하얀색, 아직이면 화려한색, 마감된 투표면 회색)Lizards are awidespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica  투표면 회색)Lizards are awidespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica';

export default function PollLikedCard({ post, index }) {
  const { cover, title, view, comment, share, author, createdAt } = post;

  const POST_INFO = [
    { number: comment, icon: ChatOutlinedIcon },
    { number: view, icon: HowToVoteIcon },
    { number: share, icon: FavoriteBorderIcon },
    // { number: comment, icon: messageCircleFill },
    // { number: view, icon: HowToVoteIcon },
    // { number: share, icon: shareFill },
  ];

  return (
    <Grid item xs={12} sm={12} md={12}>
      <Card sx={{ position: 'relative', backgroundColor: false ? '#ddd' : '#fff' }}>
        <CardActionArea disableRipple>
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
            }}
          />

          <CardContent sx={{ pt: 4 }}>
            <Stack direction="row" justifyContent="center" alignItems="flex-start">
              <AvatarStyle
                alt={author.name}
                src={author.avatarUrl}
                sx={{ bgcolor: stringToColor(`${author.name}`) }}
              />
              <TitleStyle
                to="#"
                color="inherit"
                variant="h5"
                underline="hover"
                component={RouterLink}
              >
                {title}
              </TitleStyle>
              {true ? (
                <PhotoLibraryIcon color="action" sx={{ pt: 1 }} />
              ) : (
                <TextSnippetIcon color="disabled" sx={{ pt: 1 }} />
              )}

              <InfoStyle sx={{ width: '100%' }}>
                {POST_INFO.map((info, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      ml: index === 0 ? 0 : 1.5,
                      // ...((latestPostLarge || latestPost) && {
                      //   color: 'grey.500',
                      // }),
                    }}
                  >
                    <Box component={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                    <Typography variant="caption">{info.number}</Typography>
                  </Box>
                ))}
              </InfoStyle>
            </Stack>
            <CardActions>
              <Stack direction="row">
                <ContentStyle variant="body2" color="text.secondary">
                  {dummytext}
                  {/* {dummytext.length > 120 ? `${dummytext.slice(0, 120)} ...더보기` : dummytext} */}
                </ContentStyle>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <IconButton aria-label="add to favorites">
                  {false ? (
                    <FavoriteRoundedIcon sx={{ fontSize: '2em' }} color="error" />
                  ) : (
                    <FavoriteBorderRoundedIcon sx={{ fontSize: '2em' }} color="disabled" />
                  )}
                </IconButton>
              </Stack>
            </CardActions>
            <Stack direction="row" spacing={1}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ color: 'text.disabled', display: 'block' }}
              >
                {/* 투표기간: {createdAt} ~ {formatDistanceToNow(new Date(createdAt))} */}
                투표기간: {createdAt} ~ {createdAt}
              </Typography>
              {/* // todo 3가지 중 하나 */}
              <Chip
                label="마감됨"
                color="default"
                size="small"
                sx={{ fontSize: 10, padding: -10 }}
              />
              <Chip
                label="투표완료"
                color="warning"
                size="small"
                sx={{ fontSize: 10, padding: -10 }}
              />
              <Chip
                label="NEW(투표아직안함)"
                color="info"
                size="small"
                sx={{ fontSize: 10, padding: -10 }}
              />
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
