import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Link as RouterLink } from 'react-router-dom';
import shareFill from '@iconify/icons-eva/share-fill';
import messageCircleFill from '@iconify/icons-eva/message-circle-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Link, Card, Grid, Avatar, Typography, CardContent, Button } from '@mui/material';
import SvgIconStyle from '../common/SvgIconStyle';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShareIcon from '@mui/icons-material/Share';
import stringToColor from '../../utils/stringToColor';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const CoverTextStyle = styled('div')(({ color }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  backgroundColor: color,
  // objectFit: 'cover',
  // padding: 1,
  // overflow: 'hidden',
  // display: 'inline-block',
  position: 'absolute',
  // justifyContent: 'center',
  // lineHeight: '1.5',
  // verticalAlign: 'bottom',
  // textSizeAdjust: '80%',
}));

// ----------------------------------------------------------------------

PollVoteCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function PollVoteCard({ post, index }) {
  const { cover, title, view, comment, share, author, createdAt } = post;

  const POST_INFO = [
    { number: comment, icon: ChatOutlinedIcon },
    { number: view, icon: HowToVoteIcon },
    { number: share, icon: FavoriteBorderIcon },
  ];

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ position: 'relative' }}>
        <CardMediaStyle
          sx={{
            pt: {
              xs: 'calc(100% * 4 / 3)',
              sm: 'calc(100% * 3 / 4.66)',
            },
          }}
        >
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
          <AvatarStyle alt={author.name} src={author.avatarUrl} />
          {false ? (
            <CoverImgStyle
              alt={title}
              src={cover}
              sx={{ backgroundColor: 'gray', textAlign: 'center' }}
            />
          ) : (
            <CoverTextStyle color={stringToColor(title)}>
              <Typography variant="subtitle2" color="white" px={2}>
                {title}
              </Typography>
            </CoverTextStyle>
          )}
        </CardMediaStyle>

        <CardContent sx={{ pt: 4 }}>
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: 'text.disabled', display: 'block' }}
          >
            투표시작 2020-12-23
            {/* {fDate(createdAt)} */}
          </Typography>

          <TitleStyle
            to="#"
            color="inherit"
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
          >
            {title}
          </TitleStyle>

          <InfoStyle sx={{ width: '100%' }}>
            {/* <Button sx={{ mr: 3 }}>결과보기</Button> */}
            {POST_INFO.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                }}
              >
                <Box component={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant="caption">{info.number}</Typography>
              </Box>
            ))}
          </InfoStyle>
        </CardContent>
      </Card>
    </Grid>
  );
}
