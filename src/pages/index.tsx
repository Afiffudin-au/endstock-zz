import { Box } from '@chakra-ui/layout'
import Head from 'next/head'
import Search from '../components/Search/Search'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Search millions of pictures, videos, music. Get high inspiration added every day.'
        />
      </Head>
      <Box p='1'>
        <Search titleProps='Images' />
      </Box>
    </div>
  )
}
