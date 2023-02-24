const sanityClient = require('@sanity/client')
  export default client = sanityClient({
  projectId: 'q9xfz7x1',
  dataset: 'production',
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})
// export const client = sanityClient(client)