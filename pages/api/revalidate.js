// pages/api/revalidate.js

export default async function handler(req, res) {
  const headers = req.headers

  const body = await getRawBody(req);
  if (!body) {
    res.status(400).send('Bad request (no body)');
    return;
  }

  const jsonBody = JSON.parse(body);

  const issueNumber = jsonBody.data?.slug;

  const getData = jsonBody.data;

  const cobaPath = req.url;
  
  var nyoba = null;

  // if (!headers["Webhook-secret"]) {
  //   return res.status(403).send("Forbidden!")
  // }

  // // Check for secret to confirm this is a valid request
  // if (headers["Webhook-secret"] !== process.env.MY_SECRET_TOKEN) {
  //   return res.status(401).json({ message: 'Invalid token' })
  // }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"


    // const getPaths = jsonBody.paths;
    // const getPath = jsonBody.path;
    // const getParams = jsonBody.params;
    // const getProps = jsonBody.props;
    // const { getDataDua } = jsonBody.data;
    // const getOperations = jsonBody.operations;

    // Sudah : props, params, operation, data, posts, post, query, body
    
    // console.log('[Next.js] Revalidating /')
    await res.revalidate('/')

    if (getData.slug) {
      //await res.revalidate(`/posts/${getData.slug}`);
      nyoba = "ada slug";
    }

    // if (body.data.slug) {
      // console.log(`[Next.js] Revalidating /posts/${body.data.slug}`)  // I checked, the path with slug is correct on logs
    //   await res.revalidate(`/posts/${body.data.slug}`)
    // }

    // const getSlug = JSON.parse(getData)

    return res.json({ 
      revalidated: true, 
      path: cobaPath || null, 
      cobabaru: getData.slug || null,
      poi: `/posts/${getData.slug}`,
      nyoba: nyoba,
      queryPath: req.query.path,
      // revalidationURL: req.body.revalidationURL,

      // cobaPaths: getPaths || null,
      // cobaPath: getPath || null,
      // cobaParams: getParams || null,
      // cobaProps: getProps|| null,
      // cobaData: getData || null,
      // cobaSlug: getSlug || null,
      // cobaSlug: getData.slug || null,
      // cobaDataDua: getDataDua || null,
      // cobaSlugDua: getDataDua.slug || null,

      // tesbody: req.body || null,
      tesisibody: req.body.data.slug || null,
    })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let bodyChunks = [];
    req.on('end', () => {
      const rawBody = Buffer.concat(bodyChunks).toString('utf8');
      resolve(rawBody);
    });
    req.on('data', (chunk) => bodyChunks.push(chunk));
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
}