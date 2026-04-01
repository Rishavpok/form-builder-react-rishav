import './Tabs.css'

type TabsProps = {
    index: number,
    handleTabChange(index: number): void
}


export default function Tabs({ index, handleTabChange }: TabsProps) {
    return (
        <>
            <div className='tabs' >
                <div 
                className={index === 0 ? 'active' : ''} 
                onClick={() => handleTabChange(0)} >
                    Form builder
                </div>
                <div 
                className={index === 1 ? 'active' : ''} 
                onClick={() => handleTabChange(1)} >
                    Form Preview
                </div>
            </div>
        </>
    )
}