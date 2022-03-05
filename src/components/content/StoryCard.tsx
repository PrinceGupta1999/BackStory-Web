import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { Chip, Grid, Stack } from '@mui/material';
import { Story } from '../../types/content/story';
import { SxProps } from '@mui/system';
import TimeAgoTypography from './TimeAgoTypography';
import Link from '../core/Link';
import { RWebShare } from 'react-web-share';
import { useRouter } from 'next/router';
import { AccessLevel } from '../../types/enum/accessLevel';

export interface StoryCardProps {
  story: Story;
  sx?: SxProps;
  accessLevel?: AccessLevel;
}

const StoryCard: React.FC<StoryCardProps> = ({
  story,
  sx,
  accessLevel = AccessLevel.USER,
}) => {
  const router = useRouter();
  return (
    <Card
      sx={{
        ...sx,
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <Link
        href={`${
          accessLevel == AccessLevel.ADMIN ? '/admin' : ''
        }/today-in-history/${story.slug}`}
        sx={{
          color: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
        underline="none"
      >
        <CardMedia sx={{ display: 'flex' }}>
          <div style={{ position: 'relative', width: '100%', height: 200 }}>
            <Image
              src={story.bannerImageUrl}
              objectPosition="0 10%"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </CardMedia>
        <CardContent
          sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {story.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {story.outline}
          </Typography>
          <Stack direction="row" spacing={1} my={1}>
            {story.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                clickable
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/today-in-history/tag/${tag}`);
                }}
              />
            ))}
          </Stack>
        </CardContent>
        <CardActions sx={{ display: 'flex' }}>
          <Grid container justifyContent="space-between" px={2}>
            <TimeAgoTypography
              date={story.publishDate}
              typographyProps={{ variant: 'body2', color: 'text.secondary' }}
            />
            {accessLevel === AccessLevel.ADMIN ? (
              <Button
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/admin/story/${story.slug}`);
                }}
              >
                Edit
              </Button>
            ) : (
              <span
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="react-web-share-container"
              >
                <RWebShare
                  data={{
                    title: 'Share this BackStory',
                    text: story.abstract,
                  }}
                >
                  <Button size="small">Share</Button>
                </RWebShare>
              </span>
            )}
          </Grid>
        </CardActions>
      </Link>
    </Card>
  );
};

export default StoryCard;
