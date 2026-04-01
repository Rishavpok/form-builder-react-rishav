import { create } from "zustand";

type Field = {
    id: string
    type: string
    label: string
    required: boolean
}

type FormStore = {
    title: string
    description: string
    fields: Field[]
    setTitle: (title: string) => void
    setDescription: (description: string) => void
    addField: (newField: Field) => void
    removeField: (id: string) => void
    updateField: (id: string, changes: Partial<Field>) => void
}

const useFormStore = create<FormStore>((set) => ({
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
    }))
}))

export default useFormStore