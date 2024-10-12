import { tool } from 'ai'
import { createStreamableValue } from 'ai/rsc'
import { searchSchema } from '@/lib/schema/search'
import { SearchSection } from '@/components/search-section'
import { ToolProps } from '.'
import {
  SearchResultImage,
  SearchResults,
  SearchResultItem,
} from '@/lib/types'

export const searchTool = ({ uiStream, fullResponse }: ToolProps) =>
  tool({
    description: 'Search the web for information',
    parameters: searchSchema,
    execute: async ({
      query,
      max_results,
      include_domains,
    }) => {
      let hasError = false
      // Append the search section
      const streamResults = createStreamableValue<string>()
      uiStream.update(
        <SearchSection
          result={streamResults.value}
          includeDomains={include_domains}
        />
      )

      let searchResult: SearchResults

      try {
        searchResult = await performSearch(query, max_results, include_domains)
      } catch (error) {
        console.error('Search API error:', error)
        hasError = true
        searchResult = {
          results: [],
          query,
          images: [],
          number_of_results: 0
        }
      }

      if (hasError) {
        fullResponse = `An error occurred while searching for "${query}".`
        uiStream.update(null)
        streamResults.done()
        return searchResult
      }

      streamResults.done(JSON.stringify(searchResult))
      return searchResult
    }
  })

async function performSearch(
  query: string,
  maxResults: number = 10,
  includeDomains: string[] = []
): Promise<SearchResults> {
  const apiUrl = "https://app.socrathink.com"
  const apiKey = process.env.CLARITY_API_KEY
  console.log(apiUrl, apiKey)

  if (!apiUrl) {
    throw new Error('SEARCH_API_URL is not set in the environment variables')
  }

  if (!apiKey) {
    throw new Error('SEARCH_API_KEY is not set in the environment variables')
  }

  try {
    const response = await fetch(`${apiUrl}/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({
        query,
        maxResults,
        includeDomains,
        action: "search"
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.log(errorData)
      throw new Error(`Search API error: ${errorData.error} - ${errorData.details}`)
    }

    const data = await response.json()
    console.log(data)

    const retrieveJinaContent = async (url: string): Promise<string> => {
      try {
        const response = await fetch(`https://r.jina.ai/${url}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'X-With-Generated-Alt': 'true'
          }
        })
        const json = await response.json()
        if (!json.data || json.data.length === 0) {
          throw new Error('No data returned from Jina API')
        }
        // Limit the content to 5000 characters
        return json.data.content.slice(0, 5000)
      } catch (error) {
        console.error('Jina API error:', error)
        return `An error occurred while retrieving content for "${url}".`
      }
    }

    // Process the search results and retrieve content using Jina API
    const processedResults = await Promise.all(
      data.searchResults.results.map(async (result: any): Promise<SearchResultItem> => {
        const jinaContent = await retrieveJinaContent(result.url)
        return {
          title: result.title,
          url: result.url,
          content: jinaContent
        }
      })
    )

    return {
      results: processedResults,
      query: data.searchResults.query,
      images: data.searchResults.images.map((image: any): SearchResultImage => ({
        url: image.url,
        description: image.description
      })),
      number_of_results: data.searchResults.number_of_results
    }
  } catch (error) {
    console.error('Search API error:', error)
    throw error
  }
}
