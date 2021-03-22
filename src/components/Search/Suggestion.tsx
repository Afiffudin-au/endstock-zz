import { SearchIcon } from '@chakra-ui/icons'
import { Box, IconButton, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Autosuggest from 'react-autosuggest'
import { useGetSearchSuggestion } from '../../custom-hooks/useGetSearchSuggestion/useGetSearchSuggestion'
const languages: any = []
const getSuggestions = (value: string) => {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  if (languages.length > 20) {
    languages.length = 20
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
  const { dataSuggestion, getSearchSuggestion } = useGetSearchSuggestion()
  useEffect(() => {
    if (dataSuggestion.data) {
      languages.push({
        name: '',
      })
      for (let i = 0; i < dataSuggestion.data?.length; i++) {
        languages.push({
          name: dataSuggestion.data[i],
        })
      }
    }
  }, [dataSuggestion])
  const onChange = (event: any, { newValue }: any) => {
    getSearchSuggestion(newValue)
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
  }
  return (
    <>
      <Box flex='1'>
        <form action='' style={{ height: '100%' }}>
          <Autosuggest
            onSuggestionSelected={handleSearch}
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
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
