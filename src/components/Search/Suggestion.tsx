import { SearchIcon } from '@chakra-ui/icons'
import { Box, CircularProgress, IconButton, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import useGetSearchImageSuggestion from '../../custom-hooks/useGetSearchImageSuggestion/useGetSearchImageSuggestion'
import useGetSearchVideoSuggestion from '../../custom-hooks/useGetSearchVideoSuggestion/useGetSearchVideoSuggestion'
const languages: any = []
const getSuggestions = (value: string) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  if (languages.length > 20) {
    languages.length = 10
  }
  return inputLength === 0
    ? []
    : languages.filter(
      (lang: any) =>
        lang.name.toLowerCase().slice(0, inputLength) === inputValue
    )
}
const getSuggestionValue = (suggestion: any) => suggestion.name
const renderSuggestion = (suggestion: any) => <div>{suggestion.name}</div>
function Suggestion({ title }: { title: string }) {
  const [suggestions, setSuggestions] = useState<any>([])
  const [value, setValue] = useState<string>('')
  const router = useRouter()
  const {
    loadingImageSuggestion,
    dataImageSuggestion,
    getSearchImageSuggestion,
  } = useGetSearchImageSuggestion()
  const {
    loadingVideoSuggestion,
    dataVideoSuggestion,
    getSearchVideoSuggestion,
  } = useGetSearchVideoSuggestion()
  const pushingData = (data?: any, condition?: string) => {
    if (title === 'Musics') {
      languages.push({
        name: '',
      })
      return
    }
    if (data) {
      languages.push({
        name: '',
      })
      for (let i = 0; i < data?.length; i++) {
        languages.push({
          name: data[i],
        })
      }
    }
  }
  useEffect(() => {
    if (title === 'Images') {
      pushingData(dataImageSuggestion.data)
    }
    if (title === 'Videos') {
      pushingData(dataVideoSuggestion.data)
    }
    if (title === 'Musics') {
      pushingData()
    }
  }, [dataImageSuggestion, dataVideoSuggestion])
  const onChange = (event: any, { newValue }: any) => {
    if (title === 'Images') {
      getSearchImageSuggestion(newValue)
    }
    if (title === 'Videos') {
      getSearchVideoSuggestion(newValue)
    }
    if (title === 'Musics') {
    }
    setValue(newValue)
  }
  const onSuggestionsFetchRequested = ({ value }: any) => {
    setSuggestions(getSuggestions(value))
  }
  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }
  const inputProps = {
    placeholder: `Type a ${title}`,
    value,
    onChange: onChange,
  }
  const handleSearch = (e: any) => {
    e.preventDefault()
    const userText = value.replace(/^\s+/, '').replace(/\s+$/, '')
    if (userText === '') {
      return
    }
    if (title === 'Images') {
      router.push(`/search-images/${value}`)
    }
    if (title === 'Videos') {
      router.push(`/search-videos/${value}`)
    }
    if (title === 'Musics') {
      router.push(`/search-musics/${value}`)
    }
  }
  const CustomProgress = () => (
    <CircularProgress mr='2' size='23px' isIndeterminate color='blue.500' />
  )
  return (
    <>
      <Box flex='1'>
        <form
          action=''
          style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Box flex='1'>
            <Autosuggest
              onSuggestionSelected={handleSearch}
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          </Box>
          {loadingImageSuggestion && <CustomProgress />}
          {loadingVideoSuggestion && <CustomProgress />}
          <button style={{ display: 'none' }} onClick={handleSearch}></button>
        </form>
      </Box>
      <Box>
        <IconButton
          onClick={handleSearch}
          _focus={{ outline: '0' }}
          borderRadius='0'
          colorScheme='blue'
          aria-label={`Search Database`}
          icon={<SearchIcon />}
        />
      </Box>
    </>
  )
}

export default Suggestion
