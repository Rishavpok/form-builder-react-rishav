import './FormBuilder.css'
import useFormStore from '../../store/useFormStore'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';

export default function FormBuilder() {
   const navigate = useNavigate()
    const { id } = useParams();
    const { loadForm } = useFormStore()
    const { title, description, setTitle, setDescription, fields, addField, removeField, updateField, resetForm } = useFormStore()


    function handleFieldAdd() {
        let newField = {
            id: crypto.randomUUID(),
            type: 'text',
            label: '',
            required: false
        }
        addField(newField)
    }
    function handleFormQuestion() {
        if (!title) {
            alert('Please add a form title')
            return
        }

        const existing = JSON.parse(localStorage.getItem('savedForms') || '[]')

        const updatedForms = existing.map(f =>
            f.id === id
                ? {
                    id: id,
                    form_title: title,
                    form_description: description,
                    form_fields: fields
                }
                : f
        )

        const exists = existing.some(f => f.id === id)

        const finalForms = exists
            ? updatedForms
            : [
                ...existing,
                {
                    id: id,
                    form_title: title,
                    form_description: description,
                    form_fields: fields
                }
            ]

        localStorage.setItem('savedForms', JSON.stringify(finalForms))
        resetForm()
        navigate('/')
    }

    useEffect(() => {
        const forms = JSON.parse(localStorage.getItem("savedForms") || "[]");
        const selectedForm = forms.find((f: any) => f.id === id);

        if (selectedForm) {
            loadForm(selectedForm);
        }
    }, [id])

    return (
        <div className="fb-wrapper">
            {/* Left Panel — Builder */}
            <div className="fb-panel fb-left">
                <div className="fb-panel-header">
                    <span className="fb-tag">BUILDER</span>
                    <h2 className="fb-panel-title">Form Setup</h2>
                </div>

                <div className="fb-field-group">
                    <label className="fb-label">Form Title</label>
                    <input
                        className="fb-input"
                        name="title"
                        placeholder="e.g. Contact Us"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>

                <div className="fb-field-group">
                    <label className="fb-label">Description</label>
                    <textarea
                        className="fb-input fb-textarea"
                        name="description"
                        placeholder="What is this form for?"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        rows={3}
                    />
                </div>

                <div className="fb-fields-header">
                    <span className="fb-label">Fields <span className="fb-count">{fields.length}</span></span>
                    <button className="fb-add-btn" onClick={handleFieldAdd}>
                        <span className="fb-add-icon">+</span> Add Field
                    </button>
                </div>

                <div className="fb-fields-list">
                    {fields.length === 0 && (
                        <div className="fb-empty">
                            <span>No fields yet.</span>
                            <span>Click "Add Field" to start.</span>
                        </div>
                    )}
                    {fields.map((field, index) => (
                        <div className="fb-field-item" key={field.id}>

                            {/* Editable question label */}
                            <input
                                className="fb-input"
                                type="text"
                                value={field.label}
                                placeholder="Type your question..."
                                onChange={(e) => updateField(field.id, { label: e.target.value })}
                            />

                            {/* Per-field type dropdown */}
                            <select
                                className="fb-input"
                                value={field.type}
                                onChange={(e) => updateField(field.id, { type: e.target.value })}
                            >
                                <option value="text">Short Answer</option>
                                <option value="email">Email</option>
                                <option value="number">Number</option>
                                <option value="checkbox">Checkbox</option>
                                <option value="textarea">Paragraph</option>
                            </select>

                            {/* Required + Delete */}
                            <div className="fb-field-actions">
                                <input type="checkbox" checked={field.required}
                                    onChange={(e) => updateField(field.id, { required: e.target.checked })} />
                                <label>Required</label>
                                <button onClick={() => removeField(field.id)}>✕</button>
                            </div>

                        </div>
                    ))}

                    {fields.length > 0 && (
                        <button type='button' onClick={handleFormQuestion} className="fb-submit-btn">Save Form</button>
                    )}
                </div>
            </div>
        </div>
    )
}