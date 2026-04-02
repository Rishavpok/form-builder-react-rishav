import { useState } from 'react'
import useFormStore from '../../store/useFormStore'
import './FormPreview.css'

export default function FormPreview() {

    const { formId, title, description, fields } = useFormStore()

    const [formData, setFormData] = useState<Record<string, string>>({})

    function handleAnswerChange(fieldId: string, value: any) {
        setFormData({ ...formData, [fieldId]: value })
    }



    function handleFormSubmit() {

        // validate first
        for (const field of fields) {
            if (field.required && !formData[field.id]) {
                alert(`"${field.label}" is required`)
                return  // stop — don't save
            }
        }

        let answers = {
            id: crypto.randomUUID(),
            formId: formId,
            submittedAt: new Date().toISOString(),
            responses: formData
        }

        const exisitng = JSON.parse(localStorage.getItem('savedResponses') || '[]')

        const updated = [...exisitng, answers]

        localStorage.setItem('savedResponses', JSON.stringify(updated))

        setFormData({})

    }

    function renderFields(field: any) {
        if (field.type === 'textarea') {
            return <textarea
                value={formData[field.id] || ''}
                onChange={(e) => handleAnswerChange(field.id, e.target.value)}
                placeholder='.....' />
        }

        return <input
            value={formData[field.id] || ''}
            onChange={(e) => handleAnswerChange(field.id, e.target.value)} type={field.type}
            placeholder='.....' />
    }

    return (
        <>            {/* Right Panel — Preview */}
            <div className="fb-panel fb-right">
                <div className="fb-panel-header">
                    <span className="fb-tag fb-tag-preview">PREVIEW</span>
                    <h2 className="fb-panel-title">Live Preview</h2>
                </div>

                <div className="fb-preview-card">
                    <h3 className="fb-preview-title">{title || 'Untitled Form'}</h3>
                    {description && (
                        <p className="fb-preview-desc">{description}</p>
                    )}

                    <div className="fb-preview-fields">
                        {fields.length === 0 && (
                            <div className="fb-empty">
                                <span>Your form preview will appear here.</span>
                            </div>
                        )}
                        {fields.map((field) => (
                            <div className="fb-preview-field" key={field.id}>
                                <label className="fb-label">{field.label} {field.required && <span>*</span>} </label>
                                {renderFields(field)}
                            </div>
                        ))}
                    </div>

                    {fields.length > 0 && (
                        <button type='button' onClick={handleFormSubmit} className="fb-submit-btn">Submit</button>
                    )}
                </div>
            </div>
        </>
    )
}

