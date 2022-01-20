import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Skeleton,
  Stack,
  SxProps,
  Typography,
  CardActions,
} from '@mui/material';

export interface SkeletonStoryCardProps {
  sx?: SxProps;
}

const SkeletonStoryCard: React.FC<SkeletonStoryCardProps> = ({ sx }) => {
  return (
    <Card
      sx={{
        ...sx,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <CardMedia sx={{ display: 'flex' }}>
        <Skeleton variant="rectangular" width="100%" height={300} />
      </CardMedia>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
      >
        <Typography gutterBottom variant="h5" component="div">
          <Skeleton />
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Skeleton />
        </Typography>
        <Stack direction="row" spacing={1} my={1}>
          {[1, 2, 3].map((v) => (
            <Chip key={v} label="     " />
          ))}
        </Stack>
      </CardContent>
      <CardActions sx={{ display: 'flex' }}>
        <Grid container justifyContent="space-between" px={2}>
          <Button size="small">
            <Skeleton />
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default SkeletonStoryCard;
