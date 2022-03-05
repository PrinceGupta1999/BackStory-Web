import {
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { Story } from '../../types/content/story';
import Link from '../core/Link';
import Markdown from '../core/Markdown';
import TimeAgoTypography from './TimeAgoTypography';

interface StoryContentProps {
  story: Story;
}

const StoryContent: React.FC<StoryContentProps> = ({ story }) => {
  const theme = useTheme();
  return (
    <Grid container minHeight="calc(100vh - 64px)" justifyContent="center">
      <Grid container>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '500px',
            backgroundColor:
              theme.palette.mode == 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
          }}
        >
          <Image src={story.bannerImageUrl} layout="fill" objectFit="contain" />
        </div>
      </Grid>
      <Grid container maxWidth="lg" direction="column" p={2}>
        <Typography variant="h3">{story.title}</Typography>
        <Grid container justifyContent="space-between">
          <Typography variant="overline">
            {story.minutesToRead} Mins Read
          </Typography>
          <TimeAgoTypography
            date={
              new Date(
                story.publishDate.getTime() +
                  2 * new Date().getTimezoneOffset() * 60 * 1000
              )
            }
            typographyProps={{ variant: 'overline', children: 'Published' }}
          />
        </Grid>
        <Stack direction="row" spacing={1} my={1}>
          {story.tags.map((tag) => (
            <Chip
              label={tag}
              key={tag}
              component={Link}
              href={`/today-in-history/tag/${tag}`}
              clickable
            />
          ))}
        </Stack>
        <Divider style={{ margin: '1rem 0' }} />
        <Markdown children={story.story} />
      </Grid>
    </Grid>
  );
};

export default StoryContent;
