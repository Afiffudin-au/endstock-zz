import React from 'react'
import ReactPlayer from 'react-player'
import styles from './CardVideoDetail.module.css'
export interface CardVideoOptions {
  url: string
  thumbnail: string
}
function CardVideoDetail({ url, thumbnail }: Partial<CardVideoOptions>) {
  return (
    <>
      <div className={styles.CardVideoDetail}>
        <div className={styles.playerWrapper}>
          <ReactPlayer
            className={styles.reactPlayer}
            light={thumbnail}
            controls={true}
            width='100%'
            height='100%'
            url={url}
          />
        </div>
      </div>
    </>
  )
}

export default CardVideoDetail
