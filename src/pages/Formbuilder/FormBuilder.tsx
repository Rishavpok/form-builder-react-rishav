import { useState } from 'react'
import './FormBuilder.css'
import useFormStore from '../../store/useFormStore'

export default function FormBuilder() {

    const [formValues, setFormValues] = useState(
        {
            'title': "",
            "description": "",
            "fields": []
        }
    )

    const { fields, addField, removeField } = useFormStore()

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    function handleFieldAdd() {
        console.log('here');
        
        let newField = {
            id: crypto.randomUUID(),
            type: 'text',
            label: 'New field',
            required: false
        }        

        addField(newField)
    }


    return (
        <div className="form-builder-section" >
            <div>
                <input name="title" placeholder='Enter title' onChange={handleInputChange} />
                <input name="description" placeholder='Enter description' onChange={handleInputChange} />


                <button type='button' onClick={handleFieldAdd} className='btn' > + Add field</button>
            </div>

            <div className="form-preview" >
                {formValues.title} <br />
                {formValues.description} <br />
                {fields.map((field) => (
                    <div key={field.id}>
                        <span>{field.label}</span>
                        <button onClick={() => removeField(field.id)}>Delete</button>
                    </div>
                ))}
            </div>

        </div>
    )
}