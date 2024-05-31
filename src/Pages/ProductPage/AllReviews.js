import React  from 'react' 

function AllReviews({ item, index,prductID }) {
 
    return (
        <>

            <div className="border-bottom py-2">
                <p>All Reviews ⭐</p>
                <p className="mb-0">
                    {index + 1}. {item.review}
                </p>
                <div className="d-flex align-items-center gap-2">
                    {Array.from({ length: item.rating }, (_, i) => (
                        <i key={i} className="fas fa-star text-warning"></i>
                    ))}
                    <p className="mb-0">{item.rating}</p>
                </div>
            </div> 
        </>
    )
}

export default AllReviews