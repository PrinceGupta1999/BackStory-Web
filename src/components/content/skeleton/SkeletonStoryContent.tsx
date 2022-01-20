import { Divider, Grid, Skeleton, Stack, Typography } from '@mui/material';

const SkeletonStoryContent: React.FC = () => {
  return (
    <Grid container minHeight="calc(100vh - 64px)" justifyContent="center">
      <Skeleton variant="rectangular" width="100%" height={300} />
      <Grid container maxWidth="lg" direction="column" p={2}>
        <Typography variant="h3">
          <Skeleton />
        </Typography>
        <Grid container justifyContent="space-between">
          <Typography variant="overline">
            <Skeleton width={200} />
          </Typography>
          <Typography variant="overline">
            <Skeleton width={300} />
          </Typography>
        </Grid>
        <Stack direction="row" spacing={1} my={1}>
          {[...Array(3).keys()].map((v) => (
            <Skeleton key={v} width={80} height={24} />
          ))}
        </Stack>
        <Divider style={{ margin: '1rem 0' }} />
        {[...Array(10)].map((v) => (
          <Skeleton key={v} height={24} />
        ))}
      </Grid>
    </Grid>
  );
};

export default SkeletonStoryContent;
