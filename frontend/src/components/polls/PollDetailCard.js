import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Stack } from '@mui/material';

const itemList = ['item1', 'item2', 'item3', 'item4'];

export default function PollDetailCard() {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent sx={{ backgroundColor: '#826AF9' }}>
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
        <Button size="small">자세히 보기</Button>
      </CardActions>
    </Card>
  );
}
