import './ServiceList.css'
import ServiceListItem from '../ServiceListItem/ServiceListItem'

export default function ServiceList({serviceItems, handleAddToOrder}) {
    const services = serviceItems.map(service =>
        <MenuListItem
        key={service._id}
        serviceItem={service}
        handleAddToOrder={handleAddToOrder} />
        )
        return (
            <main className='ServiceList'>
                {services}
            </main>
        )
}