import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'
import useFormStore from '../../store/useFormStore'

type SavedForm = {
    id: string
    form_title: string
    form_description: string
    form_fields: any[]
    savedAt: string
}

export default function Home() {
    const [savedForms, setSavedForms] = useState<SavedForm[]>([])
    const navigate = useNavigate()

    const { loadForm } = useFormStore()

    useEffect(() => {
        const forms = JSON.parse(localStorage.getItem('savedForms') || '[]')
        setSavedForms(forms)
    }, [])

    function handleNewForm() {
        navigate('/builder')
    }

    function handleEditForm(form: SavedForm) {
        loadForm(form)
        navigate(`/builder/${form.id}`)
    }

    function handleDeleteForm(formId: string) {
        const updated = savedForms.filter(f => f.id !== formId)
        setSavedForms(updated)
        localStorage.setItem('savedForms', JSON.stringify(updated))
    }

    return (
        <div className="h-wrap">

            {/* Header */}
            <header className="h-header">
                <div className="h-header-left">
                    <span className="h-logo">Formcraft</span>
                    <span className="h-logo-dot">.</span>
                </div>
                <div className="h-header-right">
                    <span className="h-stat">{savedForms.length} forms</span>
                    <button className="h-new-btn" onClick={handleNewForm}>+ New Form</button>
                </div>
            </header>

            {/* Hero */}
            <section className="h-hero">
                <p className="h-hero-label">Dashboard</p>
                <h1 className="h-hero-title">My Forms</h1>
            </section>

            <div className="h-divider" />

            {/* Main */}
            <main className="h-main">

                {/* Empty State */}
                {savedForms.length === 0 && (
                    <div className="h-empty">
                        <div className="h-empty-box">
                            <p className="h-empty-title">No forms yet</p>
                            <p className="h-empty-sub">Create your first form to get started</p>
                            <button className="h-empty-btn" onClick={handleNewForm}>Create a form</button>
                        </div>
                    </div>
                )}

                {/* Grid */}
                <div className="h-grid">
                    {savedForms.map((form, index) => (
                        <div
                            className="h-card"
                            key={form.id}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="h-card-header">
                                <span className="h-card-num">{String(index + 1).padStart(2, '0')}</span>
                                <span className="h-card-tag">
                                    {form.form_fields.length} field{form.form_fields.length !== 1 ? 's' : ''}
                                </span>
                            </div>

                            <div className="h-card-body">
                                <h3 className="h-card-title">{form.form_title || 'Untitled Form'}</h3>
                                <p className="h-card-desc">{form.form_description || 'No description provided'}</p>
                            </div>

                            <div className="h-card-footer">
                                <span className="h-card-date">
                                    {form.savedAt
                                        ? new Date(form.savedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                        : '—'}
                                </span>
                                <div className="h-card-actions">
                                    <button className="h-card-edit" onClick={() => handleEditForm(form)}>Edit</button>
                                    <button className="h-card-del" onClick={() => handleDeleteForm(form.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* FAB */}
            <button className="h-fab" onClick={handleNewForm} title="New form">+</button>

        </div>
    )
}