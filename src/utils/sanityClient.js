const sanityClient = require("@sanity/client");

module.exports = sanityClient({
  apiVersion: '2021-03-25',
  projectId: 'u9jnua2q',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});
