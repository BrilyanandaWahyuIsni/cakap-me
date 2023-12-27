"use client"
import { SearchingPostingPopuler } from '@/components/searching/searchPosting'
import React from 'react'

export default function ExploreNewPage({ params }: { params: { word: string } }) {
    return (
        <SearchingPostingPopuler urlLink={`/status/search/media/${params.word}`} />
    )
}
