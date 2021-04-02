import { Box } from '@chakra-ui/layout'
import React from 'react'
import ReactPlayer from 'react-player'
import styles from './CardVideo.module.scss'
export interface CardVideoOptions {
  id: string
  url: string
  thumbnail: string
  description: string
}
function CardVideo({
  id,
  url,
  thumbnail,
  description,
}: Required<CardVideoOptions>) {
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
      <Box p={5}>
        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          isTruncated>
          {description}
        </Box>
      </Box>
    </div>
  )
}

export default CardVideo
