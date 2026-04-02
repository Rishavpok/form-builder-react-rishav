import { useState } from "react"
import Tabs from "../../components/UI/Tabs"
import FormBuilder from "../Formbuilder/FormBuilder"
import FormPreview from "../FormPreview/FormPreview"


export default function BuilderPage() {

    const [activeIndex, setActiveIndex] = useState(0)
    function handleTabChange(index: number) {
        setActiveIndex(index)
    }

    return (
        <>
            <Tabs index={activeIndex} handleTabChange={handleTabChange} />
            {activeIndex === 0 && <FormBuilder />}
            {activeIndex === 1 && <FormPreview />}
        </>
    )
}