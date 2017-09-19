export * from './components';
export * from './models';
export * from './containers';

export const items = [
    { path: 'components', children: [ { path: 'without-semantic.tsx' } ] },
    { path: 'containers.tsx' },
    { path: 'models.ts' }
];

export const itemsSemantic = [
    { path: 'components', children: [ { path: 'with-semantic.tsx' } ] },
    { path: 'containers.tsx' },
    { path: 'models.ts' }
];
