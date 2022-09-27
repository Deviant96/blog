import Link from 'next/link'
import styles from '../styles/BlogCard.module.css'
import Image from 'next/image'

export default function BlogPost({
    title,
    author,
    coverPhoto,
    datePublished,
    slug,
}) {
    return (
        <Link href={'/posts/' + slug}>
            <div className={styles.card}>
                <div className={styles.text}>
                    <div className={styles.author}>
                        <div className={styles.authorImg}>
                            <Image
                                src={author.avatar.url}
                                alt=""
                                // width={500} automatically provided
                                // height={500} automatically provided
                                // blurDataURL="data:..." automatically provided
                                // placeholder="blur" // Optional blur-up while loading
                                className={styles.avatar}
                                width={400}
                        height={400}
                            />
                        </div>
                        <h3>{author.username}</h3>
                    </div>
                    <h2>{title}</h2>
                    <div className={styles.details}>
                        <div className={styles.date}>
                            <small>{datePublished}</small>
                        </div>
                    </div>
                </div>
                <div className={styles.imgContainer}>
                    <img src={coverPhoto.url} alt="" width={400}
                        height={400} />
                </div>
            </div>
        </Link>
    )
}