import NextHead from 'next/head';
import { darkTheme } from '../../theme';

interface HeadProps {
  title?: string;
  description?: string;
  image?: string;
  page?: string;
}

const Head: React.FC<HeadProps> = ({ title, description, image, page }) => {
  return (
    <NextHead>
      {/* <!-- COMMON TAGS --> */}
      <meta charSet="utf-8" key="charset" />
      <meta
        name="theme-color"
        content={darkTheme.palette.primary.main}
        key="theme-color"
      />
      <meta
        name="viewport"
        content="initial-scale=1, width=device-width"
        key="viewport"
      />
      <link
        rel="icon"
        href="/images/logo.svg"
        sizes="any"
        type="image/svg+xml"
      />
      <title> {title} </title>
      {/* <!-- Search Engine --> */}
      <meta name="description" key="description" content={description} />
      <meta name="image" key="image" content={image} />
      {/* <!-- Schema.org for Google --> */}
      <meta key="google-name" itemProp="name" content={title} />
      <meta
        itemProp="description"
        key="google-description"
        content={description}
      />
      <meta itemProp="image" key="google-image" content={image} />
      {/* <!-- Twitter --> */}
      <meta
        name="twitter:card"
        key="twitter-card"
        content="summary_large_image"
      />
      <meta name="twitter:title" key="twitter-title" content={title} />
      <meta name="twitter:image" key="twitter-image" content={image} />
      <meta
        name="twitter:description"
        key="twitter-description"
        content={description}
      />
      <meta name="twitter:site" key="twitter-site" content="@TheBackstoryApp" />
      <meta
        name="twitter:creator"
        key="twitter-creator"
        content="@TheBackstoryApp"
      />
      <meta name="twitter:image:src" key="twitter-page" content={page} />
      {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
      <meta name="og:title" key="og-title" content={title} />
      <meta name="og:description" key="og-description" content={description} />
      <meta name="og:image" key="og-image" content={image} />
      <meta name="og:url" key="og-url" content={page} />
      <meta name="og:site_name" key="og-site" content="BackStory" />
      <meta name="fb:admins" key="og-fb-admins" content="100076264300053" />
      <meta name="fb:app_id" key="og-app-id" content="878699682797243" />
      <meta name="og:type" key="og-type" content="website" />
    </NextHead>
  );
};

Head.defaultProps = {
  title: 'BackStory',
  description: 'Learn about history one BackStory at a time',
  image: 'https://backstory.today/images/featured-logo.png',
  page: 'https://backstory.today',
};

export default Head;
