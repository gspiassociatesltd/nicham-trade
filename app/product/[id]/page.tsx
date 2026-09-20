"use client"
export default function Page({params}:{params:{id:string}}){return <div className="p-6"><a href="/" className="text-xs border px-3 py-1 rounded-full">Home</a><div className="mt-4">Product {params.id}</div></div>}
