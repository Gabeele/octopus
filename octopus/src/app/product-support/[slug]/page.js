'use client';
import { useState, useEffect } from 'react';
import { getProductSupportItem } from './action';

export default function ProductSupportDetails() {
    const id = window.location.pathname.split('/').pop();

    const [productData, setProductData] = useState(null);

    useEffect(() => {
        setProductData(getProductSupportItem(id));
        console.log(productData);
    }, []);

    if (!productData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Product Support Details</h1>
            <p>Customer Name: {productData.customer_name}</p>
            <p>Product: {productData.product}</p>
            <p>Type: {productData.type}</p>
            <p>Status: {productData.status}</p>
            <p>Outcome: {productData.outcome}</p>
            <p>Dropoff Date: {new Date(productData.dropoff_date).toLocaleDateString()}</p>
            <p>Is Wholesale: {productData.isWholesale ? 'Yes' : 'No'}</p>
            <p>Phone Number: {productData.phone_number || 'N/A'}</p>
            <p>Age: {productData.age || 'N/A'}</p>
            <p>CCA: {productData.cca || 'N/A'}</p>
            <p>Voltage: {productData.voltage || 'N/A'}</p>
            <p>Has Loaner: {productData.hasLoaner ? 'Yes' : 'No'}</p>
            <p>Is Resolved: {productData.isResolved ? 'Yes' : 'No'}</p>
            <p>Resolve Date: {productData.resolveDate ? new Date(productData.resolveDate).toLocaleDateString() : 'N/A'}</p>
            <h2>Comments</h2>
            <ul>
                {productData.comments.map(comment => (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <small>{new Date(comment.comment_date).toLocaleDateString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}
