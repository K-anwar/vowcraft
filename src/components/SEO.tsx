import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
  author?: string;
}

export default function SEO({
  title = 'Undangan Pernikahan Digital Premium',
  description = 'Undangan pernikahan digital elegan dengan RSVP, QR check-in, galeri foto, dan musik. Tersedia multi tema.',
  image = '',
  url = '',
  keywords = 'undangan pernikahan, wedding invitation, undangan digital, pernikahan, wedding',
  author = 'Digital Wedding Invitation',
}: SEOProps) {
  const siteUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <meta name="theme-color" content="#d4a0a0" />
    </Helmet>
  );
}