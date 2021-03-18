import { Box } from '@chakra-ui/layout'
import Head from 'next/head'
import Search from '../components/Search/Search'
import styles from '../styles/Home.module.scss'

export default function Home({ dataImages }: any) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box p='1'>
        <Search />
      </Box>
    </div>
  )
}
