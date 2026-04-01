import useFormStore from '../../store/useFormStore'
import './FormPreview.css'

export default function FormPreview() {

    const { title, description, fields } = useFormStore()


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
                                <label className="fb-label">{field.label}</label>
                                <input className="fb-input" type={field.type} placeholder={`Enter ${field.label.toLowerCase()}`} />
                            </div>
                        ))}
                    </div>

                    {fields.length > 0 && (
                        <button className="fb-submit-btn">Submit</button>
                    )}
                </div>
            </div>
        </>
    )
}

