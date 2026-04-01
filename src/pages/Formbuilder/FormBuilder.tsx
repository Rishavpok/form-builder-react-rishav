import { useState } from 'react'
import './FormBuilder.css'
import useFormStore from '../../store/useFormStore'

export default function FormBuilder() {
    const [selectedType, setSelectedType] = useState("text")
    const { title, description, setTitle, setDescription, fields, addField, removeField } = useFormStore()


    function handleFieldAdd() {
        let newField = {
            id: crypto.randomUUID(),
            type: selectedType,
            label: selectedType.charAt(0).toUpperCase() + selectedType.slice(1),
            required: false
        }
        addField(newField)
    }

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

                <div className="fb-divider" />

                <select
                    className="fb-input"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="number">Number</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="checkbox">Multiple choice</option>
                    <option value="textarea">Textarea</option>
                </select>

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
                            <div className="fb-field-left">
                                <span className="fb-field-index">{String(index + 1).padStart(2, '0')}</span>
                                <div className="fb-field-info">
                                    <span className="fb-field-label">{field.label}</span>
                                    <span className="fb-field-type">{field.type}</span>
                                </div>
                            </div>
                            <div className="fb-field-actions">
                                <button className="fb-icon-btn fb-edit-btn" title="Edit">✎</button>
                                <button
                                    className="fb-icon-btn fb-delete-btn"
                                    title="Delete"
                                    onClick={() => removeField(field.id)}
                                >✕</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}