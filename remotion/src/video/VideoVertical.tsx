import React from 'react';
import { VideoMaster, type VideoMasterProps } from './VideoMaster';

export const VideoVertical: React.FC<Omit<VideoMasterProps, 'layout'>> = (props) => {
  return <VideoMaster {...props} layout="portrait" />;
};
