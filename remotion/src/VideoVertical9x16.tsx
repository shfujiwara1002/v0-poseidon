import type { VideoMasterProps } from './video/VideoMaster';
export { VideoVertical as VideoVertical9x16 } from './video/VideoVertical';

export type VideoVerticalProps = Omit<VideoMasterProps, 'layout'>;
