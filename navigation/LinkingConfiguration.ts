/**
 * More about deep linking with React Navigation:
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Home: "home",
      SubList: "SubList/:list_id",
      WebContent: "WebContent/:html_id",
      NotFound: '*',
    },
  },
};
