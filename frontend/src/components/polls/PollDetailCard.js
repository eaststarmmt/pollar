import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Stack } from '@mui/material';
import PollImageButton from '../common/PollImageButton';

const itemList = ['item1', 'item2', 'item3', 'item4'];

/* 상황별로 탭의 배경색을 변경한다 */
const pollBgCol = {
  closedPoll: '#000',
  default: '#fff',
  trending: '#219',
};

const images = [
  {
    url: 'https://picsum.photos/200/300',
    title: 'Breakfast',
    width: '100%',
  },
  {
    url: 'https://picsum.photos/200/300',
    title: 'Burgers',
    width: '100%',
  },
  {
    url: 'https://picsum.photos/200/300',
    title: 'Camera',
    width: '100%',
  },
  {
    url: 'https://picsum.photos/200/300',
    title: 'Camera',
    width: '100%',
  },
];

export default function PollDetailCard({ poll }) {
  return (
    <Grid item xs={12} sm={6} md={6}>
      <Card sx={{ backgroundColor: '#fff' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography variant="caption" color="text.disabled" gutterBottom>
                작성일자 2020-12-09 ~ 마감시간 2020-12-29
              </Typography>
              <Typography variant="h5" component="div">
                Poll Title
              </Typography>
              <Typography variant="body2" sx={{ mb: 1.5 }} color="text.disabled">
                poll 카테고리
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 14 }}>
                투표내용... (최대 100자)
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              {true ? (
                <Grid item xs={12} md={12}>
                  <Stack spacing={1}>
                    {itemList.map((item, index) => (
                      <Button key={index} variant="contained">
                        {item}
                      </Button>
                    ))}
                  </Stack>
                </Grid>
              ) : (
                <>
                  <Grid container spacing={1}>
                    {itemList.map((item, index) => (
                      <Grid item xs={6}>
                        <Card key={index}>
                          <PollImageButton
                            image={images[index]}
                            sx={{ width: '100%', height: 'auto' }}
                          />
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  {/* </Stack> */}
                </>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="small" color="secondary">
            자세히 보기
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
