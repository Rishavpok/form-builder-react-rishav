import { create } from "zustand";

type Field = {
    id: string
    type: string
    label: string
    required: boolean
}

type FormStore = {
    formId : string
    title: string
    description: string
    fields: Field[]
    setTitle: (title: string) => void
    setDescription: (description: string) => void
    addField: (newField: Field) => void
    removeField: (id: string) => void
    updateField: (id: string, changes: Partial<Field>) => void
    resetForm :() => void
    loadForm :(form : any) => void
}

const useFormStore = create<FormStore>((set) => ({
    formId : crypto.randomUUID(),
    title: '',
    description: '',
    fields: [],
    setTitle: (title) => set({ title }),
    setDescription: (description) => set({ description }),
    addField: (newField) => set((state) => ({
        fields: [...state.fields, newField]
    })),
    removeField: (id) => set((state) => ({
        fields: state.fields.filter((field) => field.id !== id)
    })),
    updateField: (id, changes) => set((state) => ({
        fields: state.fields.map((field) =>
            field.id === id ? { ...field, ...changes } : field
        )
    })),
    resetForm :() => set({ title : '', description : '', fields : [] }),
    loadForm : (form:any) => set({
        formId : form.id,
        title : form.form_title,
        description : form.form_description,
        fields : form.form_fields
    })
}))

export default useFormStore