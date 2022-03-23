import React, {FunctionComponent} from 'react';
import {connect} from './LGAPI';
// const connectToTv = require('lgtv2');

// const lgtv = require('lgtv2')({
//   url: 'ws://lgwebostv:3000',
// });

// lgtv.on('error', function (err) {
//   console.log(err);
// });

// lgtv.on('connect', function () {
//   console.log('connected');

//   lgtv.subscribe('ssap://audio/getVolume', function (err, res) {
//     if (res.changed.indexOf('volume') !== -1)
//       console.log('volume changed', res.volume);
//     if (res.changed.indexOf('muted') !== -1)
//       console.log('mute changed', res.muted);
//   });
// });

export interface Props {}

export const LGTVProvider: FunctionComponent<Props> = ({children}) => {
  connect({});
  return <>{children}</>;
};

LGTVProvider.displayName = 'LGTVProvider';
