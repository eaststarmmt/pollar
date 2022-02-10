import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Stack } from '@mui/material';

const itemList = ['item1', 'item2', 'item3', 'item4'];

/* 상황별로 탭의 배경색을 변경한다 */
const pollBgCol = {
  closedPoll: '#000',
  default: '#fff',
  trending: '#219',
};

export default function PollTrendingCard() {
  return (
    // <Grid item xs={12} sm={12} md={6}>
    <Card sx={{ backgroundColor: '#826AF9', height: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <Typography sx={{ fontSize: 14 }} color="white" gutterBottom>
              작성일자 2020-12-09
            </Typography>
            <Typography variant="h5" component="div">
              Poll Title
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.disabled">
              poll author
            </Typography>
            <Typography variant="body2">투표내용... (최대 300자)</Typography>
          </Grid>
          <Grid item xs={6} md={6}>
            <Stack spacing={1}>
              {itemList.map((item, index) => (
                <Button key={index} variant="contained">
                  {item}
                </Button>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" color="secondary">
          자세히 보기
        </Button>
      </CardActions>
    </Card>
    // </Grid>
  );
}
