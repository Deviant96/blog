import Head from 'next/head'
import styles from '../../styles/Slug.module.css'
import {GraphQLClient, gql} from 'graphql-request'

import Image from 'next/image'

const graphcms = new GraphQLClient(
  "https://api-ap-southeast-2.graphcms.com/v2/cl3zwq5zt1pfp01xs7tja9q9t/master"
); 

const QUERY = gql`
    query Post($slug: String!) {
        post(where: {slug: $slug}) {
            id
            title
            slug
            datePublished
            author {
                id
                username
                avatar {
                    url
                }
            }
            content {
                html
            }
            coverPhoto{
                id
                url
            }
        }
    }
`;

const SLUGSLIST = gql `
    {
        posts {
            slug
        }
    }
`;

export async function getStaticPaths() {
    const { posts } = await graphcms.request(SLUGSLIST);
    return  {
        paths: posts.map((post) => ({ params: { slug: post.slug } })),
        fallback: 'blocking',
    };

}

export async function getStaticProps({params}) {
    const slug = params.slug;
  const data = await graphcms.request(QUERY, {slug});
  const post = data.post;
  return {
    props:{
      post,
    },
  };
}

export default function BlogPost({post}) {
    return (
        
        <main className={styles.blog}>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.title} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className={styles.blog__cover}>
                <img src={post.coverPhoto.url} alt="" />
            </div>

            <div className={styles.blog__container}>

                <div className={styles.article}>

                    <div className={styles.article__title}>
                        <h2>{post.title}</h2>
                        <h6 className={styles['article__published-date']}>{post.datePublished}</h6>
                    </div>
                    <div className={styles.article__content} dangerouslySetInnerHTML={{ __html: post.content.html }}>
                    </div>

                </div>

                <div className={styles.author}>
                    <div className={styles.authtext}>
                        <h5>About Author</h5>
                        <h6>{post.author.username}</h6>
                    </div>
                    <Image
                        src={post.author.avatar.url}
                        alt=""
                        // width={500} automatically provided
                        // height={500} automatically provided
                        // blurDataURL="data:..." automatically provided
                        // placeholder="blur" // Optional blur-up while loading
                        className={styles.article__avatar}
                        width={400}
                        height={400}
                        priority
                    />
                </div>

            </div>
            
        </main>
    )
}