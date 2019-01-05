require('dotenv').config();

var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var moment = require('moment-timezone');
moment.tz.setDefault('Asia/Singapore');
/* GET home page. */
router.get('/api/images', (req, res, next) => {
  let options = {
    uri: 'http://datamall2.mytransport.sg/ltaodataservice/TrafficImages',
    headers: {
      AccountKey: process.env.ACCOUNT_KEY,
      UniqueUserId: process.env.UNIQUE_USER_ID
    },
    json: true // Automatically parses the JSON string in the response
  };
  rp(options)
    .then(data => {
      let listTrafficImages = [];
      let trafficArray = data.value;
      trafficArray.forEach(traffic => {
        let images = {};

        images.mCameraID = traffic.CameraID;
        images.mImageURL = traffic.ImageLink;
        images.mCreateDate = moment().format('hh:mma DD MMM YYYY');
        switch (traffic.CameraID) {
          case '2701':
            images.mName = 'Woodlands Causeway(Twd Johor)';
            listTrafficImages.push(images);
            break;

          case '2702':
            images.mName = 'Woodlands CheckPoint(Twd BKE)';
            listTrafficImages.push(images);
            break;

          case '2704':
            images.mName = 'Woodlands Flyover(Twd Checkpoint)';
            listTrafficImages.push(images);
            break;

          case '2705':
            images.mName = 'Woodlands Causeway(Twd PIE)';
            listTrafficImages.push(images);
            break;

          case '4703':
            images.mName = 'Second Link @ Tuas';
            listTrafficImages.push(images);
            break;

          case '4712':
            images.mName = 'Tuas CheckPoint';
            listTrafficImages.push(images);
            break;

          case '4713':
            images.mName = 'Aft Tuas West Road';
            listTrafficImages.push(images);
            break;
        }
      });

      // MALAYSIA 
      let malaysiaURL = [
        'http://vigroot.llm.gov.my/vigroot/cam_root/web/LINK2/LNK_CAM_S5_SECOND_LINK_10_KM-1.3_NB.web.jpg',
        'http://vigroot.llm.gov.my/vigroot/cam_root/web/LINK2/LNK_CAM_S5_SECOND_LINK_8_KM1.8_SB.web.jpg',
        'http://vigroot.llm.gov.my/vigroot/cam_root/web/LINK2/LNK_CAM_S5_SECOND_LINK_7_KM4.7_SB.web.jpg',
        'http://vigroot.llm.gov.my/vigroot/cam_root/web/EDL/EDL_CAM_101_CIQ_KM0.1_SB.web.jpg',
        'http://vigroot.llm.gov.my/vigroot/cam_root/web/EDL/EDL_CAM_102_CIQ_KM0.3_NB.web.jpg',
        'http://vigroot.llm.gov.my/vigroot/cam_root/web/EDL/EDL_CAM_103_Stulang_KM1.7_NB.web.jpg'
      ];

      let malaysiaName = [
        'Second Link Msia 1.3km',
        'Second Link Msia 1.8km',
        'Second Link Msia 4.7km',
        'EDL Msia 0.1km',
        'EDL Msia 0.3km',
        'EDL Msia 1.7km'
      ];

      for (let i = 0; i < malaysiaURL.length; i++) {
        let images = {};
        images.mCameraID = null;
        images.mImageURL = malaysiaURL[i];
        images.mName = malaysiaName[i];
        images.mCreateDate = moment().format('hh:mma DD MMM YYYY');
        listTrafficImages.push(images);
      }
      console.log('listTraffic', listTrafficImages);

      res.json(listTrafficImages);
    })
    .catch(err => {
      res.json({
        status: 'error'
      })
    });
});

router.get('/rates', (req, res, next) => {
  let options = {
    uri: 'https://frankfurter.app/latest?symbols=MYR&base=SGD',
    json: true // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(data => {
      res.json(data);
    });

});

module.exports = router;
