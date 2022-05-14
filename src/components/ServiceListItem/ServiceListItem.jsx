import './ServiceListItem.css'

export default function ServiceListItem({serviceItem, handleAddToOrder}) {
    return (
        <div className='ServiceListItem'>
            <div className='name'>{serviceItem.name}</div>
            <div className='buy'>
                <span>${serviceItem.price.toFixed(2)}</span>
                <button className='btn-sm' onClick={() => handleAddToOrder(serviceItem._id)}>
                    ADD
                </button>
            </div>
        </div>
    )
}