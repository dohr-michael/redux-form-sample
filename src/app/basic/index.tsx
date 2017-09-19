export * from './components';
export * from './models';
export * from './containers';

export const items = [
    {
        path:     'basic',
        children: [
            { path: 'components', children: [ { path: 'without-semantic.tsx' } ] },
            { path: 'containers', children: [ { path: 'without-semantic.tsx' } ] },
            { path: 'models.ts' }
        ]
    }
];

export const itemsSemantic = [
    {
        path:     'basic',
        children: [
            { path: 'components', children: [ { path: 'with-semantic.tsx' } ] },
            { path: 'containers', children: [ { path: 'with-semantic.tsx' } ] },
            { path: 'models.ts' }
        ]
    }
];
