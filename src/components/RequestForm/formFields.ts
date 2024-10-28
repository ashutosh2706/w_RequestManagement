interface FieldDefinition {
    [key: string]: string;
}

interface Field {
    [key: number]: FieldDefinition;
}

/**
 * These are required fields for form-validation
 */

export const requiredFields: Field = {
    1: {
        'email': 'email',
        'guardian-name': 'guardian-name',
    },
    2: {
        'request-title': 'request-title',
        'request-priority': 'request-priority',
    }
};