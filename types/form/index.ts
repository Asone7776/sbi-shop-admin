export enum FormTypes {
    text = 'text',
    select = 'select',
    autocomplete = 'autocomplete',
    combobox = 'combobox',
    textarea = 'textarea',
    checkbox = 'checkbox',
    radio = 'radio',
    date = 'date',
    hidden = 'hidden',
    image_single = 'image-single',
    image_multiple = 'image-multiple',
    file_single = 'file-single',
    file_multiple = 'file-multiple',
}

export interface FormFieldAttributes {
    label?: string;
    disabled?: boolean;
    itemTitle?: string;
    itemValue?: string;
    no_padding?: boolean
    is_hidden?: boolean;
}

export type FormFieldSize = {
    cols?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}

export interface FormField {
    type: FormTypes;
    key: string;
    attributes?: FormFieldAttributes;
    defaultValue?: any;
    sizes?: FormFieldSize;
}

export type FormFields = FormField[];