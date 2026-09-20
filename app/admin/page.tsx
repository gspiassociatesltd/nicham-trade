"use client"
import { useState, useEffect } from "react"
type Product={id:string,name:string,category:string,manufacturer:string,factoryPrice:number,appPrice:number,status:string}
export default function Admin(){const [products,setProducts]=useState<Product[]>([]);useEffect(()=>{const s=localStorage.getItem("nicham_v103_products");if(s)try{setProducts(JSON.parse(s))}catch{}},[]);return <div className="p-4"><h1 className="font-black">Admin Vault - Hand Tools added</h1><a href="/" className="text-xs border px-3 py-1 rounded-full">Home</a><div className="mt-4 text-xs">Products: {products.length} - Category Hand Tools now available in marketplace</div></div>}
