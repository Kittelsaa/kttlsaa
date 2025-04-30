import type { MDXInstance, MDXComponents } from 'astro';
import RemoteImage from './components/RemoteImage.astro';
import VideoEmbed from './components/VideoEmbed.astro';
// Import other components you want to make available in MDX files

export const components: MDXComponents = {
  RemoteImage,
  VideoEmbed,
  // Add other components here
};

export default components;