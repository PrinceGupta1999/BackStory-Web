import { Typography, TypographyProps } from '@mui/material';
import ReactTimeAgo from 'react-time-ago';

interface TimeAgoTypographyProps {
  date: Date | number;
  typographyProps?: TypographyProps;
}

const TimeAgoTypography: React.FC<TimeAgoTypographyProps> = ({
  date,
  typographyProps,
}) => {
  return (
    <ReactTimeAgo
      date={date}
      wrapperComponent={TimeAgoContainer}
      wrapperProps={{
        typographyProps,
      }}
    />
  );
};

interface TimeAgoContainerProps {
  date: Date | number;
  typographyProps?: TypographyProps;
  verboseDate: string;
  children: React.ReactNode;
}
const TimeAgoContainer: React.FC<TimeAgoContainerProps> = ({
  typographyProps,
  children,
}) => {
  return (
    <Typography {...typographyProps}>
      {typographyProps?.children} {children}
    </Typography>
  );
};

export default TimeAgoTypography;
