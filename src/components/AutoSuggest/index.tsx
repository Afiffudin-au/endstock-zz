import { Progress } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import useSuggestion from '../../custom-hooks/useSuggestion'
import styles from './AutoSuggest.module.css'
function AutoSuggest({
  searchQuery,
  title,
}: {
  searchQuery: string
  title: string
}) {
  const router = useRouter()
  const { getSuggest, isLoading, keywords, reset } = useSuggestion()
  useEffect(() => {
    const userText = searchQuery?.replace(/^\s+/, '').replace(/\s+$/, '')
    let controller = new AbortController()
    if (title === 'Images') {
      getSuggest(controller, searchQuery, userText, 'images')
    } else if (title === 'Videos') {
      getSuggest(controller, searchQuery, userText, 'videos')
    }
    return () => {
      controller.abort()
    }
  }, [searchQuery])
  useEffect(() => {
    reset()
  }, [router.asPath])
  return (
    <>
      {isLoading && <Progress size='xs' isIndeterminate />}
      {keywords?.length > 0 && (
        <article className={styles.suggest}>
          {keywords?.slice(0, 10).map((item) => (
            <Link
              key={item}
              href={
                title === 'Images'
                  ? `/search-images/${item}`
                  : title === 'Videos'
                  ? `/search-videos/${item}`
                  : title === 'Musics'
                  ? `/search-musics/${item}`
                  : ''
              }>
              <a>
                <p className={styles.suggestItem}>{item}</p>
              </a>
            </Link>
          ))}
        </article>
      )}
    </>
  )
}

export default AutoSuggest
