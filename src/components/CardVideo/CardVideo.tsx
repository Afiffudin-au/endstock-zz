import { Box } from '@chakra-ui/layout'
import React from 'react'
import ReactPlayer from 'react-player'
import styles from './CardVideo.module.scss'
interface CardVideoOptions {
  url: string
  thumbnail: string
}
function CardVideo({ url, thumbnail }: Required<CardVideoOptions>) {
  return (
    <div className={styles.CardVideo}>
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
  )
}

export default CardVideo
