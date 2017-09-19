export * from './models';
export * from './containers';

export const fieldValidationItems = [
    {
        path:     'sync-validation',
        children: [
            { path: 'components', children: [ { path: 'field-validation.tsx' } ] },
            { path: 'containers', children: [ { path: 'field-validation.tsx' } ] },
            { path: 'models.ts' }
        ]
    }
];

export const globalValidationItems = [
    {
        path:     'sync-validation',
        children: [
            { path: 'components', children: [ { path: 'global-validation.tsx' } ] },
            { path: 'containers', children: [ { path: 'global-validation.tsx' } ] },
            { path: 'models.ts' }
        ]
    }
];