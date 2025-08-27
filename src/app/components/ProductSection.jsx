import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function ProductSection() {
  const productsCollection = dbConnect(collectionNameObj.productsCollection);
  const data = await productsCollection.find({}).toArray();

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
      {data.map((item) => (
        <div className="col-span-12 lg:col-span-3" key={item._id.toString()}>
          <div className="card card-compact bg-base-100 shadow-lg">
            <figure>
              <Image
                src={item.image}
                width={314}
                height={208}
                alt={item.name}
                unoptimized
                className="rounded-t-lg"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">${item.price}</p>
              <div className="card-actions justify-end">
                <Link
                  href={`/products/${item._id.toString()}`}
                  className="btn btn-primary btn-sm"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
