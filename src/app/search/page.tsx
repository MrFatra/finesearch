import React from 'react'
import { redirect } from 'next/navigation'
import { db } from '../../db'
import { sql } from 'drizzle-orm'
import { Product, productsTable } from '../../db/schema'
import { Index } from '@upstash/vector'
import { vectorize } from '@/lib/vectorize'
import Link from 'next/link'
import Image from 'next/image'

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

export type CoreProduct = Omit<Product, 'createdAt' | 'updatedAt'>

const index = new Index<CoreProduct>()

const Page = async ({ searchParams }: PageProps) => {
    const query = searchParams.query

    if (Array.isArray(query) || !query) {
        return redirect('/')
    }

    let products: CoreProduct[] = await db.select().from(productsTable).where(sql`to_tsvector('simple', lower(${productsTable.name} || ' ' || ${productsTable.description})) @@ to_tsquery('simple', lower(${query.trim().split(' ').join(' & ')}))`).limit(3)

    if (products.length < 3) {
        const vector = await vectorize(query)

        const res = await index.query({
            topK: 5,
            vector,
            includeMetadata: true,
        })

        const vectorProducts = res.filter((existingProduct) => {
            if (products.some((product) => product.id === existingProduct.id) || existingProduct.score < 0.9) {
                return false
            } else {
                return true
            }
        }).map(({ metadata }) => metadata!)

        products.push(...vectorProducts)
    }

    if (products.length === 0) {
        return (
            <div className="text-center">
                <p className='font-bold'>Tidak ada hasil</p>
                <p className='text-slate-500 text-sm font-medium'>Maaf, pencarian tidak tersedia dengan kata kunci <span className='font-bold text-slate-700'>"{query}"</span></p>
            </div>
        )
    }

    return (
        <ul className='py-2 divide-y-2 divide-slate-800 bg-white drop-shadow-lg rounded-b-lg'>
            {
                products.slice(0, 3).map(product => (
                    <Link key={product.id} href={`/products/${product.id}`}>
                        <li className='mx-auto py-4 px-8 flex space-x-4'>
                            <div className="relative flex items-center bg-zinc-100 rounded-lg h-40 w-40">
                                <Image
                                    loading='eager'
                                    fill
                                    alt={product.name}
                                    src={`/images/products/${product.imageId}`}
                                />
                            </div>
                            <div className="flex flex-col flex-1 w-full gap-2 justify-center">
                                <p className='font-bold text-lg'>{product.name}</p>
                                <p className='text-sm text-slate-500 line-clamp-3'>{product.description}</p>
                                <p className='font-semibold'>${product.price.toFixed(2)}</p>
                            </div>
                        </li>
                    </Link>
                ))
            }
        </ul>
    )
}

export default Page