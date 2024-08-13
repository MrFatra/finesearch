'use client'
import React, { useRef, useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2Icon, Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

const SearchBar = () => {
  const params = useSearchParams().get('query') || ''
  const inputRef = useRef<HTMLInputElement>(null)
  const [isSearching, startTranstion] = useTransition()
  const router = useRouter()
  const [query, setQuery] = useState<string>(params)

  const search = () => {
    startTranstion(() => {
      router.push(`/search?query=${query}`)
    })
  }

  return (
    <div className="relative flex w-full items-center space-x-3">
      <Input
        type="text"
        placeholder="Search Here"
        className='border-2 border-gray-300 py-5 px-3 focus:border-white transition-all'
        value={query}
        disabled={isSearching}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            search()
          }
          if (event.key === 'Escape') {
            inputRef.current?.blur()
          }
        }}
      />
      <Button disabled={isSearching} onClick={search}>
        {isSearching
          ?
          <>
            <Loader2Icon className='mr-2 h-4 w-4 animate-spin' /> Search
          </>
          :
          <>
            <Search className="mr-2 h-4 w-4" /> Search
          </>
        }
      </Button>
    </div>
  )
}

export default SearchBar