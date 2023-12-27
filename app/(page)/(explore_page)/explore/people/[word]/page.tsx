"use client"
import PeopleSearching from '@/components/searching/searchPeople'
import React from 'react'

export default function ExploreNewPage({ params }: { params: { word: string } }) {
    return (
        <PeopleSearching urlLink={`/user/search/${params.word}`} />
    )
}
